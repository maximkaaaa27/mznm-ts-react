import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { removeFromRealtimeDB } from '../../redux/firebase/firebase';

export const RemoveButton = ({id, contentLink}: {id: string, contentLink: string}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
    <button type="button" 
    className="btn-close" 
    aria-label="Close"
    onClick={handleShow}
    >
    </button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>

        <Button variant="danger" onClick={() => removeFromRealtimeDB(contentLink, id)}>
            Yes
        </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}