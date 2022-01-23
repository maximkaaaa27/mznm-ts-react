import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addShowToRealtimeDB } from "../../redux/firebase/firebase";
import { Formik } from 'formik';
import * as yup from 'yup';
import { IContentShows } from "../../redux/firebase/interfaces";
import { Plus } from "../icons/plus";


export const AddShowButton = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues: IContentShows = {
    id: '',
    name: '',
    about: '',
    linkPic: '',
    seasons: null
  }

  const addToDatabase = (values: IContentShows) => {
    
    try {
      addShowToRealtimeDB({
        content: {
          id: '', //not use
          name: values.name,
          about: values.about,
          linkPic: values.linkPic,
          seasons: null
        },
        to: {
          showsId: '',//not use
        }
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    about: yup.string().required().min(5),
    linkPic: yup.string().required(),
  });


return (

  <>
    <div className="btn" onClick={handleShow}>
      <Plus />
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Добавить сериал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => addToDatabase(values)}
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
              <Form.Label> Название: </Form.Label>
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
              <Form.Label> Информация: </Form.Label>
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
            <Form.Group as={Col} controlId="validationFormik03">
              <Form.Label>Link for image</Form.Label>
              <Form.Control
                type="text"
                placeholder="linkPic"
                name="linkPic"
                value={values.linkPic}
                onChange={handleChange}
                isInvalid={!!errors.linkPic}
              />

              <Form.Control.Feedback type="invalid">
                {errors.linkPic}
              </Form.Control.Feedback>
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


