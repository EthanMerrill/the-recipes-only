import { useRouter } from 'next/router.js'
import Turnstone from 'turnstone'
import turnstoneStyles from '../styles/turnstoneStyles.js'

interface recipeNames {
    recipeNames: string[]
}


export default function Search(props:recipeNames) {
    const {recipeNames} = props
    const router = useRouter()
    return(
    <Turnstone 
          styles={turnstoneStyles} 
          listbox={{data:recipeNames, searchType:'contains', maxItems: 5}} 
          enterKeyHint={'enter'} 
          matchText={true}
          placeholder={'Search for a recipe'}
          typeahead={true}
          onEnter={(e:string ) => router.push(`/recipes/${e}`)}
          ></Turnstone>
    )
}
