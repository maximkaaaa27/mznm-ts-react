import React from "react";
import { IContent } from "../../redux/firebase/interfaces";


export const VideoView = ({video}: {video: IContent}) => {


  return (
    <iframe 
    className='video-frame ok-iframe' 
    width='640' 
    height='330' 
    title={video.name} 
    src={video.linkVideo} 
    frameBorder="0" 
    allow="autoplay" 
    allowFullScreen />    
  )
}