import { useDispatch, useSelector } from "react-redux";
import {
  createCourseIdSelector,
  createCourseSelector,
} from "../../../../../../store/selector";
import videoIcon from "../../../../../../images/icon/video-icon.png";
import quizIcon from "../../../../../../images/icon/quiz-icon.png";
import documentIcon from "../../../../../../images/icon/document-icon.png";
import { useEffect, useState } from "react";
import { getCourseByIdAsync } from "../../../../../../store/thunkApis/course/courseThunk";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Button,
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
import { setDescription } from "../../../../../../store/slices/course/createCourseSlice";

const CreateCourseComponent = () => {
  const dispatch = useDispatch();
  const createCourse = useSelector(createCourseSelector);

  const navigate = useNavigate();

  const courseId = useSelector(createCourseIdSelector);
  console.log(`CourseId: ${courseId}`);

  //use state
  const [message, setMessage] = useState(null);
  const [coursePictureFile, setCoursePictureFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescriptionInput] = useState(undefined);

  const handleFileInputChange = (event) => {
    setCoursePictureFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  // fetch course detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(getCourseByIdAsync(courseId, "manage"));
        setDescriptionInput(createCourse.description);
      } catch (error) {
        //log
        console.log(`Error: ${JSON.stringify(error, null, 2)}`);

        if (error.response) {
          setMessage(error.response?.data?.message || "Undefined.");
        } else {
          setMessage(error.message || "Undefined.");
        }
      } finally {
        if (message !== null) {
          alert(message);
        }
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
        const updatedData = { ...createCourse, description };

        await updateCourseApi({
          id: createCourse.id,
          action: action,
          data: updatedData,
        });

        if (coursePictureFile != null) {
          const pictureUrl = await updateCoursePictureApi({
            id: createCourse.id,
            file: coursePictureFile,
          });
        }

        alert("Update success");
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${JSON.stringify(error, null, 2)}`);
          setMessage(error.response?.data?.message || "Undefined.");
        } else {
          console.log(`Error message abc: ${JSON.stringify(error, null, 2)}`);
          setMessage(error.message || "Undefined.");
        }
        alert(message);
      } finally {
      }
    };
    updateData();
  };

  return (
    <div className="create-course">
      <div className="header">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <div>
              <h5 className="mb">Create course</h5>
              <hr />
            </div>
            <i class="fa-solid fa-book"></i>
          </div>
          <div>
            <Button
              variant="outline-warning"
              className="px-3 py-2"
              style={{ borderRadius: "5px" }}
              onClick={goBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
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
                  value={description}
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
                        <Accordion.Header>
                          {section.name}
                        </Accordion.Header>
                        <Accordion.Body>
                          {/* Content */}
                          {section.lessons.map((lesson, index) =>
                            lesson.type === "Video" ? (
                              <VideoContent
                                sectionId={section.id}
                                key={index}
                                lesson={lesson}
                                index={index}
                              />
                            ) : (
                              <DocumentContent
                                sectionId={section.id}
                                key={index}
                                lesson={lesson}
                                index={index}
                              />
                            )
                          )}

                          {section.quizzes.map((quiz, index) => (
                            <QuizContent
                              key={index}
                              sectionId={section.id}
                              quiz={quiz}
                              index={index}
                            />
                          ))}

                          {/* <Container>
                            <Row>
                              <Col md="4">
                                <VideoComponent sectionId={section.id} />
                              </Col>
                              <Col md="4">
                                <DocumentComponent sectionId={section.id} />
                              </Col>
                              <Col md="4">
                                <AddQuizComponent sectionId={section.id} />
                              </Col>
                            </Row>
                          </Container> */}

                          <div className="d-flex justify-content-between align-items-center">
                            <VideoComponent sectionId={section.id} />
                            <DocumentComponent sectionId={section.id} />
                            <AddQuizComponent sectionId={section.id} />
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="blue fw-bold">Course picture</p>
                <p className="mb-1">
                  Max size <span className="orange">10Mb</span>. The required
                  type image is <span className="orange">JPG, PNG</span>.
                </p>
                {/* <label htmlFor="fileInput" className="button">
              <i className="fa-solid fa-circle-plus"></i> Upload file
            </label> */}
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileInputChange}
                  id="fileInput"
                />
              </div>
              <div>
                <div className="d-flex">
                  <input id="check" type="checkbox" />
                  <label htmlFor="check">
                    Tôi sẽ chịu trách nhiệm nếu nội dung khóa học không chuẩn
                    mực với đạo đức của một giáo viên
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="mx-3 px-3 py-2"
                    style={{ borderRadius: "5px" }}
                    onClick={() => saveCourse("Save")}
                  >
                    SAVE DRAFT
                  </Button>
                  <Button
                    variant="danger"
                    className="px-3 py-2"
                    style={{ borderRadius: "5px" }}
                    onClick={() => saveCourse("Post")}
                  >
                    POST COURSE
                  </Button>
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

const VideoContent = ({ sectionId, lesson, index }) => {
  return (
    <Accordion defaultActiveKey="0" flush className="teacher-accordion ">
      <Accordion.Item eventKey={index}>
        <Accordion.Header className="lesson-title">
          <div className="d-flex justify-content-start align-items-center">
            <img src={videoIcon} title="Video icon" />
            <p className="mb-0 mx-2">{lesson.name}</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Duration:</span>{" "}
                  {lesson.duration} minute
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Url:</span>{" "}
                  {lesson.resourceUrl}
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md="6">
                <UpdateVideoComponent
                  sectionId={sectionId}
                  lessonIndex={index}
                  video={lesson}
                />
              </Col>
              <Col md="6">
                <RemoveComponent sectionId={sectionId} lessonIndex={index} />
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const DocumentContent = ({ sectionId, lesson, index }) => {
  return (
    <Accordion
      defaultActiveKey="0"
      flush
      className="teacher-accordion lesson-title"
    >
      <Accordion.Item eventKey={index}>
        <Accordion.Header className="lesson-title">
          <div className="d-flex justify-content-start align-items-center">
            <img src={documentIcon} title="Document icon" />
            <p className="mb-0 mx-2">{lesson.name}</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Duration:</span>{" "}
                  {lesson.duration} minute
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Content:</span>{" "}
                  {lesson.content}
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md="6">
                <UpdateDocumentComponent
                  sectionId={sectionId}
                  lessonIndex={index}
                  document={lesson}
                />
              </Col>

              <Col md="6">
                <RemoveComponent sectionId={sectionId} lessonIndex={index} />
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const QuizContent = ({ sectionId, quiz, index }) => {
  return (
    <Accordion
      defaultActiveKey="0"
      flush
      className="teacher-accordion lesson-title"
    >
      <Accordion.Item eventKey={index}>
        <Accordion.Header className="lesson-title">
          <div className="d-flex justify-content-start align-items-center">
            <img src={quizIcon} title="Quiz icon" />
            <p className="mb-0 mx-2">{quiz.title}</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Description:</span>{" "}
                  {quiz.description}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Duration:</span>{" "}
                  {quiz.duration} minute
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Number of attempts:</span>{" "}
                  {quiz.numberOfAttempt}
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <p>
                  <span className="blue fw-bold">Random order:</span>{" "}
                  {quiz.isOrderRandom === true ? "Yes" : "No"}
                </p>
              </Col>
            </Row>
            {quiz.isOrderRandom && (
              <Row className="mb-3">
                <Col>
                  <p>
                    <span className="blue fw-bold">Number of questions:</span>{" "}
                    {quiz.numberOfQuestion}
                  </p>
                </Col>
              </Row>
            )}

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

            <Row className="mb-3">
              <Col md="6">
                <AddQuestionComponent sectionId={sectionId} quizIndex={index} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md="6">
                <UpdateQuizComponent
                  sectionId={sectionId}
                  quizIndex={index}
                  quiz={quiz}
                />
              </Col>

              <Col md="6">
                <RemoveQuizComponent sectionId={sectionId} index={index} />
              </Col>
            </Row>
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
        <Accordion.Header>{question.title}</Accordion.Header>
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

            <Col md="6">
              <UpdateQuestionComponent
                sectionId={sectionId}
                quizIndex={quizIndex}
                questionIndex={questionIndex}
                question={question}
              />
            </Col>
            <Col md="6">
              <RemoveQuestionComponent
                sectionId={sectionId}
                quizIndex={quizIndex}
                questionIndex={questionIndex}
              />
            </Col>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
