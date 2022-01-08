import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/admin_tools/AddButton";
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


  return(



    <Row xs={1} md={2} className="m-3 p-2">

     {loading && <Spinner variant="secondary" animation="grow" />}

    {(!current) ? 
        <MoviesChoise
          showTools={isFullOption}
          listMovies={movies}
        />
      : <div className="d-flex-column">
          <MoviesList />
          <VideoView />
        </div>

    }

    <Col className="m-3">
      { isFullOption &&
      <AddButton contentLink={contentLink}/>
      }
      </Col>
    </Row>
  )
};