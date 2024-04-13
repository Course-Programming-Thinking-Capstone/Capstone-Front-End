import { Modal, Col, Form, Row } from "react-bootstrap";
import { FieldArray, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import { useState } from "react";
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
import { useSelector } from "react-redux";
import { componentNumberSelector } from "../../../../../../../store/selector";
import { changeComponentNumber } from "../../../../../../../store/slices/course/componentNumber";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

//Add quiz
export const AddQuizComponent = ({ sectionId, index }) => {
  const dispatch = useDispatch();

  const componentNumber = useSelector(componentNumberSelector);

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

    const updatedComponentNumber = {
      ...componentNumber[index],
      quizNumber: componentNumber[index].quizNumber + 1,
    };

    dispatch(addQuiz({ sectionId, quiz }));

    dispatch(
      changeComponentNumber({
        index: index,
        componentNumber: updatedComponentNumber,
      })
    );
    setShow(false);
  };

  //form validation
  // const { Formik } = formik;

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
      <button
        className="teacher-button"
        onClick={handleShow}
        disabled={componentNumber[index]?.quizNumber === 2}
        title="Add quiz"
      >
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={quizIcon}
            width={"22px"}
            height={"auto"}
            alt="Quiz icon"
            title="Quiz icon"
          />
          <p className="mb-0 mx-2">
            Quiz ({componentNumber[index]?.quizNumber ?? 0}/2)
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
          <Modal.Title>Add quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
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
                    <Form.Label className="create-course-form-lable">
                      Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quiz title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={touched.title && !!errors.title} // Set isInvalid based on validation errors
                      className="create-course-input"
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
                    <Form.Label className="create-course-form-lable">
                      Description
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={touched.description && !!errors.description} // Set isInvalid based on validation errors
                      className="create-course-input"
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
                    <Form.Label className="create-course-form-lable">
                      Test time (minute)
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
                    md={12}
                    controlId="validationNumberOfAttempt"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Number of attempts
                    </Form.Label>
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
                      }
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfAttempt}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Col md={12}>
                    <Form.Check
                      // md= {12} // prettier-ignore
                      type="switch"
                      id="is-order-random-switch"
                      label="Random order?"
                      className="px-0"
                      checked={isOrderRandom}
                      onChange={() => handleToggleRandom()}
                    />
                  </Col> */}

                  {/* {isOrderRandom && (
                    <Form.Group
                      as={Col}
                      md={12}
                      controlId="validationNumberOfQuestion"
                      className="my-3"
                    >
                      <Form.Label className="create-course-form-lable">
                        Number of questions
                      </Form.Label>
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
                        className="create-course-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.numberOfQuestion}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )} */}
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

          <button className="create-course-save" type="submit" form="videoForm">
            Save
          </button>
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
  // const { Formik } = formik;

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
        className="create-course-modal-content"
      >
        <Modal.Header closeButton className="create-course-modal-header">
          <Modal.Title>Update quiz information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
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
                    <Form.Label className="create-course-form-lable">
                      Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quiz title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title} // Set isInvalid based on validation errors
                      className="create-course-input"
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
                    <Form.Label className="create-course-form-lable">
                      Description
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description} // Set isInvalid based on validation errors
                      className="create-course-input"
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
                    <Form.Label className="create-course-form-lable">
                      Test time (minute)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Duration"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      isInvalid={!!errors.duration} // Set isInvalid based on validation errors
                      className="create-course-input"
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
                    <Form.Label className="create-course-form-lable">
                      Number of attempts
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={10}
                      placeholder="Number of attempts"
                      name="numberOfAttempt"
                      value={values.numberOfAttempt}
                      onChange={handleChange}
                      isInvalid={!!errors.numberOfAttempt} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfAttempt}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Col md={12}>
                    <Form.Check
                      // md= {12} // prettier-ignore
                      type="switch"
                      id="is-order-random-switch"
                      label="Random order?"
                      className="px-0"
                      checked={isOrderRandom}
                      onChange={() => handleToggleRandom()}
                    />
                  </Col> */}

                  {/* {isOrderRandom && (
                    <Form.Group
                      as={Col}
                      md={12}
                      controlId="validationNumberOfQuestion"
                      className="mb-3"
                    >
                      <Form.Label className="create-course-form-lable">
                        Number of questions
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Number of questions"
                        name="numberOfQuestion"
                        value={values.numberOfQuestion}
                        onChange={handleChange}
                        isInvalid={!!errors.numberOfQuestion} // Set isInvalid based on validation errors
                        className="create-course-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.numberOfQuestion}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )} */}
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

          <button className="create-course-save" type="submit" form="videoForm">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//remove quiz
export const RemoveQuizComponent = ({ sectionId, index, sectionIndex }) => {
  const dispatch = useDispatch();

  const componentNumber = useSelector(componentNumberSelector);

  const handleDelete = () => {
    const updatedComponentNumber = {
      ...componentNumber[sectionIndex],
      quizNumber: componentNumber[sectionIndex].quizNumber - 1,
    };

    dispatch(removeQuiz({ sectionId: sectionId, index: index }));

    dispatch(
      changeComponentNumber({
        index: sectionIndex,
        componentNumber: updatedComponentNumber,
      })
    );
  };

  return (
    <>
      <button onClick={handleDelete} className="teacher-button-remove">
        <img src={removeIcon} title="Remove" alt="Remove icon" />
      </button>
    </>
  );
};

//add question
export const AddQuestionComponent = ({ sectionId, quizIndex }) => {
  const dispatch = useDispatch();

  //useState
  const [show, setShow] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddOption = (push, values) => {
    push({
      id: values.options.length + 1,
      content: "Option",
      answerExplain: "",
      isCorrect: false,
    });
  };

  const handleRemoveOption = (remove, index) => {
    if (index <= correctAnswerIndex) {
      let updateIndex = correctAnswerIndex - 1;
      if (updateIndex < 0) {
        updateIndex = 0;
      }
      setCorrectAnswerIndex(updateIndex);
    }
    remove(index);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuestionComponent is missing.`);
  }

  //Dnd

  //sensor
  const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));
  //Dnd

  //handle submit
  const handleSubmit = (values) => {
    const { title, options } = values;

    options[correctAnswerIndex].isCorrect = true;

    const question = {
      title: title,
      options: options.map((option) => {
        return {
          content: option.content,
          answerExplain: option.answerExplain,
          isCorrect: option.isCorrect,
        };
      }),
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
      .min(2, "Question must have at least two options.")
      .max(4, "Question must not exceed four options."),
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
          <img
            className="mx-1"
            src={plusIcon}
            title="Add question"
            alt="Plus icon"
          />
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
                {
                  id: 1,
                  content: "Option 1",
                  answerExplain: "",
                  isCorrect: false,
                },
                {
                  id: 2,
                  content: "Option 2",
                  answerExplain: "",
                  isCorrect: false,
                },
              ],
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              setFieldValue,
            }) => (
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

                <FieldArray name="options">
                  {({ push, remove }) => {
                    //set options array
                    const updateOptions = (updatedOptions) => {
                      setFieldValue("options", updatedOptions);
                    };

                    //handle drag end
                    const getQuestionItemIndex = (id) => {
                      return values.options.findIndex(
                        (option) => option.id === id
                      );
                    };

                    const handelDragEnd = (event) => {
                      const { active, over } = event;

                      if (active.id === over.id) return;

                      const originalPos = getQuestionItemIndex(active.id);
                      const newPos = getQuestionItemIndex(over.id);

                      if (originalPos === correctAnswerIndex) {
                        setCorrectAnswerIndex(newPos);
                        handleAnswerChange(newPos);
                      } else if (newPos === correctAnswerIndex) {
                        setCorrectAnswerIndex(originalPos);
                        handleAnswerChange(originalPos);
                      } else if (
                        originalPos > correctAnswerIndex &&
                        newPos < correctAnswerIndex
                      ) {
                        setCorrectAnswerIndex(correctAnswerIndex + 1);
                      } else if (
                        originalPos < correctAnswerIndex &&
                        newPos > correctAnswerIndex
                      ) {
                        setCorrectAnswerIndex(correctAnswerIndex - 1);
                      }

                      const updatedOptions = arrayMove(
                        values.options,
                        originalPos,
                        newPos
                      );
                      updateOptions(updatedOptions);
                    };

                    return (
                      // Dnd here

                      <>
                        <DndContext
                          collisionDetection={closestCorners}
                          sensors={sensor}
                          onDragEnd={handelDragEnd}
                        >
                          <SortableContext
                            items={values.options}
                            strategy={verticalListSortingStrategy}
                          >
                            {values.options.map((option, index) => (
                              <QuestionItem
                                key={index}
                                index={index}
                                option={option}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                correctAnswerIndex={correctAnswerIndex}
                                handleAnswerChange={handleAnswerChange}
                                handleRemoveOption={handleRemoveOption}
                                remove={remove}
                              />
                            ))}
                          </SortableContext>
                        </DndContext>

                        {errors.options && !Array.isArray(errors.options) && (
                          <div className="text-danger mb-3">
                            {errors.options}
                          </div>
                        )}

                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="create-course-add-question"
                            onClick={() => handleAddOption(push, values)}
                            style={{ color: "white", fontWeight: "normal" }}
                            type="button"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <img
                                className="mx-1"
                                src={plusIcon}
                                title="Add option"
                                alt="Plus icon"
                              />
                              <p className="mb-0 mx-1">Add Option</p>
                            </div>
                          </button>
                        </div>
                      </>
                    );
                  }}
                </FieldArray>
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

//question item component
const QuestionItem = ({
  index,
  option,
  handleChange,
  touched,
  errors,
  correctAnswerIndex,
  handleAnswerChange,
  handleRemoveOption,
  remove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });
  const [isDragging, setIsDragging] = useState(false);

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
  };

  const handleButtonMouseDown = () => {
    setIsDragging(true);
  };

  const handleButtonMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Row
      /*key={index}*/ ref={setNodeRef}
      style={style}
      // {...attributes}
      // {...listeners}
      className="mb-3"
    >
      <Col md="10">
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
            autoComplete="off"
            className="create-course-input"
          />
          <Form.Control.Feedback type="invalid">
            {errors.options && errors.options[index]?.content}
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
            autoComplete="off"
            className="create-course-input"
          />
          <Form.Control.Feedback type="invalid">
            {errors.options && errors.options[index]?.answerExplain}
          </Form.Control.Feedback>
        </Form.Group>

        {/* isCorrect field */}
        <Form.Group
          as={Col}
          md={12}
          controlId={`validationOptionIsCorrect${index}`}
        >
          <Form.Check
            type="radio"
            id={`custom-switch-${index}`}
            label="Is correct answer?"
            checked={correctAnswerIndex === index}
            onChange={() => handleAnswerChange(index)}
            className="px-0"
          />
        </Form.Group>
      </Col>

      <Col md={1} className="px-0">
        <button
          onClick={() => handleRemoveOption(remove, index)}
          className="create-course-modal-drag"
          type="button"
          title="Remove"
        >
          <i class="fa-solid fa-trash" style={{ fontSize: "18px" }}></i>
        </button>
      </Col>

      <Col md={1} className="px-0">
        <div
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          className="create-course-modal-drag"
          disabled
          title="Drag"
          {...attributes}
          {...listeners}
        >
          <i className="fa-regular fa-hand" style={{ fontSize: "18px" }}></i>
        </div>
      </Col>
    </Row>
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
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

  const handleClose = () => {
    setCorrectAnswerIndex(-1);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddOption = (push, values) => {
    push({
      id: values.options.length + 1,
      content: "Option",
      answerExplain: "",
      isCorrect: false,
    });
  };

  const handleRemoveOption = (remove, index) => {
    if (index <= correctAnswerIndex) {
      let updateIndex = correctAnswerIndex - 1;
      if (updateIndex < 0) {
        updateIndex = 0;
      }
      setCorrectAnswerIndex(updateIndex);
    }
    remove(index);
  };

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuestionComponent is missing.`);
  }

  //Dnd

  //sensor
  const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));
  //Dnd

  //handle submit
  const handleSubmit = (values) => {
    const { title, options } = values;

    //need to modify here
    const updatedOptions = options.map((option, index) => {
      if (index === correctAnswerIndex) {
        return {
          content: option.content,
          answerExplain: option.answerExplain,
          isCorrect: true,
        };
      } else {
        return {
          content: option.content,
          answerExplain: option.answerExplain,
          isCorrect: false,
        };
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
      .min(2, "Question must have at least two options.")
      .max(4, "Question must not exceed four options."),
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
          <Modal.Title>Update Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: question.title,
              options: question.options.map((option, index) => {
                return {
                  id: index + 1,
                  content: option.content,
                  answerExplain: option.answerExplain,
                  isCorrect: option.isCorrect,
                };
              }),
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              setFieldValue,
            }) => (
              <Form id="questionForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md={12}
                    className="mb-3"
                    controlId="validationTitle"
                  >
                    <Form.Label className="create-course-form-lable">
                      Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Question title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <p>Options</p>

                <FieldArray name="options">
                  {({ push, remove }) => {
                    //set options array
                    const updateOptions = (updatedOptions) => {
                      setFieldValue("options", updatedOptions);
                    };

                    //handle drag end
                    const getQuestionItemIndex = (id) => {
                      return values.options.findIndex(
                        (option) => option.id === id
                      );
                    };

                    const handelDragEnd = (event) => {
                      const { active, over } = event;

                      if (active.id === over.id) return;

                      const originalPos = getQuestionItemIndex(active.id);
                      const newPos = getQuestionItemIndex(over.id);

                      if (originalPos === correctAnswerIndex) {
                        setCorrectAnswerIndex(newPos);
                        handleAnswerChange(newPos);
                      } else if (newPos === correctAnswerIndex) {
                        setCorrectAnswerIndex(originalPos);
                        handleAnswerChange(originalPos);
                      } else if (
                        originalPos > correctAnswerIndex &&
                        newPos < correctAnswerIndex
                      ) {
                        setCorrectAnswerIndex(correctAnswerIndex + 1);
                      } else if (
                        originalPos < correctAnswerIndex &&
                        newPos > correctAnswerIndex
                      ) {
                        setCorrectAnswerIndex(correctAnswerIndex - 1);
                      }

                      const updatedOptions = arrayMove(
                        values.options,
                        originalPos,
                        newPos
                      );
                      updateOptions(updatedOptions);
                    };

                    return (
                      // Dnd here
                      <>
                        <DndContext
                          collisionDetection={closestCorners}
                          sensors={sensor}
                          onDragEnd={handelDragEnd}
                        >
                          <SortableContext
                            items={values.options}
                            strategy={verticalListSortingStrategy}
                          >
                            {correctAnswerIndex !== undefined &&
                              values.options.map((option, index) => (
                                <QuestionUpdateItem
                                  key={index}
                                  index={index}
                                  option={option}
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  correctAnswerIndex={correctAnswerIndex}
                                  handleAnswerChange={handleAnswerChange}
                                  handleRemoveOption={handleRemoveOption}
                                  remove={remove}
                                />
                              ))}
                          </SortableContext>
                        </DndContext>

                        {errors.options && !Array.isArray(errors.options) && (
                          <div className="text-danger mb-3">
                            {errors.options}
                          </div>
                        )}

                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="create-course-add-question"
                            onClick={() => handleAddOption(push, values)}
                            style={{ color: "white", fontWeight: "normal" }}
                            type="button"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <img
                                className="mx-1"
                                src={plusIcon}
                                title="Add option"
                                alt="Plus icon"
                              />
                              <p className="mb-0 mx-1">Add Option</p>
                            </div>
                          </button>
                        </div>
                      </>
                    );
                  }}
                </FieldArray>
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

//question item component
const QuestionUpdateItem = ({
  index,
  option,
  handleChange,
  touched,
  errors,
  correctAnswerIndex,
  handleAnswerChange,
  handleRemoveOption,
  remove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });
  const [isDragging, setIsDragging] = useState(false);

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
  };

  const handleButtonMouseDown = () => {
    setIsDragging(true);
  };

  const handleButtonMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Row
      /*key={index}*/ ref={setNodeRef}
      style={style}
      // {...attributes}
      // {...listeners}
      className="mb-3"
    >
      <Col md="10">
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
            autoComplete="off"
            className="create-course-input"
          />
          <Form.Control.Feedback type="invalid">
            {errors.options && errors.options[index]?.content}
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
            autoComplete="off"
            className="create-course-input"
          />
          <Form.Control.Feedback type="invalid">
            {errors.options && errors.options[index]?.answerExplain}
          </Form.Control.Feedback>
        </Form.Group>

        {/* isCorrect field */}
        <Form.Group
          as={Col}
          md={12}
          controlId={`validationOptionIsCorrect${index}`}
        >
          <Form.Check
            type="radio"
            id={`custom-switch-${index}`}
            label="Is correct answer?"
            checked={
              correctAnswerIndex === -1
                ? option.isCorrect === true
                : correctAnswerIndex === index
            }
            onChange={() => handleAnswerChange(index)}
            className="px-0"
          />
        </Form.Group>
      </Col>

      <Col md={1} className="px-0">
        <button
          onClick={() => handleRemoveOption(remove, index)}
          className="create-course-modal-drag"
          type="button"
          title="Remove"
        >
          <i class="fa-solid fa-trash" style={{ fontSize: "18px" }}></i>
        </button>
      </Col>

      <Col md={1} className="px-0">
        <div
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          className="create-course-modal-drag"
          disabled
          title="Drag"
          {...attributes}
          {...listeners}
        >
          <i className="fa-regular fa-hand" style={{ fontSize: "18px" }}></i>
        </div>
      </Col>
    </Row>
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
        <img src={removeIcon} title="Remove" alt="Remove icon" />
      </button>
    </>
  );
};
