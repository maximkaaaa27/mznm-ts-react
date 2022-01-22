import React from "react";
import { Col, Container, Row } from "react-bootstrap";



export const Home = () => {

  return (
    <Container>
    <Row className="g-4 m-2">
      <Col>
        <h1> Сериалы </h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1> Фильмы </h1>
      </Col>
    </Row>
    </Container>
  )
}