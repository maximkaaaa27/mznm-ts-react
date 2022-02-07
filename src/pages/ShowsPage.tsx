import React, { useEffect } from "react";
import { useAppSelector } from '../redux/hooks';
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { Col, Row, Spinner } from "react-bootstrap";
import { Shows } from "../components/views/shows/Shows";
import { AddShowButton } from "../components/buttons/adds/AddShowButton";



export const ShowsPage = () => {

  const contentLink = 'shows/';

  const shows = useAppSelector(state => state.firebase.shows);
  const loading = useAppSelector(state => state.firebase.loading);
  const uid = useAppSelector(state => state.auth.user.uid);

  const isFullOption = (process.env.REACT_APP_USER_UID === uid);

    useEffect(() => {
      if (!shows.length) {
        fetchFromRealtimeDB(contentLink)
      }
    }, [shows])


  return (

    <div className="page-shows">

      {loading && <Spinner variant="secondary" animation="grow" />}

      <Row xs={1} md={2} className="mb-5">

        <Shows shows={shows} contentLink={contentLink} isFullOption={isFullOption} />

        <Col className="m-3">
          { isFullOption && <AddShowButton />}
        </Col>

      </Row>

    </div>
  )
};