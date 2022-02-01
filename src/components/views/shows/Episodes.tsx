import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IEpisodes } from "../../../redux/firebase/interfaces";


export const Episodes = ({seasonNumber, episodes} : {episodes: IEpisodes, seasonNumber: number}) => {
 
  const epArr = Object.keys(episodes).map(key => {
    return {...episodes[key]}
  })

return (
  <Row className="my-5 p-3" xs={1} lg={3}>
    {epArr.map(episode => (
      <Col key={episode.id}>
        <div className="p-3 bg-dark text-center text-white border">
          <Link to={`${seasonNumber}/${episode.id}`}>
            <Image alt="ep-pic" fluid src={episode.linkPic} />
          </Link>
          <p className="py-3 lead">{episode.name}</p>
        </div>
      </Col>
    ))}
  </Row>
)
}