import React from "react";
import { Modal } from "react-bootstrap";


export const ThanksCommModal = ({show, onHide} : {show: boolean, onHide: () => void}) => {

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="thanks-modal">
          Thank you for review!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We will check your comment. And he will appear on our page very soon ;) 
        </p>
      </Modal.Body>
    </Modal>
  )
}