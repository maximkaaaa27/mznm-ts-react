import React from 'react';
import { Image } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';

export const MoviesList = () => {

  const movies = useAppSelector(state => state.firebase.movies);
  const current = useAppSelector(state => state.firebase.current);
  const restMovies = movies.filter(item => item.id !== current?.id);
  
  console.log(restMovies);
return (
  <>
  {restMovies.map(item => (
    <div className='bg-light' key={item.id} style={{"width": "40%"}}>
      <p className='lead'>{item.name}</p>
      <Image fluid alt='pic' src={item.linkPic} />
    </div>
  ))}
  </>
)}