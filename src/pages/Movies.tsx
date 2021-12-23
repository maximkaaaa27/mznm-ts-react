import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/AddButton";
import { fetchFromRealtimeDB, removeFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from "../redux/hooks";



export const Movies = () => {

  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);
  const contentLink = 'movies/';

  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB(contentLink)
    }

  },[movies])

  
  

  return(
  <>
    <Row className="g-4 m-2">

     {loading && <Spinner variant="secondary" animation="grow" />}

      {movies.map((item) => (
        <Col key={item.id} className="m-3">
          <Card
          border="secondary"
          bg="light"
          >
            <Card.Header
            className="d-flex justify-content-between align-items-center"
            >
              <Card.Title> {item.title} </Card.Title>
              <button type="button" 
              className="btn-close" 
              aria-label="Close"
              onClick={() => removeFromRealtimeDB(contentLink, item.id)}
              >
              </button>
            </Card.Header>

            <Card.Body>
              <Card.Img alt="..." src="/empty" />
              <Card.Text>
                {item.about}
              </Card.Text>
            </Card.Body>

          </Card>
        </Col>
      ))}
      <Col className="m-3">
      <AddButton />
      </Col>

    </Row>
  </>
  )
  };;