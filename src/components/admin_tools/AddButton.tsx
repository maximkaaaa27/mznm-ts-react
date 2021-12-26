import React, { useReducer, useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { addToRealtimeDB } from "../../redux/firebase/firebase";


export const AddButton = ({contentLink}:{contentLink: string}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const contentType = contentLink;

  interface IInitState {
    name: string
    info: string
    path: string
    videoOkID: string
  }

  interface IAction {
    type: string
    payload: string
  }

  const initialState: IInitState = {
    name: '',
    info: '',
    path: '',
    videoOkID: '',
  }

  const reducer = (state: IInitState, action: IAction) => {
    switch(action.type) {
      case 'name':
        return {
          ...state, name: action.payload
        };
      case 'info':
        return {
          ...state, info: action.payload
        }
      case 'path':
        return {
          ...state, path: action.payload
        }
      case 'videoOkID':
        return {
          ...state, videoOkID: action.payload
        }
      default:
        throw new Error('Error AddComponent reducer')
      }
  }

  const [state, dispatch] = useReducer(reducer,initialState);

  const handleSubmit = () => {
    addToRealtimeDB({
      contentType,
      name: state.name,
      about: state.info,
      link: state.path,
      linkVideo: state.videoOkID
    })
    handleClose()
  }


return (
  <>
    <Button variant="secondary" onClick={handleShow}>
      +
    </Button>

    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title> Добавить </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form.Label> Основное:</Form.Label>
        <FormControl 
        className="mb-3" 
        placeholder="Название" 
        value={state.name} 
        onChange={(event) => dispatch({
          type: 'name',
          payload: event.target.value,
          })
        } 
        />

        <FormControl 
        className="mb-3" 
        placeholder="Информация"
        value={state.info} 
        onChange={(event) => dispatch({
          type: 'info',
          payload: event.target.value,
          })
        } 
        />
      
      
      <Form.Label>Техническое:</Form.Label>
        <InputGroup className="mb-3">
            <InputGroup.Text>
              https://mznm-studio.ru/{contentLink}
            </InputGroup.Text>
            <FormControl placeholder="Path"
              value={state.path} 
                  onChange={(event) => dispatch({
                  type: 'path',
                  payload: event.target.value,
                  })
                } 
            />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>
          ok.ru/videoembed/
          </InputGroup.Text>
          <FormControl 
          placeholder="videoOkID"
          value={state.videoOkID} 
          onChange={(event) => dispatch({
            type: 'videoOkID',
            payload: event.target.value,
            })
          } 
          />
        </InputGroup>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="info" type="submit" onClick={handleSubmit}>Add</Button>
      </Modal.Footer>

    </Modal>

  </>

)}