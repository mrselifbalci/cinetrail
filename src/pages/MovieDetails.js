import React,{useState,useEffect,useContext} from 'react'
import '../styles/movies.css';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import axios from 'axios'
import Rating from '../components/Rating'
import Review from '../components/Review'
import Genres from '../components/Genres';
import {UserContext} from '../contexts/UserContext';




 
export default function MovieDetails({baseUrl,apiKey,serverUrl}) {

    const {movieid} = useParams();
    const [videoLink,setVideoLink]=useState(''); 
    const [movie,setMovie]=useState([]);
    const [currentRating,setCurrentRating]=useState(0);
    const [reviews,setReviews]=useState([]);
    const [totalReviews,setTotalReviews]=useState(0)
    const [reviewNumber,setReviewNumber]=useState(4)
    const [added,setAdded]=useState(false)
    const {user,setUser}=useContext(UserContext) 
    const [loaded,setLoaded]=useState(false)

    

    useEffect(() => {
        axios.post(`${serverUrl}/favoriteMovies/search`,{ 
          user_id:user._id,
          tmdb_id:movie.id
        })
        .then(res=>{
          if(res.data===null){ 
            setAdded(false)
          }else{ 
            setAdded(true)
          }
        })
        .catch(err=>console.log(err))
        .finally(()=>{setLoaded(true)})
    }, [user,movie])
    
    
    useEffect(() => {  
          axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
          .then(res=>{
            // console.log(res.data)
            setMovie(res.data)
            setCurrentRating((res.data.vote_average)/2) 
          })
          .catch(err=>console.log(err))


          axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
          .then(res=>{
            // console.log(res.data)
          const youtubeLink = res.data.results.filter(item=>item.site==="YouTube" && item.type==="Trailer")
          setVideoLink(youtubeLink[0].key)
          })

          axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
          .then(res=>{
            // console.log(res.data)
            setTotalReviews(res.data.total_results)
            setReviews(res.data.results)
          })
          .catch(err=>console.log(err))

 
    }, [])


    const addToFavorites=()=>{
      
      axios.post(`${serverUrl}/favoriteMovies`,{
        user_id:user._id,
        movie_id:movie.id
      })
      .then(res=>{
        setAdded(true)
      })
      .catch(err=>console.log(err))
    }

    const removeFromFavorites=()=>{
        axios.delete(`${serverUrl}/favoriteMovies/${user._id}/${movie.id}`)
        .then(res=>{
          console.log(res.data)
          setAdded(false)
        })
        .catch(err=>console.log(err))
    }
  return ( 
    <div className="movie-details-container">
      {
        videoLink ? 
        <div className="trailer-container">
        <ReactPlayer className="trailer-player" url={`https://www.youtube.com/watch?v=${videoLink}`}
            config={{
              youtube: {
                playerVars: { showinfo: 1,origin:"http://localhost:3000" }
              }
            }}
            // playing
            width='100%'
            height='100%'
          />
      </div>
      : <div className="trailer-container-blank" style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition:"center",
        backgroundSize:"cover"
        }}><p>No Trailers Released Yet</p></div> 
    }

      <div className="details-container">
            <div className="title-container">
              <h1>{movie.title}</h1>
              {
                added && loaded
                ? <span className="remove-btn" onClick={removeFromFavorites}>Remove from favorites.</span> 
                : !added && loaded
                ? <span className="add-btn" onClick={addToFavorites}>Add to favorites.</span>
                : null
              }
            </div>
            <Rating currentRating={currentRating}/>
            <div className="info-container">
               <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="details-poster"/>
               <div className="movie-info">
                  <h2>{movie.tagline}</h2>
                  <h4>{movie.overview}</h4>  
                  <h4>Status: <span>{movie.status}</span></h4>
                  <h4>Runtime: <span>{movie.runtime} min.</span></h4>
                  <h4>Budget: <span>{movie.budget}</span></h4>
                  <Genres component="details" movie={movie.genres} baseUrl={baseUrl} apiKey={apiKey}/>   
               </div> 
            </div>
            <div className="review-container">
                <p className="reviews-title">Reviews</p>
                {
                    reviews.slice(0,reviewNumber).map(item=>{
                      return <Review key={item.id} review={item}/>
                    })
                }
                {
                    reviewNumber >= totalReviews 
                    ? <p className="review-number" onClick={()=>setReviewNumber(3)}><em>End of reviews.</em></p>
                    : <p className="review-number" onClick={()=>setReviewNumber(reviewNumber+3)}><em>Read more reviews</em></p>
                }
                
            </div>
      </div>

    </div>

  )
}
