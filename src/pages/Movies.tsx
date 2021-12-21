import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { fetchFromRealtimeDB, removeFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from "../redux/hooks";



export const Movies = (props: {loading: boolean}) => {

  const movies = useAppSelector(state => state.firebase.content);
  const contentLink = 'movies/';

  useEffect(() => {
    fetchFromRealtimeDB(contentLink)
  }, [])

  

  
  return(
  <>
    <h1 className="p-3">Movies</h1>
    <Row xs={1} md={2} className="g-4 m-2">
     {props.loading && <Spinner variant="secondary" animation="grow" />}
      {movies.map((item) => (
        <Col key={item.id}>
          <Card>
            <button type="button" 
            className="btn-close align-self-end" 
            aria-label="Close"
            onClick={() => removeFromRealtimeDB(contentLink, item.id)}
            >
            </button>
            <Card.Img alt="..." src="/empty" />
            <Card.Title> {item.title} </Card.Title>
            <Card.Text>
              {item.about}
            </Card.Text>
          </Card>
        </Col>
      ))}

    </Row>
  </>
  )
  };;