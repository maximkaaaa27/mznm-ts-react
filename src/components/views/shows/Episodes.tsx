import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IEpisodes } from "../../../redux/firebase/interfaces";


export const Episodes = ({seasonNumber, episodes} : {episodes: IEpisodes, seasonNumber: number}) => {
 
  const epArr = Object.keys(episodes).map(key => {
    return {...episodes[key]}
  })

return (
  <div className="my-5 d-flex">
    {epArr.map(episode => (
      <div key={episode.id} className="w-25 px-3">
        <div>
          <Link to={`${seasonNumber}/${episode.id}`}>
          <Image alt="ep-pic" fluid src={episode.linkPic} />
          </Link>
        <p>{episode.name}</p>
        </div>
        

      </div>
    ))}
  </div>
)
}