// ratings interface for all a recipe's ratings
export interface Ratings {
    [key: number]: Rating[]
  }
  // rating interface for an individual rating
 export interface Rating {
    created: string,
    userId: string
  }