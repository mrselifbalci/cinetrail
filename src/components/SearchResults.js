import React from 'react'
import '../styles/header.css'
import { useNavigate } from "react-router-dom";
import noImage from '../assets/no-image.svg.png'

function SearchResults({movie,setQuery}) {
    const navigate = useNavigate();

    const seeDetails=()=>{
    //     console.log('calisti')
    //    navigate(`/moviedetails/${movie.id}`)
       setQuery('')
    }
 

  return (
    <a className="search-results-item" onClick={seeDetails} href={`/moviedetails/${movie.id}`}>
           <img className="result-img" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`: noImage}/>
           <p>{movie.title}</p> 
    </a>
  )
}

export default SearchResults