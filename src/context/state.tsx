// src/context/state.js
import db from '../pages/api/clientApp';
import { getDocs, collection } from 'firebase/firestore';
import { useState, createContext, ReactNode, useContext, useEffect, useMemo } from 'react';


export const AppContext = createContext(null as any);
interface AppContextProviderProps {
    children: ReactNode;
}

export default function AppContextProvider( {children}:AppContextProviderProps) {
    const [recipeNames, setRecipeNames] = useState<string[]>([]);
    const [recipeName, setRecipeName] = useState<string>('');

    return (
        <AppContext.Provider value={{recipeNames, setRecipeNames, recipeName, setRecipeName}}>
           {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}