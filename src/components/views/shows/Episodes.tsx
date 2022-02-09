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

  const pathEpisodes = `${tvShowLink}/seasons/${seasonNumber}season/episodes/`

return (
    <Row xs={1} lg={3}>
      { epArr.map(episode => (
          <Col key={episode.id}>

            {isFullOption &&
              <div className="episode-tools"> 
                <EditButton 
                  contentLink={`shows/${pathEpisodes}`} item={episode}/>
                <RemoveButton 
                  id={pathEpisodes + episode.id} 
                  contentLink={'shows/'} />
              </div>
            }

            <div className="episode-video">
              <Link to={`${seasonNumber}/${episode.id}`}>
                <Image alt="ep-pic" fluid src={episode.linkPic} />
              </Link>
              <p className="py-3 lead">{episode.name}</p>
            </div>

          </Col>
        )
      )}
    </Row>
  )
}