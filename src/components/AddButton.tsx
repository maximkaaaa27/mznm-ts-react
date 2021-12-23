import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";


export const AddButton = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


return (
  <>
    <Button variant="secondary" onClick={handleShow}>
      +
    </Button>

    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title> Add $contentName </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form.Label> Основное:</Form.Label>
      <FormControl className="mb-3" placeholder="Название"/>
      <FormControl className="mb-3" placeholder="Информация"/>
      
      
      <Form.Label>Техническое:</Form.Label>
      <InputGroup className="mb-3">
          <InputGroup.Text>
            https://mznm-studio.ru/$contentType/
          </InputGroup.Text>
          <FormControl placeholder="Path"/>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
          ok.ru/videoembed/
          </InputGroup.Text>
          <FormControl placeholder="videoOkID"/>
        </InputGroup>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="info">Save changes</Button>
      </Modal.Footer>

    </Modal>

  </>

)}