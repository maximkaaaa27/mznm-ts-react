import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { changeCardDB } from '../../../redux/firebase/firebase';
import { Formik } from 'formik'
import * as yup from 'yup';
import { IContent } from '../../../redux/firebase/interfaces';


export const EditButton = ({item, contentLink}:{item: IContent, contentLink: string}) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {...item}


  const editDatabase = (values: IContent) => {

    try {
      changeCardDB({
        content: {...values},
        to: {
          contentLink,
          contentId: item.id
        }
      });

      handleClose();

    } catch(error) {
        console.error(error)
        handleClose()
    }
  }


  const schema = yup.object().shape({
    name: yup.string().required(),
    linkPic: yup.string(),
    linkVideo: yup.string(),
    about: yup.string(),
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
        }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label> Название: </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name} />
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
                          isValid={touched.about && !errors.about} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    {item.linkVideo &&
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationFormik03">
                          <Form.Label>videoOkID</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="videoOkId"
                            name="linkVideo"
                            value={values.linkVideo}
                            onChange={handleChange}
                            isInvalid={!!errors.linkVideo} />
                          <Form.Control.Feedback type="invalid">
                            {errors.linkVideo}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>}


                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationFormik03">
                        <Form.Label>Link for image</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="linkPic"
                          name="linkPic"
                          value={values.linkPic}
                          onChange={handleChange}
                          isInvalid={!!errors.linkPic} />

                        <Form.Control.Feedback type="invalid">
                          {errors.linkPic}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Button type="submit" variant="info"> Сохранить </Button>
                  </Form>
                );
              }}
    </Formik>
      </Modal.Body>

    </Modal>
    </>
  )
}