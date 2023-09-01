'use client';
import React from 'react'
import Banner from './Banner';
import Products from './Products';
import { store } from '@/app/store/store'
import { Provider } from 'react-redux'

import "react-responsive-carousel/lib/styles/carousel.min.css";

type ItemProps = {
  productData: ProductProps
}

const HomeClientPagetsx = async ({productData} : ItemProps) => {
  return (
    <Provider store={store}>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData}/> 
        </div>
      </div>
    </Provider>
  )
}

export default HomeClientPagetsx