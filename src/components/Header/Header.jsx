import React,{useState,useEffect,useContext} from 'react'
import './header.css'
import {Link,useNavigate} from 'react-router-dom'
import { MdOutlineDarkMode,MdOutlineLightMode, MdToken } from "react-icons/md";
import { ThemeContext } from '../../contexts/ThemeContext';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults';

function Header({baseUrl,apiKey}) {
  
const navigate = useNavigate();
const {darkMode,setDarkMode}=useContext(ThemeContext)
const {token,setToken,user}=useContext(UserContext) 
const [query,setQuery]=useState('');
const [searchResults,setSearchResults]=useState([]); 
const [profileOptions,setProfileOptions]=useState(false)

useEffect(() => {
  if(query.trim().length>0){
      axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
      .then(res=>{
         setSearchResults(res.data.results)
      }) 
      .catch(err=>console.log(err));
  }  
}, [query])

const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  }

  const handleLogout=()=>{
    localStorage.clear()
    setToken('')
    navigate('/') 
 } 
  

  return (
    <div className={darkMode ?"header-container":"header-container header-light" }>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`search-input ${query && "input-active"} ${!query && !darkMode && "input-light"}`}
              placeholder="Search movies..."
            />

            {query.trim() !== '' && (
              <div className="search-results-container"> 
                {searchResults.map((movie) => {
                  return <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
                })}
              </div>
            )}
      </div>
      <div className="header-buttons-container">
         <div className="theme-button-container">

             {
                darkMode 
                ? <div className="theme-buttons">
                    <MdOutlineLightMode onClick={handleTheme} className="theme-icon "/>
                    <MdOutlineDarkMode className="theme-icon theme-icon-active"/>  
                </div>
                : <div className="theme-buttons">
                    <MdOutlineLightMode className="theme-icon theme-icon-active"/>
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

export default Header