import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase'
import { VideoView } from '../VideoView';


export const Episode = () => {

const {show, season, episode} = useParams();
const shows = useAppSelector(state => state.firebase.shows)

useEffect(() => {
  if (!shows.length) {
    fetchFromRealtimeDB('shows/')
  }
}, [shows])


const targetShow = shows.find(({link}) => link === show);
const targetSeason = targetShow && targetShow.seasons && targetShow.seasons[`${season}season`];
const targetEpisodes = targetSeason && targetSeason.episodes;
const targetEpisodesArr = targetEpisodes && Object.keys(targetEpisodes).map(key => {
  return {
    ...targetEpisodes[key]
  }
});
const targetEpisode = targetEpisodesArr && targetEpisodesArr.find(({id}) => id === episode);


  return (

    <div className="d-flex-column my-5 text-center">
      { targetEpisode && 
        <h1 className="display-6 p-3">{targetEpisode.name}</h1>
      }
      <div className="m-3">
        {targetEpisode && <VideoView video={targetEpisode}/>}
      </div>
    </div> 
  )
}