import { Rating } from 'react-simple-star-rating'
import { useContext, useEffect, useState } from 'react'
import { pushStarRating } from '@/utils/utils'
import { AppContext } from '@/context/state'

interface StarRatingProps {
  averageRating?: number
}

export default function StarRating(StarRating: StarRatingProps) {
  
    const { averageRating } = StarRating

    const [rating, setRating] = useState<number|undefined>()
    const [hoverRating, setHoverRating] = useState<number|undefined>()

    // read the recipe name from state
    const appContext = useContext(AppContext)
    const { recipeName,userId } = appContext
    
    useEffect(() => {
      if(rating && recipeName && userId){
        pushStarRating(recipeName, rating, userId)
      }
    }, [rating, recipeName, userId])

    // Catch Rating value
    const handleRating = (rate: number) => {
      setRating(rate)
    }

    
    // Optional callback functions
    // const onPointerEnter = () => setHoverRating()
    const onPointerLeave = () => rating ? (setHoverRating(undefined), setRating(rating), pushStarRating(recipeName, rating, userId)) : setHoverRating(undefined)
    const onPointerMove = (value: number) => setHoverRating(value)

    const emojiMap:emojiMap = {
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
        {(hoverRating || rating) ? <p className='text-center text-xl mx-4 animate-fadeFast'>{!hoverRating && rating ? emojiMap[rating]: hoverRating && emojiMap[hoverRating]}</p> : <div className='h-[20px] w-[52px]'></div>}
        <div className=''>
          <Rating
          onClick={handleRating}
          size={30}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          allowFraction={false}
          transition={true}
          SVGstyle={{display: 'inline-block'}}
          fillColor={'#B0B0B0'}
          emptyColor={'#E8E8E6'}
          /* Available Props */
        />
      </div>
      {rating ? <p className='text-center text-lg mx-4 w-[32px]'>({rating})</p>
      : hoverRating ? <p className='text-center text-lg mx-4 w-[32px]'>({hoverRating})</p>
      : <p className='text-center text-lg mx-4 w-[32px]'>(?)</p>}
      </div>
    )
}