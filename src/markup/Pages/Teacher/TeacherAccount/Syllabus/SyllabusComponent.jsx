import { useEffect, useState } from "react";
import simp from "./../../../../../images/gallery/simp.jpg";
import { useDispatch, useSelector } from "react-redux";
import { syllabusesSelector } from "../../../../../store/selector";
import { filterSyllabusesAsync } from "../../../../../store/thunkApis/syllabuses/syllabusesThunk";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  convertUtcToLocalTime,
  formatDateV1,
} from "../../../../../helper/utils/DateUtil";
import {
  CustomPagination,
  PaginationCustom,
} from "../../../../Layout/Components/Pagination";

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

  // fetch syllabuses list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await dispatch(
          filterSyllabusesAsync({
            name: query,
            page: page,
            size: 3,
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
  }, [dispatch, page, query]);

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
            <div className="search d-flex justify-content-center">
              <input type="text" placeholder="Search course" />
              <div
                className="text-center"
                style={{
                  height: "30px",
                  border: "1px solid #988E8E66",
                  borderLeft: "none",
                  width: "5%",
                  paddingTop: "5px",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>

            <div className="px-3 pb-3" style={{ minHeight: "60vh" }}>
              <div style={{ height: "50vh" }}>
                {isLoading ? (
                  // <div className="d-flex justify-content-center">
                  //   <div className="spinner-border text-primary" role="status">
                  //     <span className="visually-hidden">Loading...</span>
                  //   </div>
                  // </div>
                  <div className="d-flex justify-content-center py-5">
                    <Spinner animation="border" variant="success" />
                  </div>
                ) : (
                  syllabuses.results.map((syllabus, index) => (
                    <div key={index} className="syllabus-item">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                          <img className="img-responsive" src={simp} alt="" />
                          <div className="ms-3">
                            <p className="mb-1 mt-2">{syllabus.name}</p>
                            <p className="mb-1 title blue">
                              Create date:{" "}
                              {formatDateV1(
                                convertUtcToLocalTime(syllabus.createdDate)
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/teacher/syllabuses/detail?id=${syllabus.id}`}
                            className="mt-3"
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
                totalPage={syllabuses.totalPages}
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
