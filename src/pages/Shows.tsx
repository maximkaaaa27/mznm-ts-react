import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from '../redux/hooks';


export const Shows = (props: {loading: boolean}) => {

  const shows = useAppSelector(state => state.firebase.content)
  useEffect(() => {
    fetchFromRealtimeDB('shows/')
  }, [])

  

  
  return(
  <>
    <h1 className="p-3">Shows</h1>
    <Row xs={1} md={2} className="g-4 m-2">
    {props.loading && <Spinner variant="secondary" animation="grow" />}
      {shows.map((item) => (
        <Col key={item.title}>
          <Card>
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
  };