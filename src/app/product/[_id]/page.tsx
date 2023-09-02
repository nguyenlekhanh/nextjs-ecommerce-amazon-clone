import React from "react";

import ProductContainer from "./components/ProductContainer";
import { getProductById } from "@/models/ProductQuery";
import { redirect } from "next/navigation";

type Props = {
  params: {
    _id: string
  }
}

const DynamicPage = async ({params: { _id }} : Props) => {
  const product:ProductProps = await getProductById(_id);

  if(!product) {
    redirect('/')
  }
  return (
    <ProductContainer product={product}/>
  );
};

export default DynamicPage;
