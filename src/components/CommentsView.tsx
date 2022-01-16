import React from 'react';
import { addCommentToDB } from '../redux/firebase/firebase';
import { useAppSelector } from '../redux/hooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { ManageComment } from './admin_tools/ManageComment';

export const CommentsView = () => {
  const contentType = 'movies/'
  const current = useAppSelector(state => state.firebase.current);
  const user = useAppSelector(state => state.auth.user);
  const isFullOption = (process.env.REACT_APP_USER_UID === user.uid)


  const addToDatabase = (text: string) => {
    if(current && text && user.name) {
      const toDB = {
        payload: {
          comment: text,
          visible: false,
        },
        from: {
          userName: user.name, contentType, id: current.id
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
      <div>
        <h2>Comments</h2>
          {current.comments.map(item => (
            <div key={item.date}>
              {item.visible &&
                <div> 
                  <h6>{item.user}</h6> 
                  <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">
                    <p>{item.comment}</p>
                  </div>
                </div>
              }
            </div>      
        ))}
        </div>
        {isFullOption && <ManageComment />}
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
              </Form.Group>
            <Button type="submit" variant="info"> Оставить отзыв </Button>
          </Form>
          )}
        </Formik>
    </>
  )
}