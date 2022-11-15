import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import MovieDetails from './pages/MovieDetails';
import MyFavorites from './pages/MyFavorites';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import UserContextProvider from './contexts/UserContext';
// import ThemeContextProvider from './contexts/ThemeContext';
import CombinedContextProvider from './contexts/index.js'
// import {UserContext} from './contexts/UserContext';

 

function App() {
  const baseUrl=process.env.REACT_APP_BASE_URL;
  const apiKey=process.env.REACT_APP_API_KEY; 
  const serverUrl=process.env.REACT_APP_SERVER_URL;
  // const [user,setUser]=useState('');
  // const [token,setToken]=useState('')

 

  

  return ( 
      <BrowserRouter>
        <CombinedContextProvider>
              <Header baseUrl={baseUrl} apiKey={apiKey}/>
              <Routes> 
                  <Route path="/" element={<HomePage baseUrl={baseUrl} apiKey={apiKey}/>}/>
                  <Route path="/myfavorites" element={<MyFavorites serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
                  <Route path="/moviedetails/:movieid" element={<MovieDetails serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
                  <Route path="/signup" element={<SignUp serverUrl={serverUrl}/>}/>
                  <Route path="/signin" element={<SignIn serverUrl={serverUrl}/>}/>
              </Routes>
              <Footer/> 
          </CombinedContextProvider> 
      </BrowserRouter>
    
  );
} 

export default App;
