import { useEffect, useState } from "react";
import simp from "./../../../../../images/gallery/simp.jpg";
import syllabusPicture from "../../../../../images/gallery/syllabus_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { syllabusesSelector } from "../../../../../store/selector";
import { filterTeacherSyllabusesAsync } from "../../../../../store/thunkApis/syllabuses/syllabusesThunk";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  convertUtcToLocalTime,
  formatDateV1,
} from "../../../../../helper/utils/DateUtil";
import { CustomPagination } from "../../../../Layout/Components/Pagination";

//css
import "./SyllabusComponent.css";

const SyllabusComponent = () => {
  //useDispath
  const dispatch = useDispatch();

  //set information message
  const [message, setMessage] = useState(undefined);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(undefined);

  //syllabus list
  const syllabuses = useSelector(syllabusesSelector);
  const [isLoading, setIsLoading] = useState(true);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      setIsLoading(true);

      setPage(1);

      await dispatch(
        filterTeacherSyllabusesAsync({
          sortCreatedDate: "desc",
          name: query,
          page: 1,
          size: 4,
        })
      );
    } catch (error) {
      if (error.response) {
        console.log(`Error response: ${error.response?.data?.message}`);
        setMessage(error.response?.data?.message || "Undefined.");
      } else {
        console.log(`Error message abc: ${error.message}`);
        setMessage(error.message || "Undefined.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // fetch syllabuses list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await dispatch(
          filterTeacherSyllabusesAsync({
            sortCreatedDate: "desc",
            name: query,
            page: page,
            size: 4,
          })
        );
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          setMessage(error.response?.data?.message || "Undefined.");
        } else {
          console.log(`Error message abc: ${error.message}`);
          setMessage(error.message || "Undefined.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, page]);

  const renderComponent = () => {
    return (
      <div className="syllabus">
        <div className="header">
          <div className="d-flex justify-content-start align-items-center mb-3">
            <div>
              <h5 className="my-0">Syllabus</h5>
              <hr />
            </div>
            <i className="fa-solid fa-book"></i>
          </div>
        </div>
        <div className="syllabus-content">
          <div>
            <div className="d-flex justify-content-between align-items-center mt-3 syllabus-content-search mb-3">
              <input
                type="text"
                placeholder="Search course"
                className="syllabus-content-search-input"
                name={query}
                onChange={handleQueryChange}
              />
              <button
                type="button"
                className="syllabus-content-search-button"
                onClick={handleSearchSubmit}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div
              className="px-4 pb-3"
              style={{ minHeight: "60vh", overflow: "auto" }}
            >
              <div style={{ minHeight: "50vh" }}>
                {isLoading ? (
                  <div className="d-flex justify-content-center py-5">
                    <Spinner
                      animation="border"
                      variant="success"
                      className="custom-spinner"
                    />
                  </div>
                ) : (
                  syllabuses.results.map((syllabus, index) => (
                    <div key={index} className="syllabus-content-item mt-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            className="img-responsive syllabus-content-item-image"
                            src={syllabusPicture}
                            alt="Syllabus picture"
                            title="Syllabus picture"
                          />
                          <div className="ms-3">
                            <p className="my-1">{syllabus.name}</p>
                            <p className="mb-1 ">
                              Create date:{" "}
                              <span className="title blue">
                                {formatDateV1(
                                  convertUtcToLocalTime(syllabus.createdDate)
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/teacher/syllabuses/detail?id=${syllabus.id}`}
                            style={{
                              display: "inline-block",
                              width: "100px",
                              backgroundColor: "#EF7E54",
                              border: "none",
                              borderRadius: "10px",
                              color: "white",
                              textDecoration: "none",
                              textAlign: "center",
                              lineHeight: "36px",
                            }}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Paging */}
              <CustomPagination
                page={page}
                setPage={setPage}
                totalPage={
                  syllabuses.totalPages <= 0 ? 1 : syllabuses.totalPages
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderComponent();
};

export default SyllabusComponent;
