import React from 'react';
import { addCommentToDB } from '../redux/firebase/firebase';
import { useAppSelector } from '../redux/hooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';

export const CommentsView = () => {
  const contentType = 'movies/'
  const current = useAppSelector(state => state.firebase.current);
  const userName = useAppSelector(state => state.auth.user.name);


  const addToDatabase = (text: string) => {
    if(current && text && userName) {
      const toDB = {
        payload: {
          comment: text,
          visible: false,
        },
        from: {
          userName, contentType, id: current.id
        }
      }
      addCommentToDB(toDB)
    }
    
  }

  const schema = yup.object().shape({
    text: yup.string().required().min(5),
  });

  return (
    <>
      <Formik
          validationSchema={schema}
          onSubmit={(value) => addToDatabase(value.text)}
          initialValues={{text: ''}}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label> {userName?.split(' ')[0] + ':'} </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ 'height': '80px', 'width': '50%', 'resize': 'none'}}
                  type="text"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  isValid={!!errors.text}
                />
                <Form.Control.Feedback> Ништяк </Form.Control.Feedback>
              </Form.Group>
            <Button type="submit" variant="info"> Оставить отзыв </Button>
          </Form>
          )}
        </Formik>

        <h1>Comments</h1>
      {current.comments.map(item => (
        <div className="d-flex" key={item.date}>
        {item.user}: <p>{item.comment}</p>
        </div>
      ))}
    </>
  )
}