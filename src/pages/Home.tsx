import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MoviesPage } from "./MoviesPage";
import { ShowPage } from "./ShowPage";

export const Home = () => {

  return (
    <Container>
    <Row className="g-4 m-2">
      <Col>
        <h1> Сериалы </h1>
        <ShowPage />
      </Col>
    </Row>
    <Row>
      <Col>
        <h1> Фильмы </h1>
        <MoviesPage />
      </Col>
    </Row>
    </Container>
  )
}