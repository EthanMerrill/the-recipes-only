import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/state";

export const useGetUserId = () => {
    const appContext = useContext(AppContext)
    const { setUserId } = appContext
    
    useEffect(() => {
        if (localStorage.getItem('userId') === null) {
            localStorage.setItem('userId', (Math.random() + 1).toString(36).substring(15))
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(localStorage.getItem('userId'))
        }
    }, [setUserId])
}