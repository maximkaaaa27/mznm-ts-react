import React from 'react';
import { Col, Image } from "react-bootstrap"
import { EditButton } from "../../components/admin_tools/EditButton";
import { RemoveButton } from "../../components/admin_tools/RemoveButton";
import { IPayload, setCurrent } from '../../redux/firebase/firebaseSlice';
import { useAppDispatch } from '../../redux/hooks';


interface IProps {
  showTools: boolean
  listMovies: IPayload[]
}


export const MoviesChoise = ({listMovies, showTools}:IProps) => {
  
  const handleSetCurrent = useAppDispatch()
  return (
    <>
    {listMovies.map((item) => (
      <Col key={item.id}>

        <div
        className="bg-light me-md-3 pt-3 px-3 pt-md-2 px-md-2 text-center overflow-hidden"
        >
        {showTools && 
          <div className='d-flex justify-end'>
            <EditButton item={item} contentLink='movies/' />
            <RemoveButton id={item.id} contentLink='movies/' />
          </div>
        }
          <div className="my-3 p-3" >
            <h2> {item.name} </h2>
            <p className='lead about'>{item.about}</p>
            <div className='mx-auto'>
              <Image fluid alt="card pic" className="btn" src={item.linkPic} 
              onClick={() => handleSetCurrent(setCurrent(item))}
              />
            </div>
          </div> 
        </div>
      </Col>
    ))}
    </>
  )
}