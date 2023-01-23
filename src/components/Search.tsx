import { useRouter } from 'next/router.js'
import Turnstone from 'turnstone'
import turnstoneStyles from '../styles/turnstoneStyles.js'

interface RecipeNames {
    recipeNames: string[]
    placeholder?: string
}


export default function Search(props:RecipeNames) {
    const {recipeNames, placeholder} = props
    const router = useRouter()

    // check if search term is in the recipeNames array
    const isRecipe = (searchTerm:string) => {
        return recipeNames.includes(searchTerm)
    }

    return(
    <Turnstone 
          styles={turnstoneStyles} 
          listbox={{data:recipeNames, searchType:'contains', maxItems: 5}} 
          enterKeyHint={'enter'} 
          matchText={true}
          placeholder={placeholder ?? 'Search for a recipe'}
          typeahead={true}
          onEnter={(e:string ) => {
            isRecipe(e) ? router.push(`/recipes/${e}`)
            : router.push({
                pathname:`/recipes/NewRecipe`,
                query: {searchTerm: e}
            })
        }}
          ></Turnstone>
    )
}
