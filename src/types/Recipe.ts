import {Ratings} from './Ratings.interface'

export interface Recipe {
    created?: string | Date
    name: string | null
    ingredients: string[] | null
    instructions: string[] | null
    ratings?: Ratings | null
}