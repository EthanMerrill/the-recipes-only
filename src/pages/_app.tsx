import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import  AppContextProvider from '@/context/state'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AppContextProvider>
    <Suspense fallback={<div>Loading...</div>}>
    <Component {...pageProps} />
    </Suspense>
  </AppContextProvider>
  )
}
