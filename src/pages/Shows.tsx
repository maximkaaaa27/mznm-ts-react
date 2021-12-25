import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { fetchFromRealtimeDB, removeFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from '../redux/hooks';


export const Shows = () => {

  const shows = useAppSelector(state => state.firebase.shows);
  const loading = useAppSelector(state => state.firebase.loading);
  const contentLink = 'shows/';

  useEffect(() => {
    if (shows.length === 0) {
      fetchFromRealtimeDB(contentLink)
    }
  }, [shows])


  
  return(
  <>
    <h1 className="p-3">Shows</h1>
    <Row xs={1} md={2} className="g-4 m-2">
    {loading && <Spinner variant="secondary" animation="grow" />}
      {shows.map((item) => (
        <Col key={item.id}>
          
          <Card>
          <button type="button" 
            className="btn-close align-self-end" 
            aria-label="Close"
            onClick={() => removeFromRealtimeDB(contentLink, item.id)}
            >
            </button>
            <Card.Img alt="..." src="/empty" />
            <Card.Title> 
              {item.name}

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