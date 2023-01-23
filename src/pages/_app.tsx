import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import  AppContextProvider from '@/context/state'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AppContextProvider>
    <Component {...pageProps} />
  </AppContextProvider>
  )
}
