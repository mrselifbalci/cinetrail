import React,{useState,useEffect,useContext} from 'react'
import MovieCard from '../components/MovieCard';
import '../styles/favorites.css';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';

function MyFavorites() {
    const [movies,setMovies]=useState([])
    const {user,token}=useContext(UserContext) 

useEffect(() => { 
     axios.get(`https://cinetrail-server.herokuapp.com/favoriteMovies/user/${user?._id}`)
     .then(res=>{
      console.log(res.data)
      setMovies(res.data.favorites)
     })
     .catch(err=>console.log(err))
   
}, [user])



  return (
    <div className="favorites-container"> 
        {
          token
           ? movies.map(item=>{
                return <MovieCard  radius={"16px"} cardStyle={"popular-card"} width={"200px"} 
                height={"300px"} imageUrl={item.movie[0].poster_path} key={item.movie[0]._id} data={item.movie[0]}
               />
            }) 
          : <p style={{color:"white"}}>Signin to save movies to your favorites.</p>
        }

    </div>
  )
}

export default MyFavorites