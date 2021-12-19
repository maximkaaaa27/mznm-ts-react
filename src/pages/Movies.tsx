import React, { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
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
          <Button variant="danger" onClick={() => removeFromRealtimeDB(contentLink, item.id)}>
                X
              </Button>
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