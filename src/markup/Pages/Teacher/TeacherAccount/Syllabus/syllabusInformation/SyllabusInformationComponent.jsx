import { useDispatch, useSelector } from "react-redux";
import { syllabusDetailSelector } from "../../../../../../store/selector";
import { useEffect, useState } from "react";
import { getSyllabusByIdAsync } from "../../../../../../store/thunkApis/syllabuses/syllabusesThunk";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

        dispatch(getSyllabusByIdAsync(id));
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

  if (isLoading) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <div>
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
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
      <div className="syllabus-content">
        <div className="pt-2 px-4 pb-2">
          <div className="d-flex">
            <div style={{ width: "120px" }}>
              <p className="blue">Course title</p>
            </div>
            <div>
              <p>{syllabus.name}</p>
            </div>
          </div>
          <div className="d-flex">
            <div style={{ width: "170px" }}>
              <p className="blue">Course target</p>
            </div>
            <div>
              <p>{syllabus.target}</p>
            </div>
          </div>
          <div className="d-flex">
            <div style={{ width: "120px" }}>
              <p className="blue">Section</p>
            </div>
            <div>
              {/* Load section in course Id*/}
              {syllabus &&
                syllabus.sections.map((section, index) => (
                  <div key={index}>{section.name}</div>
                ))}
            </div>
          </div>
          <div>
            <p className="mb-0 blue">Evaluation methods</p>
            <div style={{ marginLeft: "200px" }}>
              <div className="d-flex">
                <p className="mb-0 pt-1">Quiz score higher</p>
                <span
                  style={{
                    border: "1px solid #F69E4A",
                    borderRadius: "5px",
                    padding: "2px",
                    marginLeft: "10px",
                  }}
                >
                  {syllabus.minQuizScoreRatio}%
                </span>
              </div>
              <div className="d-flex mt-2">
                <p className="mb-0 pt-1">Total slot</p>
                <span
                  style={{
                    border: "1px solid #F69E4A",
                    borderRadius: "5px",
                    padding: "2px",
                    marginLeft: "30px",
                  }}
                >
                  {syllabus.totalSlot}
                </span>
              </div>
              <div className="d-flex mt-2">
                <p className="mb-0 pt-1">Slot time</p>
                <span
                  style={{
                    border: "1px solid #F69E4A",
                    borderRadius: "5px",
                    padding: "2px",
                    marginLeft: "30px",
                  }}
                >
                  {syllabus.slotTime}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Link
              to={`/teacher-account/syllabuses/create-course`}
              style={{
                backgroundColor: "#FD8569",
                color: "white",
                border: "none",
                borderRadius: "5px",
                height: "40px",
                width: "150px",
              }}
            >
              CREATE COURSE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusInformationComponent;
