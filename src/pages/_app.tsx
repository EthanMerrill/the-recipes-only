import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContextProvider from '@/context/state'
import { Suspense } from 'react'
import QueryClientWrapper from '@/context/QueryProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <QueryClientWrapper>
        <Component {...pageProps} />
      </QueryClientWrapper>
    </AppContextProvider>
  )
}
