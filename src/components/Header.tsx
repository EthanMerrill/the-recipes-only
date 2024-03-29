import Search from "./Search"
import { AppContext } from '@/context/state';
import { useContext } from 'react';
import Loading from "./Loading";


export default function Header(){
    const appContext = useContext(AppContext)
    const {recipeNames} = appContext
    const {recipeName} = appContext
    return(
    <div className='flex flex-row justify-center align-center gap-3 flex-wrap bg-page-bg dark:bg-gray-dark pt-5 
    sm:justify-start'>
        <div><a href={'/'}><h1 className='px-6 py-2 text-xl font-serif text-txt-dark dark:text-txt-light'>The Recipes Only</h1></a></div>
        <div className="my-auto flex flex-row">
        <Search recipeNames={recipeNames}  text={recipeName}/>
        <Loading/>
        </div>
    </div>
    )
}

