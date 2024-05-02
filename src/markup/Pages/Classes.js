import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import { formatPrice } from "../../helper/utils/NumberUtil";
import "./Classes.css";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { getCoursesApi } from "../../helper/apis/course/course";

export default function Classes() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(undefined);
  const navigate = useNavigate();


  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    try {
      setCurrentPage(1);
      const data = await getCoursesApi({ status: "Active", isFree: false , page: 1, size: 6, name: query });

      setCourses(data.results);
      setPageCount(data.totalPages);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  const fetchCourses = async () => {
    setIsLoading(true);
    try {

      const data = await getCoursesApi({ status: "Active", isFree: false , page: currentPage, size: 6, name: query });

      setCourses(data.results);

      setPageCount(data.totalPages);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const navigateToCourseDetail = (courseId) => {
    navigate(`/classes-detail/${courseId}`); // Use navigate with the course ID
  };

  return (
    <div>
      <Header />
      <div className="course">
        <PageTitle motherMenu="Courses" activeMenu="Courses" />

        <div>
          <div className="all-course">
            <div className="d-flex justify-content-center align-items-center">
              <div className="search d-flex">
                <input type="text" placeholder="What do you want to learn?" value={query} onChange={handleQueryChange} />
                <div className="search-button d-flex justify-content-center align-items-center p-0" onClick={handleSearchSubmit}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="all-course-header">
                <h5>Courses</h5>
                <h4>Suitable for children from 5 years old</h4>
                <p>Build a basic programming foundation</p>
              </div>

              <div className="row sp40">
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", height: "100px" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  courses?.map((course, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6"
                      key={index}
                      onClick={() => navigateToCourseDetail(course.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="class-item">
                        <div className="class-media classes-course-image">
                          <img
                            src={course?.pictureUrl}
                            className="classes-course-image"
                            alt="Course cover"
                          />
                        </div>
                        <div className="class-info">
                          <div className="classes-course-content-body">
                            <h5>
                              {course?.name?.length > 40
                                ? `${course.name.substring(0, 40)}...`
                                : course?.name}{" "}
                            </h5>
                            <p>
                              {course?.description?.length > 70
                                ? `${course.description.substring(0, 70)}...`
                                : course.description}
                            </p>
                          </div>

                          <div
                            className="text-center p-2"
                            style={{
                              backgroundColor: "#FFA63D",
                              color: "white",
                              borderRadius: "8px",
                            }}
                          >
                            {course.price === 0
                              ? "Free"
                              : formatPrice(course.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={2}
              >
                <Pagination
                  size="large"
                  count={pageCount <= 0 ? 1 : pageCount}
                  // count={10}
                  color="warning"
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBack,
                        next: ArrowForward,
                      }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
