import { topRecipe } from "@/types/TopRecipe.interface";
import Link from "next/link";

export default function RecentRecipes(props:{topRecipes: topRecipe[]}){
    const topRecipes = props.topRecipes
    // parse the timestamp (include the date when there are more recipes being generated regularly)
    // const parsedRecipes = topRecipes.map((recipe) => {
    //     recipe.created = new Date(recipe?.created)
    //     return recipe
    // })
    return (
    <div className = 'absolute bottom-12 right-12'>
        <h1 className = 'text-txt-dark dark:text-txt-light text-lg font-serif font-normal'>Recently Generated Recipes: </h1>
        {topRecipes && topRecipes.map((recipe,i) => {
            return (
                <div key = {i} className="text-right" >
                    <Link href={encodeURI(`recipe/${recipe.name}`)}><h1 className="text-txt-dark dark:text-txt-light my-2 hover:underline">{recipe.name}</h1></Link>
                </div>
            )
        })
        }
    </div>
    )
}