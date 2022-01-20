import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/buttons/AddButton";
import { CommentsView } from "../components/views/comments/CommentsView";
import { VideoView } from "../components/views/VideoView";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { Movies } from "../components/views/movies/Movies";
import { MoviesRest } from "../components/views/movies/MoviesRest";



export const MoviePage = () => {

  const contentLink = 'movies/';
  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);
  const user = useAppSelector(state => state.auth.user)
  const isFullOption = (process.env.REACT_APP_USER_UID === user.uid);

  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB(contentLink)
    }
  },[movies])


  return (

  <div className="m-3">

    {loading && <Spinner variant="secondary" animation="grow" />}

      <Row xs={1} md={2} className="m-2">
        <Movies showTools={isFullOption} listMovies={movies} />
       
          {/* <div className="d-flex-column">
          <h1 className="display-6 m-3">{current.name}</h1>
          <VideoView video={current}/>
          <MoviesRest currentMovie={current} movies={movies}/>
          <CommentsView current={current} fullOption={isFullOption} contentLink={contentLink}/>
        </div> */}
    
        <Col className="m-3">
          { isFullOption && <AddButton contentLink={contentLink} /> }
        </Col>
      </Row>
  </div>
  )
};