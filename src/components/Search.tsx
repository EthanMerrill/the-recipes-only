import {AppContext} from "@/context/state";
import {useRouter} from "next/router.js";
import {useContext, useEffect, useMemo, useState} from "react";

interface RecipeNames {
	recipeNames: string[];
	text?: string;
}

export default function Search(props: RecipeNames) {
	const {recipeNames, text} = props;
	const router = useRouter();
	const appContext = useContext(AppContext);
	const {recipeName} = appContext;
	const [query, setQuery] = useState(text || recipeName || "");
	const [showSuggestions, setShowSuggestions] = useState(false);

	// check if search term is in the recipeNames array
	const isRecipe = (searchTerm: string) => {
		return recipeNames.includes(searchTerm);
	};

	const searchFunc = (value: string) => {
		const searchTerm = value.trim();
		if (!searchTerm) {
			return;
		}

		appContext.setRecipeName(searchTerm);

		if (isRecipe(searchTerm)) {
			router.push(`/recipe/${searchTerm}`);
		} else {
			router.push({
				pathname: `/recipe/NewRecipe`,
				query: {searchTerm},
			});
		}
	};

	const suggestions = useMemo(() => {
		const trimmedQuery = query.trim().toLowerCase();

		if (!trimmedQuery) {
			return recipeNames.slice(0, 5);
		}

		return recipeNames.filter((name) => name.toLowerCase().includes(trimmedQuery)).slice(0, 5);
	}, [query, recipeNames]);

	useEffect(() => {
		setQuery(text || recipeName || "");
	}, [text, recipeName]);

	return (
		<div className="relative w-full sm:w-auto">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					searchFunc(query);
					setShowSuggestions(false);
				}}>
				<input
					id="search"
					type="text"
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
						setShowSuggestions(true);
					}}
					onFocus={() => setShowSuggestions(true)}
					onBlur={() => {
						setTimeout(() => setShowSuggestions(false), 100);
					}}
					placeholder="Search for a recipe"
					className="rounded border border-neutral-400 dark:border-slate-500 p-1 h-10 w-full sm:w-[320px] md:w-[440px] bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
				/>
			</form>

			{showSuggestions && query.trim().length > 0 ? (
				<ul className="absolute z-20 w-full bg-page-bg dark:bg-gray-900 sm:border sm:border-blue-300 dark:sm:border-slate-500 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl max-h-56 overflow-y-auto">
					{suggestions.length > 0 ? (
						suggestions.map((name) => (
							<li key={name}>
								<button
									type="button"
									className="w-full text-left cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 dark:text-slate-300 rounded hover:bg-blue-50 dark:hover:bg-gray-800"
									onMouseDown={(event) => {
										event.preventDefault();
										setQuery(name);
										searchFunc(name);
										setShowSuggestions(false);
									}}>
									{name}
								</button>
							</li>
						))
					) : (
						<li className="p-1.5 text-sm text-slate-500 dark:text-slate-400">Press enter to generate this recipe.</li>
					)}
				</ul>
			) : null}
		</div>
	);
}
