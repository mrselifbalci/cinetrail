import React from 'react'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CombinedContextProvider from './contexts/index'
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
// import MovieDetails from './pages/MovieDetails/MovieDetails';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import MyFavorites from './pages/MyFavorites/MyFavorites';
// import About from './pages/About/About';
const About = React.lazy(()=> import ('./pages/About/About'))

const MovieDetails = React.lazy(()=>import ('./pages/MovieDetails/MovieDetails'))
 




function App() { 

  const apiKey=import.meta.env.VITE_API_KEY;
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const serverUrl=import.meta.env.VITE_SERVER_URL;
  return (
    <BrowserRouter>
      <CombinedContextProvider>
         <Header baseUrl={baseUrl} apiKey={apiKey}/>
         <Routes>
          {/* <Route path="/about" element={<About/>}/> */}
          <Route path="/about" element={<React.Suspense fallback="...loading"><About/></React.Suspense>}/>
           <Route path="/" element={<HomePage apiKey={apiKey} baseUrl={baseUrl}/>} />
           <Route path="/moviedetails/:movieid" element={<React.Suspense fallback="Loading..."><MovieDetails serverUrl={serverUrl}  baseUrl={baseUrl} apiKey={apiKey}/></React.Suspense>}/>
           {/* <Route path="/moviedetails/:movieid" element={<MovieDetails serverUrl={serverUrl}  baseUrl={baseUrl} apiKey={apiKey}/>}/> */}
           <Route path="/myfavorites" element={<MyFavorites serverUrl={serverUrl} baseUrl={baseUrl} apiKey={apiKey}/>}/>
           <Route path="/signup" element={<SignUp serverUrl={serverUrl}/>}/>
           <Route path="/signin" element={<SignIn serverUrl={serverUrl}/>}/>
         </Routes>
      </CombinedContextProvider> 
    </BrowserRouter>
  );
}

export default App;
