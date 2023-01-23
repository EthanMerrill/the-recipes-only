// src/context/state.js
import db from '../pages/api/clientApp';
import { getDocs, collection } from 'firebase/firestore';
import { useState, createContext, ReactNode, useContext, useEffect } from 'react';


export const AppContext = createContext(''as any);

type AppWrapperProps = {
    children: ReactNode
    recipeNames: string[]
}

export function AppWrapper( {children, recipeNames}:AppWrapperProps) {

    const [sharedState, setSharedState] = useState(null as any);

    return (
        <AppContext.Provider value={{sharedState, setSharedState}}>
           {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}


const getStaticProps = async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data().name}`);
    // })
    // create an array of receipe names
    const recipeNames = querySnapshot.docs.map((doc) => {
        // console.log(doc)
        return doc.data().name;
    });
    return {
        props: { recipeNames: recipeNames }
    };
}