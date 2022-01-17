import React from "react";
import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";

export const VideoView = () => {

  const currentPlay = useAppSelector(state => state.firebase.current)

  return (
    <Row>
      <Col md="auto">
        <iframe 
        className='video-frame ok-iframe' 
        width='640' 
        height='330' 
        title={currentPlay?.name} 
        src={currentPlay?.linkVideo} 
        frameBorder="0" 
        allow="autoplay" 
        allowFullScreen />
      </Col>
    </Row>
  )
}