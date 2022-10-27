import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function Genres({component,movieGenres,baseUrl,apiKey}) {
    const [allGenres,setAllGenres]=useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`)
        .then(res=>setAllGenres(res.data.genres))
        .catch(err=>console.log(err))
    }, [])
    // console.log(component,movie.genres)
  return (
    <div className="genre-container">
              <p>Genres:&nbsp;</p>
              {
                component === "details"  
                ? movieGenres?.map((name,index)=>{
                  return <p key={name.id}>{index===movieGenres.length-1 ? `${name.name}`:`${name.name},`}&nbsp;</p>
                })
                : movieGenres?.map((id,index)=>{
                  for(let i=0;i<allGenres.length;i++){
                    if(allGenres[i].id===id){
                      return <p key={id}>{index===movieGenres.length-1 ? `${allGenres[i].name}` :`${allGenres[i].name},` }&nbsp;</p>
                    }
                  }
                }) 
              }
              
    </div>
  )
}
