import React, {useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { fetchFromRealtimeDB } from '../../../redux/firebase/firebase';
import { Seasons } from "./Seasons";
import { Spinner } from "react-bootstrap";


export const TvShow = ({contentLink} : {contentLink: string}) => {

  const showId = useParams().show;
  const shows = useAppSelector(state => state.firebase.shows);
  const uid = useAppSelector(state => state.auth.user.uid);
  const loading = useAppSelector(state => state.firebase.loading);
  const isFullOption = (process.env.REACT_APP_USER_UID === uid || process.env.REACT_APP_USER_UID_ZHEN === uid);

  useEffect(() => {
    if (!shows.length) {
      fetchFromRealtimeDB(contentLink);
    }
  },[shows, contentLink]);


  const tvshow = shows.find(({link}) => link === showId);
  const seasons = tvshow && tvshow.seasons;
  const seasonsArr = seasons && Object.keys(seasons).map(key => {
    return {
      ...seasons[key]
    }
  })


  return (
    <>
      { loading && <Spinner variant="secondary" animation="grow" />}
      { tvshow && <Seasons seasons={seasonsArr} tvshow={tvshow} isFullOption={isFullOption} />}
    </>
  )
}