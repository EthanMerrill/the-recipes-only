import {Suspense, use, useEffect} from "react";
import Loading from "./Loading";

export default function IngredientsInstructions({ingredients, instructions, loading}: {ingredients: string[] | null; instructions: string[] | null; loading: boolean}) {
	return (
		<div className="w-full">
			<div className="sans w-full">
				<h2 className="text-2xl py-4 min-h-[40px] animate-fade font-serif">Ingredients</h2>
				{loading ? (
					<div className="h-[200px] rounded-lg bg-slate-100 animate-pulse w-full">
						<Loading />
					</div>
				) : (
					<ul className="animate-fade list-disc pl-5 space-y-1">
						{ingredients?.map((ingredient: string, i: number) => {
							return (
								<li key={i} className="py-0.5 text-gray-dark dark:text-slate-200">
									{ingredient}
								</li>
							);
						})}
					</ul>
				)}
				<h2 className="text-2xl py-4 pt-8 min-h-[40px] animate-fade font-serif">Directions</h2>
				{loading ? (
					<div className="h-[200px] rounded-lg bg-slate-100 animate-pulse w-full">
						<Loading />
					</div>
				) : (
					<ol className="list-decimal pl-5 space-y-2">
						{instructions?.map((instruction: string, i: number) => {
							return (
								<li key={i} className="animate-fade py-0.5 text-gray-dark dark:text-slate-200 leading-relaxed">
									{instruction}
								</li>
							);
						})}
					</ol>
				)}
			</div>
		</div>
	);
}
