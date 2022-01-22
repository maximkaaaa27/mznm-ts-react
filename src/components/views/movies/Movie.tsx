import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase'
import { VideoView } from "../VideoView";
import { MoviesRest } from "./MoviesRest";
import { CommentsView } from "../comments/CommentsView";

export const Movie = ({contentLink} : {contentLink: string}) => {

const movieId = useParams().id;
const movies = useAppSelector(state => state.firebase.movies);
const user = useAppSelector(state => state.auth.user)
const isFullOption = (process.env.REACT_APP_USER_UID === user.uid);


useEffect(() => {
  if (!movies.length) {
    fetchFromRealtimeDB(contentLink);
  }
},[movies, contentLink]);


const movie = 'Not found' && movies.find(({id}) => id === movieId);


return (
  <div className="d-flex-column">
    <h1 className="display-6 m-3">{movie?.name}</h1>
    {movie && 
      <div className="m-3">
        <VideoView video={movie}/>
        <MoviesRest currentMovie={movie} movies={movies}/>
        <CommentsView current={movie} fullOption={isFullOption} contentLink={contentLink}/>
      </div>
    }
  </div> 
)
}