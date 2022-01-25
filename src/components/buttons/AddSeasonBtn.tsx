import React, { useState } from "react";
import { addSeasonToRealtimeDB } from "../../redux/firebase/firebase";
import * as yup from 'yup';
import { Plus } from "../icons/plus";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";

export const AddSeasonBtn = ({id} : {id: string}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    seasonNumber: 0,
    year: '',
  }

  const addToDatabase = ({...values}: {seasonNumber: number, year: string}) => {
    


    try {
      addSeasonToRealtimeDB({
        content: {...values, seasonId: ''},
        id
      });

      handleClose();

    } catch(error) {

      console.error(error);
      handleClose();

    }
  }

  const schema = yup.object().shape({
    seasonNumber: yup.number().required(),
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
        onSubmit={(values) => addToDatabase({...values})}
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
              <Form.Label> № сезона: </Form.Label>
              <Form.Control
                type="number"
                name="seasonNumber"
                value={values.seasonNumber}
                onChange={handleChange}
                isValid={touched.seasonNumber && !errors.seasonNumber}
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