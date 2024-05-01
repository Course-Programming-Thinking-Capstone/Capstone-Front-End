import React, { useState, useEffect, forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../../../helper/apis/baseApi/baseApi";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import "./StaffClassDetail.css";
import { formatDayV1, formatTimeV1 } from "../../../../helper/utils/DateUtil";

export default function StaffClassDetail() {
  const [view, setView] = useState("detail");
  const [classData, setClassData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [classIdForTeacherForm, setClassIdForTeacherForm] = useState(null);
  const [classIdForStudentForm, setClassIdForStudentForm] = useState(null);
  const [classIdForForm, setClassIdForForm] = useState(null);

  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => {
    // Format date to a readable format
    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    return (
      <button onClick={onClick} ref={ref} style={{
        border: "1px solid #F69E4A",
        width: "150px",
        height: "30px",
        borderRadius: "8px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px'
      }}>
        <span>{value ? formatDate(value) : placeholder}</span>
        <i className="fa-regular fa-calendar-days" />
      </button>
    );
  });

  const ClassContent = ({
    classId,
    setView,
    setClassIdForStudentForm,
    setClassIdForTeacherForm,
  }) => {
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const studentsPerPage = 3;

    console.log('currentPage: ', currentPage);
    const pageCount = Math.ceil(
      classDetails?.students.length / studentsPerPage
    );

    const handlePageClick = (event, value) => {
      setCurrentPage(value - 1); // Adjust page index since MUI uses 1-based indexing
    };

    const handleAddStudentClick = () => {
      setClassIdForStudentForm(classId); // Set the classId for the StudentForm
      setView("addStudent");
    };

    const handleAddTeacherClick = () => {
      // Check if the schedule is set by verifying if 'classDetails' has schedule-related data
      if (!classDetails || !classDetails.studyDay || classDetails.studyDay.length === 0 || !classDetails.slotNumber) {
        // If schedule is not set, show an error toast
        toast.error("You need to create a schedule for the class first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        // If schedule exists, proceed with setting the classId and changing the view
        setClassIdForTeacherForm(classId);
        setView("addTeacher");
      }
    };

    const handleEditScheduleClick = () => {
      setView("editSchedule");
      setClassIdForTeacherForm(classId);
    };

    // Calculate the students to be displayed on the current page
    const currentStudents = classDetails?.students?.slice(
      currentPage * studentsPerPage,
      (currentPage + 1) * studentsPerPage
    );

    useEffect(() => {
      const fetchClassDetails = async () => {
        try {
          const response = await instance.get(
            `api/v1/Classes/detail/${classId}`
          );
          const data = response.data;

          console.log("data: ", data);
          setClassDetails(data);
        } catch (error) {
          console.error("Failed to fetch class details", error);
        } finally {
          setLoading(false);
        }
      };

      fetchClassDetails();
    }, [classId]);

    if (loading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span style={{ fontSize: "200px" }} className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    if (!classDetails) {
      return <div>Class details not found.</div>;
    }
    const getDayStyle = (day) => {
      const isScheduledDay = classDetails?.studyDay?.includes(day);
      return {
        borderRadius: "50%",
        border: isScheduledDay ? "none" : "1px solid black",
        height: "45px",
        width: "45px",
        backgroundColor: isScheduledDay ? "#FD8569" : "transparent",
        color: isScheduledDay ? "white" : "black",
      };
    };

    const handleOpenNewTab = (url) => {
      window.open(url, "_blank");
    };

    const handleStatusChange = async (newStatus) => {
      try {
        const response = await instance.patch(
          `api/v1/Classes/${classId}?status=${newStatus}`
        );
        if (response.data) {
          toast.success(response.data.message);
          console.log("success"); // Displaying the toast message on successful API response
          setClassDetails((prevDetails) => ({
            ...prevDetails,
            classStatus: newStatus,
          })); // Update local state to reflect the new status
        }
      } catch (error) {
        console.error("Failed to update class status", error);
        toast.error("Failed to update class status"); // Display error toast message
      }
    };

    const handleSelectChange = (event) => {
      const selectedStatus = event.target.value;
      handleStatusChange(selectedStatus);
    };

    return (
      <div
        className="staff-class-content mx-5"
        style={{
          padding: "20px 50px",
          backgroundColor: "white",
          margin: "30px 80px",
          overflowY: "scroll",
          height: "90vh",
        }}
      >
        <div className="header">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div>
                <h5 className="mb">Class detail</h5>
                <hr />
              </div>
              <i class="fa-solid fa-bell"></i>
            </div>
            <ToastContainer />
            <div className="d-flex justify-content-start">
              <select
                className="py-1 px-2"
                style={{
                  backgroundColor: "#1A9CB7",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                  borderRadius: "5px",
                  outline: "none",
                }}
                value={classDetails.classStatus}
                onChange={handleSelectChange}
              >
                <option value="Opening">Opening</option>
                <option value="Closed">Closed</option>
                <option value="OnGoing">On Going</option>
              </select>
              <button
                style={{
                  backgroundColor: "#7F7C7C",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
                onClick={() => navigateToView("detail")}
              >
                <div className="py-1 px-2">Back</div>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="px-4 mt-2">
            <p className="mb-2 blue">CLASS INFORMATION</p>
            <div className="d-flex">
              <div style={{ marginLeft: "200px" }}>
                <p className="mb-1">Class</p>
                <p className="mb-1">Course</p>
                <p className="mb-1">Number of students</p>
                <p className="mb-1">Teacher</p>
                <p className="mb-1">Class time</p>
                <p className="mb-1">Slot time</p>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <p
                  className=" mb-1"
                  style={{ color: "#FD8569", fontWeight: "bold" }}
                >
                  {classDetails.classCode}
                </p>
                <p className="mb-1">{classDetails.courseName}</p>
                <p className="mb-1">{classDetails.students.length}</p>
                <p className="mb-1">
                  {classDetails.teacherName ? (
                    <p className="mb-1">
                      {classDetails.teacherName} /{" "}
                      <button
                        onClick={handleAddTeacherClick}
                        style={{
                          backgroundColor: "#1A9CB7",
                          height: "25px",
                          fontSize: "14px",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      >
                        Edit
                      </button>
                    </p>
                  ) : (
                    <button
                      onClick={handleAddTeacherClick}
                      style={{
                        backgroundColor: "#1A9CB7",
                        height: "25px",
                        fontSize: "14px",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                      }}
                    >
                      Add teacher
                    </button>
                  )}
                </p>
                <p className="mb-1">
                  {formatDayV1(classDetails?.openClass)} -{" "}
                  {formatDayV1(classDetails?.closeClass)}
                </p>
                <p className="mb-1">{classDetails.slotDuration} minutes/slot</p>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-2 blue">CLASS SCHEDULE</p>
              </div>
              <div>
                <button style={{
                  backgroundColor: "#FFA63D",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  height: "30px",
                }}
                  onClick={handleEditScheduleClick}
                >Edit schedule</button>
              </div>
            </div>
            <div className="d-flex">
              <div style={{ marginLeft: "200px" }}>
                <p className="mb-1">Study day</p>
                <p className="mb-1 mt-4">Slot</p>
                <p className="mb-1">Total slot</p>
                <p className="mb-1">Link discord</p>
              </div>
              <div style={{ marginLeft: "100px" }}>
                <div className="d-flex">
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Monday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      M
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Tuesday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      T
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Wednesday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      W
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Thursday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      Th
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Friday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      F
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Saturday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      Sa
                    </p>
                  </div>
                  <div
                    className="mb-1 ms-3 text-center"
                    style={getDayStyle("Sunday")}
                  >
                    <p
                      className="text-center mt-2"
                      style={{ fontSize: "18px" }}
                    >
                      S
                    </p>
                  </div>
                </div>
                <p className="mb-1">
                  Slot {classDetails.slotNumber} (
                  {formatTimeV1(classDetails?.startSlot)} -{" "}
                  {formatTimeV1(classDetails?.endSlot)})
                </p>
                <p className="mb-1">{classDetails.totalSlot}</p>
                <button
                  onClick={() => handleOpenNewTab(classDetails.roomUrl)}
                  style={{
                    backgroundColor: "#5562ea",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                  }}
                >
                  <div
                    className="py-1 px-2"
                    style={{ backgroundColor: "5562ea", borderRadius: "8px" }}
                  >
                    Discord
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="d-flex justify-content-between">
              <p className="blue">LIST STUDENT</p>
              <button
                onClick={handleAddStudentClick}
                style={{
                  backgroundColor: "#FFA63D",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  height: "35px",
                }}
              >
                Add student
              </button>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#1A9CB7", color: "white" }}
                    >
                      #
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#1A9CB7", color: "white" }}
                    >
                      Full name
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#1A9CB7", color: "white" }}
                    >
                      Date of birth
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#1A9CB7", color: "white" }}
                    >
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents?.map((student, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        {index + 1 + currentPage * studentsPerPage}
                      </td>
                      <td className="text-center">{student.studentName}</td>
                      <td className="text-center">{student.dateOfBirth}</td>
                      <td className="text-center">
                        {student?.gender == 0 ? "Other" : student?.gender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center">
              <Stack
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={1}
              >
                <Pagination
                  count={pageCount <= 0 ? 1 : pageCount}
                  // count={10}
                  color="primary"
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
    );
  };

  const CreateClass = ({ onBack, onNext }) => {
    const [classCode, setClassCode] = useState("");
    const [date, setDate] = useState(null);
    const [openDay, setOpenDay] = useState(null);
    const [closeDay, setCloseDay] = useState(null);
    const today = new Date().toISOString().split("T")[0];
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [isScheduleSectionEnabled, setIsScheduleSectionEnabled] =
      useState(false);
    const [createdClassDetails, setCreatedClassDetails] = useState(null);
    const secondAccordionButtonRef = useRef(null);
    const [checkedDays, setCheckedDays] = useState({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    });
    const [isCreatingClass, setIsCreatingClass] = useState(false);
    const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await instance.get(
            "api/v1/courses?status=Active&action=manage"
          );
          const data = response.data;

          setCourses(data.results);
          if (data.results.length > 0) {
            setSelectedCourseId(data.results[0].id);
          }
        } catch (error) {
          if (error.response) {
            console.log(`Error response: ${error.response?.data?.message}`);
            // setMessage(error.response?.data?.message || "Undefined.");
          } else {
            console.log(`Error message abc: ${error.message}`);
            // setMessage(error.message || "Undefined.");
          }
        }
      };

      fetchCourses();
    }, []);

    const formatBirthday = (date) => {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const handleCreateClass = async () => {
      try {
        setIsCreatingClass(true);
        if (!classCode || !openDay || !closeDay) {
          toast.error("Please fill out all fields", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return;
        }

        const data = {
          classCode: classCode,
          openDay: formatBirthday(openDay),
          closeDay: formatBirthday(closeDay),
          courseId: selectedCourseId,
        };

        const response = await instance.post("api/v1/classes", data);

        const responseData = response.data;
        console.log("createClass: ", responseData);

        setIsScheduleSectionEnabled(true);
        setCreatedClassDetails(responseData);
        toast.success("Create class successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        const backendMessage = error.response?.data?.message || "Class creation failed. Please try again.";
        toast.error(backendMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsCreatingClass(false);
      }
    };

    const toggleDay = (day) => {
      setCheckedDays((prevState) => ({
        ...prevState,
        [day]: !prevState[day],
      }));
    };

    const getCheckedDays = () => {
      return Object.entries(checkedDays)
        .filter(([day, isChecked]) => isChecked)
        .map(([day]) => day);
    };

    const firstRowDays = Object.entries(checkedDays)?.slice(0, 3);
    const secondRowDays = Object.entries(checkedDays)?.slice(3);

    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const renderRow = (days) => (
      <div className="d-flex justify-content-around">
        {days.map(([day, isChecked]) => (
          <div
            key={day}
            className="d-flex"
            onClick={() => toggleDay(day)}
            style={{ width: "200px" }}
          >
            <i
              style={{ fontSize: "25px", color: "#1A9CB7", cursor: "pointer" }}
              className={
                isChecked ? "fa-solid fa-square-check" : "fa-regular fa-square"
              }
            ></i>
            <p className="ms-2" style={{ fontSize: "18px" }}>
              {day}
            </p>
          </div>
        ))}
      </div>
    );

    const calculateEndTime = (startTime, slotDuration) => {
      let [hours, minutes] = startTime.split(":").map(Number);
      minutes += slotDuration; // Ensure slotDuration is an integer
      hours += Math.floor(minutes / 60);
      minutes %= 60;
      // Pad the hours and minutes with leading zeros if necessary
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    const SlotTimeSelection = ({ classDetails }) => {
      if (!classDetails) {
        return <p>Loading or not available...</p>;
      }

      const slotDuration = Number(classDetails.slotDuration);

      const slots = [
        { id: 1, start: "8:00" },
        { id: 2, start: "10:00" },
        { id: 3, start: "14:00" },
        { id: 4, start: "16:00" },
        { id: 5, start: "18:00" },
        { id: 6, start: "20:00" },
      ].map((slot) => ({
        ...slot,
        end: calculateEndTime(slot.start, slotDuration),
      }));

      // Split slots into two rows for rendering
      const firstRowSlots = slots?.slice(0, 3);
      const secondRowSlots = slots?.slice(3);

      const handleSlotSelection = (id) => {
        setSelectedSlotId(id);
      };

      const renderSlot = (slot) => (
        <div
          key={slot.id}
          className="d-flex align-items-center"
          onClick={() => handleSlotSelection(slot.id)}
          style={{ cursor: "pointer", padding: "10px", width: "250px" }}
        >
          <i
            style={{ fontSize: "25px", color: "#1A9CB7" }}
            className={
              selectedSlotId === slot.id
                ? "fa-solid fa-circle"
                : "fa-regular fa-circle"
            }
          ></i>
          <p className="ms-2 my-2" style={{ fontSize: "16px" }}>
            Slot {slot.id} ({slot.start} - {slot.end})
          </p>
        </div>
      );

      return (
        <div>
          <div className="d-flex justify-content-around">
            {firstRowSlots.map(renderSlot)}
          </div>
          <div className="d-flex justify-content-around">
            {secondRowSlots.map(renderSlot)}
          </div>
        </div>
      );
    };

    if (!classData) {
      return (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      );
    }

    const handleCreateSchedule = async () => {
      const checkedDaysArray = getCheckedDays();
      const days = checkedDaysArray.length > 0 ? checkedDaysArray : ["NoDay"];
      const requiredSlots = createdClassDetails ? createdClassDetails.slotPerWeek : 0;

      if (checkedDaysArray.length !== requiredSlots) {
        toast.error(`Please select exactly ${requiredSlots} days for the schedule as per the course requirements.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return; // Stop the function execution if the condition is not met
      }

      const data = {
        days: days,
        classId: createdClassDetails.classId,
        slot: selectedSlotId,
        slotTime: createdClassDetails.slotDuration,
      };

      try {
        setIsCreatingSchedule(true);

        const response = await instance.post("api/v1/Classes/schedules", data);
        const responseData = response.data;
        console.log("responseData: ", responseData);

        setSelectedClassId(responseData.classId);
        //log
        console.log(`ClassId: ${responseData.classId}`);
        setView("classContent");
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsCreatingSchedule(false);
      }
    };

    return (
      <div className="staff-create-class mx-5 py-3 px-5" style={{ overflow: 'scroll' }}>
        <ToastContainer />
        <div className="header">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div>
                <h5 className="mb">Class detail</h5>
                <hr />
              </div>
              <i class="fa-solid fa-bell"></i>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#7F7C7C",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
                onClick={onBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Create class
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="p-3">
                  <p className="blue mb-1">Class's code</p>
                  <input
                    className="ms-3"
                    type="text"
                    placeholder="Type class's code. Ex: VNR202"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    style={{
                      width: "300px",
                      height: "35px",
                      outline: "none",
                      border: "1px solid #F69E4A",
                      borderRadius: "8px",
                    }}
                  />

                  <p className="blue mb-1 mt-4">Select course</p>
                  <select
                    className="ms-3"
                    style={{
                      width: "300px",
                      height: "35px",
                      outline: "none",
                      border: "1px solid #F69E4A",
                      borderRadius: "8px",
                    }}
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>

                  <p className="blue mb-1 mt-4">Duration start class</p>
                  <div className="d-flex justify-content-center">
                    <div className="d-flex">
                      <p className="mt-1 me-2">Start</p>
                      <DatePicker
                        selected={openDay}
                        onChange={(date) => setOpenDay(date)}
                        minDate={new Date()}
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        customInput={<CustomInput placeholder="Select a date" />}
                      />
                    </div>
                    <i
                      style={{ fontSize: "18px" }}
                      class="fa-solid fa-arrow-right mx-3 mt-2"
                    ></i>
                    <div className="d-flex">
                      <p className="mt-1 me-2">End</p>
                      <DatePicker
                        selected={closeDay}
                        onChange={(date) => setCloseDay(date)}
                        minDate={openDay || today}
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        customInput={<CustomInput placeholder="Select a date" />}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="mt-4"
                      style={{
                        backgroundColor: "#F25B58",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        height: "35px",
                        width: "120px",
                      }}
                      onClick={handleCreateClass}
                    >
                      {isCreatingClass ? (
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Create class"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item" style={{ overflow: 'scroll' }}>
            <h2 class="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle={isScheduleSectionEnabled ? "collapse" : ""}
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                disabled={!isScheduleSectionEnabled}
              >
                Create schedule
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
              ref={secondAccordionButtonRef}

            >
              <div class="accordion-body">
                <div className="px-5 pt-2">
                  <div className="d-flex">
                    <p className="blue">Slot duration</p>
                    <span className="ms-5">
                      {createdClassDetails && createdClassDetails.slotDuration}{" "}
                      minutes/slot
                    </span>
                  </div>
                  <div className="d-flex">
                    <p className="blue">Slot per week</p>
                    <span className="ms-5">
                      {createdClassDetails && createdClassDetails.slotPerWeek}{" "}
                      slots/week
                    </span>
                  </div>
                  <p className="blue">Study day</p>
                  <div className="study-day">
                    {renderRow(firstRowDays)}
                    {renderRow(secondRowDays)}
                  </div>
                  <p className="blue">Slot time</p>
                  <div>
                    {createdClassDetails && (
                      <SlotTimeSelection classDetails={createdClassDetails} />
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      style={{
                        backgroundColor: "#F25B58",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        height: "35px",
                        width: "150px",
                      }}
                      onClick={handleCreateSchedule}
                    >
                      {isCreatingSchedule ? (
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Create schedule"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EditSchedule = ({ classId, onBack }) => {
    const [createdClassDetails, setCreatedClassDetails] = useState(null);
    const [checkedDays, setCheckedDays] = useState({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    });
    const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
    const [classSchedule, setClassSchedule] = useState({})

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await instance.get(
            `api/v1/Classes/schedules/${classId}`
          );
          const data = response.data;
          console.log('data: ', data);
          setClassSchedule(data);


        } catch (error) {

        }
      };

      fetchCourses();
    }, []);

    console.log('classSchedule: ', classSchedule);

    const toggleDay = (day) => {
      setCheckedDays((prevState) => ({
        ...prevState,
        [day]: !prevState[day],
      }));
    };

    const getCheckedDays = () => {
      return Object.entries(checkedDays)
        .filter(([day, isChecked]) => isChecked)
        .map(([day]) => day);
    };

    const firstRowDays = Object.entries(checkedDays)?.slice(0, 3);
    const secondRowDays = Object.entries(checkedDays)?.slice(3);

    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const renderRow = (days) => (
      <div className="d-flex justify-content-start">
        {days.map(([day, isChecked]) => (
          <div
            key={day}
            className="d-flex"
            onClick={() => toggleDay(day)}
            style={{ width: "180px" }}
          >
            <i
              style={{ fontSize: "25px", color: "#1A9CB7", cursor: "pointer" }}
              className={
                isChecked ? "fa-solid fa-square-check" : "fa-regular fa-square"
              }
            ></i>
            <p className="ms-2" style={{ fontSize: "18px" }}>
              {day}
            </p>
          </div>
        ))}
      </div>
    );

    const calculateEndTime = (startTime, slotTime) => {
      let [hours, minutes] = startTime.split(":").map(Number);
      minutes += slotTime; // Ensure slotDuration is an integer
      hours += Math.floor(minutes / 60);
      minutes %= 60;
      // Pad the hours and minutes with leading zeros if necessary
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    const SlotTimeSelection = ({ classSchedule }) => {
      // Ensure we handle the case where classSchedule might be null or undefined
      if (!classSchedule) {
        return <p>Loading or not available...</p>;
      }

      // Assuming classSchedule contains the necessary details like slotDuration
      const slotDuration = Number(classSchedule.slotTime);

      // Create slots based on the start times and calculate end times using slotDuration
      const slots = [
        { id: 1, start: "8:00" },
        { id: 2, start: "10:00" },
        { id: 3, start: "14:00" },
        { id: 4, start: "16:00" },
        { id: 5, start: "18:00" },
        { id: 6, start: "20:00" },
      ].map((slot) => ({
        ...slot,
        end: calculateEndTime(slot.start, slotDuration), // Utilizing a shared calculateEndTime function
      }));

      // Render slots in two rows
      const firstRowSlots = slots.slice(0, 3);
      const secondRowSlots = slots.slice(3);

      const handleSlotSelection = (id) => {
        setSelectedSlotId(id);
      };

      // Function to render each slot in the UI
      const renderSlot = (slot) => (
        <div
          key={slot.id}
          className="d-flex align-items-center"
          onClick={() => handleSlotSelection(slot.id)}
          style={{ cursor: "pointer", padding: "10px", width: "250px" }}
        >
          <i
            style={{ fontSize: "25px", color: "#1A9CB7" }}
            className={selectedSlotId === slot.id ? "fa-solid fa-circle" : "fa-regular fa-circle"}
          ></i>
          <p className="ms-2 my-2" style={{ fontSize: "16px" }}>
            Slot {slot.id} ({slot.start} - {slot.end})
          </p>
        </div>
      );

      // Returning the structured rows of slots for selection
      return (
        <div>
          <div className="d-flex justify-content-around">
            {firstRowSlots.map(renderSlot)}
          </div>
          <div className="d-flex justify-content-around">
            {secondRowSlots.map(renderSlot)}
          </div>
        </div>
      );
    };


    if (!classData) {
      return (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      );
    }

    const handleCreateSchedule = async () => {
      const checkedDaysArray = getCheckedDays();
      const days = checkedDaysArray.length > 0 ? checkedDaysArray : ["NoDay"];
      const requiredSlots = classSchedule ? classSchedule.slotPerWeek : 0;

      if (checkedDaysArray.length !== requiredSlots) {
        toast.error(`Please select exactly ${requiredSlots} days for the schedule as per the course requirements.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return; // Stop the function execution if the condition is not met
      }

      if (!selectedSlotId) {
        toast.error("Please select a slot time before updating the schedule.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return; // Stop the function execution if no slot is selected
      }

      const data = {
        classId: classSchedule.classId,
        studyDay: days,
        slotNumber: selectedSlotId,
        slotTime: classSchedule.slotTime,
      };

      console.log('data before put:', JSON.stringify(data)); // Check how data looks after serialization

      try {
        setIsCreatingSchedule(true);

        const response = await instance.put("api/v1/Classes/schedules", data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = response.data;
        console.log("responseData: ", responseData);

        console.log(`ClassId: ${responseData.classId}`);
        setView("classContent");
      } catch (error) {
        console.error("Error during the API request:", error);
        let errorMessage = "Unexpected error occurred."; // Default message
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsCreatingSchedule(false);
      }
    };


    return (
      <div className="staff-create-class mx-5 py-3 px-5" style={{ overflow: 'scroll' }}>
        <ToastContainer />
        <div className="header">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div>
                <h5 className="mb">Edit schedule</h5>
                <hr />
              </div>
              <i class="fa-solid fa-bell"></i>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#7F7C7C",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
                onClick={onBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div>
          <div style={{ overflow: 'scroll' }}>
            <div
            >
              <div >
                <div className="px-5 pt-2">
                  <div className="d-flex">
                    <p className="blue">Slot duration</p>
                    <span className="ms-5">
                      {classSchedule && classSchedule.slotTime}{" "}
                      minutes/slot
                    </span>
                  </div>
                  <div className="d-flex">
                    <p className="blue">Slot per week</p>
                    <span className="ms-5">
                      {classSchedule && classSchedule.slotPerWeek}{" "}
                      slots/week
                    </span>
                  </div>
                  <p className="blue">Study day</p>
                  <div className="study-day">
                    {renderRow(firstRowDays)}
                    {renderRow(secondRowDays)}
                  </div>
                  <p className="blue">Slot time</p>
                  <div>
                    {classSchedule && (
                      <SlotTimeSelection classSchedule={classSchedule} />
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      style={{
                        backgroundColor: "#F25B58",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        height: "35px",
                        width: "150px",
                      }}
                      onClick={handleCreateSchedule}
                    >
                      {isCreatingSchedule ? (
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Update schedule"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StudentForm = ({ onBack, classId }) => {
    const [currentClass, setCurrentClass] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const studentsPerPage = 5;
    const pagesVisited = pageNumber * studentsPerPage;
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    const [searchPageNumber, setSearchPageNumber] = useState(0);
    const [enrolledPageNumber, setEnrolledPageNumber] = useState(0);

    const searchPagesVisited = searchPageNumber * studentsPerPage;
    const enrolledPagesVisited = enrolledPageNumber * studentsPerPage;

    const searchPageCount = Math.ceil(searchResults.length / studentsPerPage);
    const enrolledPageCount = Math.ceil(enrolledStudents.length / studentsPerPage);

    const changeSearchPage = ({ selected }) => {
      setSearchPageNumber(selected);
    };

    const changeEnrolledPage = ({ selected }) => {
      setEnrolledPageNumber(selected);
    };

    const pageCount = Math.ceil(searchResults.length / studentsPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    console.log(classId);

    useEffect(() => {
      const fetchClassDetails = async () => {
        try {
          //bug
          console.log(`ClassId: ${classId}`);
          const response = await instance.get(
            `api/v1/Classes/detail/${classId}`
          );
          const classData = response.data;

          console.log("classData: ", classData);

          setCurrentClass(classData);
          setEnrolledStudents(classData.students || []);
        } catch (error) {
          console.error("Failed to fetch class details", error);
        }
      };

      if (classId) {
        fetchClassDetails();
      }
    }, [classId]);

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const executeSearch = async () => {
      if (!searchTerm.trim()) return;

      setIsSearching(true);
      try {
        const response = await instance.get(
          `api/v1/Classes/students/search?input=${encodeURIComponent(
            searchTerm
          )}&classId=${classId}`
        );
        const searchData = response.data;

        console.log("searchData: ", searchData);
        setSearchResults(searchData); // Update your state with the search result
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    };

    // Function to handle adding a student
    const handleAddStudent = (studentToAdd) => {
      setEnrolledStudents((prevStudents) => {
        // Check if the student is already added to prevent duplicates
        const isAlreadyAdded = prevStudents.some(
          (student) => student.studentId === studentToAdd.studentId
        );
        if (!isAlreadyAdded) {
          return [...prevStudents, studentToAdd];
        }
        return prevStudents;
      });
    };

    // Function to handle removing a student
    const handleRemoveStudent = (studentIdToRemove) => {
      setEnrolledStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student.studentId !== studentIdToRemove
        )
      );
    };

    // Function to save changes
    const handleSaveChanges = async () => {
      try {
        setIsLoading(true);
        const data = {
          studentIds: enrolledStudents.map((student) => student.studentId), // Make sure to use student.studentId if that's the correct property
          classId: classId,
        };
        const response = await instance.post(
          "api/v1/Classes/students/add-or-remove",
          data
        );

        const postListStudent = response.data;

        console.log("postListStudent: ", postListStudent);
        toast.success("Update student list successfully", {
          // Use the message from the response for the toast
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Update student list failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      console.log(enrolledStudents);
    }, [enrolledStudents]);

    const goBack = () => {
      onBack();
      setView("classContent");
    };

    return (
      <div
        className="m-5 p-5"
        style={{ backgroundColor: "white", minHeight: "600px" }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <p className="orange" style={{ fontSize: "22px" }}>
              Add/Update students
            </p>
          </div>
          <div>
            <button
              style={{
                backgroundColor: "#7F7C7C",
                color: "white",
                border: "none",
                marginRight: "10px",
                borderRadius: "5px",
              }}
              onClick={goBack}
            >
              Back
            </button>
          </div>
        </div>
        <ToastContainer />
        <div className="px-3">
          <div>
            <div className="d-flex">
              <p className="blue">Class name</p>
              <p className="ms-3" style={{ color: "#F25B58" }}>
                {currentClass?.classCode}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div style={{ width: "45%" }}>
              <div>
                <p className="blue mb-1">Search student's name</p>
                <div className="d-flex justify-content-center mb-2">
                  <div>
                    <input
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{
                        height: "35px",
                        width: "300px",
                        borderRadius: "8px 0px 0px 8px",
                        borderRight: "none",
                        outline: "none",
                      }}
                      type="text"
                      placeholder="Type student's name"
                    />
                  </div>
                  <div
                    disabled={isSearching}
                    onClick={executeSearch}
                    className="text-center"
                    style={{
                      height: "35px",
                      width: "50px",
                      borderRadius: "0px 8px 8px 0px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#F69E4A",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      style={{
                        fontSize: "18px",
                        marginTop: "8px",
                        color: "white",
                      }}
                      class="fa-solid fa-magnifying-glass"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Full name
                      </th>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Date of birth
                      </th>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : searchResults.length > 0 ? (
                      searchResults
                        ?.slice(pagesVisited, pagesVisited + studentsPerPage)
                        ?.map((student, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              {student.studentName}
                            </td>
                            <td className="text-center">
                              {student.dateOfBirth}
                            </td>
                            <td className="text-center">
                              <button
                                style={{ border: "none", color: "#FFA63D" }}
                                onClick={() => handleAddStudent(student)}
                              >
                                <i
                                  style={{ fontSize: "18px" }}
                                  class="fa-solid fa-circle-plus"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center">
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  my={1}
                >
                  <Pagination
                    count={searchPageCount <= 0 ? 1 : searchPageCount}
                    color="primary"
                    page={searchPageNumber + 1}
                    onChange={(event, value) => setSearchPageNumber(value - 1)}
                  // rest of your props
                  />
                </Stack>
              </div>
            </div>
            <div style={{ width: "45%", marginTop: "47px" }}>
              <p className="blue mb-0">Current class student list</p>
              <div
                class="table-responsive"
                style={{ height: "270px", overflowY: "scroll" }}
              >
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Full name
                      </th>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Date of birth
                      </th>
                      <th
                        className="text-center"
                        style={{ backgroundColor: "#1A9CB7", color: "white" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledStudents.map((student, index) => (
                      <tr key={index}>
                        <td className="text-center">{student.studentName}</td>
                        <td className="text-center">{student.dateOfBirth}</td>
                        <td className="text-center">
                          <button
                            style={{ border: "none", color: "#FFA63D" }}
                            onClick={() =>
                              handleRemoveStudent(student.studentId)
                            }
                          >
                            <i
                              style={{ fontSize: "18px" }}
                              className="fa-solid fa-circle-minus"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Stack
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={1}
              >
                <Pagination
                  count={enrolledPageCount <= 0 ? 1 : enrolledPageCount}
                  color="primary"
                  page={enrolledPageNumber + 1}
                  onChange={(event, value) => setEnrolledPageNumber(value - 1)}
                // rest of your props
                />
              </Stack>
              <div className="d-flex justify-content-end">
                <button
                  style={{
                    backgroundColor: "#F15C58",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    height: "35px",
                    width: "120px",
                  }}
                  onClick={handleSaveChanges}
                >
                  {isLoading ? (
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TeacherForm = ({ onBack, classId }) => {
    const [teachers, setTeachers] = useState([]);
    const [currentClass, setCurrentClass] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [isTeacherLoading, setIsTeacherLoading] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedTeacherSchedules, setSelectedTeacherSchedules] = useState(
      []
    );
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(null);

    useEffect(() => {
      // Optionally, fetch class details if needed to get study days and slots
      const fetchClassDetails = async () => {
        try {
          const response = await instance.get(
            `api/v1/Classes/detail/${classId}`
          );
          const classData = response.data;

          console.log("classData: ", classData);
          setCurrentClass(classData);
        } catch (error) {
          console.error("Failed to fetch class details", error);
        }
      };

      if (classId) {
        fetchClassDetails();
      }
    }, [classId]);

    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          setIsLoading(true);
          const response = await instance.get(`api/v1/Classes/teachers`);
          const data = response.data;

          console.log("data: ", data);
          setTeachers(data);
        } catch (error) {
          console.error("Failed to fetch teachers", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeachers();
    }, []);

    const handleTeacherSelection = (event) => {
      const teacherId = event.target.value;

      if (!teacherId) {
        setSelectedTeacherId(null);
        setSelectedTeacherSchedules([]);
        setSelectedScheduleIndex(null);
      } else {
        setSelectedTeacherId(teacherId);
        setIsTeacherLoading(true);

        const selectedTeacher = teachers.find(
          (teacher) => teacher.teacherId.toString() === teacherId
        );

        if (
          selectedTeacher &&
          selectedTeacher.schedules &&
          selectedTeacher.schedules.length > 0
        ) {
          setSelectedTeacherSchedules(selectedTeacher.schedules);
          setSelectedScheduleIndex(0);
        } else {
          setSelectedTeacherSchedules([]);
          setSelectedScheduleIndex(null);
        }

        setIsTeacherLoading(false);
      }
    };

    const addTeacherToClass = async () => {
      if (!selectedTeacherId) {
        toast.error("Please choose a teacher first.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      try {
        setIsLoading(true);
        const response = await instance.post(
          `api/v1/Classes/teacher/add-to-class?classId=${classId}&teacherId=${selectedTeacherId}`
        );

        const addTeacher = await response.data;
        console.log("Success:", addTeacher);
        toast.success("Teacher added to class successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigateToView("classContent", classId);
      } catch (error) {
        console.error("Failed to add teacher to class:", error);
        toast.error("Failed to add teacher to class", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div
        className="my-5 p-5"
        style={{
          backgroundColor: "white",
          marginLeft: "120px",
          marginRight: "120px",
        }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="orange mb-1">Add teacher</h3>
          </div>
          <div>
            <button
              style={{
                backgroundColor: "#7F7C7C",
                color: "white",
                border: "none",
                marginRight: "10px",
                borderRadius: "5px",
              }}
              onClick={() => navigateToView("classContent", classId)}
            >
              Back
            </button>
          </div>
        </div>
        <ToastContainer />
        <div className="p-3">
          <div
            className="p-1"
            style={{
              backgroundColor: "#FBEDE1",
              width: "60%",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex">
              <p style={{ color: "#F11616", fontWeight: "bold" }}>
                Current class
              </p>
              <div className="ms-5">
                {currentClass?.studyDay?.map((day, index) => (
                  <span key={index} style={{ marginRight: "50px" }}>
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex" style={{ marginLeft: "145px" }}>
              <p>
                Slot {currentClass?.slotNumber} ({currentClass?.startSlot} -{" "}
                {currentClass?.endSlot})
              </p>
            </div>
          </div>

          <div>
            <p className="blue mb-1" style={{ fontWeight: "bold" }}>
              Teacher
            </p>
            <select
              name="teacher"
              id="teacher-select"
              disabled={isLoading}
              onChange={handleTeacherSelection}
              style={{
                border: "1px solid #FF8A00",
                outline: "none",
                borderRadius: "5px",
                height: "30px",
                width: "300px",
              }}
            >
              <option value="">Please choose the teacher</option>
              {isLoading ? (
                <option disabled>Loading teachers...</option>
              ) : (
                teachers.map((teacher) => (
                  <option key={teacher.teacherId} value={teacher.teacherId}>
                    {teacher.teacherName}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <p className="blue mb-1 mt-3" style={{ fontWeight: "bold" }}>
              His/her classes
            </p>
            <div
              className="pt-3"
              style={{
                border: "1px solid #FF8A00",
                borderRadius: "8px",
                paddingLeft: "60px",
              }}
            >
              {isTeacherLoading ? (
                <p>Loading teacher schedules...</p>
              ) : selectedTeacherId && selectedTeacherSchedules.length === 0 ? (
                <p>This teacher does not have any schedules yet.</p>
              ) : (
                <div>
                  <div className="d-flex">
                    <div>
                      <p style={{ fontWeight: "bold", color: "#F25B58" }}>
                        Class code
                      </p>
                    </div>
                    <div className="ms-5">
                      <select
                        name="scheduleSelect"
                        id="schedule-select"
                        onChange={(e) =>
                          setSelectedScheduleIndex(e.target.value)
                        }
                        value={selectedScheduleIndex}
                        style={{
                          border: "1px solid #FF8A00",
                          outline: "none",
                          borderRadius: "5px",
                          width: "150px",
                        }}
                      >
                        {selectedTeacherSchedules.map((schedule, index) => (
                          <option key={index} value={index}>
                            {schedule.className}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {selectedScheduleIndex !== null &&
                    selectedTeacherSchedules[selectedScheduleIndex] && (
                      <div>
                        <div className="d-flex">
                          <p className="blue" style={{ fontWeight: "bold" }}>
                            Study day :
                          </p>
                          <div style={{ marginLeft: "50px" }}>
                            {selectedTeacherSchedules[
                              selectedScheduleIndex
                            ]?.studyDays?.map((day, index) => (
                              <span key={index} style={{ marginRight: "50px" }}>
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex">
                          <p className="blue" style={{ fontWeight: "bold" }}>
                            Slot:
                          </p>
                          <p style={{ marginLeft: "100px" }}>
                            Slot{" "}
                            {
                              selectedTeacherSchedules[selectedScheduleIndex]
                                .slot
                            }{" "}
                            (
                            {
                              selectedTeacherSchedules[selectedScheduleIndex]
                                .open
                            }{" "}
                            -{" "}
                            {
                              selectedTeacherSchedules[selectedScheduleIndex]
                                .close
                            }
                            )
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              style={{
                backgroundColor: "#F15C58",
                border: "none",
                borderRadius: "8px",
                color: "white",
                width: "150px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={addTeacherToClass}
              disabled={isLoading} // Disable the button when isLoading is true
            >
              {isLoading ? (
                <>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                "Add teacher"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleViewClassContent = (classId) => {
    setSelectedClassId(classId);
    setView("classContent");
  };

  const navigateToView = (viewName, classId = null) => {
    if (classId) {
      setClassIdForForm(classId);
    }
    setView(viewName);
  };

  useEffect(() => {
    if (view === "detail") {
      fetchClassData(currentPage);
    }
  }, [view, currentPage]);

  const fetchClassData = async (page) => {
    try {
      const response = await instance.get(`api/v1/Classes?page=${page}&size=4`);
      const data = response.data;

      console.log("data: ", data);
      setClassData(data.classes);
      console.log(classData);
      setTotalPages(data.totalPage);
    } catch (error) {
      console.error("Failed to fetch class data", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1),
      year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return [day, month, year].join("/");
  };

  const renderView = () => {
    switch (view) {
      case "createClass":
        return <CreateClass onBack={() => setView("detail")} />;
      case "addTeacher":
        return (
          <TeacherForm
            classId={classIdForTeacherForm}
            onBack={() => setView("classContent")}
          />
        );
      case "editSchedule":
        return (
          <EditSchedule
            onBack={() => setView("classContent")}
            classId={classIdForTeacherForm}
          />
        );
      case "addStudent":
        return (
          <StudentForm
            classId={classIdForStudentForm}
            onBack={() => setView("classContent")}
          />
        );
      case "classContent":
        return (
          <ClassContent
            classId={selectedClassId}
            setView={setView}
            setClassIdForStudentForm={setClassIdForStudentForm}
            setClassIdForTeacherForm={setClassIdForTeacherForm}
          />
        );
      default:
        return (
          <div className="staff-class-container">
            <div className="header">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                  <div>
                    <h5 className="mb">CLASS</h5>
                    <hr />
                  </div>
                  <i className="fa-solid fa-bell"></i>
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: "#F25B58",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    onClick={() => setView("createClass")}
                  >
                    <div className="d-flex py-2 px-3">
                      <i
                        style={{ color: "white" }}
                        className="fa-solid fa-circle-plus"
                      ></i>
                      <span className="ms-1">Create class</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="render-list staff-class-render-list">
              {classData &&
                classData.map((classItem, index) => (
                  <div key={index} className="py-2 px-5 mt-2">
                    <div
                      className="d-flex justify-content-between px-3 py-2"
                      style={{
                        border: "1px solid #EF7E54",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <p>Class Code: {classItem.classCode}</p>
                        <div className="d-flex justify-content-start">
                          <p className="mb-1">
                            Start date: {formatDate(classItem.openClass)}
                          </p>
                          <p className="mb-1 ms-3">
                            End date: {formatDate(classItem.closeClass)}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() =>
                            handleViewClassContent(classItem.classId)
                          }
                          style={{
                            backgroundColor: "#EF7E54",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        >
                          <div className="py-1 px-2">View</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <Pagination
                count={!totalPages || totalPages <= 0 ? 1 : totalPages}
                color="primary"
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
        );
    }
  };

  return renderView();
}