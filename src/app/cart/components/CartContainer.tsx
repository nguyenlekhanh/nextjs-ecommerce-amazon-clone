'use client';

import React from 'react'
import Carts from './Carts';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

const CartContainer = () => {
  return (
    <Provider store={store}>
      <Carts />
    </Provider>
  )
}

export default CartContainer