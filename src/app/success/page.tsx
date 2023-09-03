import StoreProvider from '@/components/StoreProvider'
import { getServerSession } from "next-auth";
import React from 'react'
import SuccessPage from './components/SuccessPage'
import { STRIPE_STATUS_COMPLETE } from '@/config/constants';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const authSession = await getServerSession();

  const getStripeOrder = async () => {
    //const tempOrderId = searchParams.tmp_order_id;
    const stripeSession = await stripe.checkout.sessions.retrieve(searchParams.session_id);
    console.log('a1');
    console.log(authSession);
    if(authSession && stripeSession && stripeSession?.status === STRIPE_STATUS_COMPLETE) {
      console.log('a2');
      //remove cart
      //save temp order to order
      stripe.checkout.sessions.listLineItems(
        stripeSession.id,
        { limit: 100 },
        function(err, lineItems: ProductProps[]) {
          console.log(lineItems);
          // Fulfill the purchase...
          try {
            //fulfillOrder(session, lineItems);
          } catch (err) {
            console.log(err);
            //return response.status(400).send(`Fulfillment Error: ${err.message}`);
          }
        }
      );
    }
    // stripe.checkout.sessions.listLineItems(
    //   session.id,
    //   { limit: 100 },
    //   function(err, lineItems) {
    //     console.log(lineItems);
    //     // Fulfill the purchase...
    //     try {
    //       //fulfillOrder(session, lineItems);
    //     } catch (err) {
    //       //return response.status(400).send(`Fulfillment Error: ${err.message}`);
    //     }
    //   }
    // );
  }

  await getStripeOrder();

  return (
    <StoreProvider>
      <SuccessPage />
    </StoreProvider>
  )
}

export default page