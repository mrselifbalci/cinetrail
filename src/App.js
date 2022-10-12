import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import MovieDetails from './pages/MovieDetails';
import MyFavorites from './pages/MyFavorites';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
import {BrowserRouter,Routes,Route} from 'react-router-dom';



function App() {
  const baseUrl=process.env.REACT_APP_BASE_URL;
  const apiKey=process.env.REACT_APP_API_KEY;


  return (
      <BrowserRouter>
          <Header baseUrl={baseUrl} apiKey={apiKey}/>
          <Routes> 
              <Route path="/" element={<HomePage baseUrl={baseUrl} apiKey={apiKey}/>}/>
              {/* <Route path="/myfavorites" element={<MyFavorites baseUrl={baseUrl} apiKey={apiKey}/>}/> */}
              <Route path="/moviedetails/:movieid" element={<MovieDetails baseUrl={baseUrl} apiKey={apiKey}/>}/>
              <Route path="/contactus" element={<Contact baseUrl={baseUrl} apiKey={apiKey}/>}/>
              <Route path="/about" element={<About baseUrl={baseUrl} apiKey={apiKey}/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    
  );
} 

export default App;
