import { Suspense } from "react"

export default function IISection(OrderedList: boolean, ListItems: string[]) {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {OrderedList ? <ol>
                {ListItems?.map((ingredient: string, i: number) => {
                    return <li key={i}>{ingredient}</li>
                })}
            </ol> : <ul>
                {ListItems?.map((ingredient: string, i: number) => {
                    return <li key={i}>{ingredient}</li>
                })}
            </ul>}
        </Suspense>
    )
}