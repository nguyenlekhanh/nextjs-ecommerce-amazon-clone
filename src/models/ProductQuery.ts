import mongoose from 'mongoose';
import Product from '@/models/Product';
import dbConnect from '@/libs/dbConnect';

const getProductById = async (_id: string) => {
  //if we did not connect, it will return error below
  //MongooseError - Operation `db.findOne()` buffering timed out after 10000ms
  await dbConnect();

  let product = null;

  if(mongoose.Types.ObjectId.isValid(_id)) {
    product = await Product.findOne({ _id });
  }

  return product.toJSON();
}


export {
  getProductById
}