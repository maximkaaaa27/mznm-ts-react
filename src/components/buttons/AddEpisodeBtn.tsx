import React, { useState } from "react";
import { addEpisodeToRealtimeDB } from "../../redux/firebase/firebase";
import * as yup from 'yup';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import { IEpisode } from "../../redux/firebase/interfaces";

export const AddEpisodeBtn = ({id, seasonId} : {id: string, seasonId: string}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    name: '',
    about: '',
    linkPic: '',
    linkVideo: '',
    comments: {'init': {
      textContent: 'init',
      date: 1,
      userName: 'init',
      userPic: 'pic',
      visible: false,
      id: 'init'
    }}
  }

  const addToDatabase = ({...values}: IEpisode) => {
    


    try {
      addEpisodeToRealtimeDB({
        content: {...values},
        id, seasonId
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    about: yup.string(),
    linkPic: yup.string(),
    linkVideo: yup.string(),
  });


return (

  <>
    <div className="btn btn-info" onClick={handleShow}>
      <span className="lead">Add episode </span>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Добавить сериал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => addToDatabase({...values, episodeId: ''})}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3">
            <Form.Group as={Col}  controlId="validationFormik01">
              <Form.Label> Название серии: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback> Ништяк </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label> Описание: </Form.Label>
              <Form.Control
                type="text"
                name="about"
                value={values.about}
                onChange={handleChange}
                isValid={touched.about && !errors.about}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label> linkPic: </Form.Label>
              <Form.Control
                type="text"
                name="linkPic"
                value={values.linkPic}
                onChange={handleChange}
                isValid={touched.linkPic && !errors.linkPic}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label> linkVideo: </Form.Label>
              <Form.Control
                type="text"
                name="linkVideo"
                value={values.linkVideo}
                onChange={handleChange}
                isValid={touched.linkVideo && !errors.linkVideo}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          

          <Button type="submit" variant="info"> Добавить</Button>
        </Form>
      )}
    </Formik>
      </Modal.Body>

    </Modal>
  </>
)}