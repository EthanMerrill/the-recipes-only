import { Recipe } from "@/types/Recipe";

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
      "Keywords": "${JSON.stringify(recipe.name?.split(" "))}",
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
      <loc>https://therecipesonly.com/recipe/${recipe}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    `).join('')}
  </urlset>
  `
}