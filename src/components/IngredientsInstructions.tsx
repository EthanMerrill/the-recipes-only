import { Suspense, use, useEffect } from "react"
import Loading from "./Loading"


export default function IngredientsInstructions({ ingredients, instructions, loading }: { ingredients: string[] | null, instructions: string[] | null, loading: boolean }) {

    useEffect(() => {
        console.log(loading)
    }, [loading])


    return (
        <div>
            <div className=' sans sm:w-3/5 w-full mx-auto '>
            
                <h1 className='text-2xl py-4 min-h-[40px] animate-fade'>Ingredients</h1>
                {loading ? <div className='h-[200px] rounded-lg bg-slate-300 animate-pulse w-full'><Loading/></div> :
                        <ul className="animate-fade">
                            {ingredients?.map((ingredient: string, i: number) => {
                                return <li key={i} className='py-1 text-gray-dark dark:text-slate-200 '>{ingredient}</li>
                            })}
                        </ul>
                }
                <h1 className='text-2xl py-4 pt-6 min-h-[40px] animate-fade'>Directions</h1>
                {loading ? <div className='h-[200px] rounded-lg bg-slate-300 animate-pulse w-full'><Loading/></div> :
                    <ol>
                        {instructions?.map((ingredient: string, i: number) => {
                            return <li key={i} className='animate-fade py-1 text-gray-dark dark:text-slate-200'>{ingredient}</li>
                        })}
                    </ol>
                }
            </div>
        </div>
    )
}