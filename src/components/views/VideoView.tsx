import React from "react";
import { Col, Row } from "react-bootstrap";
import { IContent } from "../../redux/firebase/interfaces";


export const VideoView = ({video}: {video: IContent}) => {


  return (
    <Row>
      <Col md="auto">
        <iframe 
        className='video-frame ok-iframe' 
        width='640' 
        height='330' 
        title={video.name} 
        src={video.linkVideo} 
        frameBorder="0" 
        allow="autoplay" 
        allowFullScreen />
      </Col>
    </Row>
  )
}