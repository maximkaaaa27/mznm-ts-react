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
    <div className="rest">
      <Link to={"/movies/" + movie.id}>
        <Image alt='pic' src={movie.linkPic} fluid/>
      </Link>
      {movie.name}
    </div>
  ))}
</>
)}