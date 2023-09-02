'use client';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import FavoritePage from './FavoritePage';

const FavoriteContainer = () => {
  return (
    <Provider store={store}>
      <FavoritePage />
    </Provider>
  )
}

export default FavoriteContainer