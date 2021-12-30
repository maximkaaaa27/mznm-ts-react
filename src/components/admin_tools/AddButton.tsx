import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { addToRealtimeDB } from "../../redux/firebase/firebase";
import { Formik } from 'formik';
import * as yup from 'yup'

interface IInitState {
  name: string
  about: string
  link: string
  linkPic: string
  linkVideo: string
}


export const AddButton = ({contentLink}:{contentLink: string}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const contentType = contentLink;
  const initialValues: IInitState = {
    name: '',
    about: '',
    link: '',
    linkPic: '',
    linkVideo: '',
  }

  const addToDatabase = (values: IInitState) => {
    try {

      addToRealtimeDB({
        contentType,
        name: values.name,
        about: values.about,
        link: values.link,
        linkPic: values.linkPic,
        linkVideo: values.linkVideo
      });
      handleClose();

    } catch(error) {

      console.error(error)
      handleClose()

    }
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    about: yup.string().required().min(5),
    link: yup.string().required(),
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
            <Form.Group as={Col} controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                https://mznm-studio.ru/{contentLink}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="path"
                  aria-describedby="inputGroupPrepend"
                  name="link"
                  value={values.link}
                  onChange={handleChange}
                  isInvalid={!!errors.link}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.link}
                </Form.Control.Feedback>
              </InputGroup>
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


