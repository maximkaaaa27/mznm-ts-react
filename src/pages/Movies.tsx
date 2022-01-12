import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/admin_tools/AddButton";
import { CommentsView } from "../components/CommentsView";
import { VideoView } from "../components/VideoView";

import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from "../redux/hooks";
import { MoviesChoise } from "./movies/MoviesChoise";
import { MoviesList } from "./movies/MoviesList";



export const Movies = () => {

  const contentLink = 'movies/';

  const movies = useAppSelector(state => state.firebase.movies);
  const current = useAppSelector(state => state.firebase.current);
  const loading = useAppSelector(state => state.firebase.loading);

  const isFullOption = (process.env.REACT_APP_USER_UID === useAppSelector(state => state.auth.user.uid));

  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB(contentLink)
    }
  },[movies])


  return (

  <div className="m-3">
  {loading && <Spinner variant="secondary" animation="grow" />}
    {(!current.name) ? 
      <Row xs={1} md={2} className="m-2">
        <MoviesChoise
          showTools={isFullOption}
          listMovies={movies}
        />
        </Row>
      : <div className="d-flex-column">
          <h1 className="display-6 m-3">{current.name}</h1>
          <VideoView />
          <MoviesList />
          <CommentsView />
        </div>
    }
      <Col className="m-3">
        { isFullOption && !current &&
        <AddButton contentLink={contentLink}/>
        }
      </Col>
      </div>
  )
};