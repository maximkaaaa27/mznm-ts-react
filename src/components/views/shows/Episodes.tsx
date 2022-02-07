import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IEpisodes } from "../../../redux/firebase/interfaces";
import { EditButton } from "../../buttons/editors/EditButton";
import { RemoveButton } from "../../buttons/RemoveButton";


export const Episodes = ({tvShowLink, seasonNumber, episodes, isFullOption} : {
  tvShowLink: string
  episodes: IEpisodes 
  seasonNumber: number
  isFullOption: boolean
  }) => {
 
  const epArr = Object.keys(episodes).map(key => {
    return {...episodes[key]}
  })

return (
  <Row className="my-5 p-3" xs={1} lg={3}>
    {epArr.map(episode => (
      <Col key={episode.id}>
        <div className="d-flex justify-content-end align-items-center">
          {isFullOption && <EditButton 
          contentLink={`shows/${tvShowLink}/seasons/${seasonNumber}season/episodes/`} item={episode}/>}

          {isFullOption && <RemoveButton 
          id={`${tvShowLink}/seasons/${seasonNumber}season/episodes/${episode.id}`} 
          contentLink={'shows/'} />}
        </div>
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