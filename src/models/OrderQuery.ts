import mongoose from 'mongoose';
// import Order from '@/models/Order';
// import OrderLineItem from '@/models/OrderLineItem';

import dbConnect from '@/libs/dbConnect';
import { removeDecimal128 } from '@/libs/dataLib';

import prisma from '@/libs/prismadb'

const deleteOrder = async () => {
  await dbConnect();

  //Order.deleteMany();

  //OrderLineItem.deleteMany();

  await prisma.Orders.deleteMany();
  await prisma.OrderLineItems.deleteMany();
  
}

const createOrder = async (stripe_session_id: string, user_email: string) => {
  await dbConnect();

  //const result = await Order.create({ stripe_session_id: stripe_session_id, user_email});
  //const dataRemoveDecimal128 = removeDecimal128(result);

  //await prisma.Orders.deleteMany();
  const result = await prisma.Orders.create({
    data: {stripe_session_id: stripe_session_id, user_email}
  });

  return result;
}

const findOrderByStripeSessionId = async (stripe_session_id: string) => {
  await dbConnect();

  let order = null;

  // order = await Order.findOne({ stripe_session_id });
  order = await prisma.Orders.findFirst({
    where: {stripe_session_id: stripe_session_id}
  });

  if(order) {
    return order;  
  } else {
    return null;
  }
}

const updateOrderById = async (id: string, data: any) => {
  await dbConnect();

  let result = '';
  // if(mongoose.Types.ObjectId.isValid(id)) {
  //   // console.log(data);
  //   result = await Order.updateOne({_id: id}, { $set: data });
  // }
  
  // const dataRemoveDecimal128 = removeDecimal128(result);

  if(mongoose.Types.ObjectId.isValid(id)) {
    result = await prisma.Orders.update({
      where: {id: id},
      data: data
    });
  }

  return result;
}

const saveOrderLineItem = async (data: any) => {
  await dbConnect();

  // const result = await OrderLineItem.create(data);

  // const dataRemoveDecimal128 = removeDecimal128(result);

  //await prisma.OrderLineItems.deleteMany();
  const result = await prisma.OrderLineItems.create({
    data: data
  });

  return result;
}

const getOrderByEmail = async (user_email: string) => {
  await dbConnect();

  // const id = new mongoose.Types.ObjectId("64f7da27b4631be6977022f4");
  // const result = await Order.aggregate([
  //   [
  //     { $match: { user_email } },
  //     { $project: {
  //         amount_discount: 1, 
  //         amount_subtotal: 1, 
  //         amount_tax: 1,
  //         amount_total: 1,
  //         createdAt: 1,
  //         order_line_item: {
  //           title: 1,
  //           quantity: 1,
  //           unit_amount: 1,
  //           amount_discount: 1,
  //           amount_subtotal: 1,
  //           amount_tax: 1,
  //           amount_total: 1,
  //           currency: 1,
  //         }
  //       }
  //     },
  //     {
  //       $lookup: {
  //         from: "orderlineitems",
  //         localField: "_id",
  //         foreignField: "order_id",
  //         as: "order_line_item"
  //       }
  //     }
  //   ]
  // ]);

  // const dataRemoveDecimal128 = removeDecimal128(result);

  // const objAsString = JSON.stringify(dataRemoveDecimal128, null, 2)

  // console.log(objAsString);
  // dataRemoveDecimal128.json();

  const result = await prisma.Orders.findMany({
    where: {'user_email': user_email},
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
    include: {
      orderLineItems: true,
    }
  })

  const objAsString = JSON.stringify(result, null, 2);
  // console.log(objAsString);
  return objAsString;

  
//model.findOne({}, undefined, { populate: {path: 'fooo', options: {strictPopulate: false}}, option: {strictPopulate: false}, })

}

export {
  createOrder,
  saveOrderLineItem,
  updateOrderById,
  deleteOrder,
  findOrderByStripeSessionId,
  getOrderByEmail
}