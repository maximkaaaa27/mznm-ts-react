import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IPayload } from '../../../redux/firebase/firebaseSlice';


export const MoviesRest = ({currentMovie, movies}: {currentMovie: IPayload, movies: IPayload[]}) => {

  const restMovies = movies.filter(item => item.id !== currentMovie.id);

return (
  <>
  {restMovies.map(movie => (
    <div className='bg-light' key={movie.id} style={{"width": "40%"}}>
      <p className='lead'>{movie.name}</p>
      <Link to={"/movies/" + movie.id}>
        <Image fluid alt='pic'className='btn' src={movie.linkPic}/>
      </Link>

    </div>
  ))}
  </>
)}