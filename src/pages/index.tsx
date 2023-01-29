import Head from 'next/head'
import Link from 'next/link'
import db from './api/clientApp'
import { collection, getDocs } from 'firebase/firestore';
import Search from '@/components/Search';
import { AppContext, useAppContext } from '@/context/state';
import { Suspense, useContext } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading'
import Script from 'next/script'

export default function Home({recipeNames}:any) {
  
  // useAppContext().setSharedState(recipeNames)
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.setRecipeNames(recipeNames)
  }, [appContext, recipeNames])

  return (
    <>
      <Head>
        <title>The Recipes Only</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col p-6 min-h-screen bg-page-bg dark:bg-gray-dark  text-black dark:text-slate-200'>
        
        <div className='center sans w-3/5 m-auto'>
          <h1 className='py-3 text-4xl font-serif'>The Recipes Only</h1>
          <h3 className='py-1 text-lg pb-6 font-sans tracking-wide'>Search for any recipe and get just the recipe - nothing more</h3>
          <div className='flex flex-row flex-wrap'>
          <Search  recipeNames={recipeNames}/>
          <Loading/>
          </div>
        </div>
                {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-110EPPVXQX');
        `}
      </Script>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const querySnapshot = await getDocs(collection(db, "recipes"));
  
  // create an array of receipe names
  const recipeNames = querySnapshot.docs.map((doc) => {
    // useAppContext().setSharedState(recipeNames)
    // console.log(doc)
    return doc.data().name
  })
  return {
    props: { recipeNames: recipeNames }
  }
}
