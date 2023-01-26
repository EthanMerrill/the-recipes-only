import { Suspense, use, useEffect } from "react"
import Loading from "./Loading"


export default function IngredientsInstructions({ ingredients, instructions, loading }: { ingredients: string[] | null, instructions: string[] | null, loading: boolean }) {

    useEffect(() => {
        console.log(loading)
    }, [loading])

    return (
        <div>
            <Loading />
            <div className=' sans sm:w-3/5 w-full mx-auto'>
                <h1 className='text-2xl py-4'>Ingredients</h1>
                {loading ? <div>Loading...</div> :
                        <ul>
                            {ingredients?.map((ingredient: string, i: number) => {
                                return <li key={i}>{ingredient}</li>
                            })}
                        </ul>
                }
                <h1 className='text-2xl py-4'>Directions</h1>
                {loading ? <div>Loading...</div> :
                    <ol>
                        {instructions?.map((ingredient: string, i: number) => {
                            return <li key={i}>{ingredient}</li>
                        })}
                    </ol>
                }
            </div>
        </div>
    )
}