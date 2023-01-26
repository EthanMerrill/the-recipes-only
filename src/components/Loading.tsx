import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from "styled-components"
// styles
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`

export default function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [loadingSaying, setLoadingSaying] = useState('Loading');

    useEffect(() => {
        const handleStart = (url:any) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url:any) => (url === router.asPath) && setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingSaying(loadingSayings[Math.floor(Math.random() * loadingSayings.length)])
        }, 3000);
    }, [])

    const loadingSayings = [
        'removing unnecessary stories',
        'hiding ads',
        'optimizing oilfactory parameters',
        'reducing the number of clicks',
        'reticulating splines',
    ]
    
    return (loading ? (
    <div className='animate-pulse self-center px-5 py-1 flex flex-row w-full'>
        <div>
            <h1 className='sans'>{loadingSaying}</h1>
        </div>
        <Dots/>
    </div>
    ): null);
}