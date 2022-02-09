import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addShowToRealtimeDB } from "../../../redux/firebase/firebase";
import { IContentShows } from "../../../redux/firebase/interfaces";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Plus } from "../../icons/plus";


export const AddShowButton = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    name: '',
    nameEng: '',
    about: '',
    totalSeasons: 0,
    linkPic: '',
    link: ''
  }

  const addToDatabase = (values: IContentShows) => {
    
    try {
      addShowToRealtimeDB({
        content: {...values}
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }

  const lowEngRegex = /^[a-z]+$/;

  const schema = yup.object().shape({
    name: yup.string().required(),
    nameEng: yup.string(),
    about: yup.string().required(),
    linkPic: yup.string().required(),
    link: yup.string().required().matches(lowEngRegex, "Only low English letters").min(4).max(12),
    totalSeasons: yup.number(),
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
        onSubmit={(values) => addToDatabase({...values, seasons: null})}
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
            <Form.Group as={Col}  controlId="validationFormik01">
              <Form.Label> Оригинальное название(eng): </Form.Label>
              <Form.Control
                type="text"
                name="nameEng"
                value={values.nameEng}
                onChange={handleChange}
                isValid={touched.nameEng && !errors.nameEng}
              />
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
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label> Количество сезонов: </Form.Label>
              <Form.Control
                type="string"
                name="totalSeasons"
                value={values.totalSeasons}
                onChange={handleChange}
                isValid={touched.totalSeasons && !errors.totalSeasons}
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

          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik03">
              <Form.Label>Link (min: 4, max:12 only Eng Letters</Form.Label>
              <Form.Control
                type="text"
                placeholder="link"
                name="link"
                value={values.link}
                onChange={handleChange}
                isInvalid={!!errors.link}
              />

              <Form.Control.Feedback type="invalid">
                {errors.link}
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


