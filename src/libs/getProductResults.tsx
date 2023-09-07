import { base_url } from '@/config/constants';

import prisma from '@/libs/prismadb'

export default async function getProductResults() {

  // const existingStripe = await prisma.products.findFirst({
  //   where: {id: "64f8ff3166eeca29659fae92", title: "Antec Air Cooler"}
  // });

  // console.log(existingStripe);
  // if(!existingStripe){
  //   console.log('a1');
  // }
  const response = await fetch(base_url + '/api/products');

  return response.json();

}
