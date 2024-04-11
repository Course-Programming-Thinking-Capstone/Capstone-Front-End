import { Modal, Col, Form, Row, Spinner } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addVideo,
  removeLesson,
  updateVideo,
} from "../../../../../../../store/slices/course/createCourseSlice";

import videoIcon from "../../../../../../../images/icon/video-icon.png";
import removeIcon from "../../../../../../../images/icon/remove-icon.png";

import "./../CreateCourse.css";
import { useSelector } from "react-redux";
import { componentNumberSelector } from "../../../../../../../store/selector";
import { changeComponentNumber } from "../../../../../../../store/slices/course/componentNumber";
import { uploadVideoToDrive } from "../../../../../../../helper/apis/course/course";

const VideoComponent = ({ sectionId, index }) => {
  const dispatch = useDispatch();
  const componentNumber = useSelector(componentNumberSelector);

  const [show, setShow] = useState(false);
  const [videoFile, setVideoFile] = useState(undefined);
  const [message, setMessage] = useState(null);
  const [fileMesage, setFileMessage] = useState(undefined);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileInputChange = async (event) => {
    const fileUpdate = event.target.files[0];

    try {

      const videoElement = document.createElement("video");
      videoElement.id = `videoSection${sectionId}`; // Set the correct ID for the video element
      const videoUrl = URL.createObjectURL(fileUpdate);
      videoElement.src = videoUrl;

      videoElement.onloadedmetadata = () => {
        const durationInSeconds = videoElement.duration;
        if (!isNaN(durationInSeconds)) {
          const durationInMinutes = Math.floor(durationInSeconds / 60);
          setVideoDuration(durationInMinutes);
        } else {
          setVideoDuration(0);
        }
      };

      await videoElement.load();
    } catch (error) {
      console.error("Error occurred while extracting video duration:", error);
      setVideoDuration(0);
    }

    setVideoFile(fileUpdate);
  };

  //handle submit
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      if (!videoFile) {
        setFileMessage("File is empty.");
        return;
      }

      const resourceUrl = await uploadVideoToDrive({
        sectionId: sectionId,
        file: videoFile,
      });

      const { lessonName } = values;

      const video = {
        name: lessonName.trim(),
        duration: videoDuration,
        resourceUrl: resourceUrl,
        type: "Video",
      };

      const updatedComponentNumber = {
        ...componentNumber[index],
        videoNumber: componentNumber[index].videoNumber + 1,
      };

      dispatch(addVideo({ sectionId: sectionId, video: video }));

      dispatch(
        changeComponentNumber({
          index: index,
          componentNumber: updatedComponentNumber,
        })
      );
      setShow(false);
    } catch (error) {
      //log
      console.log(`Error when add video: ${JSON.stringify(error, null, 2)}`);
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

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    lessonName: yup
      .string()
      .required("Lesson name is required")
      .trim()
      .max(250, "Lesson name exceed 250 characters."),
  });
  //form validation

  return (
    <>
      <button
        className="teacher-button"
        onClick={handleShow}
        disabled={componentNumber[index]?.videoNumber === 5}
        title="Add video"
      >
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={videoIcon}
            width={"22px"}
            height={"auto"}
            title="Add video"
            alt="Video icon"
          />
          <p className="mb-0 mx-2">
            Video ({componentNumber[index]?.videoNumber}/5)
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
          <Modal.Title>Add video</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner
              animation="border"
              variant="success"
              className="custom-spinner"
            />
          </div>
        ) : (
          <Modal.Body className="create-course-modal-body">
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                lessonName: "Video",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form id="videoForm" noValidate onSubmit={handleSubmit}>
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
                      controlId="validationVideo"
                      className="mb-3"
                    >
                      <Form.Label className="create-course-form-lable">
                        Video File
                      </Form.Label>
                      <div className="mb-3">
                        <input
                          type="file"
                          accept="video/mp4"
                          onChange={handleFileInputChange}
                          id={`videoFileSection${sectionId}`}
                          required
                        />
                      </div>
                      {fileMesage && (
                        <p className="text-danger">{fileMesage}</p>
                      )}
                    </Form.Group>
                  </Row>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        )}
        <Modal.Footer>
          {isLoading === false && (
            <>
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
                form="videoForm"
              >
                Save
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UpdateVideoComponent = ({ sectionId, lessonIndex, video }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [videoFile, setVideoFile] = useState(undefined);
  const [message, setMessage] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileInputChange = async (event) => {
    const fileUpdate = event.target.files[0];

    try {

      const videoElement = document.createElement("video");
      videoElement.id = `videoSection${sectionId}`; // Set the correct ID for the video element
      const videoUrl = URL.createObjectURL(fileUpdate);
      videoElement.src = videoUrl;

      videoElement.onloadedmetadata = () => {
        const durationInSeconds = videoElement.duration;
        if (!isNaN(durationInSeconds)) {
          const durationInMinutes = Math.floor(durationInSeconds / 60);
          setVideoDuration(durationInMinutes);
        } else {
          setVideoDuration(0);
        }
      };

      await videoElement.load();
    } catch (error) {
      console.error("Error occurred while extracting video duration:", error);
      setVideoDuration(0);
    }

    setVideoFile(fileUpdate);
  };

  //handle submit
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      let updateResourceUrl = document.resourceUrl;
      let updateDuration = document.duration;
      if (videoFile) {
        updateResourceUrl = await uploadVideoToDrive({
          sectionId: sectionId,
          file: videoFile,
        });

        updateDuration = videoDuration;
      }
      const { lessonName } = values;

      const updateData = {
        name: lessonName.trim(),
        duration: updateDuration,
        resourceUrl: updateResourceUrl,
        type: "Video",
      };
      dispatch(
        updateVideo({
          sectionId: sectionId,
          lessonIndex: lessonIndex,
          video: updateData,
        })
      );

      setShow(false);
    } catch (error) {
      //log
      console.log(`Error when add video: ${JSON.stringify(error, null, 2)}`);
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

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    lessonName: yup
      .string()
      .required("Lesson name is required")
      .trim()
      .max(250, "Lesson name exceed 250 characters."),
  });
  //form validation

  return (
    <>
      <button
        className="create-course-edit important"
        onClick={handleShow}
        title="Edit"
      >
        <i className="fa-regular fa-pen-to-square fa-lg mx-1"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="create-course-modal-content"
      >
        <Modal.Header closeButton className="create-course-modal-header">
          <Modal.Title>Update video</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner
              animation="border"
              variant="success"
              className="custom-spinner"
            />
          </div>
        ) : (
          <Modal.Body className="create-course-modal-body">
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                lessonName: video.name
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form id="videoForm" noValidate onSubmit={handleSubmit}>
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
                      controlId="validationVideo"
                      className="mb-3"
                    >
                      <Form.Label className="create-course-form-lable">
                        Video File
                      </Form.Label>
                      <div className="mb-3">
                        <input
                          type="file"
                          accept="video/mp4"
                          onChange={handleFileInputChange}
                          id={`videoFileSection${sectionId}`}
                          required
                        />
                      </div>
                    </Form.Group>
                  </Row>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        )}
        <Modal.Footer>
          {isLoading === false && (
            <>
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
                form="videoForm"
              >
                Save
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const RemoveComponent = ({
  sectionId,
  lessonIndex,
  sectionIndex,
  type,
}) => {
  const dispatch = useDispatch();

  const componentNumber = useSelector(componentNumberSelector);

  const handleDelete = () => {
    dispatch(removeLesson({ sectionId: sectionId, lessonIndex: lessonIndex }));

    let updatedComponentNumber;

    if (type === "Video") {
      updatedComponentNumber = {
        ...componentNumber[sectionIndex],
        videoNumber: componentNumber[sectionIndex].videoNumber - 1,
      };
    } else if (type === "Document") {
      updatedComponentNumber = {
        ...componentNumber[sectionIndex],
        documentNumber: componentNumber[sectionIndex].documentNumber - 1,
      };
    }

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

export default VideoComponent;
