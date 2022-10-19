import React,{useState,useEffect} from 'react';
import avatar from '../assets/avatar.jpeg';
import '../styles/reviews.css';
 

function Review({review}) {
    const [seeMore,setSeeMore]=useState(false)
    const [defaultImage,setDefaultImage]=useState(avatar)
    const [imageError, setImageError] = useState(false);

    
  return (
        <div key={review.id} className="review"> 
            <div className="avatar-container">
                <img className="avatar" src={imageError ? avatar : `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`} 
                     onError={() => setImageError(true)}/>
                <p>{review.author}</p>
            </div>
            
            {
                !seeMore 
                ? <p className="content">{review.content.slice(0,300)}...<span onClick={()=>setSeeMore(true)} className="read-more"> read more</span></p>
                : <p className="content">{review.content}<span onClick={()=>setSeeMore(false)} className="read-less"> read less</span></p>
            }
            
            
        </div>
  )
}

export default Review 