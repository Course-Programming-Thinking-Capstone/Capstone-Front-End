import { Button, Modal, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const AddQuizComponent = ({ sectionId }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Check if sectionId is empty then go to error page
  if (sectionId === undefined) {
    //log error
    console.log(`Section id in addQuizComponent is missing.`);
  }

  //handle submit
  const handleSubmit = (values) => {
    const { lessonName, duration, resourceUrl } = values;

    const video = {
      name: lessonName,
      duration: duration,
      resourceUrl: resourceUrl,
      type: "Video",
    };
    dispatch(addVideo({ sectionId: sectionId, video: video }));
    setShow(false);
  };

  //form validation
  const { Formik } = formik;

  const schema = yup.object().shape({
    lessonName: yup.string().required("Lesson name is required"),
    duration: yup
      .number()
      .required("Duration is required")
      .positive("Duration must larger than 0")
      .integer(),
    resourceUrl: yup
      .string()
      .url("Url must be a valid URL")
      .required("Content is required"),
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
        Add video
      </Button>

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
                      isInvalid={!!errors.lessonName} // Set isInvalid based on validation errors
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
                      isInvalid={!!errors.duration} // Set isInvalid based on validation errors
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
                      isInvalid={!!errors.resourceUrl} // Set isInvalid based on validation errors
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
