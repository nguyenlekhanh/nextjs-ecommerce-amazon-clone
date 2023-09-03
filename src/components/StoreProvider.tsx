'use client';

import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

type ItemProps = {
  children: React.ReactNode
}

const StoreProvider = ({children}: ItemProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default StoreProvider