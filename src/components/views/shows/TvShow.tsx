import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase'
//import { VideoView } from "../VideoView";
import { AddSeasonBtn } from "../../buttons/AddSeasonBtn";

export const TvShow = ({contentLink} : {contentLink: string}) => {

  const showId = useParams().id;
  const shows = useAppSelector(state => state.firebase.shows);
//  const user = useAppSelector(state => state.auth.user)
//  const isFullOption = (process.env.REACT_APP_USER_UID === user.uid);


  useEffect(() => {
    if (!shows.length) {
      fetchFromRealtimeDB(contentLink);
    }
  },[shows, contentLink]);



const tvshow = 'Not found' && shows.find(({id}) => id === showId);


  return (
    <div className="py-5 m-3">
      {tvshow?.seasons &&  Object.keys(tvshow.seasons).map(item => (<h1>{item}</h1>))}
      {tvshow &&
        <AddSeasonBtn id={tvshow.id} />
      }

    </div>
  )
}