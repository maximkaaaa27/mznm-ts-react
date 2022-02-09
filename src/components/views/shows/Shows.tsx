import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import { IContentShows } from '../../../redux/firebase/interfaces';
import { EditShowBtn } from '../../buttons/editors/EditShowBtn';
import { RemoveButton } from '../../buttons/RemoveButton';


export const Shows = ({shows, contentLink, isFullOption} : {
  shows: IContentShows[],
  contentLink: string, 
  isFullOption: boolean
}) => { 

  const {pathname} = useLocation();
  const homeLocation = !!(pathname === '/');


  return (
  <>
    {shows.map(tvshow => (
          <Col key={tvshow.link} className="mb-3">

            {isFullOption && 
                <div className='d-flex'>
                  <EditShowBtn item={tvshow} contentLink={contentLink} />
                  <RemoveButton id={tvshow.link} contentLink={contentLink} />
                </div>
            }

            <div className="bg-light shadow overflow-hidden">
              <div className="my-card my-3 p-4">

                <div className="my-card__title">
                  <h2> {tvshow.name} </h2>
                  <p>{tvshow.nameEng}</p>
                </div>

                <div className='mx-auto'>
                  <Link to={homeLocation ? 'shows/' + tvshow.link: tvshow.link}>            
                    <Image fluid alt="card pic" className="btn" src={tvshow.linkPic} />
                  </ Link>
                </div>

                <div className="my-card__about">
                  <p className='lead about'>{tvshow.about}</p>
                </div>

              </div> 
            </div>
          </Col>
      ))}
  </>
  )
}