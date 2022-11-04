import React,{useEffect,useState,useContext} from 'react'
import '../styles/header.css'
import SearchResults from './SearchResults';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import {useNavigate,Link} from 'react-router-dom';
import {ThemeContext} from '../contexts/ThemeContext';


  
export default function Header({baseUrl,apiKey}) {  
 const navigate = useNavigate();
 const [query,setQuery]=useState('');
 const [searchResults,setSearchResults]=useState([]); 
 const {token,setToken,user}=useContext(UserContext) 
 const [profileOptions,setProfileOptions]=useState(false)
 const {darkMode,setDarkMode}=useContext(ThemeContext)

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
    navigate('/')
 } 

 
  
    return (
        <div className={darkMode ? "header-container" : "header-container header-light"}>
            <div className="logo-container"> 
                  <Link to="/" className="logo"><p>CineTrail</p></Link>
            </div>
            <div className="search-container" >
                <input onChange={handleSearch} className={ 
                    query && darkMode 
                    ? "search-input input-active"
                    : query && !darkMode 
                    ? "search-input input-active input-light"
                    : !query && !darkMode
                    ?  "search-input input-light"
                    : "search-input"} placeholder="Search movies..."/>
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
            <div>
                 {
                    token 
                    ? <div className={darkMode ?"profile-container" : "profile-container profile-light" }>
                        <img src={user.image_url} className="profile-img" onClick={()=>setProfileOptions(!profileOptions)}/>
                        <p>Welcome {user.username}<span></span></p>
                        {
                            profileOptions
                            ? <div className="profile-options">
                                <Link to="/myfavorites">My Favorites</Link>
                                {/* <a href="/myfavorites">My Favorites</a> */}
                                <p className="logout" onClick={handleLogout}>Logout</p>
                              </div>
                            : null
                        } 
                        
                        
                     </div>
                    : <div>
                        <button className="create-account" onClick={()=>navigate('/signup')}>Create an Account</button>
                    </div>
                 }
            </div>

        </div> 
    )
} 