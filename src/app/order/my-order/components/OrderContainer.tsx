'use client';

import React, { useEffect, useState } from 'react'
import { useSession, getSession } from "next-auth/react"
import Link from 'next/link';
import OrderLineItem from './OrderLineItem';
import Moment from 'react-moment';

type OrderLineItemProps = {
  title: string,
  quantity: number,
  image: string,
  description: string,
  unit_amount: number,
  amount_discount: number,
  amount_subtotal: number,
  amount_tax: number,
  amount_total: number,
  currency: string,
  createdAt: Date
}

type OrderItem = {
  amount_discount: number, 
  amount_subtotal: number, 
  amount_tax: number,
  amount_total: number,
  createdAt: Date,
  order_line_item: [OrderLineItemProps]
}

type ItemProps = {
  orders: string
}

const OrderContainer = ({orders} : ItemProps) => {
  const [productData, setProductData] = useState<any>();
  const parseOrders:OrderItem[] = JSON.parse(orders);
  let orderLineItems: Array<OrderLineItemProps> = [];

  parseOrders.map(orderLineItem => {
    orderLineItem.order_line_item.map((item) => {
      orderLineItems.push(item);
    })
  });

  useEffect(() => {
    setProductData(parseOrders);
  }, [])


  
//   <div>
//   <Moment format="MMM D, YYYY, h:mm:ss a">
//     {item.createdAt}
//   </Moment>
//   &nbsp;order
// </div>
  return (
    <div className="w-full mx-auto px-6 py-4">
      {productData && productData.length > 0 ? (
          <div>
            <div className="bg-white col-span-4 p-4 rounded-lg">
              <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
                <p className="text-2xl font-semibold text-amazon_blue">
                  Order Items
                </p>
                <p className="text-lg font-semibold text-amazon_blue">Subtitle</p>
              </div>
              <div className="pt-2 flex flex-col gap-2"></div>
              {
                productData.map((orderLineItem:OrderItem) => (
                  <>
                    <div className="mt-5">
                      <Moment format="MMM D, YYYY">
                        {orderLineItem.createdAt}
                      </Moment>
                      &nbsp;order
                    </div>
                    {
                      orderLineItem.order_line_item.map((item:OrderLineItemProps, index) => (
                        <>
                          <div key={index} className="mb-5">
                            <OrderLineItem item={item} />
                          </div>
                        </>
                      ))
                    }
                  </>
                ))
              }
              </div>
            </div>
        // <>
        //   <div className="bg-white col-span-4 p-4 rounded-lg">
        //     <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
        //       <p className="text-2xl font-semibold text-amazon_blue">
        //         Order Items
        //       </p>
        //       <p className="text-lg font-semibold text-amazon_blue">Subtitle</p>
        //     </div>
        //     <div className="pt-2 flex flex-col gap-2">
        //       {productData.map((item: OrderLineItemProps, index: any) => {
        //         // const uniqueID = item._id;
        //         return (
        //           <div key={index}>
        //             <OrderLineItem item={item} />
        //           </div>
        //       )})}
        //     </div>
        //   </div>
        // </>
      ) : (
        <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Your order is empty!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default OrderContainer