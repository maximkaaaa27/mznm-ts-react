import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { changeShowCardDB } from "../../../redux/firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import { IContentShows } from "../../../redux/firebase/interfaces";

export const EditShowBtn = ({
  item,
  contentLink,
}: {
  item: any;
  contentLink: string;
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues: IContentShows & { linkVideo: string } = { ...item };
  const nameRegex = /^[a-z]+$/;

  const editDatabase = (values: IContentShows & { linkVideo: string }) => {
    try {
      changeShowCardDB({
        content: { ...values },
        to: {
          contentLink,
          contentId: item.id,
        },
      });

      handleClose();
    } catch (error) {
      console.error(error);
      handleClose();
    }
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    nameEng: yup.string(),
    linkPic: yup.string(),
    link: yup
      .string()
      .required()
      .matches(nameRegex, "Only low English letters")
      .min(4)
      .max(12),
    linkVideo: yup.string(),
    totalSeasons: yup.number(),
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
                        isValid={touched.name && !errors.name}
                      />
                      <Form.Control.Feedback> Ништяк </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label> Оригинальное название(eng): </Form.Label>
                      <Form.Control
                        type="text"
                        name="nameEng"
                        value={values.nameEng}
                        onChange={handleChange}
                        isValid={touched.nameEng && !errors.nameEng}
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
                  {item.linkVideo && (
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
                  )}

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label> Количество сезонов: </Form.Label>
                      <Form.Control
                        type="string"
                        name="totalSeasons"
                        value={values.totalSeasons}
                        onChange={handleChange}
                        isValid={touched.totalSeasons && !errors.totalSeasons}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>
                        {" "}
                        Link (min: 4, max:12 only Eng Letter){" "}
                      </Form.Label>
                      <Form.Control
                        type="string"
                        name="link"
                        value={values.link}
                        onChange={handleChange}
                        disabled
                        readOnly
                        isValid={!!errors.link}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.link}
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
                        {errors.linkPic}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button type="submit" variant="info">
                    {" "}
                    Сохранить{" "}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
