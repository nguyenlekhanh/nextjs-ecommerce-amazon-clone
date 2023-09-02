'use client';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import ProductItem from './ProductItem';

type itemProps = {
  product: ProductProps
}

const ProductContainer = ({product} : itemProps) => {
  return (
    <Provider store={store}>
      <ProductItem productParam={product}/>
    </Provider>
  )
}

export default ProductContainer