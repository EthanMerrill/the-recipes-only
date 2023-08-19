import { Rating } from 'react-simple-star-rating'
import { use, useContext, useEffect, useState } from 'react'
import { pushStarRating, getStarRating } from '@/utils/utils'
import { AppContext } from '@/context/state'


export default function StarRating() {

  const [averageRating, setAverageRating] = useState<number | null>()
  const [displayRating, setDisplayRating] = useState<number | undefined | null>()
  
  // read the recipe name from state
  const appContext = useContext(AppContext)
  const { recipeName, userId, starRating } = appContext

  // if userId is null, set it to a new random user id
  useEffect(() => {
    if (!userId) {
      appContext.setUserId(Math.random().toString(36).substring(7))
    }
  }, [appContext, userId])

  // on initial start, set the rating to the average rating
  useEffect(() => {
    if (recipeName){
      getStarRating(recipeName).then((rating) => {
        setAverageRating(rating)
        setDisplayRating(rating)
      })
    }
  }, [appContext, averageRating, recipeName])

  // if hovering, set the display rating to the hover rating
  const onPointerMove = (value: number) => setDisplayRating(value)

  // if pointer leaves, set the display rating to the rating, push to firebase
  const onPointerLeave = () => {starRating?setDisplayRating(starRating):averageRating?setDisplayRating(averageRating):setDisplayRating(null)}
  
  // if clicked, set the rating to the display rating, and push to firebase
    const handleRating = (rate: number) => {
      appContext.setStarRating(rate)
      setDisplayRating(rate)
      pushStarRating(recipeName, rate, userId)
    }
  

  const emojiMap: emojiMap = {
    1: '🤮',
    2: '😕',
    3: '😐',
    4: '🙂',
    5: '😍',
  }

  interface emojiMap {
    [key: number]: string
  }

  return (
    <div className='flex items-end my-3 mx-auto pb-md-4 justify-center w-[400px]'>
      {displayRating ? <p className='text-center text-xl mx-4 animate-fadeFast'>{displayRating ? emojiMap[Math.round(displayRating)]: ' '}</p> : <div className='h-[20px] w-[52px]'></div>}
      <div className=''>
        <Rating
          onClick={handleRating}
          size={30}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          allowFraction={false}
          transition={true}
          SVGstyle={{ display: 'inline-block' }}
          fillColor={'#B0B0B0'}
          emptyColor={'#E8E8E6'}
        /* Available Props */
        />
      </div>
      {displayRating ? <p className='text-center text-lg mx-4 w-[32px]'>({(displayRating.toFixed(0))})</p>
            : <p className='text-center text-lg mx-4 w-[32px]'>(?)</p>}
    </div>
  )
}