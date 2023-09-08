import StoreProvider from '@/components/StoreProvider'
import React from 'react'
import OrderContainer from './components/OrderContainer'
import CheckAuth from '@/components/CheckAuth'
import { getServerSession } from "next-auth";
import { getOrderByEmail } from '@/models/OrderQuery';

export const revalidate = 0;

const MyOrder = async () => {
  const authSession = await getServerSession();

  let orders:string='';
  try{
    if(authSession && authSession.user && authSession?.user.email) {
      orders = await getOrderByEmail(authSession?.user.email);
      //orders[0].order_line_item = orders[0].order_line_item.flat();
      // console.log(orders[0].order_line_item.flat());
      //console.log(orders);
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <CheckAuth>
      <StoreProvider>
        <OrderContainer orders={orders}/>
      </StoreProvider>
    </CheckAuth>
  )
}

export default MyOrder