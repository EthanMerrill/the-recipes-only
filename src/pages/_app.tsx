import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContextProvider from '@/context/state'
import QueryClientWrapper from '@/context/QueryProvider'
import { Arvo, Lato } from '@next/font/google'

const arvo = Arvo({ weight: '700', style: 'normal',subsets: ['latin'] })
const lato = Lato({ weight: '300', style: 'normal',subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <QueryClientWrapper>
        <Component {...pageProps} />
        <style jsx global>
          {`
            :root {
              --arvo-font: ${arvo.style.fontFamily};
              --lato-font: ${lato.style.fontFamily};
            }
          `}
        </style>
      </QueryClientWrapper>
    </AppContextProvider>
  )
}
