import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addToRealtimeDB } from "../../../redux/firebase/firebase";
import { Formik } from 'formik';
import * as yup from 'yup'
import { IContent } from "../../../redux/firebase/interfaces";


export const AddButton = ({contentLink}:{contentLink: string}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues: IContent = {
    id: '',
    name: '',
    nameEng: '',
    year: '',
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

  const addToDatabase = (values: IContent) => {
    
    try {
      addToRealtimeDB({
        content: {
          id: '', //not use
          name: values.name,
          nameEng: values.nameEng,
          year: values.year,
          about: values.about,
          linkPic: values.linkPic,
          linkVideo: values.linkVideo,
          comments: initialValues.comments
        },
        to: {
          contentId: '',//not use
          contentLink,
        }
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }
  const engRegex = /^[A-z]+$/;

  const schema = yup.object().shape({
    name: yup.string().required(),
    nameEng: yup.string().matches(engRegex, "Only English letters"),
    year: yup.string(),
    about: yup.string().required().min(15,'меньше 15 символов'),
    linkPic: yup.string().required(),
    linkVideo: yup.string().required(),
  });


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
                isInvalid={!!errors.nameEng}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nameEng}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}  controlId="validationFormik01">
              <Form.Label> Год: </Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={values.year}
                onChange={handleChange}
                isValid={touched.year && !errors.year}
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
          <Button type="submit" variant="info"> Добавить</Button>
        </Form>
      )}
    </Formik>
      </Modal.Body>

    </Modal>
  </>
)}


