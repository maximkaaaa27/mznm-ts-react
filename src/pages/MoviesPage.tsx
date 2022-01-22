import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/buttons/AddButton";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { Movies } from "../components/views/movies/Movies";




export const MoviesPage = () => {

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
        <Movies 
        showTools={isFullOption} 
        listMovies={movies} 
        />  
        <Col className="m-3">
          { isFullOption && <AddButton contentLink={contentLink} /> }
        </Col>
      </Row>
  </div>
  )
};