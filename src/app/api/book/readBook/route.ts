
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'
// import Book from '@/models/Book';
// import Order from '@/models/Order';
// import OrderLineItem from '@/models/OrderLineItem';
// import dbConnect from '@/libs/dbConnect';
// import mongoose, {ObjectId} from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    // await dbConnect();

    // const res = await request.json();
    // const { bookId } = res;
    // //console.log(bookId);
    // // const result = Book.findById(bookId)
    // // .populate('author')
    // // .then((book) => (book ? console.log(book) : console.log('not found')))
    // // .catch((error) => console.log(error));
    // // const result = await Book.findById(bookId);
    // //const result = await Order.find({user_email: "gina.rinehart81@gmail.com"});
    // if(mongoose.Types.ObjectId.isValid(bookId)) {
    //   // const result = await Book.findById(bookId as ObjectId).populate('author');
      
    //   //const result = await OrderLineItem.find({order_id: "64f7d79db74f84f619d1ac40"}).populate('order_id');


    //   const id = new mongoose.Types.ObjectId("64f7da27b4631be6977022f4");
    //   const result = await Order.aggregate([
    //     [
    //       { $match: {_id: id } },
    //       {
    //         $lookup: {
    //           from: "orderlineitems",
    //           localField: "_id",
    //           foreignField: "order_id",
    //           as: "order_line_item"
    //         }
    //       }
    //     ]
    //   ]);
    //   console.log(result);
    // }

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}
// await dbConnect();

// // const popObj = {
// //   path: 'OrderLineItem',
// //   options: { sort: { position: -1 } }
// // };

// const result = await Order.find({user_email});
// //const result = await Order.find({user_email}, undefined, { populate: {path: 'OrderLineItem', options: {strictPopulate: false}}, option: {strictPopulate: false}, });

// const dataRemoveDecimal128 = removeDecimal128(result);

// // console.log(dataRemoveDecimal128);
// return dataRemoveDecimal128;