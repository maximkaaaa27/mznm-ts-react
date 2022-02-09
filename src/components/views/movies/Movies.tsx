import React from 'react';
import { Col, Image } from "react-bootstrap";
import { RemoveButton } from "../../buttons/RemoveButton";
import { EditButton } from "../../buttons/editors/EditButton";
import { IContent } from '../../../redux/firebase/interfaces';
import { Link, useLocation } from 'react-router-dom';


export const Movies = ({listMovies, showTools}:{
  listMovies: IContent[], showTools: boolean
}) => { 

  const {pathname} = useLocation();
  const homeLocation = !!(pathname === '/');

return(
      <>
        {listMovies.map((movie) => (
          <Col key={movie.id}  className="mb-3">

            {showTools && 
              <div className='d-flex'>
                <EditButton item={movie} contentLink='movies/' />
                <RemoveButton id={movie.id} contentLink='movies/' />
              </div>
            }

            <div className="bg-light shadow overflow-hidden">
              <div className="my-card my-3 p-4">

                <div className="my-card__title">
                  <h2> {movie.name} </h2>
                  <p>{movie.nameEng}({movie.year}) </p>
                </div>

                <div className='mx-auto'>
                  <Link to={homeLocation ? 'movies/' + movie.id: movie.id}>            
                    <Image fluid alt="card pic" className="btn" src={movie.linkPic} />
                  </ Link>
                </div>

                <div className="my-card__about">
                  <p className='lead about'>{movie.about}</p>
                </div>

              </div> 
            </div>
            
          </Col>
        ))}
      </>
  )
}
