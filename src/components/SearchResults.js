import React,{useState} from 'react'
import '../styles/header.css'
import { useNavigate } from "react-router-dom";
import noImage from '../assets/no-image.svg.png'

function SearchResults({movie,setQuery}) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

  return (
    <a className="search-results-item" onClick={()=>setQuery('')} href={`/moviedetails/${movie.id}`}>
           <img className="result-img" src={imageError ? noImage :`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
           onError={() => setImageError(true)}/>
           <p>{movie.title}</p> 
    </a>
  )
}

export default SearchResults