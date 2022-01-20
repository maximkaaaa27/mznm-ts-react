import React from 'react';
import { Image } from 'react-bootstrap';
import { ICurrent, IPayload, setCurrent } from '../../../redux/firebase/firebaseSlice';
import { useAppDispatch } from '../../../redux/hooks';

export const MoviesRest = ({currentMovie, movies}: {currentMovie: ICurrent, movies: IPayload[]}) => {
  const handleSetCurrent = useAppDispatch();
  const restMovies = movies.filter(item => item.id !== currentMovie.id);

return (
  <>
  {restMovies.map(movie => (
    <div className='bg-light' key={movie.id} style={{"width": "40%"}}>
      <p className='lead'>{movie.name}</p>
      <Image 
      fluid alt='pic'
      className='btn' 
      src={movie.linkPic} 
      onClick={() => handleSetCurrent(setCurrent(movie))}
      />
    </div>
  ))}
  </>
)}