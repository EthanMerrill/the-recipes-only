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
        <title>The Recipes Only</title>
        <meta name="description" content="Just Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
        <div className='mt-8 absolute bottom-0 w-full'>
          <SignatureFooter backgroundColor={""} fontColor={""} />
        </div>
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
