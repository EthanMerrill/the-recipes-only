import Head from 'next/head'
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../api/clientApp'
import Header from '@/components/Header';
import { Recipe } from '@/types/Recipe';
import IngredientsInstructions from '@/components/IngredientsInstructions';
import StarRating from '@/components/StarRating';
import { structuredRecipeBuilder } from '@/utils/utils';
import { use, useContext, useEffect } from 'react';
import { AppContext } from '@/context/state';
import { SignatureFooter } from 'ethan-common-components';

export default function RecipePage(recipe: Recipe) {
    const { name, ingredients, instructions } = recipe

    const appContext = useContext(AppContext)
    const {setRecipeName, starRating} = appContext
    useEffect(() => {
        setRecipeName(name)
    }, [name, setRecipeName])
    

    return (
        <>
            <Head>
                <title>{`${name} | The Recipes Only`}</title>
                <meta name="description" content="Recipe generated by therecipesonly.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <script type="application/ld+json">
                    {structuredRecipeBuilder(recipe)}
                </script>
            </Head>
            <Header />
            <main className='flex flex-col p-6 min-h-screen  bg-page-bg dark:bg-gray-dark'>
                <div className='border-t border-gray-50 py-1'></div>
                <h1 className="font-serif text-3xl sm:w-3/5 w-full mx-auto pt-5 text-center">{recipe.name}</h1>
                <h3 className="font-sans text-sm sm:w-3/5 w-full mx-auto pt-5 text-center">{starRating?'My Rating':'Average Rating'}</h3>
                <StarRating/>
                <IngredientsInstructions ingredients={ingredients} instructions={instructions} loading={false} />
                <div className='mt-8'>
                <SignatureFooter />
                </div>
            </main>
        </>
    )
}

export async function getStaticProps(context: any) {
    try {
        // get the recipes from firebase 
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("name", "==", context.params.id));
        const querySnapshot = await getDocs(q);
        const temp = querySnapshot.docs.map(doc => doc.data())
        // stringify the timestamp
        const recipe = temp.map((recipe: any) => {
            recipe.created = recipe.created ? recipe.created?.toDate().toString() : null
            console.log('getStaticProps recipe', recipe)
            return recipe
        })
        return {
            props: recipe[0],
            revalidate: 10000
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function getStaticPaths() {
    // call the API to get all the recipes
    const recipesRef = collection(db, "recipes");
    const querySnapshot = await getDocs(recipesRef);
    const temp = querySnapshot.docs.map(doc => doc.data())

    const paths = temp.map((recipe) => ({
        params: { id: recipe.name },
    }))
    return {
        paths,
        fallback: true // false or 'blocking'
    };
}