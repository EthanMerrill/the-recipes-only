import { Recipe } from "@/types/Recipe";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import db from "@/pages/api/clientApp"
import { Rating, Ratings } from "@/types/Ratings.interface";


export function capitalizeFirstLetter(text:string|string[]) {
    if (Array.isArray(text)) {
      return text.map(word => word.charAt(0).toUpperCase() + word.slice(1))[0]
    }
    return text
      .toLowerCase() // lowercase all letters
      .split(' ') // split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
      .join(' ');
    // capitalize th first letter of each word in the text
  }

  export const testRecipe = `
  Ingredients:

  - 2 large eggs
  - 2 tablespoons of butter
  - Salt and pepper to taste
  
  Instructions:
  
  1. Crack the eggs into a bowl and whisk until the yolks and whites are combined.
  
  2. Heat a non-stick pan over medium heat. Add the butter and let it melt.
  
  3. Pour the egg mixture into the pan and let it cook for a few minutes, stirring occasionally.
  
  4. Once the eggs are cooked, season with salt and pepper to taste.
  
  5. Serve and enjoy!
`
  
// takes a string and returns it in the type of a recipe object
export function recipeFormatter(recipeName:string, text:string){
  
    let newRecipe = {} as Recipe
    newRecipe.ingredients = text.split(/ingredients|instructions/i)[1]?.match(/^[-|\d|\u00BC-\u00BE\u2150-\u215E].+$[\n]/gmi) ?? ['no ingredients given']  ?? []
    newRecipe.instructions = text.split(/instructions/i)[1]?.match(/\d+\.+.+/gmi) ?? ['no instructions given'] ?? []
    newRecipe.name = capitalizeFirstLetter(recipeName) ?? 'no name given'
    console.log('recipeFormatter called', recipeName, text, newRecipe)
    return newRecipe
}

export function structuredRecipeBuilder(recipe:Recipe){

    // format instructions
    let instructions = recipe.instructions && JSON.stringify(recipe.instructions.map((instruction, index) => {
      return {
        "@type": "HowToStep",
        "text": instruction,
      }
    }))

    let structuredRecipe = `
    {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": "${recipe.name}",
      "Keywords": ${JSON.stringify(recipe.name?.split(" "))},
      "image": "https://firebasestorage.googleapis.com/v0/b/the-recipes-only.appspot.com/o/DALL%C2%B7E%202023-04-09%2018.59.16%20-%20recipe%20image%20coming%20soon.png?alt=media&token=e97cc303-fc7b-4a28-b2b0-c5bf9595beea",
      "author": {"@type": "Person",
                "name": "The Recipes Only"},
      "datePublished": "${recipe.created}",
      "description": "A recipe for ${recipe.name}",
      "recipeIngredient": ${recipe.ingredients && JSON.stringify(recipe.ingredients)},
      "recipeInstructions": ${instructions}
    }`
    return structuredRecipe
}

export function generateSiteMap(recipes:string[]){
  return `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://therecipesonly.com/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${recipes.map(recipe => `
    <url>
      <loc>https://therecipesonly.com/recipe/${encodeURI(recipe)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    `).join('')}
  </urlset>
  `
}

export async function pushStarRating(recipeName:string, rating:number, userId:string){
  const recipeRef = doc(db, "recipes", recipeName)
  // Check to see if this user has already rated this recipe
  const recipeSnap = (await getDoc(recipeRef)).data();
  // const ratingsObj:Ratings = recipeSnap?.ratings ? recipeSnap.ratings : {
  //   1: [],
  //   2: [],
  //   3: [],
  //   4: [],
  //   5: []
  // }

  
  const dateString = new Date().toISOString()
  
  console.log('ratings object',recipeSnap)
  // if the ratings object exists, add the new rating to the array
    
    console.log('it didnt work', rating, recipeSnap, dateString)
  setDoc(recipeRef, {
    ratings: {
      [rating]: [{created: dateString, userId: "test"}]
    }
  }, { merge: true });
}

export async function getStarRating(recipeName:string){
  const recipeRef = doc(db, "recipes", recipeName)
  const recipeSnap = await getDoc(recipeRef);
  if (recipeSnap.exists()) {
    try{
    let ratingsArr:Array<number> = []
    Object.keys(recipeSnap.data().ratings).map((rating) => {
      ratingsArr.push(parseInt(rating))
    })
    // get the average of the ratings
    const sum = ratingsArr.reduce((a,c) => a + c, 0);
    const avg = sum / ratingsArr.length;

    return (avg)
  } catch (error) {
    console.log('error getting rating', error)
    return null
  }
  } else {
    return null
  }

}




// need a function to get the returning user's rating of a recipe
// export async function getUserRecipeRating(userId:string, ratingsObject:Ratings){
//   console.log('getUserRecipeRating called', userId, ratingsObject)
//   // create array from 1-5
//   const ratingsArray = [1,2,3,4,5]
//   // loop through the ratings array
//   for (const rating of ratingsArray) {
//     // if the ratings object has a key of the rating
//     if (ratingsObject[rating]) {
//       console.log(`ratingsObject[${rating}] exists`, ratingsObject[rating])
//     }
//   }
// }

// update the user rating of a recipe. Takes the userid and a ratings object
export async function updateUserRecipeRating(userId:string, newRating:number, ratingsObject:Ratings){
  // remove the current user rating from the ratingsObject
  const ratingsArray = [1,2,3,4,5]
  for (const rating of ratingsArray) {
    if (ratingsObject[rating]) {
      console.log(rating, ratingsObject[rating])
      if (ratingsObject[rating][0].userId === userId) {
        console.log('found user rating', ratingsObject[rating])
        delete ratingsObject[rating]
      }
    }
  }
}
