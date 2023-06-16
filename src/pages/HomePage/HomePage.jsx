import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import './homepage.css'
import Slider from '../../components/Slider/Slider';
import MovieCard from '../../components/MovieCard/MovieCard';
import {ThemeContext} from '../../contexts/ThemeContext';

function HomePage({apiKey,baseUrl}) {

  const {darkMode,setDarkMode}=useContext(ThemeContext)
  const [popularMovies,setPopularMovies]=useState([])
  const [topRatedMovies,setTopRatedMovies]=useState([])
  const [page, setPage] = useState(1);
  const pageNumbers=[1,2,3,4,5,6,7,8,9,10];


  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`);
        setPopularMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPopularMovies();
  }, [page]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
        setTopRatedMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  
  
  const handlePage=(page)=>{
    setPage(page)
    scrollTo({ top: 0, left: 0, behavior: 'smooth' })
   }
     

  return (
    <div className={darkMode ? "homepage-container" : "homepage-container home-light"}>
        <Slider  apiKey={apiKey} baseUrl={baseUrl}/>
        <div className="movies-wrapper">
            <div className="popular-container">
                <h3 className="popular-title">Popular Movies</h3>
                <div className="popular-cards-wrapper"> 
                      {
                            popularMovies.map(movie=>{
                                  return <MovieCard radius={"16px"} cardStyle={"popular-card"} width={"200px"} 
                                  height={"300px"} imageUrl={movie.poster_path} key={movie.id} data={movie}
                                   />
                                })
                      }
                </div>
                <div className="page-numbers">
                    <p>Select Page</p> 
                    {pageNumbers.map((item) => (
                      <p
                        className={item === page ? "current-page" : "page"}
                        key={item}
                        onClick={() => handlePage(item)}
                      >
                        {item}
                      </p>
                    ))}
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