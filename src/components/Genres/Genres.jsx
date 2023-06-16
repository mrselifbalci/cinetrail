import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Genres({ movieGenres, baseUrl, apiKey,component }) {

  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        setAllGenres(res.data.genres);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div style={{display:"flex"}}>
      <p>Genres:&nbsp;</p>
      { component==="details" 
      ? movieGenres?.map((name,index)=>{
        return <p key={name.id}>{index===movieGenres?.length-1 ? `${name?.name}`:`${name?.name},`}&nbsp;</p>
      })
      
      : movieGenres?.map((id, index) => {
        const genre = allGenres.find((genre) => genre.id === id);
        return (
          <p key={id}>
            {genre?.name}
            {index !== movieGenres.length - 1 && ','}&nbsp;
          </p>
        );
      })}
    </div>
  );
}
