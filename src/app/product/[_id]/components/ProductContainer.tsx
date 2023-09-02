'use client';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import ProductItem from './ProductItem';

const ProductContainer = () => {
  return (
    <Provider store={store}>
      <ProductItem />
    </Provider>
  )
}

export default ProductContainer