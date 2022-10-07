import React from 'react';
import StarRatings from 'react-star-ratings';

function Rating({currentRating}) {
  return (
    <div className="rating">
              <StarRatings
                rating={currentRating}
                numberOfStars={5}
                name='rating'
                starDimension="15px"
                starSpacing="1px"
                starRatedColor="#e50916"
                starEmptyColor="gray"
              />
          </div>
  )
}

export default Rating