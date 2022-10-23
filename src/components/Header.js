import React,{useEffect,useState,useContext} from 'react'
import '../styles/header.css'
import SearchResults from './SearchResults';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import {useNavigate} from 'react-router-dom';


export default function Header({baseUrl,apiKey}) {  
 const navigate = useNavigate();
 const [query,setQuery]=useState('');
 const [searchResults,setSearchResults]=useState([]);
 const {token,setToken,user}=useContext(UserContext) 

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

 const handleLogout=()=>{
    localStorage.clear()
    setToken('')
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
            <div className="profile">
                 {
                    token 
                    ? <div>
                        <p>Welcome {user.username}</p>
                        <p onClick={handleLogout}>Logout</p>
                     </div>
                    : <div>
                        <p className="create-account" onClick={()=>navigate('/signup')}>Create an Account</p>
                    </div>
                 }
            </div>

        </div> 
    )
} 