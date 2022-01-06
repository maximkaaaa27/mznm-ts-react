import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { CommentsView } from '../../components/CommentsView';
import { VideoView } from '../../components/VideoView';
import { fetchFromRealtimeDB } from '../../redux/firebase/firebase';
import { useAppSelector } from '../../redux/hooks';


export const DoAmerica = () => {

  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);


  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB('movies/')
    }
  },[movies])

  const movieDoAmerica = movies.filter(item => (item.link === 'doAmerica'))

  return (
    <div className="p-3">
    {loading && <Spinner variant="secondary" animation="grow" />}
    {!!movieDoAmerica.length && 
           <>
      <div className="d-flex justify-content-center">
        <VideoView
          name = {movieDoAmerica[0].name} 
          linkVideo = {movieDoAmerica[0].linkVideo}
        />
      </div>
        <CommentsView />
      </>
    }
    </div>
  )
}