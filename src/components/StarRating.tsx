import { Rating } from 'react-simple-star-rating'
import { useState } from 'react'

export default function StarRating() {
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate: number) => {
      setRating(rate)
  
      // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) => console.log(value, index)
  

    return (
        <div className='w-5/6 col mb-5 pb-md-4 align-items-center'>
        <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
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
    )
}