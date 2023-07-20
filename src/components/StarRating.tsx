import { Rating } from 'react-simple-star-rating'
import { useContext, useEffect, useState } from 'react'
import { pushStarRating, getStarRating } from '@/utils/utils'
import { AppContext } from '@/context/state'


export default function StarRating() {

  const [averageRating, setAverageRating] = useState<number | null>()
  const [rating, setRating] = useState<number | undefined>()
  const [hoverRating, setHoverRating] = useState<number | undefined>()
  
  // read the recipe name from state
  const appContext = useContext(AppContext)
  const { recipeName, userId, setRecipeName } = appContext

  useEffect(() => {
    if (rating && recipeName && userId) {
      console.log(recipeName)
      pushStarRating(recipeName, rating, userId)
    }
  }, [rating, recipeName, userId])

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }


  useEffect(() => {
    if (recipeName) {
      setRecipeName(recipeName)
      getStarRating(recipeName).then((rating) => {
        appContext.setStarRating(rating)
        setAverageRating(rating)
      }
      )
    }
    console.log("recipeName", recipeName, "rating", rating, "hoverRating", hoverRating, "averageRating", averageRating, Math.round(averageRating))
  }, [appContext, recipeName, setRecipeName])



  // Optional callback functions
  // const onPointerEnter = () => setHoverRating()
  const onPointerLeave = () => rating ? (setHoverRating(rating), setRating(rating), pushStarRating(recipeName, rating, userId)) : averageRating? setHoverRating(averageRating): setHoverRating(undefined)
  const onPointerMove = (value: number) => setHoverRating(value)

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
    <div className='flex items-end my-5 mx-auto pb-md-4 justify-center w-[400px]'>
      {(hoverRating || rating || averageRating) ? <p className='text-center text-xl mx-4 animate-fadeFast'>{!hoverRating && rating ? emojiMap[rating] : hoverRating ? hoverRating && emojiMap[hoverRating]:averageRating && emojiMap[Math.round(averageRating)]}</p> : <div className='h-[20px] w-[52px]'></div>}
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
      {rating ? <p className='text-center text-lg mx-4 w-[32px]'>({(rating.toFixed(0))})</p>
        : hoverRating ? <p className='text-center text-lg mx-4 w-[32px]'>({hoverRating})</p>
          : averageRating ? <p className='text-center text-lg mx-4 w-[32px]'>({averageRating.toFixed(0)})</p>
            : <p className='text-center text-lg mx-4 w-[32px]'>(?)</p>}
    </div>
  )
}