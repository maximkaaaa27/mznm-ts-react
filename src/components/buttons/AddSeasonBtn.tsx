import React, { useState } from "react";
import { addSeasonToRealtimeDB } from "../../redux/firebase/firebase";
import { ISeason } from "../../redux/firebase/interfaces";
import * as yup from 'yup';
import { Plus } from "../icons/plus";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";

export const AddSeasonBtn = ({id} : {id: string}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    seasonId:'',
    seasonNumberName: '',
    year: '',
  }

  const addToDatabase = (values: ISeason) => {
    
    try {
      addSeasonToRealtimeDB({
        content: {...values}, id
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }

  const schema = yup.object().shape({
    seasonNumberName: yup.string().required(),
    year: yup.string()
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
        onSubmit={(values) => addToDatabase({...values, seasonId: '', episodes: null})}
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
              <Form.Label> Название сезона(? сезон): </Form.Label>
              <Form.Control
                type="text"
                name="seasonNumberName"
                value={values.seasonNumberName}
                onChange={handleChange}
                isValid={touched.seasonNumberName && !errors.seasonNumberName}
              />
              <Form.Control.Feedback> Ништяк </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label> Год: </Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={values.year}
                onChange={handleChange}
                isValid={touched.year && !errors.year}
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