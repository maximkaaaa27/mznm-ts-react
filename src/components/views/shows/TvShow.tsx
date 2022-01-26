import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase';
import { AddSeasonBtn } from "../../buttons/AddSeasonBtn";
import { AddEpisodeBtn } from "../../buttons/AddEpisodeBtn";

export const TvShow = ({contentLink} : {contentLink: string}) => {

  const showId = useParams().id;
  const shows = useAppSelector(state => state.firebase.shows);
//  const user = useAppSelector(state => state.auth.user);
//  const isFullOption = (process.env.REACT_APP_USER_UID === user.uid);


  useEffect(() => {
    if (!shows.length) {
      fetchFromRealtimeDB(contentLink);
    }
  },[shows, contentLink]);



const tvshow = 'Not found' && shows.find(({link}) => link === showId);

const seasons = tvshow?.seasons && Object.keys(tvshow.seasons).map(key => {
  if (!tvshow.seasons) return {seasonId: '', seasonNumber: 0, year: '', episodes: null}
  return {
    ...tvshow.seasons[key]
  }
}).sort((a, b) => a.seasonNumber - b.seasonNumber);

  return (
    <div className="py-5 m-3">
      {seasons && seasons.map(item => (
      <div key={item.seasonId} 
      className="d-flex flex-column flex-shrink-0 p-3 bg-light w-25 border-bottom"
      >

        <p className="lead">
        {item.seasonNumber} Season ({item.year})
        </p>
        <AddEpisodeBtn link={tvshow.link} season={item.seasonNumber + 'season'} />
      </div>))}
      {tvshow &&
        <AddSeasonBtn id={tvshow.link} totalSeasons={tvshow.totalSeasons}/>
      }

    </div>
  )
}