import { Button, Modal, Col, Form, InputGroup, Row } from "react-bootstrap";
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

const VideoComponent = ({ sectionId }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle submit
  const handleSubmit = (values) => {
    const { lessonName, duration, resourceUrl } = values;

    const video = {
      name: lessonName.trim(),
      duration: duration,
      resourceUrl: resourceUrl.trim(),
      type: "Video",
    };
    dispatch(addVideo({ sectionId: sectionId, video: video }));
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
    resourceUrl: yup
      .string()
      .url("Url must be a valid URL")
      .required("Url is required")
      .trim()
      .max(250, "Url exceed 250 characters."),
  });
  //form validation

  return (
    <>
      <button className="teacher-button" onClick={handleShow}>
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={videoIcon}
            width={"22px"}
            height={"auto"}
            title="Video icon"
          />
          <p className="mb-0 mx-2">Video</p>
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
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              lessonName: "Video",
              duration: 10,
              resourceUrl: "https://www.youtube.com/",
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
                    controlId="validationVideo"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Url
                    </Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Video url"
                      name="resourceUrl"
                      value={values.resourceUrl}
                      onChange={handleChange}
                      isInvalid={touched.resourceUrl && !!errors.resourceUrl} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.resourceUrl}
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

          <button className="create-course-save" type="submit" form="videoForm">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UpdateVideoComponent = ({ sectionId, lessonIndex, video }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle submit
  const handleSubmit = (values) => {
    const { lessonName, duration, resourceUrl } = values;

    const updateData = {
      name: lessonName.trim(),
      duration: duration,
      resourceUrl: resourceUrl.trim(),
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
    resourceUrl: yup
      .string()
      .url("Url must be a valid URL")
      .required("Url is required")
      .trim()
      .max(250, "Url exceed 250 characters."),
  });
  //form validation

  return (
    <>
      <button
        className="create-course-edit important"
        onClick={handleShow}
        title="Edit"
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
          <Modal.Title>Update video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-course-modal-body">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              lessonName: video.name,
              duration: video.duration,
              resourceUrl: video.resourceUrl,
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
                    controlId="validationVideo"
                    className="mb-3"
                  >
                    <Form.Label className="create-course-form-lable">
                      Url
                    </Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Video url"
                      name="resourceUrl"
                      value={values.resourceUrl}
                      onChange={handleChange}
                      isInvalid={touched.resourceUrl && !!errors.resourceUrl} // Set isInvalid based on validation errors
                      className="create-course-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.resourceUrl}
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

          <button className="create-course-save" type="submit" form="videoForm">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const RemoveComponent = ({ sectionId, lessonIndex }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeLesson({ sectionId: sectionId, lessonIndex: lessonIndex }));
  };

  return (
    <>
      <button onClick={handleDelete} className="teacher-button-remove">
        <img src={removeIcon} title="Remove" />
      </button>
    </>
  );
};

export default VideoComponent;
