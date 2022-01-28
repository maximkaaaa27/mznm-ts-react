import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { IContentShows } from '../../../redux/firebase/interfaces';
import { EditButton } from '../../buttons/EditButton';
import { RemoveButton } from '../../buttons/RemoveButton';


export const Shows = ({shows, contentLink, isFullOption} : {
  shows: IContentShows[],
  contentLink: string, 
  isFullOption: boolean
}) => (
  <>
  {shows.map(tvshow => (
        <Col key={tvshow.link} className="m-3">  
          <Card
          border="secondary"
          bg="light"
          >
            <Card.Header
            className="d-flex justify-content-between align-items-center"
            >
              <Card.Title> {tvshow.name} </Card.Title>
              {isFullOption && 
              <div>
                <EditButton item={tvshow} contentLink={contentLink} />
                <RemoveButton id={tvshow.link} contentLink={contentLink} />
              </div>
              }
            </Card.Header>
            
            <Card.Body>
              <Link to={tvshow.link}>
              <Card.Img alt="..." src={tvshow.linkPic} />
              </Link>
              <Card.Text>
                {tvshow.about}
              </Card.Text>
            </Card.Body>

          </Card>
        </Col>
      ))}
  </>
)