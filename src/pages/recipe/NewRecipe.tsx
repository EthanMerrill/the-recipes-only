import Header from "@/components/Header";
import Head from 'next/head'
import { Recipe } from "@/types/Recipe";
import { Suspense, useContext, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../api/clientApp";
import { capitalizeFirstLetter, recipeFormatter } from "@/utils/utils";
import { simpleRecipeApi } from "../api/getRecipe";
import { useRouter } from "next/router";
import { AppContext } from "@/context/state";
import IngredientsInstructions from "@/components/IngredientsInstructions";
import { useQuery } from "@tanstack/react-query"
import { serverTimestamp } from "firebase/firestore"
import { SignatureFooter } from "ethan-common-components";

// const fetcher = (recipe:any) => simpleRecipeApi(recipe).then(({data}) => data);

export default function NewRecipe() {

    const [recipe, setRecipe] = useState({} as Recipe)
    // const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    let searchTerm = router.query.searchTerm
    const appContext = useContext(AppContext)

    let prompt = encodeURI(`${searchTerm} recipe with ingredients and instructions only please include an 'Ingredients:' and 'Instructions:' header`)
    // API QUERY
    const { isLoading, error, data, isFetching, refetch } = useQuery({
        queryKey: ["openAI"],
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: false, // disable this query from automatically running
        queryFn: () =>
            simpleRecipeApi(prompt)
                .then((res) => res.data),
    });

    /// END API QUERY

    useEffect(() => {
        console.log('data', data, 'isFetching', isFetching, 'isLoading', isLoading, 'error', error)
    }, [data, error, isFetching, isLoading])

    // const recipeResponseObject = useSWR(prompt, fetcher, { suspense: true});

    // set the name of the recipe every time the search term changes & update the state
    useEffect(() => {
        console.log('set the name of the recipe every time the search term changes & update the state')
        if (router.query.searchTerm) {
            setRecipe({ name: capitalizeFirstLetter(router.query.searchTerm) as string, ingredients: [], instructions: [] })
            // update the state with the properly formatted recipe name
            appContext.setRecipeName(recipe.name)
        }
    }, [appContext, recipe.name, router.query.searchTerm])

    // refetch the recipe from openAI every time the search term changes
    useEffect(() => {
        console.log('refetch the recipe from openAI every time the search term changes')
        if (searchTerm) {
            refetch()
        }
    }, [searchTerm])

    useEffect(() => {
        console.log('set recipe', data?.choices[0].message.content)
        if (!isFetching && !isLoading && !isFetching && data?.choices[0].message.content) {
            setRecipe(recipeFormatter(searchTerm as string, data?.choices[0].message.content))
        }
    }, [searchTerm, isFetching, isLoading, data])

    // save the recipe to firestore
    useEffect(() => {
        console.log('save the recipe to firestore')
        if (recipe.name && recipe.ingredients && recipe.instructions && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
            // save recipe to firestore db
            setDoc(doc(db, "recipes", recipe.name), {
                ...recipe,
                created: serverTimestamp()
            })
        }
        // else {
        //     console.log('no recipe to save')
        //     alert('sorry there was an error creating your recipe. Please try again later.')
        // }
    }, [appContext, recipe, recipe.name])

    return (
        <>
            <Head>
                <title>The Recipes Only</title>
                <meta name="description" content="Just Recipes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='flex flex-col p-6 min-h-screen  bg-page-bg dark:bg-gray-dark'>
                <div className='border-t border-gray-50 py-1'></div>
                <h1 className="font-serif text-3xl sm:w-3/5 w-full mx-auto pt-5 text-center">{searchTerm}</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <IngredientsInstructions loading={isLoading || isFetching} ingredients={recipe.ingredients} instructions={recipe.instructions} />
                </Suspense>
                <div className='mt-8'>
                <SignatureFooter fontColor={""} backgroundColor={""}/>
                </div>
            </main>
        </>
    )
}