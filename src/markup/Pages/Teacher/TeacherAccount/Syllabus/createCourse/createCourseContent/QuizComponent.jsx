import {
  Button,
  Modal,
  Col,
  Form,
  InputGroup,
  Row,
  FormCheck,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addQuestion,
  addQuiz,
  removeQuestion,
  removeQuiz,
  updateQuestion,
  updateQuiz,
} from "../../../../../../../store/slices/course/createCourseSlice";

import quizIcon from "../../../../../../../images/icon/quiz-icon.png";
import removeIcon from "../../../../../../../images/icon/remove-icon.png";
import plusIcon from "../../../../../../../images/icon/plus_circle.png";

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
      <button className="teacher-button" onClick={handleShow}>
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={quizIcon}
            width={"22px"}
            height={"auto"}
            title="Quiz icon"
          />
          <p className="mb-0 mx-2">Quiz</p>
        </div>
      </button>

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
                      isInvalid={touched.title && !!errors.title} // Set isInvalid based on validation errors
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
                      isInvalid={touched.description && !!errors.description} // Set isInvalid based on validation errors
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
                      isInvalid={touched.duration && !!errors.duration} // Set isInvalid based on validation errors
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
                      isInvalid={
                        touched.numberOfAttempt && !!errors.numberOfAttempt
                      } // Set isInvalid based on validation errors
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
                        isInvalid={
                          touched.numberOfQuestion && !!errors.numberOfQuestion
                        } // Set isInvalid based on validation errors
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
      .nullable()
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
      <button
        className="create-course-edit important"
        onClick={handleShow}
        title="Edit"
        style={{ color: "#ff8a00" }}
      >
        <i class="fa-regular fa-pen-to-square fa-lg mx-1"></i>{" "}
      </button>

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
    <>
      {/* <Button
        variant="delete"
        size="sm"
        onClick={handleDelete}
        style={{ borderRadius: "4px", width: "120px", height: "40px" }}
      >
        Remove
      </Button> */}

      <button onClick={handleDelete} className="teacher-button-remove">
        <img src={removeIcon} title="Remove" />
      </button>
    </>
  );
};

//add question
export const AddQuestionComponent = ({ sectionId, quizIndex }) => {
  const dispatch = useDispatch();

  //useState
  const [show, setShow] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddOption = (push) => {
    push({ content: "Option", answerExplain: "", isCorrect: false });
  };

  const handleRemoveOption = (remove, index) => {
    remove(index);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuestionComponent is missing.`);
  }

  //handle submit
  const handleSubmit = (values) => {
    const { title, options } = values;

    options[correctAnswerIndex].isCorrect = true;

    const question = {
      title: title,
      options: options,
    };

    dispatch(
      addQuestion({
        sectionId: sectionId,
        quizIndex: quizIndex,
        question: question,
      })
    );

    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Question title is required.")
      .trim()
      .max(250, "Question title can not exceed 250 characters."),
    options: yup
      .array()
      .of(
        yup.object().shape({
          content: yup
            .string()
            .required("Option content is required.")
            .trim()
            .max(250, "Option content cannot exceed 250 characters."),
          answerExplain: yup
            .string()
            .trim()
            .max(750, "Answer explain can not exceed 750 characters."),
          isCorrect: yup.bool(),
        })
      )
      .min(1, "Question must have at least one option.")
      .max(10, "Too many option"),
  });
  //form validation

  return (
    <>
      <button
        className="create-course-add-question"
        onClick={handleShow}
        style={{ color: "white", fontWeight: "normal" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <img className="mx-1" src={plusIcon} title="Add question" />
          <p className="mb-0 mx-1">Add Question</p>
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
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: "Question",
              options: [
                { content: "Option 1", answerExplain: "", isCorrect: false },
              ],
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="questionForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md={12}
                    className="mb-3"
                    controlId="validationTitle"
                  >
                    <Form.Label className="create-course-form-lable">
                      Question
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Question title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={touched.title && !!errors.title}
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <p className="create-course-form-lable">Options</p>

                <formik.FieldArray name="options">
                  {({ push, remove }) => (
                    <>
                      {values.options.map((option, index) => (
                        <Row key={index} className="mb-3">
                          <Col md="11">
                            <Form.Group
                              as={Col}
                              md={12}
                              controlId={`validationOptionContent${index}`}
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Content"
                                name={`options[${index}].content`}
                                value={option.content}
                                onChange={handleChange}
                                isInvalid={
                                  touched.options &&
                                  touched.options[index] &&
                                  !!errors.options &&
                                  !!errors.options[index]?.content
                                }
                                className="create-course-input"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.options &&
                                  errors.options[index]?.content}
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md={12}
                              controlId={`validationOptionExplain${index}`}
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Explain"
                                name={`options[${index}].answerExplain`}
                                value={option.answerExplain}
                                onChange={handleChange}
                                isInvalid={
                                  touched.options &&
                                  touched.options[index] &&
                                  !!errors.options &&
                                  !!errors.options[index]?.answerExplain
                                }
                                className="create-course-input"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.options &&
                                  errors.options[index]?.answerExplain}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* isCorrect field */}
                            <Form.Group
                              as={Col}
                              md={12}
                              controlId={`validationOptionIsCorrect${index}`}
                            >
                              <Form.Check
                                type="switch"
                                id={`custom-switch-${index}`}
                                label="Is correct answer?"
                                checked={correctAnswerIndex === index}
                                onChange={() => handleAnswerChange(index)}
                                className="px-0"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={1} className="px-0">
                            {/* <Button
                              variant="danger"
                              onClick={() => handleRemoveOption(remove, index)}
                            >
                              Remove
                            </Button> */}

                            <button
                              onClick={() => handleRemoveOption(remove, index)}
                              className="create-course-modal-remove"
                              type="button"
                              title="Remove"
                            >
                              {/* <img src={removeIcon} title="Remove" /> */}
                              <i
                                class="fa-solid fa-trash"
                                style={{ fontSize: "18px" }}
                              ></i>
                            </button>
                          </Col>
                        </Row>
                      ))}

                      {errors.options && !Array.isArray(errors.options) && (
                        <div className="text-danger mb-3">{errors.options}</div>
                      )}

                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          className="create-course-add-question"
                          onClick={() => handleAddOption(push)}
                          style={{ color: "white", fontWeight: "normal" }}
                          type="button"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <img
                              className="mx-1"
                              src={plusIcon}
                              title="Add option"
                            />
                            <p className="mb-0 mx-1">Add Option</p>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </formik.FieldArray>
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
            form="questionForm"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//update question
export const UpdateQuestionComponent = ({
  sectionId,
  quizIndex,
  questionIndex,
  question,
}) => {
  const dispatch = useDispatch();

  //useState
  const [show, setShow] = useState(false);

  const getIsCorrectOptionkey = () => {
    if (question !== undefined && Array.isArray(question.options)) {
      question.options.map((option, key) => {
        if (option.isCorrect === true) {
          return key;
        }
      });
    }
    return 0;
  };
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    getIsCorrectOptionkey
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddOption = (push) => {
    push({ content: "Option", answerExplain: "", isCorrect: false });
  };

  const handleRemoveOption = (remove, index) => {
    remove(index);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuestionComponent is missing.`);
  }

  //handle submit
  const handleSubmit = (values) => {
    const { title, options } = values;

    const updatedOptions = options.map((option, index) => {
      if (index === correctAnswerIndex) {
        return { ...option, isCorrect: true };
      } else {
        return { ...option, isCorrect: false };
      }
    });

    const question = {
      title: title,
      options: updatedOptions,
    };

    dispatch(
      updateQuestion({
        sectionId: sectionId,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        question: question,
      })
    );

    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Question title is required.")
      .trim()
      .max(250, "Question title can not exceed 250 characters."),
    options: yup
      .array()
      .of(
        yup.object().shape({
          content: yup
            .string()
            .required("Option content is required.")
            .trim()
            .max(250, "Option content cannot exceed 250 characters."),
          answerExplain: yup
            .string()
            .trim()
            .max(750, "Answer explain can not exceed 750 characters."),
          isCorrect: yup.bool(),
        })
      )
      .min(1, "Question must have at least one option.")
      .max(10, "Too many option"),
  });
  //form validation

  return (
    <>
      {/* <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "4px", width: "120px", height: "40px" }}
      >
        Update
      </Button> */}

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
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: question.title,
              options: question.options,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="questionForm" noValidate onSubmit={handleSubmit}>
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
                      placeholder="Question title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <p>Options</p>

                <formik.FieldArray name="options">
                  {({ push, remove }) => (
                    <>
                      {values.options.map((option, index) => (
                        <Row key={index} className="mb-3">
                          <Form.Group
                            as={Col}
                            md={12}
                            controlId={`validationOptionContent${index}`}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Write option"
                              name={`options[${index}].content`}
                              value={option.content}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.options &&
                                !!errors.options[index]?.content
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.options && errors.options[index]?.content}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md={12}
                            controlId={`validationOptionExplain${index}`}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Explain"
                              name={`options[${index}].answerExplain`}
                              value={option.answerExplain}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.options &&
                                !!errors.options[index]?.answerExplain
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.options &&
                                errors.options[index]?.answerExplain}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* isCorrect field */}
                          <Form.Group
                            as={Col}
                            md={12}
                            controlId={`validationOptionIsCorrect${index}`}
                          >
                            <Form.Check
                              type="switch"
                              id={`custom-switch-${index}`}
                              label="Is correct answer?"
                              checked={correctAnswerIndex === index}
                              onChange={() => handleAnswerChange(index)}
                            />
                          </Form.Group>

                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveOption(remove, index)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}

                      {errors.options && !Array.isArray(errors.options) && (
                        <div className="text-danger mb-3">{errors.options}</div>
                      )}

                      <Button
                        variant="primary"
                        onClick={() => handleAddOption(push)}
                      >
                        Add Option
                      </Button>
                    </>
                  )}
                </formik.FieldArray>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="questionForm">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//remove question
export const RemoveQuestionComponent = ({
  sectionId,
  quizIndex,
  questionIndex,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      removeQuestion({
        sectionId: sectionId,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
      })
    );
  };

  return (
    <>
      <button onClick={handleDelete} className="teacher-button-remove">
        <img src={removeIcon} title="Remove" />
      </button>
    </>
  );
};
