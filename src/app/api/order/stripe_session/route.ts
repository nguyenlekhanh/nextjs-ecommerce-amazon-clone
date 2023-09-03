import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import StripeSession from '@/models/StripeSession';

import { getServerSession } from "next-auth";


export async function POST(request: NextRequest) {
  //TODO only accept 5 request / min for blocking DDOS
  try {
    //https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
    await dbConnect();

    const authSession = await getServerSession();

    if(authSession) {
      const res = await request.json();
      const { session_id, email } = res;

      const existingStripe = await StripeSession.findOne({ email: email, stripe_session_id: session_id });

      if(!existingStripe) {
        await StripeSession.create({
          email: email,
          stripe_session_id: session_id
        });
      }
    }

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}