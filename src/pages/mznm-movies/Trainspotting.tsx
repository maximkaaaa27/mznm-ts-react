import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { CommentsView } from '../../components/CommentsView';
import { VideoView } from '../../components/VideoView';
import { fetchFromRealtimeDB } from '../../redux/firebase/firebase';
import { useAppSelector } from '../../redux/hooks';


export const Trainspotting = () => {


  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);

  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB('movies/')
    }
  },[movies])

  const trainspotting = movies.filter(item => (item.link === 'trainsppt'));

  return (
    <div className="p-3">
    {loading && <Spinner variant="secondary" animation="grow" />}
    {!!trainspotting.length && 
      <>
      <div className="d-flex justify-content-center">
        <VideoView
          name = {trainspotting[0].name} 
          linkVideo = {trainspotting[0].linkVideo}
        />
      </div>
        <CommentsView />
      </>
    }
    </div>
  )


}