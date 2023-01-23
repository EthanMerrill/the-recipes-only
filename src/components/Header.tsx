import Search from "./Search"
import { AppContext } from '@/context/state';
import { useContext } from 'react';


export default function Header(){
    const appContext = useContext(AppContext)
    const {recipeNames} = appContext
    const {recipeName} = appContext
    return(
    <div className='flex flex-row justify-start align-center gap-3 flex-wrap bg-page-bg dark:bg-gray-dark pt-5'>
        <div><h1 className='px-6 py-2 text-xl'>The Recipes Only</h1></div>
        <div className="my-auto">
        <Search recipeNames={recipeNames}  text={recipeName}/>
        </div>
    </div>
    )
}

