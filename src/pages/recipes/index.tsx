import Head from "next/head";
import Header from "@/components/Header";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "../api/clientApp";
import Link from "next/link";
import { SignatureFooter } from "ethan-common-components";
import { Recipe } from "@/types/Recipe";

interface AllRecipesProps {
  recipes: {
    name: string;
    created: string;
  }[];
}

export default function AllRecipes({ recipes }: AllRecipesProps) {
  return (
    <>
      <Head>
        <title>All Recipes | The Recipes Only</title>
        <meta name="description" content="Browse all available recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col p-6 min-h-screen bg-page-bg dark:bg-gray-dark">
        <div className="border-t border-gray-50 py-1"></div>
        <div className="sm:w-3/5 w-full mx-auto">
          <h1 className="font-serif text-3xl pt-5 mb-8">All Recipes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe, i) => (
              <Link href={`/recipe/${recipe.name}`} key={i} className="p-4 border border-gray-50 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="font-serif text-xl text-txt-dark dark:text-txt-light">{recipe.name}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <SignatureFooter fontColor={""} backgroundColor={""} />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const recipesRef = query(collection(db, "recipes"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(recipesRef);

  const recipes = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      name: data.name,
      created: data.created ? data.created.toDate().toString() : null,
    };
  });

  return {
    props: {
      recipes,
    },
  };
}
