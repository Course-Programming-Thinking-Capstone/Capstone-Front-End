import { useDispatch, useSelector } from "react-redux";
import {
  createCourseIdSelector,
  createCourseSelector,
} from "../../../../../../store/selector";
import { useEffect, useState } from "react";
import { getCourseByIdAsync } from "../../../../../../store/thunkApis/course/courseThunk";
import { useNavigate } from "react-router-dom";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import VideoComponent from "./createCourseContent/VideoComponent";
import DocumentComponent from "./createCourseContent/DocumentComponent";
import {
  updateCourseApi,
  updateCoursePictureApi,
} from "../../../../../../helper/apis/course/course";

const CreateCourseComponent = () => {
  const dispatch = useDispatch();
  const createCourse = useSelector(createCourseSelector);

  const navigate = useNavigate();

  const courseId = useSelector(createCourseIdSelector);
  console.log(`CourseId: ${courseId}`);

  //use state
  const [message, setMessage] = useState(undefined);
  const [coursePictureFile, setCoursePictureFile] = useState(null);

  const handleFileInputChange = (event) => {
    setCoursePictureFile(event.target.files[0]);
  };

  const goBack = () => {
    navigate(-1);
  };

  // fetch course detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCourseByIdAsync(courseId, "manage"));
        //
        console.log(`Create course: ${JSON.stringify(createCourse, null, 2)}`);
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.Message}`);
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          console.log(`Error message abc: ${error.message}`);
          setMessage(error.message || "Undefined.");
        }
      } finally {
      }
    };
    fetchData();
  }, [courseId]);

  // //log
  // console.log(`createCourse content: ${JSON.stringify(createCourse, null, 2)}`);

  //Create course
  const saveCourse = async (action) => {
    try {
      //log
      console.log(
        `createCourse content before send api: ${JSON.stringify(
          createCourse,
          null,
          2
        )}`
      );

      await updateCourseApi({
        id: createCourse.id,
        action: action,
        data: createCourse,
      });

      if (coursePictureFile != null) {
        const pictureUrl = await updateCoursePictureApi({
          id: createCourse.id,
          file: coursePictureFile,
        });

        console.log(`Picture url: ${pictureUrl}`);
      }

      alert("Update success");
    } catch (error) {
      if (error.response) {
        console.log(`Error response: ${JSON.stringify(error, null, 2)}`);
        setMessage(error.response?.data?.title || "Undefined.");
      } else {
        console.log(`Error message abc: ${JSON.stringify(error, null, 2)}`);
        setMessage(error.message || "Undefined.");
      }
    } finally {
    }
  };

  return (
    <div className="teacher-create">
      <div className="create-course">
        <div className="header">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div>
                <h5 className="mb">CREATE COURSE</h5>
                <hr />
              </div>
              <i class="fa-solid fa-book"></i>
            </div>
            <div>
              {/* return link */}
              <button onClick={goBack}>Back</button>
            </div>
          </div>
        </div>
        <div className="create-course-content">
          <div style={{ padding: "10px 20px" }}>
            <Form.Label htmlFor="title" className="title blue">
              Course title
            </Form.Label>
            <Form.Control
              type="text"
              id="title"
              placeholder={`${createCourse.name}`}
              disabled
              readOnly
            />

            <Form.Label htmlFor="description" className="title blue">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              id="description"
              placeholder={`Course description`}
            />

            <div>
              <div className="d-flex justify-content-start">
                <p className="title blue ">Section</p>
                <span className="sub-title orange">*</span>
              </div>

              <div className="super-render">
                {createCourse.sections.map((section, index) => (
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{section.name}</Accordion.Header>
                      <Accordion.Body>
                        {/* Content */}
                        {section.lessons.map((lesson, index) =>
                          lesson.type === "Video" ? (
                            <VideoContent
                              key={index}
                              lesson={lesson}
                              index={index}
                            />
                          ) : (
                            <DocumentContent
                              key={index}
                              lesson={lesson}
                              index={index}
                            />
                          )
                        )}

                        <Container>
                          <Row>
                            <Col md="4">
                              <VideoComponent sectionId={section.id} />
                            </Col>
                            <Col md="4">
                              <DocumentComponent sectionId={section.id} />
                            </Col>
                            <Col md="4">
                              <button
                              // onClick={() =>
                              //   addContentTypeToSection(section.id, "Quiz")
                              // }
                              >
                                Add Quiz
                              </button>
                            </Col>
                          </Row>
                        </Container>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </div>
            </div>

            {/* <div>
              <p className="title blue">Course picture</p>
              <p className="mb-0">
                Max size <span className="orange">100Mb</span>. The required
                type image is <span className="orange">JPG, PNG</span>.
              </p>
              <button className="button">
                <i class="fa-solid fa-circle-plus"></i> Upload file
              </button>
            </div> */}

            <div>
              <p className="title blue">Course picture</p>
              <p className="mb-0">
                Max size <span className="orange">100Mb</span>. The required
                type image is <span className="orange">JPG, PNG</span>.
              </p>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileInputChange}
                className="d-none"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="button">
                <i className="fa-solid fa-circle-plus"></i> Upload file
              </label>
            </div>

            <div>
              <div className="d-flex">
                <input id="check" type="checkbox" />
                <label for="check">
                  Tôi sẽ chịu trách nhiệm nếu nội dung khóa học không chuẩn mực
                  với đạo đức của một giáo viên
                </label>
              </div>

              <div className="d-flex justify-content-end">
                <button onClick={() => saveCourse("Save")}>SAVE DRAFT</button>
                <button onClick={() => saveCourse("Post")}>POST COURSE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseComponent;

const VideoContent = ({ lesson, index }) => {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey={index}>
        <Accordion.Header>{lesson.name}</Accordion.Header>
        <Accordion.Body>
          <p>Duration: {lesson.duration} minute</p>
          <p>Url: {lesson.resourceUrl}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const DocumentContent = ({ lesson, index }) => {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey={index}>
        <Accordion.Header>{lesson.name}</Accordion.Header>
        <Accordion.Body>
          <p>Duration: {lesson.duration} minute</p>
          <p>Content: {lesson.content}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
