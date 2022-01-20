import React from "react";
import { ICurrent } from "../../../redux/firebase/firebaseSlice";
import { VideoView } from "../VideoView";

export const Movie = ({movie} : {movie: ICurrent}) => (

 <div className="d-flex-column">
    <h1 className="display-6 m-3">{movie.name}</h1>
    <VideoView video={movie}/>
  </div> 
)