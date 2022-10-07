import React,{useEffect,useState} from 'react'
import '../styles/header.css'
import SearchResults from './SearchResults';
import axios from 'axios';


export default function Header({baseUrl,apiKey}) {  
 const [query,setQuery]=useState('');
 const [searchResults,setSearchResults]=useState([]);

 const handleSearch=(e)=>{
    setQuery(e.target.value)
    setTimeout(() => {
        if(query.trim().length>0){
            axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
            .then(res=>{
            setSearchResults(res.data.results)
            })
            .catch(err=>console.log(err));
        }  
    }, 200);
 }
  
    return (
        <div className="header-container">
            <div className="logo-container"> 
                  <a href="/" className="logo"><p>CineTrail</p></a>
            </div>
            <div className="search-container">
                <input onChange={handleSearch} className={query ?"search-input input-active":"search-input" } placeholder="Search movies..."/>
                {
                    query!==''
                    ? <div className="search-results-container">
                        {
                            searchResults.map(movie=>{
                              return  <SearchResults setQuery={setQuery} key={movie.id} movie={movie}/>
                            })
                        }
                        
                    </div>
                    : null
                }
            
            </div>

        </div> 
    )
} 