import Head from 'next/head'
import db from './api/clientApp'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Search from '@/components/Search';
import { AppContext } from '@/context/state';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading'
import Script from 'next/script'
import RecentRecipes from '@/components/RecentRecipes';
import { topRecipe } from '@/types/TopRecipe.interface';
import { Analytics } from '@vercel/analytics/react';
import { SignatureFooter } from 'ethan-common-components';
import Link from 'next/link';

interface HomeProps {
  recipeNames: string[]
  recentRecipes: topRecipe[]
}

export default function Home(recipeDetails: HomeProps) {

  const appContext = useContext(AppContext)
  console.log('state', appContext)

  useEffect(() => {
    appContext.setRecipeNames(recipeDetails.recipeNames)
    if (!appContext.userId) {
      appContext.setUserId(Math.random().toString(36).substring(7))
    }
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
        <title>The Recipes Only - Just Recipes</title>
        <meta name="description" content="Just Recipes: a simple app for discovering and saving your favorite recipes. No ads, long stories, or distractions. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="recipes, cooking, food, cuisine, recipe finder" />
        <meta property="og:title" content="The Recipes Only" />
        <meta property="og:description" content="Search for any recipe and get just the recipe - nothing more" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://the-recipes-only.com" /> */}
        {/* <meta property="og:image" content="https://the-recipes-only.com/og-image.jpg" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Recipes Only" />
        <meta name="twitter:description" content="Just Recipes: a simple app for discovering and saving your favorite recipes." />
        {/* <meta name="twitter:image" content="https://the-recipes-only.com/twitter-card.jpg" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className='flex flex-col p-6 min-h-screen bg-page-bg dark:bg-gray-dark '>

        <div className='sm:mt-20 lg:my-auto mx-auto sans w-3/5 '>
          <h1 className='py-3 text-4xl font-serif dark:text-txt-light text-txt-dark'>The Recipes Only</h1>
          <h2 className='py-1 text-lg pb-6 font-sans tracking-wide text-neutral-500 animate-fade'>Search for any recipe and get just the recipe - nothing more</h2>
          <div className='flex flex-row flex-wrap'>
            <Search recipeNames={recipeDetails.recipeNames} />
            <Loading />
          </div>
          <RecentRecipes topRecipes={recipeDetails.recentRecipes} />
        </div>

        {/* Link to All Recipes page */}
        <div className='absolute bottom-12 left-12'>
          <Link href="/recipes" className="text-txt-dark dark:text-txt-light hover:underline font-serif">
            Browse All Recipes
          </Link>

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
        <Analytics />
      </main>
      <div className='mt-8 absolute bottom-0 w-full'>
        <SignatureFooter backgroundColor={""} fontColor={""} />
      </div>
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
