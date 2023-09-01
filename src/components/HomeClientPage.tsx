'use client';
import React from 'react'
import Banner from './Banner';
import Products from './Products';
import getProductResults from '@/libs/getProductResults';
import { store } from '@/app/store/store'
import { Provider } from 'react-redux'

const HomeClientPagetsx = async () => {
  const productData: Promise<ProductProps> = getProductResults();

  const data = await productData;

  return (
    <Provider store={store}>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={data}/> 
        </div>
      </div>
    </Provider>
  )
}

export default HomeClientPagetsx