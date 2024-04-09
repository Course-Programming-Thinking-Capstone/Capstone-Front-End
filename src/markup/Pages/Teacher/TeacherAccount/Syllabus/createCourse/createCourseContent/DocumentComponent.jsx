import { Button, Modal, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addDocument,
  updateDocument,
} from "../../../../../../../store/slices/course/createCourseSlice";

import "./../CreateCourse.css";
import { useSelector } from "react-redux";
import { componentNumberSelector } from "../../../../../../../store/selector";
import { changeComponentNumber } from "../../../../../../../store/slices/course/componentNumber";

const DocumentComponent = ({ sectionId, index }) => {
  const dispatch = useDispatch();
  const componentNumber = useSelector(componentNumberSelector);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle submit
  const handleSubmit = (values) => {
    const { lessonName, duration, content } = values;

    const document = {
      name: lessonName.trim(),
      duration: duration,
      content: content.trim(),
      type: "Document",
    };

    const updatedComponentNumber = {
      ...componentNumber[index],
      documentNumber: componentNumber[index].documentNumber + 1,
    };

    dispatch(addDocument({ sectionId: sectionId, document: document }));

    dispatch(
      changeComponentNumber({
        index: index,
        componentNumber: updatedComponentNumber,
      })
    );
    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    lessonName: yup
      .string()
      .required("Lesson name is required")
      .trim()
      .max(250, "Lesson name exceed 250 characters."),
    duration: yup
      .number()
      .required("Duration is required")
      .min(1, "Duration must larger than 0 minute")
      .max(100, "Duration can not exceed 100 minute.")
      .integer(),
    content: yup.string().required("Content is required"),
  });
  //form validation

  return (
    <>
      <button
        className="teacher-button"
        onClick={handleShow}
        disabled={componentNumber[index]?.documentNumber === 3}
      >
        <div className="d-flex justify-content-start align-items-center">
          {/* <img src={documentIcon} title="Document icon" /> */}
          <i className="fa-solid fa-book-open py-0"></i>
          <p className="mb-0 mx-2">
            Document ({componentNumber[index]?.documentNumber}/3)
          </p>
        </div>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="create-course-modal-content"
      >
        <Modal.Header closeButton className="create-course-modal-header">
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              lessonName: "Document",
              duration: 10,
              content: "Content",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="documentForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationLessonName"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Lesson name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Lesson name"
                      name="lessonName"
                      value={values.lessonName}
                      onChange={handleChange}
                      isInvalid={touched.lessonName && !!errors.lessonName} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lessonName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationDuration"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Duration (minute)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Duration"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      isInvalid={touched.duration && !!errors.duration} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationContent"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Content
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Document content"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      isInvalid={touched.content && !!errors.content} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="create-course-close"
            onClick={handleClose}
            type="button"
          >
            Close
          </button>

          <button
            className="create-course-save"
            type="submit"
            form="documentForm"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UpdateDocumentComponent = ({
  sectionId,
  lessonIndex,
  document,
}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle submit
  const handleSubmit = (values) => {
    const { lessonName, duration, content } = values;

    const updateData = {
      name: lessonName.trim(),
      duration: duration,
      content: content.trim(),
      type: "Document",
    };
    dispatch(
      updateDocument({
        sectionId: sectionId,
        lessonIndex: lessonIndex,
        document: updateData,
      })
    );
    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    lessonName: yup
      .string()
      .required("Lesson name is required")
      .transform((value) => (value || "").trim())
      .max(250, "Lesson name exceed 250 characters."),
    duration: yup
      .number()
      .required("Duration is required")
      .min(1, "Duration must larger than 0 minute")
      .max(100, "Duration can not exceed 100 minute.")
      .integer(),
    content: yup.string().required("Content is required"),
  });
  //form validation

  return (
    <>
      <button
        className="create-course-edit important"
        onClick={handleShow}
        title="Edit"
        style={{ color: "#ff8a00" }}
      >
        <i class="fa-regular fa-pen-to-square fa-lg mx-1"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="create-course-modal-content"
      >
        <Modal.Header closeButton className="create-course-modal-header">
          <Modal.Title>Update document</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              lessonName: document.name,
              duration: document.duration,
              content: document.content,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="documentForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationLessonName"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Lesson name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Lesson name"
                      name="lessonName"
                      value={values.lessonName}
                      onChange={handleChange}
                      isInvalid={touched.lessonName && !!errors.lessonName} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lessonName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationDuration"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Duration (minute)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Duration"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      isInvalid={touched.duration && !!errors.duration} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationContent"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Content
                    </Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Document content"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      isInvalid={touched.content && !!errors.content} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="create-course-close"
            onClick={handleClose}
            type="button"
          >
            Close
          </button>

          <button
            className="create-course-save"
            type="submit"
            form="documentForm"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentComponent;
