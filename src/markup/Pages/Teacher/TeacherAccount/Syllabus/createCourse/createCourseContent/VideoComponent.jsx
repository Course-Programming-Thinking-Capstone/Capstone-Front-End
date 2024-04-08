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
      {/* <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "4px", width: "120px", height: "40px" }}
      >
        Add video
      </Button> */}

      <button className="teacher-button" onClick={handleShow}>
        <div className="d-flex justify-content-start align-items-center">
          <img src={videoIcon} title="Video icon" />
          <p className="mb-0 mx-2">Video</p>
        </div>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              lessonName: "Video",
              duration: 1,
              resourceUrl: "https://www.youtube.com/",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form id="videoForm" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationLessonName">
                    <Form.Label>Lesson name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Lesson name"
                      name="lessonName"
                      value={values.lessonName}
                      onChange={handleChange}
                      isInvalid={touched.lessonName && !!errors.lessonName} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lessonName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationDuration">
                    <Form.Label>Duration</Form.Label>
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

                  <Form.Group as={Col} md="12" controlId="validationVideo">
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Video url"
                      name="resourceUrl"
                      value={values.resourceUrl}
                      onChange={handleChange}
                      isInvalid={touched.resourceUrl && !!errors.resourceUrl} // Set isInvalid based on validation errors
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
          <Modal.Title>Update video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  <Form.Group as={Col} md="12" controlId="validationLessonName">
                    <Form.Label>Lesson name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Lesson name"
                      name="lessonName"
                      value={values.lessonName}
                      onChange={handleChange}
                      isInvalid={touched.lessonName && !!errors.lessonName} // Set isInvalid based on validation errors
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lessonName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationDuration">
                    <Form.Label>Duration</Form.Label>
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

                  <Form.Group as={Col} md="12" controlId="validationVideo">
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Video url"
                      name="resourceUrl"
                      value={values.resourceUrl}
                      onChange={handleChange}
                      isInvalid={touched.resourceUrl && !!errors.resourceUrl} // Set isInvalid based on validation errors
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

export const RemoveComponent = ({ sectionId, lessonIndex }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeLesson({ sectionId: sectionId, lessonIndex: lessonIndex }));
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

export default VideoComponent;
