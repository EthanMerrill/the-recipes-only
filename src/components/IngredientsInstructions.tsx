

export default function IngredientsInstructions({ingredients, instructions}: {ingredients: string[]|null, instructions: string[]|null}) {
    return (
        <div>
            <div className=' sans sm:w-3/5 w-full mx-auto'>
                    <h1 className='text-2xl py-4'>Ingredients</h1>
                    <ul>
                    {ingredients?.map((ingredient:string, i:number) => {
                        return <li key={i}>{ingredient}</li>
                        })}
                    </ul>
                    <h1 className='text-2xl py-4'>Directions</h1>
                    <ol>
                    {instructions?.map((ingredient:string, i:number) => {
                        return <li key={i}>{ingredient}</li>
                        })}
                    </ol>
                </div>
        </div>
    )
}