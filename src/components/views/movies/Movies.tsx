import React from 'react';
import { Col, Image } from "react-bootstrap";
import { RemoveButton } from "../../buttons/RemoveButton";
import { EditButton } from "../../buttons/EditButton";
import { IContent } from '../../../redux/firebase/interfaces';
import { Link } from 'react-router-dom';


export const Movies = ({listMovies, showTools}:{
  listMovies: IContent[], showTools: boolean
}) => (
  <>
    {listMovies.map((movie) => (
      <Col key={movie.id}>
        <div
        className="bg-light shadow me-md-3 pt-3 px-3 pt-md-2 px-md-2 text-center overflow-hidden"
        >
        {showTools && 
          <div className='d-flex justify-end'>
            <EditButton item={movie} contentLink='movies/' />
            <RemoveButton id={movie.id} contentLink='movies/' />
          </div>
        }
          <div className="my-3 p-3" >
            <h2> {movie.name} </h2>
            <p className='lead about'>{movie.about}</p>
            <div className='mx-auto'>
              <Link to={movie.id}>
              <Image fluid alt="card pic" className="btn" src={movie.linkPic} />
              </ Link>
            </div>
          </div> 
        </div>
      </Col>
    ))}
  </>
)
