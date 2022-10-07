import React,{useState,useEffect} from 'react';
import { useScrollTo } from 'react-use-window-scroll';
import MovieCard from '../components/MovieCard';
import Slider from '../components/Slider';
import '../styles/home.css';
import axios from 'axios';

function HomePage({upcomingMovies,baseUrl,apiKey}) {
  const scrollTo = useScrollTo();
  const [popularMovies,setPopularMovies]=useState([])
  const [topRatedMovies,setTopRatedMovies]=useState([])
  const [page,setPage]=useState(1);
  const pageNumbers=[1,2,3,4,5,6,7,8,9,10];
  const [favoriteMovies,setFavoriteMovies]=useState([]) 

useEffect(() => {
  axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&append_to_response=videos&language=en-US&page=${page}`)
  .then(res=>setPopularMovies(res.data.results))
  .catch(err=>console.log(err))
}, [page])

useEffect(() => {
  axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
  .then(res=>setTopRatedMovies(res.data.results.slice(0,10)))
  .catch(err=>console.log(err))

  const saved = localStorage.getItem("favorite_movies")
  if(!saved){
    localStorage.setItem("favorite_movies",JSON.stringify([])) 
  }else{
    setFavoriteMovies(JSON.parse(saved))
  }
  
}, [])


 const handlePage=(page)=>{
  setPage(page)
  // scrollTo({ top: 0, left: 0, behavior: 'smooth' })
 }
  
  return (
    <div className="homepage-container">
       <Slider baseUrl={baseUrl} apiKey={apiKey}/>
       <div className="movies-wrapper">
          <div className="popular-container">
              <h3 className="popular-title">Popular Movies</h3>
              <div className="popular-cards-wrapper">
                        {
                            popularMovies.map(movie=>{
                              return <MovieCard radius={"16px"} cardStyle={"popular-card"} width={"200px"} 
                              height={"300px"} imageUrl={movie.poster_path} key={movie.id} data={movie}
                              favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies} />
                            })
                        }
                </div> 
                <div className="page-numbers">
                      <p>Select Page</p>
                      {
                          pageNumbers.map(item=>{
                            return <p 
                            className={item===page ? "current-page":null}
                            key={item} onClick={()=>handlePage(item)}>{item}</p>
                          })
                      }
                </div>
          </div>
          <div className="top-rated-container">
                <h3>Top Rated Movies</h3>
                <div className="top-rated-cards-wrapper">
                    {
                        topRatedMovies.map(movie=>{
                          return <MovieCard radius={"8px"} cardStyle={"top-rated-card"} width={"200px"} 
                          height={"100px"} imageUrl={movie.backdrop_path}  key={movie.id} data={movie} />
                        })
                    }
                </div>   
          </div>

       </div>
    </div> 
  )
}

export default HomePage