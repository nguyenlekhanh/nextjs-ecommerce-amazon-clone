'use client';
import React from 'react'
// import Header from './Header'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
// import BottomHeader from './BottomHeader';


// Error: Text content does not match server-rendered HTML.
// Warning: Text content did not match. Server: "0" Client: "4"
// See more info here: https://nextjs.org/docs/messages/react-hydration-error
// because we use localstorage from store in Header.tsx so we need to use this way or use useEffect inside Header.tsx
import dynamic from 'next/dynamic'
const HeaderNoSSR = dynamic(() => import('./Header'), { ssr: false })
const BottomHeaderNoSSR = dynamic(() => import('./BottomHeader'), { ssr: false })

const HeaderContainer = () => {
  return (
    <Provider store={store}>
      <HeaderNoSSR />
      <BottomHeaderNoSSR />
    </Provider>
  )
}

export default HeaderContainer