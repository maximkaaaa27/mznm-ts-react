import React, { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { fetchFromRealtimeDB, removeFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from '../redux/hooks';


export const Shows = (props: {loading: boolean}) => {

  const shows = useAppSelector(state => state.firebase.content);
  const contentLink = 'shows/';

  useEffect(() => {
    fetchFromRealtimeDB(contentLink)
  }, [])

  

  
  return(
  <>
    <h1 className="p-3">Shows</h1>
    <Row xs={1} md={2} className="g-4 m-2">
    {props.loading && <Spinner variant="secondary" animation="grow" />}
      {shows.map((item) => (
        <Col key={item.id}>
          
          <Card>
          <Button variant="danger" onClick={() => removeFromRealtimeDB(contentLink, item.id)}>
                X
              </Button>
            <Card.Img alt="..." src="/empty" />
            <Card.Title> 
              {item.title}

             </Card.Title>
            <Card.Text>
              {item.about}
            </Card.Text>
          </Card>
        </Col>
      ))}

    </Row>
  </>
  )
  };