import StoreProvider from '@/components/StoreProvider'
import { getServerSession } from "next-auth";
import React from 'react'
import SuccessPage from './components/SuccessPage'
import { STRIPE_STATUS_COMPLETE } from '@/config/constants';
import { createOrder, deleteOrder, findOrderByStripeSessionId, saveOrderLineItem, updateOrderById } from '@/models/OrderQuery';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type lineItemProps = {
  object: string,
  data: StoreProduct[]
}

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const authSession: any = await getServerSession();
  
  const stripe_session_id_param : string | undefined = searchParams.session_id as string;

  const getStripeOrder = async (stripe_session_id: string) => {

    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(stripe_session_id);

      const fulfillOrder = async (lineItems:any, orderId: string) => {
        let amount_discount = 0;
        let amount_subtotal = 0;
        let amount_tax = 0;
        let amount_total = 0;
        let orderlineitem: Array<string | number> = [];

        await Promise.all(lineItems?.data.map( async (product: any) => {
          const orderLineItem = {
            title: product.price.product.name,
            description: product.price.product.description,
            quantity: product.quantity,
            image: product.price.product?.images ? product.price.product.images[0] : '',
            unit_amount: product.price.unit_amount,
            amount_discount: product.amount_discount,
            amount_subtotal: product.amount_subtotal,
            amount_tax: product.amount_tax,
            amount_total: product.amount_total,
            currency: product.currency,
            order_id: orderId
          };
          const lineItem = await saveOrderLineItem(orderLineItem);
          orderlineitem.push(lineItem._id);

          amount_discount += product.amount_discount;
          amount_subtotal += product.amount_subtotal;
          amount_tax += product.amount_tax;
          amount_total += product.amount_total;
        }));

        const updateOrderData = {
          amount_discount,
          amount_subtotal,
          amount_tax,
          amount_total,
          orderlineitem
        };

        const updateOrder = await updateOrderById(orderId, updateOrderData);
      }
      if(authSession && stripeSession && stripeSession?.status === STRIPE_STATUS_COMPLETE) {
        //remove client cart

        //console.log(authSession.user.email);
        const orderWithStripSessionId = await findOrderByStripeSessionId(stripe_session_id_param);

        if(!orderWithStripSessionId) {
          const order = await createOrder(stripe_session_id_param, authSession.user.email);
          // console.log(order);
          const orderId = order._id;

          //save temp order to order
          stripe.checkout.sessions.listLineItems(
            stripeSession.id,
            { 
              limit: 100,
              expand: ['data.price.product']
            },
            function(err: any, lineItems:lineItemProps) {

              // Fulfill the purchase...
              try {
                // console.log(lineItems);
                fulfillOrder(lineItems, orderId);
              } catch (err) {
                console.log(err);
              }
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      //throw new Error('Something went wrong, please try again later!');
    }
  }

  if(stripe_session_id_param) {
    await getStripeOrder(stripe_session_id_param);
  }

  return (
    <StoreProvider>
      <SuccessPage />
    </StoreProvider>
  )
}

export default page