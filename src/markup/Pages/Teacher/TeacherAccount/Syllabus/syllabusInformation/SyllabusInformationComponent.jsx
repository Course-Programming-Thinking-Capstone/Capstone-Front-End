import { useDispatch, useSelector } from "react-redux";
import { syllabusDetailSelector } from "../../../../../../store/selector";
import { useEffect, useState } from "react";
import { getSyllabusByIdAsync } from "../../../../../../store/thunkApis/syllabuses/syllabusesThunk";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";

export const SyllabusInformationComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const syllabus = useSelector(syllabusDetailSelector);

  const [isLoading, setIsLoading] = useState(false);

  //set information message
  const [message, setMessage] = useState(undefined);

  // fetch syllabuses list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await dispatch(getSyllabusByIdAsync(id));
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.Message}`);
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          console.log(`Error message abc: ${error.message}`);
          setMessage(error.message || "Undefined.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="syllabus-detail">
      <div className="header">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="d-flex justify-content-start align-items-center ">
            <div>
              <h5 className="my-0">Syllabus detail</h5>
              <hr />
            </div>
            <i class="fa-solid fa-book"></i>
          </div>
          <div>
            <Button
              variant="outline-warning"
              className="px-3 py-2"
              style={{ borderRadius: "5px" }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
      <div className="syllabus-content">
        <div className="pt-2 px-4 pb-2">

          {isLoading ? (
            <>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>

              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} size="lg" bg="primary" /> {""}
                <Placeholder xs={8} size="lg" />
              </Placeholder>
            </>
          ) : (
            <>
              <Container className="px-0">
                <Row>
                  <Col md="3">
                    <p className="blue fw-bold">Course title</p>
                  </Col>
                  <Col md="9">
                    <p>{syllabus.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <p className="blue fw-bold">Course target</p>
                  </Col>
                  <Col md="9">
                    <p>{syllabus.target}</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="3">
                    <p className="blue fw-bold">Sections</p>
                  </Col>
                  <Col md="9">
                    <div>
                      {/* Load section in course Id*/}
                      {syllabus &&
                        syllabus.sections.map((section, index) => (
                          <div
                            className="d-flex justify-content-center align-items-center mb-1"
                            key={index}
                            style={sectionTitle}
                          >
                            {section.name}
                          </div>
                        ))}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="3">
                    <p className="blue fw-bold">Pass condition</p>
                  </Col>
                  <Col md="9">
                    <p>
                      Quiz score higher{" "}
                      <span style={syllabusContentStyle}>
                        {syllabus.minQuizScoreRatio}%
                      </span>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md="3">
                    <p className="blue fw-bold">Course slot</p>
                  </Col>
                  <Col md="9">
                    <p>
                      <span style={syllabusContentStyle}>
                        {syllabus.totalSlot}
                      </span>{" "}
                      slots
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md="3">
                    <p className="blue fw-bold">Slot time</p>
                  </Col>
                  <Col md="9">
                    <p>
                      <span style={syllabusContentStyle}>
                        {syllabus.slotTime}
                      </span>{" "}
                      minute
                    </p>
                  </Col>
                </Row>
              </Container>
              <div className="d-flex justify-content-end">
                <Link to={`/teacher-account/syllabuses/create-course`}>
                  <Button
                     variant="danger"
                     className="px-3 py-2"
                     style={{ borderRadius: "5px" }}
                  >
                    Create course
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllabusInformationComponent;

const sectionTitle = {
  backgroundColor: "#7F7C7C",
  color: "white",
  borderRadius: "5px",
  textAlign: "center",
  height: "30px",
};

const syllabusContentStyle = {
  color: "#F69E4A",
  fontWeight: "bold",
};
