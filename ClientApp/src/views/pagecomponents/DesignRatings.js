import Rating from 'react-rating'
import { Star } from 'react-feather'

const DesignRatings = ({ filledColor, dir, rating }) => {

    const secondExample = {       
        a11y: true,
        isHalf: true,
        readonly: true,       
        onChange: newValue => {
            // console.log(`Example 2: new value is ${newValue}`)
        }

    }

    return (
        <>
        <Rating {...secondExample}
            initialRating={rating}
            //direction={dir}
            emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
            fullSymbol={<Star size={20} fill={filledColor} stroke={filledColor}
             />}         
        />
      </>
    )
}

export default DesignRatings