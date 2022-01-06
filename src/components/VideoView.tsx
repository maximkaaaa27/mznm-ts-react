import React from "react";
import { Col, Row } from "react-bootstrap";

export const VideoView = ({name, linkVideo}: any) => {

  return (
    <Row>
      <Col md="auto">
        <iframe className='video-frame ok-iframe' width='640' height='330' title={name} src={linkVideo} frameBorder="0" allow="autoplay" allowFullScreen />
      </Col>
    </Row>
  )
}