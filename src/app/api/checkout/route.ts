
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type ResponseData = {
  message: string
}

export async function GET(request: NextRequest) {
  try{
    console.log(request);
  return NextResponse.json({ message: 'Success' })
  } catch(e) {
    console.log(e);
    return NextResponse.json({ message: 'Internal server error' })
  }
}

export async function POST(request: NextRequest) {
  try {
    //https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
    const res = await request.json();
    const { items, email } = res;

    const modifiedItems = items.map((item: StoreProduct) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    const sessionId = crypto.randomUUID();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["BD", "US", "OM", "CA", "GB"],
      },
      line_items: modifiedItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image)),
      },
    });

    return NextResponse.json({ id: session.id, message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}