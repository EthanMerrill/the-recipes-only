export function capitalizeFirstLetter(text:string) {
    console.log(text)
    return text
      .toLowerCase() // lowercase all letters
      .split(' ') // split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
      .join(' ');
    // capitalize th first letter of each word in the text
  }
  
// takes a string and returns it in the type of a recipe object
export function recipeFormatter(text:string){

}