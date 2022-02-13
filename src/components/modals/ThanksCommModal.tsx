import React from "react";
import { Modal } from "react-bootstrap";


export const ThanksCommModal = ({show, onHide} : {show: boolean, onHide: () => void}) => {

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="thanks-modal">
          Спасибо за отзыв
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Мы проверим ваш комментарий и совсем скоро он окажется на странице ;) 
        </p>
      </Modal.Body>
    </Modal>
  )
}