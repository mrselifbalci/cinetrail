import React,{useEffect,useState,useContext} from 'react'
import '../styles/header.css'
import SearchResults from './SearchResults';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import {useNavigate,Link} from 'react-router-dom';
import {ThemeContext} from '../contexts/ThemeContext';
import {MdOutlineDarkMode,MdOutlineLightMode} from "react-icons/md";

 
   
export default function Header({baseUrl,apiKey}) {  

 const navigate = useNavigate();
 const [query,setQuery]=useState('');
 const [searchResults,setSearchResults]=useState([]); 
 const {token,setToken,user,setUser}=useContext(UserContext) 
 const [profileOptions,setProfileOptions]=useState(false)
 const {darkMode,setDarkMode}=useContext(ThemeContext)



 useEffect(() => {
    if(query.trim().length>0){
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res=>{
        setSearchResults(res.data.results)
        })
        .catch(err=>console.log(err));
    }  
 }, [query])
 

 const handleLogout=()=>{
    localStorage.clear()
    setToken('')
    navigate('/') 
 } 


 const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  }
 
  
    return (
        <div className={darkMode ? "header-container" : "header-container header-light"}>
            <Link to="/" className="logo">CineTrail</Link>
            <div className="search-container" >
                <input  
                 onChange={(e)=>setQuery(e.target.value)} 
                 className={ 
                    query && darkMode 
                    ? "search-input input-active"
                    : query && !darkMode 
                    ? "search-input input-active input-light"
                    : !query && !darkMode
                    ?  "search-input input-light"
                    : "search-input"} placeholder="Search movies..."/>

                {
                    query.trim()!==''
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
            <div className="header-buttons-container">
                <div className="theme-button-container">
                        {
                            darkMode
                            ? <div className="theme-buttons">
                                <MdOutlineLightMode onClick={handleTheme} className="theme-icon"/>
                                <MdOutlineDarkMode  className="theme-icon theme-icon-active"/>
                            </div>
                            : <div className="theme-buttons">
                                <MdOutlineLightMode  className="theme-icon theme-icon-active"/>
                                <MdOutlineDarkMode onClick={handleTheme} className="theme-icon"/>
                            </div>
                        }
                </div>
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