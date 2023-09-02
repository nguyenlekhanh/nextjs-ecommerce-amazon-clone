'use client';
import React from 'react'
import Header from './Header'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import BottomHeader from './BottomHeader';

const HeaderContainer = () => {
  return (
    <Provider store={store}>
      <Header />
      <BottomHeader />
    </Provider>
  )
}

export default HeaderContainer