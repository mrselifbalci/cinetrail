import React,{useState,useEffect,useContext} from 'react'
import '../styles/slider.css'
import { MdKeyboardArrowRight,MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';
import Genres from './Genres';
import Rating from './Rating';



function Slider({baseUrl,apiKey}) {
    const [index,setIndex]=useState(0)
    const [upcomingMovies,setUpcomingMovies]=useState([]);
    const [currentRating,setCurrentRating]=useState(0);



    const sliderStyle={
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${upcomingMovies && upcomingMovies[index]?.backdrop_path}")`,
        height: "60vh",
        width:'100%',
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition:'center',
        position:'relative',
        zIndex:0,
        animation: 'myAnim 3s ease 0s 1 normal forwards'
    }
  
 useEffect(() => {
      axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}&append_to_response=videos&language=en-US&page=1`)
      .then(res=>{
        setUpcomingMovies(res.data.results)
        setCurrentRating((res.data.results[index].vote_average)/2)
      })
      .catch(err=>console.log(err))
      
  },[index]) 
  
  const handleRight=()=>{
    setIndex(index+1)
    if(index===upcomingMovies.length-1){
        setIndex(0)
    }
  }
  const handleLeft=()=>{
    setIndex(index-1)
    if(index===0){
        setIndex(upcomingMovies.length-1)
    } 
  }

  return (  

    <div className="slider-container" style={sliderStyle}> 
       <div className="slider-overlay"></div>
       <MdKeyboardArrowRight className="right-arrow" onClick={handleRight}/>
       <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft}/>
       <div className="slider-info"> 
          <h1>{upcomingMovies[index]?.title}</h1> 
          <p className="slider-description">{upcomingMovies[index]?.overview.slice(0,130)}...</p>
          <Genres component="slider" movieGenres={upcomingMovies[index]?.genre_ids} baseUrl={baseUrl} apiKey={apiKey}/>
          <p>Release Date: {upcomingMovies[index]?.release_date}</p>
          <Rating currentRating={currentRating}/> 
          <a  href={`/moviedetails/${upcomingMovies[index]?.id}`} className="see-details">See Details</a>
       </div>
    </div>
  )
}

export default Slider 