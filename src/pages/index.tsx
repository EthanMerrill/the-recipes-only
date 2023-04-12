import Head from 'next/head'
import Link from 'next/link'
import db from './api/clientApp'
import { collection, getDocs, query, orderBy, limit} from 'firebase/firestore';
import Search from '@/components/Search';
import { AppContext, useAppContext } from '@/context/state';
import { Suspense, useContext, useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading'
import Script from 'next/script'
import { clsx } from "clsx";
import { Recipe } from '@/types/Recipe';
import RecentRecipes from '@/components/RecentRecipes';
import { topRecipe } from '@/types/TopRecipe.interface';

interface HomeProps {
  recipeNames: string[]
  recentRecipes: topRecipe[]
}

export default function Home(recipeDetails: HomeProps) {

  // useAppContext().setSharedState(recipeNames)
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.setRecipeNames(recipeDetails.recipeNames)
  }, [appContext, recipeDetails])

  // fade elements in on load
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setOpacity(.25)
    }, 100)
  }, [])

  return (
    <>
      <Head>
        <title>The Recipes Only</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col p-6 min-h-screen bg-page-bg dark:bg-gray-dark '>

        <div className='center sans w-3/5 m-auto'>
          <h1 className='py-3 text-4xl font-serif dark:text-txt-light text-txt-dark'>The Recipes Only</h1>
          <h3 className='py-1 text-lg pb-6 font-sans tracking-wide text-neutral-500 animate-fade'>Search for any recipe and get just the recipe - nothing more</h3>
          <div className='flex flex-row flex-wrap'>
            <Search recipeNames={recipeDetails.recipeNames} />
            <Loading />
          </div>
          <div className='flex flex-row flex-wrap mt-12'>
            <h1 className='py-3 text-2xl font-serif dark:text-txt-light text-txt-dark'>Or generate a recipe using the ingredients you already have</h1>
            <div className='flex flex-col'>
            <input className='w-1/2 p-2 m-2 rounded-lg border border-neutral-300 dark:border-neutral-700 dark:bg-gray-dark dark:text-txt-light' type="text" placeholder='Search with ingredients' />
            <button className='w-1/2 p-2 m-2 rounded-lg border border-neutral-300 dark:border-neutral-700 dark:bg-gray-dark dark:text-txt-light'>Search</button>
            </div>
          </div>

          <RecentRecipes topRecipes={recipeDetails.recentRecipes} />

        </div>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-110EPPVXQX"
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

export const getServerSideProps = async () => {
  // get all recipe names from firebase and return them in an array of strings
  const querySnapshot = await getDocs(collection(db, "recipes"));
  const recipeNames = querySnapshot.docs.map((doc) => {
    return doc.data().name
  })
  // get a list of the 5 most recent recipes and return them in an array of objects
  const topEightRecipes = query(collection(db, "recipes"), orderBy('created', 'desc'), limit(5))
  const topEightSnap = await getDocs(topEightRecipes)
  const recentRecipes = topEightSnap.docs.map((doc) => {
    const created = doc.data().created ? doc.data().created?.toDate().toString() : null
    return {
      'name': doc.data().name,
      'created': created
    }
  })

  return {
    props: {
      "recipeNames": recipeNames,
      "recentRecipes": recentRecipes
    },
  }
}
