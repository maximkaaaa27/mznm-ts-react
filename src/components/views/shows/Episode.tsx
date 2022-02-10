import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase'
import { VideoView } from '../VideoView';
import { EpisodesRest } from './EpisodesRest';
import { CommentsView } from '../comments/CommentsView';


export const Episode = () => {

const {show, season, episode} = useParams();
const shows = useAppSelector(state => state.firebase.shows)
const uid = useAppSelector(state => state.auth.user.uid)
const isFullOption = (process.env.REACT_APP_USER_UID === uid || process.env.REACT_APP_USER_UID_ZHEN === uid);

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
const pathComments = `shows/${show}/seasons/${season}season/episodes/`

  return (
    <>
  { targetEpisode && 
    <div className="tv-show">
      <div className="tv-show-contains">

        <div className="tv-show-contains__title">
          <h2>{targetEpisode.name}</h2>
        </div>
      
        <div className="tv-show-contains__video">
          <VideoView video={targetEpisode} />
        </div>

        <div className="tv-show-contains__rest">
          <EpisodesRest 
            currentTvShow={targetEpisode} 
            tvShows={targetEpisodesArr} 
            show={show ? show + '/' : '?'} 
            season={season ? season + '/': '?'}
          />
        </div>

        <div className='tv-show-contains__return-button'>


          <Link to={`/shows/${show}`}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            fill="currentColor"
            viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </Link>
          <p> Обратно к сериалу </p>
        </div>

        <div className="tv-show-contains__comments">

          <CommentsView current={targetEpisode} fullOption={isFullOption} contentLink={pathComments}/>

        </div>



      </div>
    </div>
    }
    </> 
  )
}