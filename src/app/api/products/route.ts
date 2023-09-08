
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnect';
// import Product from '@/models/Product';
import { removeDecimal128 } from '@/libs/dataLib';
import prisma from '@/libs/prismadb'

type ResponseData = {
  message: string
}

export async function GET(req: Request) {
  await dbConnect();

  try {
    let data = await prisma.products.findMany();
    console.log(await data);
    // const dataRemoveDecimal128 = removeDecimal128(data);

    // //TODO make only 5 request / minutes for not making DDOS
    // const data = await Product.find({});
    //console.log(data);
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err })
  }
}