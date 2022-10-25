import React,{useState,useEffect} from 'react'
import MovieCard from '../components/MovieCard';
import '../styles/favorites.css';
import axios from 'axios';

function MyFavorites() {
    const [movies,setMovies]=useState([])

useEffect(() => { 
     axios.get(`https://cinetrail-server.herokuapp.com/favoriteMovies/user/6352879b1a16401aafc356b2`)
     .then(res=>{
      setMovies(res.data.favorites)
     })
     .catch(err=>console.log(err))
   
}, [])



  return (
    <div className="favorites-container">
        {
            movies.map(item=>{
                return <MovieCard  radius={"16px"} cardStyle={"popular-card"} width={"200px"} 
                height={"300px"} imageUrl={item.movie[0].poster_path} key={item.movie[0]._id} data={item.movie[0]}
               />
            }) 
        }
    </div>
  )
}

export default MyFavorites