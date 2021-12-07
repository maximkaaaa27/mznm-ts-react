import React from "react";
import { Col, Row, Card} from "react-bootstrap";

export const Home = () => {

  const cards: string[] = ['One', 'Two', 'Three', 'Four']


  return (
    <Row xs={1} md={2} className="g-4 m-2">
      {cards.map((item) => (
        <Col key={item}>
          <Card>
            <Card.Img alt="..." src="/empty" />
            <Card.Title> {item} </Card.Title>
            <Card.Text>
              Something Text
            </Card.Text>
          </Card>
        </Col>
      ))}

    </Row>
  )
}