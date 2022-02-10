import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IContent } from '../../../redux/firebase/interfaces';


export const EpisodesRest = ({currentTvShow, tvShows, show, season}:{
  currentTvShow: IContent 
  tvShows: IContent[]
  show: string
  season: string
}) => {

  const restMovies = tvShows.filter(item => item.id !== currentTvShow.id);

return (
<>
  {restMovies.map(episode => (
    <div className="rest">
      <Link to={"/shows/"+ show + season + episode.id}>
        <Image alt='pic' src={episode.linkPic} width="250px" fluid/>
      </Link>
      {episode.name}
    </div>
  ))}
</>
)}