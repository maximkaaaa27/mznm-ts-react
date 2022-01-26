import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IContent } from '../../../redux/firebase/interfaces';


export const MoviesRest = ({currentMovie, movies}:{
  currentMovie: IContent, 
  movies: IContent[]
}) => {

  const restMovies = movies.filter(item => item.id !== currentMovie.id);

return (
  <>
  {restMovies.map(movie => (
    <div className='bg-light' key={movie.id} style={{"width": "40%"}}>
 
      <Link to={"/movies/" + movie.id}>
        <Image fluid alt='pic'className='btn' src={movie.linkPic}/>
      </Link>
      <p className='lead'>{movie.name}</p>
    </div>
  ))}
  </>
)}