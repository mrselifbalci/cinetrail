import React,{useState,useEffect} from 'react'
import MovieCard from '../components/MovieCard';
import '../styles/favorites.css';

function MyFavorites() {
    const [movies,setMovies]=useState([])

useEffect(() => {
    
   
}, [])



  return (
    <div className="favorites-container">
        {
            movies.map(item=>{
                return <MovieCard radius={"16px"} cardStyle={"popular-card"} width={"200px"} 
                height={"300px"} imageUrl={item.poster_path} key={item.id} item={item}
                data={item}/>
            })
        }
    </div>
  )
}

export default MyFavorites