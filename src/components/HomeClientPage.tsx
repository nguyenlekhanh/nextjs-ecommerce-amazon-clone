'use client';
import React from 'react'
import Banner from './Banner';
import Products from './Products';
import { persistor, store } from '@/app/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import "react-responsive-carousel/lib/styles/carousel.min.css";

type ItemProps = {
  productData: ProductProps[] | null
}

const HomeClientPage = ({productData} : ItemProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className="max-w-screen-2xl mx-auto">
          <Banner />
          <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
            <Products productData={productData}/> 
          </div>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default HomeClientPage