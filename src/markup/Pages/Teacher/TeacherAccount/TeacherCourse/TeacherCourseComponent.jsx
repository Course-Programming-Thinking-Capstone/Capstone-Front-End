import { useEffect, useState } from "react";
import simp from "./../../../../../images/gallery/simp.jpg";
import {
  Chip,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./TeacherCourse.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { filterTeacherCourse } from "../../../../../helper/apis/course/course";
import { Spinner, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const TeacherCourseComponent = () => {
  //notification
  const notifyApiFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyApiSucess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  //useState
  const [query, setQuery] = useState("");
  const [courseStatus, setCourseStatus] = useState();
  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleTabValueChange = (event, newValue) => {
    if (newValue === "All") {
      setCourseStatus(undefined);
    } else {
      setCourseStatus(newValue);
    }
    setPage(1);
    setTabValue(newValue);
  };

  //search
  const handleSearchSubmit = async () => {
    try {
      setIsLoading(true);

      setPage(1);

      const data = await filterTeacherCourse({
        name: query,
        status: courseStatus,
        page: 1,
        size: 6
      });

      setCourses(data);
    } catch (error) {
      let message = "";
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          message = error.response?.data?.message || "Undefined.";
        } else {
          console.log(`Error message abc: ${error.message}`);
          message = error.message || "Undefined.";
        }
        notifyApiFail(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { backgroundColor: "#1A9CB7", color: "white" };
      case "Draft":
        return { backgroundColor: "#FF8A00", color: "white" };
      case "Pending":
        return { backgroundColor: "#EF7E54", color: "white" };
      case "Denied":
        return { backgroundColor: "#F15C58", color: "white" };
      default:
        return {};
    }
  };

  // fetch courses list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await filterTeacherCourse({
          name: query,
          page: page,
          size: 6,
          status: courseStatus,
        });
        setCourses(data);
      } catch (error) {
        let message = "";
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          message = error.response?.data?.message || "Undefined.";
        } else {
          console.log(`Error message abc: ${error.message}`);
          message = error.message || "Undefined.";
        }

        notifyApiFail(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, courseStatus]);

  return (
    <div className="teacher-course teacher-course-container">
      <div className="header">
        <div className="d-flex justify-content-start mb-3">
          <div>
            <h5 className="mb">My courses</h5>
            <hr />
          </div>
          <i class="fa-solid fa-book-open"></i>
        </div>
      </div>

      <ToastContainer />

      <div className="teacher-course-content pb-3">

        <Tabs
          value={tabValue}
          onChange={handleTabValueChange}
          aria-label="Course menu"
          className="mx-3"
        >
          <Tab value={"All"} label="All Course" />
          <Tab value={"Active"} label="Active" />
          <Tab value={"Draft"} label="Draft" />
          <Tab value={"Pending"} label="Wating for approve" />
          <Tab value={"Denied"} label="Denied" />
        </Tabs>

        <div className="d-flex justify-content-between align-items-center mt-3 syllabus-content-search mb-3">
          <input
            type="text"
            placeholder="Search syllabus"
            className="syllabus-content-search-input"
            name={query}
            onChange={handleQueryChange}
          />

          <Tooltip title="Search" arrow className="p-1">
            <IconButton
              color="primary"
              aria-label="Search"
              onClick={handleSearchSubmit}
            >
              <SearchIcon color="action" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="content mb-4 pt-3">
          {isLoading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner
                animation="border"
                variant="success"
                className="custom-spinner"
              />
            </div>
          ) : courses && courses.totalRecords == 0 ? (
            <p className="mt-3 text-center">There are no courses</p>
          ) : (
            <Grid container rowSpacing={1} columnSpacing={2}>
              {Array.isArray(courses?.results) &&
                courses?.results.map((course, index) => (
                  <Grid item md={6} lg={4}>
                    <div className="teacher-course-content-item">
                      <img src={course?.pictureUrl ?? simp} alt="" />
                      <div className="teacher-course-content-item-name mt-2">
                        {course.name.length > 40
                          ? `${course.name.substring(0, 40)}...`
                          : course.name}
                      </div>
                      <div className="d-flex justify-content-end align-items-center mb-0">
                        <Chip
                          label={course.status}
                          className="chip"
                          style={getStatusColor(course.status)}
                        />
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>
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
            count={courses?.totalPages <= 0 ? 1 : courses?.totalPages}
            // count={10}
            color="primary"
            page={page}
            onChange={(event, value) => setPage(value)}
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
  );
};

export default TeacherCourseComponent;
