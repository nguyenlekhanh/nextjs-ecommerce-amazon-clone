'use client';
import React from 'react'
import Header from './Header'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'

const HeaderContainer = () => {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  )
}

export default HeaderContainer