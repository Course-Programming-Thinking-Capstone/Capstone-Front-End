import { Button, Modal, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addQuiz,
  removeQuiz,
  updateQuiz,
} from "../../../../../../../store/slices/course/createCourseSlice";

//Add quiz
export const AddQuizComponent = ({ sectionId }) => {
  const dispatch = useDispatch();

  //useState
  const [show, setShow] = useState(false);
  const [isOrderRandom, setIsOrderRandom] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggleRandom = () => {
    setIsOrderRandom(!isOrderRandom);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuizComponent is missing.`);
  }

  /*
    ** Add quiz information to section. action is: {sectionId, quiz {

          "title": "string",
          "description"?: "string",
          "duration": 0,
          "isOrderRandom"?: true,
          "numberOfQuestion"?: 0,
          "numberOfAttempt"?: 0,
    }}
    */

  //handle submit
  const handleSubmit = (values) => {
    const { title, description, duration, numberOfAttempt, numberOfQuestion } =
      values;

    const quiz = {
      title: title,
      description: description,
      duration: duration,
      numberOfAttempt: numberOfAttempt,
      isOrderRandom: isOrderRandom,
      numberOfQuestion: numberOfQuestion,
    };

    if (!isOrderRandom) {
      quiz.numberOfQuestion = undefined;
    } else {
      if (quiz.numberOfQuestion === undefined) quiz.numberOfQuestion = 100;
    }

    dispatch(addQuiz({ sectionId, quiz }));
    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Quiz title is required.")
      .trim()
      .max(250, "Quiz title can not exceed 250 characters."),
    description: yup
      .string()
      .trim()
      .max(750, "Quiz description can not exceed 750 characters."),
    duration: yup
      .number()
      .required("Duration is required")
      .min(1, "Duration must larger than 1 minute.")
      .max(100, "Duration can not exceed 100 minute")
      .integer(),
    numberOfAttempt: yup
      .number()
      .integer()
      .min(1, "Number of attempt must larger than 1 times.")
      .max(10, "Number of attempt can not exceed 10 times."),
    numberOfQuestion: yup
      .number()
      .integer()
      .min(1, "Number of question must larger than 0.")
      .max(100, "Number of question too big."),
  });
  //form validation

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "4px", width: "120px", height: "40px" }}
      >
        Add quiz
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: "Quiz",
              description: undefined,
              duration: 10,
              numberOfAttempt: 3,
              numberOfQuestion: undefined,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="videoForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md={12}
                    className="mb-3"
                    controlId="validationTitle"
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quiz title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationDescription"
                    className="mb-3"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationDuration"
                    className="mb-3"
                  >
                    <Form.Label>Duration (minute)</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Duration"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      isInvalid={!!errors.duration} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationNumberOfAttempt"
                    className="mb-3"
                  >
                    <Form.Label>Number of attempts</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={10}
                      placeholder="Number of attempts"
                      name="numberOfAttempt"
                      value={values.numberOfAttempt}
                      onChange={handleChange}
                      isInvalid={!!errors.numberOfAttempt} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfAttempt}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col md={12}>
                    <Form.Check
                      // md= {12} // prettier-ignore
                      type="switch"
                      id="is-order-random-switch"
                      label="Random order?"
                      className="px-0"
                      checked={isOrderRandom}
                      onChange={() => handleToggleRandom()}
                    />
                  </Col>

                  {isOrderRandom && (
                    <Form.Group
                      as={Col}
                      md={12}
                      controlId="validationNumberOfQuestion"
                    >
                      <Form.Label>Number of questions</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Number of questions"
                        name="numberOfQuestion"
                        value={values.numberOfQuestion}
                        onChange={handleChange}
                        isInvalid={!!errors.numberOfQuestion} // Set isInvalid based on validation errors
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.numberOfQuestion}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="videoForm">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//Update quiz
export const UpdateQuizComponent = ({ sectionId, quizIndex, quiz }) => {
  const dispatch = useDispatch();

  //useState
  const [show, setShow] = useState(false);
  const [isOrderRandom, setIsOrderRandom] = useState(quiz.isOrderRandom);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggleRandom = () => {
    setIsOrderRandom(!isOrderRandom);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuizComponent is missing.`);
  }

  /*
      ** Add quiz information to section. action is: {sectionId, quiz {
  
            "title": "string",
            "description"?: "string",
            "duration": 0,
            "isOrderRandom"?: true,
            "numberOfQuestion"?: 0,
            "numberOfAttempt"?: 0,
      }}
      */

  //handle submit
  const handleSubmit = (values) => {
    const { title, description, duration, numberOfAttempt, numberOfQuestion } =
      values;

    const data = {
      title: title,
      description: description,
      duration: duration,
      numberOfAttempt: numberOfAttempt,
      isOrderRandom: isOrderRandom,
      numberOfQuestion: numberOfQuestion,
    };

    if (!isOrderRandom) {
      data.numberOfQuestion = undefined;
    } else {
      if (data.numberOfQuestion === undefined) data.numberOfQuestion = 100;
    }

    //log form data
    console.log(`Quiz data when submit form: ${JSON.stringify(data, null, 2)}`);

    dispatch(
      updateQuiz({ sectionId: sectionId, index: quizIndex, quiz: data })
    );
    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Quiz title is required.")
      .trim()
      .max(250, "Quiz title can not exceed 250 characters."),
    description: yup
      .string()
      .trim()
      .max(750, "Quiz description can not exceed 750 characters."),
    duration: yup
      .number()
      .required("Duration is required")
      .min(1, "Duration must larger than 1 minute.")
      .max(100, "Duration can not exceed 100 minute")
      .integer(),
    numberOfAttempt: yup
      .number()
      .integer()
      .min(1, "Number of attempt must larger than 1 times.")
      .max(10, "Number of attempt can not exceed 10 times."),
    numberOfQuestion: yup
      .number()
      .integer()
      .min(1, "Number of question must larger than 0.")
      .max(100, "Number of question too big."),
  });
  //form validation

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "4px", width: "120px", height: "40px" }}
      >
        Update
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update quiz information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: quiz.title,
              description: quiz.description,
              duration: quiz.duration,
              numberOfAttempt: quiz.numberOfAttempt,
              numberOfQuestion: quiz.numberOfQuestion,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="videoForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md={12}
                    className="mb-3"
                    controlId="validationTitle"
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quiz title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationDescription"
                    className="mb-3"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationDuration"
                    className="mb-3"
                  >
                    <Form.Label>Duration (minute)</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Duration"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      isInvalid={!!errors.duration} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="validationNumberOfAttempt"
                    className="mb-3"
                  >
                    <Form.Label>Number of attempts</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={10}
                      placeholder="Number of attempts"
                      name="numberOfAttempt"
                      value={values.numberOfAttempt}
                      onChange={handleChange}
                      isInvalid={!!errors.numberOfAttempt} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfAttempt}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col md={12}>
                    <Form.Check
                      // md= {12} // prettier-ignore
                      type="switch"
                      id="is-order-random-switch"
                      label="Random order?"
                      className="px-0"
                      checked={isOrderRandom}
                      onChange={() => handleToggleRandom()}
                    />
                  </Col>

                  {isOrderRandom && (
                    <Form.Group
                      as={Col}
                      md={12}
                      controlId="validationNumberOfQuestion"
                    >
                      <Form.Label>Number of questions</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Number of questions"
                        name="numberOfQuestion"
                        value={values.numberOfQuestion}
                        onChange={handleChange}
                        isInvalid={!!errors.numberOfQuestion} // Set isInvalid based on validation errors
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.numberOfQuestion}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="videoForm">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//remove quiz
export const RemoveQuizComponent = ({ sectionId, index }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeQuiz({ sectionId: sectionId, index: index }));
  };

  return (
    <Button
      variant="delete"
      size="sm"
      onClick={handleDelete}
      style={{ borderRadius: "4px", width: "120px", height: "40px" }}
    >
      Remove
    </Button>
  );
};
