import React, { useState } from 'react';
import { IInitState } from './interfaces';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { changeCardDB } from '../../redux/firebase/firebase';
import { IPayload } from '../../redux/firebase/firebaseSlice';
import { Formik } from 'formik'
import * as yup from 'yup';


export const EditButton = ({item, contentLink}:{item: IPayload, contentLink: string}) => {

  const contentType = contentLink;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues: IInitState = {
    name: item.name,
    about: item.about,
    linkPic: item.linkPic,
    linkVideo: item.linkVideo,
    comments: item.comments
  }

  const editDatabase = (values: IInitState) => {
    try {

      changeCardDB({
        contentType,
        name: values.name,
        about: values.about,
        linkPic: values.linkPic,
        linkVideo: values.linkVideo,
        comments: item.comments
      }, item.id);

      handleClose();

    } catch(error) {
        console.error(error)
        handleClose()
    }
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    about: yup.string().required().min(5),
    linkPic: yup.string().required(),
    linkVideo: yup.string().required(),
  });

  return (
    <>
    <div className="btn" onClick={handleShow}>
      ...
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Изменить </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => editDatabase(values)}
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
              <Form.Label>videoOkID</Form.Label>
              <Form.Control
                type="text"
                placeholder="videoOkId"
                name="linkVideo"
                value={values.linkVideo}
                onChange={handleChange}
                isInvalid={!!errors.linkVideo}
              />

              <Form.Control.Feedback type="invalid">
                {errors.linkVideo}
              </Form.Control.Feedback>
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
                {errors.linkVideo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" variant="info"> Сохранить </Button>
        </Form>
      )}
    </Formik>
      </Modal.Body>

    </Modal>
    </>
  )
}