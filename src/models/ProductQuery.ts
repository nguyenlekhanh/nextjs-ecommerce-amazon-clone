import mongoose from 'mongoose';
import Product from '@/models/Product';
import dbConnect from '@/libs/dbConnect';

const getProductById = async (_id: string) => {
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