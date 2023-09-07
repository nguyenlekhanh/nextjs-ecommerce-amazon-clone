'use client';

import Image from "next/image";
import React, { memo } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import FormattedPrice from "@/components/FormattedPrice";

interface Item {
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
interface cartProductsProps {
  item: Item;
}

const OrderLineItem = ({ item }: cartProductsProps) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-gray-100 rounded-lg flex items-center gap-4">
        <Image
          className="object-cover"
          width={150}
          height={150}
          src={item.image}
          alt="productImage"
          style={{width: "auto"}}
        />
        <div className="flex items-center px-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-600">
              Unit Price{" "}
              <span className="font-semibold text-amazon_blue">
                <FormattedPrice amount={item.unit_amount} />
              </span>
            </p>
            <div className="flex items-center gap-6">
              <div className="flex justify-center items-center mt-1 border border-gray-300 px-4 py-1 rounded-full w-30 shadow-lg shadow-gray-300">
                <span>Quantity: {item.quantity}</span>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-amazon_blue">
            <FormattedPrice amount={item.unit_amount * item.quantity} />
          </div>
        </div>
      </div>
    </>
  );
};

function areItemsEqual(prevItem: cartProductsProps, nextItem: cartProductsProps) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof cartProductsProps] === nextItem[key as keyof cartProductsProps]
  })
}

const MemoizedCartLineItem = memo<typeof OrderLineItem>(OrderLineItem, areItemsEqual)

export default MemoizedCartLineItem


// export default CartProduct;
