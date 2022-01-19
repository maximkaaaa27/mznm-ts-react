import React, {useState} from 'react';
import { addCommentToDB } from '../../redux/firebase/firebase';
import { useAppSelector } from '../../redux/hooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { CommentsPrivateView } from '../views/CommentsPrivateView';
import { ThanksCommModal } from '../modals/ThanksCommModal'
import { CommentsPublicView } from './CommentsPublicView';

export const CommentsView = () => {
  const contentType = 'movies/'
  const current = useAppSelector(state => state.firebase.current);
  const user = useAppSelector(state => state.auth.user);
  const [modalShow, setModalShow] = useState(false);
  const isFullOption = (process.env.REACT_APP_USER_UID === user.uid);



  const addToDatabase = (text: string, resetForm: () => void) => {
    resetForm();
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
    addCommentToDB(toDB);
    setModalShow(true);
    setTimeout(() => setModalShow(false), 5000);
    }
  }

  const schema = yup.object().shape({
    text: yup.string().required().min(5),
  });

  return (
    <>
      <h2>Comments</h2>
      
      {isFullOption ? <CommentsPrivateView /> : <CommentsPublicView comments={current.comments}/>} 
      <Formik
          validationSchema={schema}
          onSubmit={(value, {resetForm}) => addToDatabase(value.text, resetForm)}
          initialValues={{text: ''}}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="m-2" controlId="validationFormik01">
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
        <ThanksCommModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
    </>
  )
}