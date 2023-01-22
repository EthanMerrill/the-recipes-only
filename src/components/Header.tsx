import { useAppContext } from "@/context/state"
import Search from "./Search"


export default function Header(){
    console.log(useAppContext().sharedState)

    return(
    <div className='flex flex-row justify-start align-center gap-3 flex-wrap bg-page-bg dark:bg-gray-dark pt-5'>
        <div><h1 className='px-6 py-2 text-xl'>The Recipes Only</h1></div>
        <div className="my-auto">
        <Search recipeNames={useAppContext().sharedState} />
        </div>
    </div>
    )
}

