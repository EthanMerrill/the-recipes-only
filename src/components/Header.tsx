import { useAppContext } from "@/context/state"
import Search from "./Search"


export default function Header(){
    console.log(useAppContext().sharedState)

    return(
    <div className='flex flex-row justify-start content-center justify-items-center gap-3  bg-page-bg dark:bg-gray-dark pt-5'>
        <div><h1 className='px-6 py-2 text-xl'>The Recipes Only</h1></div>
        <Search recipeNames={useAppContext().sharedState} />
    </div>
    )
}