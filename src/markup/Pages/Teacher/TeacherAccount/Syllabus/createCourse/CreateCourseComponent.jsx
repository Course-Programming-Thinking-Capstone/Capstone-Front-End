import { useDispatch, useSelector } from "react-redux";
import {
  createCourseIdSelector,
  createCourseSelector,
} from "../../../../../../store/selector";
import videoIcon from "../../../../../../images/icon/video-icon.png";
import quizIcon from "../../../../../../images/icon/quiz-icon.png";
import documentIcon from "../../../../../../images/icon/document-icon.png";
import { useEffect, useRef, useState } from "react";
import { getCourseByIdAsync } from "../../../../../../store/thunkApis/course/courseThunk";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Col,
  Container,
  Form,
  Image,
  Row,
  Placeholder,
} from "react-bootstrap";
import VideoComponent, {
  RemoveComponent,
  UpdateVideoComponent,
} from "./createCourseContent/VideoComponent";
import DocumentComponent, {
  UpdateDocumentComponent,
} from "./createCourseContent/DocumentComponent";
import {
  getCloudVideoUrl,
  updateCourseApi,
  updateCoursePictureApi,
} from "../../../../../../helper/apis/course/course";
import {
  AddQuestionComponent,
  AddQuizComponent,
  RemoveQuestionComponent,
  RemoveQuizComponent,
  UpdateQuestionComponent,
  UpdateQuizComponent,
} from "./createCourseContent/QuizComponent";

import checkButton from "../../../../../../images/course/checked button.png";
import uncheckButton from "../../../../../../images/course/uncheck button.png";
import {
  setDescription,
  swapLessonOrder,
  swapQuizOrder,
} from "../../../../../../store/slices/course/createCourseSlice";
import { changeData } from "../../../../../../store/slices/course/componentNumber";

//dnd kit
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { styled } from "@mui/material/styles";
import ButtonMui from "@mui/material/Button";

import { CSS } from "@dnd-kit/utilities";
import { ToastContainer, toast } from "react-toastify";
import {
  DriveFolderUpload,
  KeyboardBackspace,
  Save,
  Upload,
} from "@mui/icons-material";

import { Button } from "@mui/material";

const CreateCourseComponent = () => {
  const dispatch = useDispatch();
  const createCourse = useSelector(createCourseSelector);

  const navigate = useNavigate();

  const courseId = useSelector(createCourseIdSelector);

  if (!courseId || courseId === 0) {
    navigate('/teacher/syllabuses');
  }
  // console.log(`CourseId: ${courseId}`);\

  //useRef
  const checkConfirmRef = useRef(null);

  //use state
  const [coursePictureFile, setCoursePictureFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescriptionInput] = useState(undefined);
  const [confirm, setConfirm] = useState(false);

  //notification
  const notifyApiFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyApiSucess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleFileInputChange = (event) => {
    setCoursePictureFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  const handleConfirmChange = () => {
    setConfirm(!confirm);
  };

  const goBack = () => {
    navigate(-1);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // fetch course detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getCourseByIdAsync(courseId, "manage"));

        //maybe bug
        setDescriptionInput(response?.payload?.description);

        //init data for component number
        const initSectionNumber = await response?.payload?.sections?.map(
          (section) => {
            let videoNumber = 0;
            let documentNumber = 0;
            let quizNumber = 0;

            section.lessons.forEach((lesson) => {
              if (lesson.type === "Video") {
                videoNumber++;
              } else if (lesson.type === "Document") {
                documentNumber++;
              }
            });

            quizNumber = section.quizzes.length;

            return {
              videoNumber,
              documentNumber,
              quizNumber,
            };
          }
        );

        dispatch(changeData(initSectionNumber));

      } catch (error) {

        let message;

        if (error.response) {
          message = error.response?.data?.message || "Error when load data.";
        } else {
          message = error.message || "Error when load data.";
        }

        notifyApiFail(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  //Create course
  const saveCourse = async (action) => {
    //update description
    dispatch(setDescription({ description: description }));

    const updateData = async () => {
      try {
        if (action === "Post") {
          if (confirm === false) {
            checkConfirmRef.current.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }

        setIsLoading(true);

        //upload course picture
        if (coursePictureFile != null) {
          const pictureUrl = await updateCoursePictureApi({
            id: createCourse.id,
            file: coursePictureFile,
          });
        }

        const updatedData = { ...createCourse, description };

        await updateCourseApi({
          id: createCourse.id,
          action: action,
          data: updatedData,
        });

        if (action === "Save") {
          notifyApiSucess("Update sucesss.");
        } else if (action === "Post") {
          notifyApiSucess("Post course sucesss.");
          setTimeout(() => {
            navigate("/teacher/syllabuses");
          }, 2000);
        }
      } catch (error) {
        let message;
        if (error.response) {
          console.log(`Error response: ${JSON.stringify(error, null, 2)}`);
          message =
            error.response?.data?.message || "Error when update course.";
        } else {
          console.log(`Error message: ${JSON.stringify(error, null, 2)}`);
          message = error.message || "Error when update course.";
        }
        notifyApiFail(message);
      } finally {
        setIsLoading(false);
      }
    };
    updateData();
  };

  //dnd part

  //sensor
  const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

  const handleLessonDragEnd = (event, sectionId) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    const originalPos = active.id;
    const newPos = over.id;

    dispatch(
      swapLessonOrder({
        sectionId: sectionId,
        index1: originalPos,
        index2: newPos,
      })
    );
  };

  const handleQuizDragEnd = (event, sectionId) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    const originalPos = active.id;
    const newPos = over.id;

    dispatch(
      swapQuizOrder({
        sectionId: sectionId,
        index1: originalPos,
        index2: newPos,
      })
    );
  };
  //dnd part

  return (
    <div className="create-course">
      <div className="header">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <div>
              <h5 className="mb">Create course</h5>
              <hr />
            </div>
            <i className="fa-solid fa-book"></i>
          </div>
          <div>
            <Button
              variant="contained"
              color="warning"
              size="small"
              aria-label="Back"
              startIcon={<KeyboardBackspace />}
              onClick={goBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer />

      <div className="create-course-content">
        <div style={{ padding: "10px 20px" }}>
          {isLoading === true ? (
            <>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} size="lg" />
              </Placeholder>
            </>
          ) : (
            <>
              {" "}
              <Form.Label htmlFor="title" className="blue fw-bold">
                Course title
              </Form.Label>
              <Form.Control
                type="text"
                id="title"
                placeholder={`${createCourse.name}`}
                disabled
                readOnly
                className="mb-3"
              />
              <Form.Group>
                <Form.Label htmlFor="description" className="blue fw-bold">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder={`Description`}
                  value={description || ""}
                  onChange={handleDescriptionChange}
                  className="mb-3 form-control"
                  maxLength={1000}
                />
              </Form.Group>
              <div>
                <div className="d-flex justify-content-start">
                  <p className="blue fw-bold">Section</p>
                  {/* <span className="sub-title orange">*</span> */}
                </div>

                <div>
                  {createCourse.sections.map((section, index) => (
                    <Accordion
                      key={index}
                      defaultActiveKey="0"
                      flush
                      className="teacher-accordion"
                    >
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>{section.name}</Accordion.Header>
                        <Accordion.Body>
                          {/* Dnd Content */}
                          <DndContext
                            collisionDetection={closestCenter}
                            sensors={sensor}
                            onDragEnd={(event) =>
                              handleLessonDragEnd(event, section.id)
                            }
                          >
                            <SortableContext
                              items={section.lessons}
                              strategy={verticalListSortingStrategy}
                              id={`sortable-lesson-${section.id}`}
                            >
                              {section.lessons.map((lesson, lessonIndex) =>
                                lesson.type === "Video" ? (
                                  <VideoContent
                                    sectionId={section.id}
                                    key={lessonIndex}
                                    lesson={lesson}
                                    index={lessonIndex}
                                    sectionIndex={index}
                                    notifyApiFail={notifyApiFail}
                                  />
                                ) : (
                                  <DocumentContent
                                    sectionId={section.id}
                                    key={lessonIndex}
                                    lesson={lesson}
                                    index={lessonIndex}
                                    sectionIndex={index}
                                  />
                                )
                              )}
                            </SortableContext>
                          </DndContext>
                          {/* Dnd Content */}

                          {/* Dnd Content */}
                          <DndContext
                            collisionDetection={closestCenter}
                            sensors={sensor}
                            onDragEnd={(event) =>
                              handleQuizDragEnd(event, section.id)
                            }
                          >
                            <SortableContext
                              items={section.quizzes}
                              strategy={verticalListSortingStrategy}
                              id={`sortable-quiz-${section.id}`}
                            >
                              {section.quizzes.map((quiz, quizIndex) => (
                                <QuizContent
                                  key={quizIndex}
                                  sectionId={section.id}
                                  quiz={quiz}
                                  index={quizIndex}
                                  sectionIndex={index}
                                />
                              ))}
                            </SortableContext>
                          </DndContext>
                          {/* Dnd Content */}

                          <Container>
                            <Row>
                              <Col md="4">
                                <VideoComponent
                                  sectionId={section.id}
                                  index={index}
                                  lessonIndex={section.lessons.length}
                                />
                              </Col>
                              <Col md="4">
                                <DocumentComponent
                                  sectionId={section.id}
                                  index={index}
                                />
                              </Col>
                              <Col md="4">
                                <AddQuizComponent
                                  sectionId={section.id}
                                  index={index}
                                />
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="mb-3">
                  <p className="blue fw-bold mb-1">Course picture</p>
                  {createCourse.pictureUrl && (
                    <a
                      href={createCourse.pictureUrl}
                      title="Course picture"
                      target="_blank" rel="noreferrer"
                    >
                      Click to view picture
                    </a>
                  )}
                </div>
                <p className="mb-1">
                  Max size <span className="orange">10Mb</span>. The required
                  type image is <span className="orange">JPG, PNG</span>.
                </p>

                <label htmlFor="fileInput">
                  <ButtonMui
                    component="span"
                    size="small"
                    variant="contained"
                    startIcon={<Upload />}
                    className="mt-2"
                  >
                    Upload Picture
                  </ButtonMui>
                </label>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileInputChange}
                  id="fileInput"
                />
              </div>
              <div className="mb-3" ref={checkConfirmRef}>
                <p>
                  <input
                    id="checkConfirm"
                    type="checkbox"
                    className="d-none"
                    checked={confirm}
                    onChange={handleConfirmChange}
                  />
                  <label
                    htmlFor="checkConfirm"
                    style={{ cursor: "pointer", marginRight: "5px" }}
                  >
                    I will take responsibility if the course content does not
                    meet the ethical standards of a teacher.
                  </label>
                </p>
              </div>
              <div>
                <div className="d-flex justify-content-end my-2">

                  <ButtonMui
                    // size="small"
                    variant="contained"
                    color="primary"
                    aria-label="Save draft"
                    startIcon={<Save />}
                    onClick={() => saveCourse("Save")}
                    type="button"
                    className="mx-2"
                  >
                    Save Draft
                  </ButtonMui>

                  <ButtonMui
                    // size="small"
                    variant="contained"
                    color="warning"
                    aria-label="Save draft"
                    startIcon={<DriveFolderUpload />}
                    onClick={() => saveCourse("Post")}
                    type="button"
                    disabled={confirm === false}
                  >
                    Post Course
                  </ButtonMui>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourseComponent;

const VideoContent = ({ sectionId, lesson, index, sectionIndex, notifyApiFail }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: index });

  //log
  console.log(`SectionId: ${sectionId}`)

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
    borderColor: isOver ? "#FF8A00" : "#D4D4D4",
  };

  //get video function

  const getVideoUrl = async () => {
    if (lesson.resourceUrl !== undefined && lesson.resourceUrl !== null) {
      const videoUrl = lesson.resourceUrl
      window.open(videoUrl, "_blank");
      return;
    }

    const videoName = lesson.name;
    try {
      const videoUrl = await getCloudVideoUrl({ videoName: videoName, sectionId: sectionId });
      window.open(videoUrl, "_blank");
      return;
    } catch (error) {
      let message;
      if (error.response) {
        console.log(`Error response: ${JSON.stringify(error, null, 2)}`);
        message =
          error.response?.data?.message || "Error when update course.";
      } else {
        console.log(`Error message: ${JSON.stringify(error, null, 2)}`);
        message = error.message || "Error when update course.";
      }
      notifyApiFail(message);
    }
  }

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      defaultActiveKey="0"
      flush
      className="teacher-accordion "
    >
      <Accordion.Item eventKey={index}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Accordion.Header className="lesson-title w-100">
            <div className="d-flex justify-content-start align-items-center">
              <img
                src={videoIcon}
                width={"22px"}
                height={"auto"}
                title="Video icon"
                alt="Video icon"
              />
              <p className="mb-0 mx-2">{lesson.name}</p>
            </div>
          </Accordion.Header>
          <div className="d-flex justify-content-end align-items-center">
            <UpdateVideoComponent
              sectionId={sectionId}
              lessonIndex={index}
              video={lesson}
            />
            <RemoveComponent
              sectionId={sectionId}
              lessonIndex={index}
              sectionIndex={sectionIndex}
              type={"Video"}
            />
            <div
              className="create-course-drag"
              disabled
              title="Drag"
              {...attributes}
              {...listeners}
            >
              <i
                className="fa-regular fa-hand"
                style={{ fontSize: "18px" }}
              ></i>
            </div>
          </div>
        </div>

        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Duration:</span>{" "}
              </Col>
              <Col md="9">{lesson.duration} minute</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Video:</span>{" "}
              </Col>
              <Col md="9">
                <a href="#" onClick={getVideoUrl}>
                  Click to view Video
                </a>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const DocumentContent = ({ sectionId, lesson, index, sectionIndex }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
    borderColor: isOver ? "#FF8A00" : "#D4D4D4",
  };

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      defaultActiveKey="0"
      flush
      className="teacher-accordion lesson-title"
    >
      <Accordion.Item eventKey={index}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Accordion.Header className="lesson-title w-100">
            <div className="d-flex justify-content-start align-items-center">
              <img
                src={documentIcon}
                title="Document icon"
                alt="Document icon"
              />
              <p className="mb-0 mx-2">{lesson.name}</p>
            </div>
          </Accordion.Header>
          <div className="d-flex justify-content-end align-items-center">
            <UpdateDocumentComponent
              sectionId={sectionId}
              lessonIndex={index}
              document={lesson}
            />
            <RemoveComponent
              sectionId={sectionId}
              lessonIndex={index}
              sectionIndex={sectionIndex}
              type={"Document"}
            />
            <div
              className="create-course-drag"
              disabled
              title="Drag"
              {...attributes}
              {...listeners}
            >
              <i
                className="fa-regular fa-hand"
                style={{ fontSize: "18px" }}
              ></i>
            </div>
          </div>
        </div>
        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Duration:</span>{" "}
              </Col>
              <Col md="9">{lesson.duration} minute</Col>
            </Row>
            <Row className="mb-3">
              <Col md="12">
                <span className="blue fw-bold">Content:</span>{" "}
              </Col>
              {/* <Col md="9">{lesson.content}</Col> */}
              <Col md="12" className="mt-3 mx-3 create-course-section-content">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const QuizContent = ({ sectionId, quiz, index, sectionIndex }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
    borderColor: isOver ? "#FF8A00" : "#D4D4D4",
  };

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      defaultActiveKey="0"
      flush
      className="teacher-accordion lesson-title"
    >
      <Accordion.Item eventKey={index}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Accordion.Header className="lesson-title w-100">
            <div className="d-flex justify-content-start align-items-center">
              <img
                src={quizIcon}
                width={"22px"}
                height={"auto"}
                title="Quiz icon"
                alt="Quiz icon"
              />
              <p className="mb-0 mx-2">{quiz.title}</p>
            </div>
          </Accordion.Header>
          <div className="d-flex justify-content-end align-items-center">
            <UpdateQuizComponent
              sectionId={sectionId}
              quizIndex={index}
              quiz={quiz}
            />
            <RemoveQuizComponent
              sectionId={sectionId}
              index={index}
              sectionIndex={sectionIndex}
            />
            <div
              className="create-course-drag"
              disabled
              title="Drag"
              {...attributes}
              {...listeners}
            >
              <i
                className="fa-regular fa-hand"
                style={{ fontSize: "18px" }}
              ></i>
            </div>
          </div>
        </div>

        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Description:</span>{" "}
              </Col>
              <Col md="9">{quiz.description}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Duration:</span>{" "}
              </Col>
              <Col md="9">{quiz.duration} minute</Col>
            </Row>

            <Row className="mb-3">
              <Col md="4">
                <span className="blue fw-bold">Number of attempts:</span>{" "}
              </Col>
              <Col md="8">{quiz.numberOfAttempt}</Col>
            </Row>

            {/* <Row className="mb-3">
              <Col md="3">
                <span className="blue fw-bold">Random order:</span>{" "}
              </Col>
              <Col md="9">{quiz.isOrderRandom === true ? "Yes" : "No"}</Col>
            </Row>
            {quiz.isOrderRandom && (
              <Row className="mb-3">
                <Col md="3">
                  <span className="blue fw-bold">Number of questions:</span>{" "}
                </Col>
                <Col md="9">{quiz.numberOfQuestion}</Col>
              </Row>
            )} */}

            {quiz.questions && (
              <Row className="mb-3">
                <Col>
                  <p>
                    <span className="blue fw-bold">Content</span>
                  </p>
                  {quiz.questions.map((question, key) => (
                    <QuestionContent
                      sectionId={sectionId}
                      quizIndex={index}
                      question={question}
                      questionIndex={key}
                    />
                  ))}
                </Col>
              </Row>
            )}

            <div className="d-flex justify-content-center align-item center">
              <AddQuestionComponent sectionId={sectionId} quizIndex={index} />
            </div>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const QuestionContent = ({ sectionId, quizIndex, question, questionIndex }) => {
  return (
    <Accordion
      defaultActiveKey="0"
      flush
      className="teacher-accordion lesson-title"
    >
      <Accordion.Item eventKey={questionIndex}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Accordion.Header className="lesson-title w-100">
            {question.title}
          </Accordion.Header>
          <div className="d-flex justify-content-end align-items-center">
            <UpdateQuestionComponent
              sectionId={sectionId}
              quizIndex={quizIndex}
              questionIndex={questionIndex}
              question={question}
            />
            <RemoveQuestionComponent
              sectionId={sectionId}
              quizIndex={quizIndex}
              questionIndex={questionIndex}
            />
          </div>
        </div>

        <Accordion.Body>
          <Container>
            {question.options &&
              question.options.map((option, key) => (
                <Row className="mb=3">
                  <Col xs="10">
                    <p>{option.content}</p>
                  </Col>
                  <Col xs="2">
                    <Image
                      src={
                        option.isCorrect === true ? checkButton : uncheckButton
                      }
                      roundedCircle
                    />
                  </Col>
                  {option.answerExplain && option.answerExplain !== "" && (
                    <Col xs="12">
                      <p>Explain: {option.answerExplain}</p>
                    </Col>
                  )}
                </Row>
              ))}
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
