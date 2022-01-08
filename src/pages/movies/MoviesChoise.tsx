import React from 'react';
import { Card, Col } from "react-bootstrap"
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
        <Card

        className="text-center"
        border="secondary"
        bg="light"
        >
          <Card.Header>
            <Card.Title>
              <div className="d-flex" >
                {item.name} 
                {showTools && 
              <div>
                <EditButton item={item} contentLink='movies/' />
                <RemoveButton id={item.id} contentLink='movies/' />
              </div>
                }
              </div> 
            </Card.Title>
          </Card.Header>

          <Card.Body>

              <Card.Img alt="card pic" className="btn" src={item.linkPic} 
              onClick={() => handleSetCurrent(setCurrent(item))}
              />

            <Card.Text>
              {item.about}
            </Card.Text>
          </Card.Body>

        </Card>
      </Col>
    ))}
    </>
  )
}