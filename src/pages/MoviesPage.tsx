import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { Col, Row, Spinner } from "react-bootstrap";
import { Movies } from "../components/views/movies/Movies";
import { AddButton } from "../components/buttons/adds/AddButton";




export const MoviesPage = () => {

  const contentLink = 'movies/';

  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);
  const uid = useAppSelector(state => state.auth.user.uid);

  const isFullOption = 
  (process.env.REACT_APP_USER_UID === uid || process.env.REACT_APP_USER_UID_ZHEN === uid);

    useEffect(() => {
      if (!movies.length) {
        fetchFromRealtimeDB(contentLink)
      }
    },[movies])


  return (

    <div className="page-movies">

      {loading && <Spinner variant="secondary" animation="grow" />}

        <Row xs={1} md={2} className="m-2">

          <Movies showTools={isFullOption} listMovies={movies} />

          <Col className="m-3">
            { isFullOption && <AddButton contentLink={contentLink} /> }
          </Col>

        </Row>

    </div>
  )
};