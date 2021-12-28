import React from "react";
import { Col, Row } from "react-bootstrap";
import { Movies } from "./Movies";
import { Shows } from "./Shows";

export const Home = () => {

  return (
    <Row className="g-4 m-2">

      <Col>
        <h1> Сериалы </h1>
        <Shows />
      </Col>
      <Col>
        <h1> Фильмы </h1>
        <Movies />
      </Col>

    </Row>
  )
}