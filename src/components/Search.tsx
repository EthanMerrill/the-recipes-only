import { AppContext } from '@/context/state';
import { useAppContext } from '@/context/state.tsx'
import { useRouter } from 'next/router.js'
import { useContext, useEffect, useState } from 'react'
import Turnstone from 'turnstone'
import turnstoneStyles from '../styles/turnstoneStyles.js'

interface RecipeNames {
    recipeNames: string[]
    text?: string
}


export default function Search(props: RecipeNames) {
    const { recipeNames, text } = props
    const router = useRouter()


    // check if search term is in the recipeNames array
    const isRecipe = (searchTerm: string) => {
        console.log('isRecipe', searchTerm, recipeNames)
        return recipeNames.includes(searchTerm)
    }

    const searchFunc = (e: string) => {
        appContext.setRecipeName(e)
        if (isRecipe(e)) {
            router.push(`/recipes/${e}`)
        } else {
            router.push({
                pathname: `/recipes/NewRecipe`,
                query: { searchTerm: e }
            })
        }
    }

    const appContext = useContext(AppContext)
    const { recipeName } = appContext
    appContext.setRecipeName(recipeName)

    return (
        <Turnstone
            id={'search'}
            styles={turnstoneStyles}
            maxItems= {5}
            listbox={{ name:"test",data: recipeNames, searchType: 'contains', }}
            onClick={(e: string) => {
                searchFunc(e)
                console.log(e)
            }}
            onSelect={(e: string) => {
                if(e){
                    searchFunc(e)
                }
            }}
            enterKeyHint={'enter'}
            matchText={true}
            placeholder={'Search for a recipe'}
            text={recipeName}
            typeahead={true}
            onEnter={(e: string) => {
                searchFunc(e)
            }}
        >
        </Turnstone>
    )
}
