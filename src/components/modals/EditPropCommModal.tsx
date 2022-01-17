import React from "react";
import { Button, Modal } from "react-bootstrap";
import { changeVisiblePropComment } from "../../redux/firebase/firebase";

export const EditPropCommModal = (props: {comment: any, id: string, show: boolean, onHide: () => void}) => {

  

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-modal">
            Comment from {props.comment.user}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.comment.comment} {props.comment.id}</p>
        </Modal.Body>
        <Button
        onClick={() => changeVisiblePropComment({
          from: 'movies/',
          id: props.id,
          commentId: props.comment.id,
        })
      }
        >Visible</Button>

      </Modal>
    </>
  )
}