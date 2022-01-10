import React from 'react';
import { addComment } from '../redux/firebase/firebase';
import { useAppSelector } from '../redux/hooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const CommentsView = () => {
  const contentType = '/movies'
  const current = useAppSelector(state => state.firebase.current);
  const userName = useAppSelector(state => state.auth.user.name)
  const comments = current?.comments



  const addToDatabase = (text: string) => {
    if(current && text && userName) {
      addComment({name: userName, text, show: false}, contentType, current?.id)
    }
    
  }

  const schema = yup.object().shape({
    text: yup.string().required().min(5),
  });



  return (
    <>
    <h1>Comments</h1>
    {/* {comments && comments.map(item => (
      <div key={item.user}>
        <div className='display-6'>{item.user}</div>
        <p>{item.text}</p>
      </div>
    ))
    } */}
    <Formik
        validationSchema={schema}
        onSubmit={(value) => addToDatabase(value.text)}
        initialValues={{text: ''}}
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
              <Form.Label> {userName} </Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={values.text}
                onChange={handleChange}
                isValid={!!errors.text}
              />
              <Form.Control.Feedback> Ништяк </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" variant="info"> Оставить отзыв </Button>
        </Form>
        )}
      </Formik>
    </>
  )
}