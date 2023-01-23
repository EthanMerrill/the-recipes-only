import Head from 'next/head'
import Link from 'next/link'
import db from './api/clientApp'
import { collection, getDocs } from 'firebase/firestore';
import Search from '@/components/Search';
import { AppContext, useAppContext } from '@/context/state';
import { useContext } from 'react';
import { useEffect } from 'react';


export default function Home({recipeNames}:any) {
  
  // useAppContext().setSharedState(recipeNames)
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.setRecipeNames(recipeNames)
    appContext.setRecipeName('')
  }, [appContext, recipeNames])

  return (
    <>
      <Head>
        <title>The Recipes Only</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col p-6 min-h-screen bg-page-bg dark:bg-gray-dark'>
        <div className='center sans w-3/5 m-auto'>
          <h1 className='py-3 text-4xl text-black'>The Recipes Only</h1>
          <h3 className='py-1 text-lg pb-6'>Search for any recipe and get just the recipe - nothing more</h3>
          <Search recipeNames={recipeNames}/>
        </div>
        {recipeNames.map((recipeName:string, i:number) => {
          return <Link key={i} href={`/recipes/${recipeName}`}>{recipeName}</Link>
        })
        }
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
