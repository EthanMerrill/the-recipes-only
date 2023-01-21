import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>The Recipes Only</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col p-6 min-h-screen bg-page-bg'>
       <div className='center sans w-3/5 m-auto'>
          <h1 className='py-5 text-4xl'>The Recipes Only</h1>
          <h3 className='py-3 text-lg'>Search for any recipe and get just the recipe - nothing more</h3>
          <input className='rounded border p-1' placeholder='Apple Crepe'></input>
       </div>
       <Link href='/recipePage'>Apple Crepe</Link>
      </main>
    </>
  )
}
