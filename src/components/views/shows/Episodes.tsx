import React from "react";
import { Image } from "react-bootstrap";
import { IEpisodes } from "../../../redux/firebase/interfaces";


export const Episodes = ({episodes} : {episodes: IEpisodes}) => {
 
  const epArr = Object.keys(episodes).map(key => {
    return {...episodes[key]}
  })

return (
  <div className="my-5 d-flex">
    {epArr.map(episode => (
      <div key={episode.episodeId} className="w-25 px-3">
        <div>
          <Image alt="ep-pic" fluid src={episode.linkPic} />
        <p>{episode.name}</p>
        </div>
        

      </div>
    ))}
  </div>
)
}