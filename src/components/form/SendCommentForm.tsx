import React, {useState} from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from "react-bootstrap";
import { ThanksCommModal } from "../modals/ThanksCommModal";
import { addCommentToDB } from "../../redux/firebase/firebase";
import { IContent } from "../../redux/firebase/interfaces";


export const SendCommentForm = ({userName, userPic, contentLink, current} : {
  userName: string 
  userPic: string 
  contentLink: string 
  current: IContent 
}) => {

  const [modalShow, setModalShow] = useState(false);

  const addToDatabase = (textContent: string, resetForm: () => void) => {
    const date = Number(new Date());
    resetForm();

    addCommentToDB({
      comment: {
        contains: {
          visible: false,
          textContent,
          userName,
          userPic,
          date, 
          id: '', //not use         
        }
      },
      to: {
        contentLink,
        contentId: current.id,
        commentId: ''//not use
      }
    });
    setModalShow(true);
    setTimeout(() => setModalShow(false), 3000);
    }
  

  const schema = yup.object().shape({
    textContent: yup.string().required('пусто пусто'),
  });


  return (
    <div className="comment_send">
    <Formik
      validationSchema={schema}
      onSubmit={(value, {resetForm}) => addToDatabase(value.textContent, resetForm)}
      initialValues={{
        textContent: ''
      }}
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
          <Form.Group className="comment_send__field" controlId="validationFormik01">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="textContent"
              value={values.textContent}
              onChange={handleChange}
              isInvalid={!!errors.textContent}
            />
            <Form.Control.Feedback type="invalid">
              {errors.textContent}
            </Form.Control.Feedback> 

            <Button 
              className="comment_send__field__submit-btn"
              type="submit" 
              variant="info" 
            >
              Send
            </Button>

          </Form.Group>
            
          </Form>
          )}
        </Formik>
        <ThanksCommModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
    </div>
  )
}