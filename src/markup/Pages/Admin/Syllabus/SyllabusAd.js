import React, { useState, useEffect, useRef } from "react";
import syllabusPicture from "../../../../images/gallery/syllabus_image.jpg";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrowLeft from "../../../../images/icon/arrow-left.png";
import plusCircleIcon from "../../../../images/icon/plus_circle.png";

//dnd kit
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
//css
import "./SyllabusAd.css";
import {
  convertUtcToLocalTime,
  formatDateV1,
} from "../../../../helper/utils/DateUtil";
import {
  createSyllabus,
  filterSyllabus,
} from "../../../../helper/apis/syllabus/syllabus";
import { Spinner } from "react-bootstrap";
import instance from "../../../../helper/apis/baseApi/baseApi";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  FormGroup,
  FormHelperText,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  CalendarMonth,
  CreateNewFolder,
} from "@mui/icons-material";
import ButtonMui from "@mui/material/Button";
import { getAvailableCourseGame } from "../../../../helper/apis/game/game";
import { useDispatch } from "react-redux";
import { changeAdminActiveMenu } from "../../../../store/slices/menu/menuSlice";

function SearchableDropdown({ options, selectedValue, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  //dispatch
  const dispatch = useDispatch();

  dispatch(changeAdminActiveMenu({ adminActiveMenu: "SyllabusAd" }));

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Find the selected option's label
  const selectedOptionLabel =
    options.find((option) => option.id === selectedValue)?.fullName || "";

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          cursor: "pointer",
          padding: "10px",
          border: "1px solid #FF8A00",
          borderRadius: "10px",
        }}
      >
        {selectedOptionLabel || "Select an option"}
      </div>
      {isDropdownOpen && (
        <>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              margin: "5px 0",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #909090",
              borderRadius: "10px",
              outline: "none",
            }}
          />
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              maxHeight: "200px",
              overflowY: "auto",
              position: "absolute",
              width: "100%",
              border: "1px solid #FF8A00",
              borderRadius: "10px",
              backgroundColor: "#fff",
              zIndex: 1000,
            }}
          >
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsDropdownOpen(false);
                }}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                {option.fullName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function SyllabusAd() {
  const [showCreateSyllabus, setShowCreateSyllabus] = useState(false);
  const [courses, setCourses] = useState([]);
  const [record, setRecord] = useState([]);
  const [isSyllabusLoading, setIsSyllabusLoading] = useState(false);
  const [syllabusPage, setSyllabusPage] = useState(1);
  const [totalSyllabusPage, setTotalSyllabusPage] = useState(0);
  const [syllabusQuery, setSyllabusQuery] = useState("");

  const [message, setMessage] = useState("");

  //useNavigate
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

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
      toastId: "loadSyllabusFail",
      containerId: "1",
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
      toastId: "loadSyllabusSuccess",
      containerId: "1",
    });

  const offset = currentPage * itemsPerPage;
  const currentPageData = courses.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSyllabusLoading(true);
        const data = await filterSyllabus({
          name: syllabusQuery,
          sortCreatedDate: "desc",
          status: "Open",
          page: syllabusPage,
          size: 4,
        });
        setCourses(data.results || []);
        setRecord(data.totalRecords);
        setTotalSyllabusPage(data.totalPages);
      } catch (error) {
        if (error.response) {
          const message =
            error.response?.data?.message ||
            "Something wrong when fetching syllabuses.";
          console.log(`Error response: ${error.response?.data?.message}`);
          notifyApiFail(message);
        } else {
          const message =
            error.message || "Something wrong when fetching syllabuses.";
          console.log(`Error message: ${error.message}`);
          notifyApiFail(message);
        }
      } finally {
        setIsSyllabusLoading(false);
      }
    };

    fetchData();
  }, [syllabusPage]);

  const handleSearchSyllabusSubmit = async () => {
    if (syllabusPage === 1) {
      try {
        setIsSyllabusLoading(true);

        const data = await filterSyllabus({
          name: syllabusQuery,
          sortCreatedDate: "desc",
          status: "Open",
          page: syllabusPage,
          size: 4,
        });
        setCourses(data.results || []);
        setRecord(data.totalRecords);
        setTotalSyllabusPage(data.totalPages);
      } catch (error) {
        if (error.response) {
          const message =
            error.response?.data?.message ||
            "Something wrong when fetching syllabuses.";
          console.log(`Error response: ${error.response?.data?.message}`);
          notifyApiFail(message);
        } else {
          const message =
            error.message || "Something wrong when fetching syllabuses.";
          console.log(`Error message: ${error.message}`);
          notifyApiFail(message);
        }
      } finally {
        setIsSyllabusLoading(false);
      }
    } else {
      setSyllabusPage(1);
    }
  };

  const CreateSyllabus = () => {
    const [teachers, setTeachers] = useState([]);
    const [courseGames, setCourseGames] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    //sortable list
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState("");

    const [courseName, setCourseName] = useState("Syllabus");
    const [courseTarget, setCourseTarget] = useState("Course target");
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [courseGameId, setCourseGameId] = useState(-1);

    const [activePassCondition, setActivePassCondition] = useState(80);
    const [activeCourseSlot, setActiveCourseSlot] = useState(30);
    const [activeSlotTime, setActiveSlotTime] = useState(30);
    const [slotPerWeek, setSlotPerWeek] = useState(1);
    const [isSyllabusCreating, setIsSyllabusCreating] = useState(false);

    const handleActiveCourseSlotChange = (event) => {
      let value = event.target.value;

      if (value !== null && value !== "" && (value <= 0 || value > 50)) {
        if (value <= 0) {
          value = 1;
        } else {
          value = 50;
        }
      }

      setActiveCourseSlot(value);
    }

    const handleActiveSlotTimeChange = (event) => {
      let value = event.target.value;

      //log
      if (value !== null && value !== "" && (value <= 5 || value > 50)) {
        if (value <= 5) {
          value = 5;
        } else {
          value = 50;
        }
      }
      setActiveSlotTime(value);
    }

    const handleSlotPerWeekChange = (event) => {
      let value = event.target.value;

      //log
      if (value !== null && value !== "" && (value < 0 || value > 7)) {
        if (value < 0) {
          value = 1;
        } else {
          value = 7;
        }
      }
      setSlotPerWeek(value);
    }

    const notifyCreateFail = () =>
      toast.error("Create syllabus failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "createSyllabusfail",
        containerI: "2",
      });

    const notifyCreateSuccess = (message) =>
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
        toastId: "createSyllabusfail",
        containerId: "2",
      });

    const handleCourseGameIdChange = (event) => {
      setCourseGameId(event.target.value);
    };

    const handleSelect = (category, value) => {
      if (category === "passCondition") {
        setActivePassCondition(value);
      } else if (category === "courseSlot") {
        setActiveCourseSlot(value);
      } else if (category === "slotTime") {
        setActiveSlotTime(value);
      }
    };

    const handleAddSection = () => {
      if (newSectionName.trim() !== "") {
        setSections([...sections, newSectionName.trim()]);
        setNewSectionName("");
        setModalShow(false);
      }
    };

    const handleRemoveSection = (indexToRemove) => {
      setSections(sections.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          const teacherResponse = await instance.get(
            `api/v1/users/admin/account?role=Teacher&page=1&size=100`
          );

          const teacherData = teacherResponse.data;

          const teachersData = teacherData.results.filter(
            (item) => item.role === "Teacher"
          );
          setTeachers(teachersData);

          //fetch course game
          const courseGameData = await getAvailableCourseGame();
          setCourseGames(courseGameData);

          //log
          console.log(
            `CourseGames: ${JSON.stringify(courseGameData, null, 2)}`
          );
        } catch (error) {
          if (error.response) {
            const message =
              error.response?.data?.message ||
              "Something wrong when fetch teacher list.";
            console.log(`Error response: ${error.response?.data?.message}`);
            notifyApiFail(message);
          } else {
            const message =
              error.message || "Something wrong when fetch teacher list.";
            console.log(`Error message: ${error.message}`);
            notifyApiFail(message);
          }
        }
      };
      fetchTeachers();
    }, []);

    const handleSaveChanges = async () => {
      try {
        setIsSyllabusCreating(true);

        const courseData = {
          name: courseName,
          target: courseTarget,
          teacherId: selectedTeacherId,
          totalSlot: activeCourseSlot,
          slotTime: activeSlotTime,
          slotPerWeek: slotPerWeek,
          minQuizScoreRatio: activePassCondition,
          sections: sections.map((sectionName) => ({ name: sectionName })),
          courseGameId:
            !courseGameId || courseGameId === -1 ? undefined : courseGameId,
        };

        const response = await createSyllabus(courseData);

        notifyCreateSuccess("Create syllabus success.");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        if (error.response) {
          const message =
            error.response?.data?.message ||
            "Something wrong when create syllabuses.";
          console.log(`Error response: ${error.response?.data?.message}`);
          notifyCreateFail(message);
          // notifyApiFail(message);
        } else {
          const message =
            error.message || "Something wrong when create syllabuses.";
          console.log(`Error message: ${error.message}`);
          notifyCreateFail(message);
          // notifyApiFail(message);
        }
      } finally {
        setIsSyllabusCreating(false);
      }
    };

    //dnd part

    //sensor
    const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

    const handleDragEnd = (event) => {
      const { active, over } = event;

      if (active.id === over.id) {
        return;
      }

      const originalPos = active.id;
      const newPos = over.id;

      const updateSections = arrayMove(sections, originalPos, newPos);
      setSections(updateSections);
    };

    //dnd part

    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSyllabusCreating}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="syllabus-ad-admin-syllabus-container admin-syllabus">
          <div className="create-syllabus my-0">
            <div className="header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <h5 className="mb">Create Syllabus</h5>
                    <hr />
                  </div>
                  <i className="fa-solid fa-book"></i>
                </div>
                <div>
                  {/* <ButtonMui
                  size="small"
                  variant="contained"
                  color="warning"
                  aria-label="Back"
                  startIcon={<KeyboardBackspace />}
                  onClick={() => setShowCreateSyllabus(false)}
                  type="button"
                >
                  Back
                </ButtonMui> */}

                  <button
                    onClick={() => setShowCreateSyllabus(false)}
                    className="admin-back"
                  >
                    <div className="d-flex jutify-content-between align-items-center">
                      <img src={arrowLeft} alt="Arrow Left Icon" />
                      <p className="mb-0 mx-2">Back</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <ToastContainer containerId={2} />
            <FormGroup onSubmit={handleSaveChanges}>
              <div>
                <div className="d-flex justify-content-start fw-bold my-3">
                  <p className="mb-0 blue ">Course title</p>
                  <span className="orange">*</span>
                </div>
                <input
                  className="syllabus-ad-create-syllabus-input w-100"
                  type="text"
                  placeholder="Title"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />

                {/* Error message for course title */}
                {!courseName && (
                  <FormHelperText error>Please enter a course title</FormHelperText>
                )}

                <div className="d-flex justify-content-start fw-bold mt-3">
                  <p className="mb-0 blue">Course target</p>
                  <span className="orange">*</span>
                </div>
                <textarea
                  className="mt-3 syllabus-ad-create-syllabus-input w-100"
                  name=""
                  id=""
                  rows="4"
                  value={courseTarget}
                  onChange={(e) => setCourseTarget(e.target.value)}
                  required
                ></textarea>
                {!courseTarget && (
                  <FormHelperText error>Please enter a course target</FormHelperText>
                )}
              </div>

              <div className="d-flex justify-content-start fw-bold mt-3 mb-3">
                <p className="mb-0 blue">Sections</p>
                <span className="orange">*</span>
              </div>

              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                className="create-course-modal-content syllabus-ad-create-syllabus-modal"
              >
                {/* <Modal.Header>
                <div className="text-center">
                  <h5 style={{ color: "#ff8a00" }}>Add new section</h5>
                </div>
              </Modal.Header> */}
                <Modal.Header
                  closeButton
                  className="create-course-modal-header"
                >
                  <Modal.Title>Add section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="">
                    <p className="mb-0 syllabus-ad-create-syllabus-form-lable mb-3">
                      Section's name
                    </p>
                    <input
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      type="text"
                      placeholder="Section's name"
                      className="syllabus-ad-create-syllabus-input w-100 mb-3"
                    />
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      style={{
                        backgroundColor: "#1a9cb7",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        height: "35px",
                        width: "100px",
                      }}
                      className="mx-4"
                      onClick={() => setModalShow(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        backgroundColor: "#E53E5C",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        height: "35px",
                        width: "100px",
                      }}
                      onClick={handleAddSection}
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </Modal.Body>
              </Modal>
              <div className="render-section mb-3">
                {/* Dnd content */}
                <DndContext
                  collisionDetection={closestCenter}
                  sensors={sensor}
                  onDragEnd={(event) => handleDragEnd(event)}
                >
                  <SortableContext
                    items={sections}
                    strategy={verticalListSortingStrategy}
                  >
                    {sections.map((section, index) => (
                      //   <div
                      //     className="px-4 pt-2 mt-2 pb-2 d-flex justify-content-between"
                      //     key={index}
                      //     style={{ border: "1px solid #D4D4D4" }}
                      //   >
                      //     <p className="mb-0">{section}</p>
                      //     <i
                      //       onClick={() => handleRemoveSection(index)}
                      //       style={{ cursor: "pointer" }}
                      //       class="fa-solid fa-trash-can"
                      //     ></i>
                      //   </div>

                      <SectionComponent
                        index={index}
                        handleRemoveSection={handleRemoveSection}
                        section={section}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                {/* Dnd content */}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="syllabus-ad-create-syllabus-button"
                    onClick={() => setModalShow(true)}
                    type="button"
                  >
                    <i className="fa-solid fa-circle-plus mx-1"></i>
                    <span className="mx-1">Add section</span>
                  </button>
                </div>
              </div>

              {/* Game Section */}

              <p className="blue mb-1 fw-bold">Game</p>
              <div className="d-block w-100 mb-3">
                <Select
                  value={courseGameId}
                  onChange={handleCourseGameIdChange}
                  size="small"
                  sx={{ width: "100%", backgroundColor: "white" }}
                >
                  <MenuItem value={-1}>
                    None
                  </MenuItem>
                  {courseGames.map((courseGame, index) => {
                    return (
                      <MenuItem key={index} value={courseGame.id}>
                        {courseGame.name}
                      </MenuItem>
                    );
                  })}
                  {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </div>

              {/* Game Section */}

              <div className="point d-flex">
                <div>
                  <p className="blue mb-1 fw-bold">Pass condition<span className="orange">*</span></p>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                    className="my-2"
                  >
                    <p className="ms-5 w-25" style={{ minWidth: "150px" }}>Quiz score higher</p>
                    <div className="d-flex w-75 ms-5">
                      {[60, 70, 80, 90].map((value) => (
                        <div
                          key={value}
                          className="item d-flex"
                          onClick={() => handleSelect("passCondition", value)}
                        >
                          <i
                            className={
                              activePassCondition === value
                                ? "fa-solid fa-circle"
                                : "fa-regular fa-circle"
                            }
                          ></i>
                          <div>{value}%</div>
                        </div>
                      ))}
                    </div>
                  </Stack>
                  {!activePassCondition && (
                    <FormHelperText error>Please choose a condition</FormHelperText>
                  )}
                  <p className="blue mb-1 fw-bold">Course slot<span className="orange">*</span></p>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={4}
                    className="my-2"
                  >
                    <p className="ms-5 w-25" style={{ minWidth: "150px" }}>Total number of slot</p>
                    <Stack spacing={1} className="w-75" sx={{ maxWidth: "300px" }}>
                      <input
                        type="number"
                        step={1}
                        value={activeCourseSlot ?? 30}
                        required
                        class="syllabus-ad-create-syllabus-input w-100"
                        min={1}
                        max={50}
                        onChange={handleActiveCourseSlotChange}
                      // style={{ maxWidth: "300px" }}
                      />
                      {!activeCourseSlot && (
                        <FormHelperText error>Please enter a course slot</FormHelperText>
                      )}
                    </Stack>
                  </Stack>

                  <p className="blue mb-1 fw-bold">Slot time<span className="orange">*</span></p>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                    className="my-2"
                  >
                    <p className="ms-5 w-25" style={{ minWidth: "150px" }}>Minutes</p>
                    <Stack spacing={1} className="w-75" sx={{ maxWidth: "300px" }}>
                      <input
                        type="number"
                        step={5}
                        value={activeSlotTime ?? 30}
                        required
                        class="syllabus-ad-create-syllabus-input w-100"
                        min={5}
                        max={50}
                        onChange={handleActiveSlotTimeChange}
                      />
                      {!activeSlotTime && (
                        <FormHelperText error>Please enter slot time </FormHelperText>
                      )}
                    </Stack>
                  </Stack>

                  <p className="blue mb-1 fw-bold">Slot per week<span className="orange">*</span></p>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                    className="my-2"
                  >
                    <p className="ms-5 w-25" style={{ minWidth: "150px" }}>Slots</p>
                    <Stack spacing={1} className="w-75" sx={{ maxWidth: "300px" }}>
                      <input
                        type="number"
                        step={1}
                        value={slotPerWeek ?? 1}
                        required
                        class="syllabus-ad-create-syllabus-input w-100"
                        min={1}
                        max={7}
                        onChange={handleSlotPerWeekChange}
                      />
                      {!slotPerWeek && (
                        <FormHelperText error>Please enter a number </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-start fw-bold mb-3">
                  <p className="mb-0 blue">Teacher</p>
                  <span className="orange">*</span>
                </div>
                <SearchableDropdown
                  options={teachers}
                  selectedValue={selectedTeacherId}
                  onChange={(id) => setSelectedTeacherId(id)}
                />
              </div>

              <div className="d-flex justify-content-end mt-4">

                <ButtonMui
                  // size="small"
                  variant="contained"
                  color="error"
                  aria-label="Post course"
                  startIcon={<CreateNewFolder />}
                  // onClick={handleSaveChanges}
                  type="submit"
                >
                  CREATE SYLLABUS
                </ButtonMui>
              </div>
            </FormGroup>
          </div>
        </div>
      </>
    );
  };

  // Conditional rendering based on showCreateSyllabus
  if (showCreateSyllabus) {
    return <CreateSyllabus />;
  }

  return (
    <div className="admin-syllabus syllabus-ad-admin-syllabus-container">
      <div className="syllabus-ad-admin-syllabus">
        <div className="header">
          <div className="d-flex justify-content-start align-items-center mb-3 ">
            <div>
              <h5 className="my-0">Syllabus</h5>
              <hr />
            </div>
            <i className="fa-solid fa-book"></i>
          </div>
        </div>

        {!showCreateSyllabus && <ToastContainer containerId={1} />}

        <div className="syllabus-content pb-3">
          <div className="d-flex justify-content-between align-items-center mx-3 mt-2">
            <div
              className="d-flex justify-content-start align-items-center"
            // style={{
            //   width: "30%",
            //   border: "1px solid #EF7E54",
            //   padding: "10px 15px",
            //   borderRadius: "10px",
            //   color: "white",
            // }}
            >
              {/* <div className="text-center" style={{ width: "50%" }}>
                <h5 className="mb-0">SYLLABUS LIST</h5>
              </div> */}
              <div
                className="d-flex justify-content-around"
                style={{
                  backgroundColor: "#FF8A00",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  color: "white",
                }}
              >
                <p className="mb-0">Total results: {record}</p>
              </div>
            </div>
            <div>
              {/* <button
                onClick={() => setShowCreateSyllabus(true)}
                className="syllabus-ad-create-syllabus-button"
              >
                <i className="fa-solid fa-circle-plus mx-1"></i>{" "}
                <div className="mx-1">Create</div>
              </button> */}

              {/* <ButtonMui
                size="small"
                variant="contained"
                color="error"
                aria-label="Create new syllabus"
                startIcon={<AddCircleOutline />}
                onClick={() => setShowCreateSyllabus(true)}
                type="button"
              >
                Create
              </ButtonMui> */}

              <button
                className="add"
                onClick={() => setShowCreateSyllabus(true)}
              >
                <div className="d-flex jutify-content-between align-items-center">
                  <img
                    className="mx-1"
                    src={plusCircleIcon}
                    alt="Plus Circle Icon"
                  />
                  <p className="mb-0 mx-1">Create</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3 syllabus-content-search mb-3">
              <input
                type="text"
                name={syllabusQuery}
                onChange={(event) => setSyllabusQuery(event.target.value)}
                placeholder="Search syllabus"
                className="syllabus-content-search-input"
              />
              <button
                type="button"
                className="syllabus-content-search-button"
                onClick={handleSearchSyllabusSubmit}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div className="px-3 syllabus-ad-content">
              {isSyllabusLoading ? (
                <div className="d-flex justify-content-center py-5">
                  <Spinner
                    animation="border"
                    variant="success"
                    className="custom-spinner"
                  />
                </div>
              ) : (
                currentPageData.map((course, index) => (
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
                          <p className="my-1">{course.name}</p>
                          <p className="mb-1 d-flex align-items-center">
                            <CalendarMonth fontSize="small" />{" "}
                            <span className="title mx-1">
                              {formatDateV1(
                                convertUtcToLocalTime(course.createdDate)
                              )}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <button
                          // className="mt-3"
                          style={{
                            display: "inline-block",
                            backgroundColor: "#EF7E54",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                            textDecoration: "none",
                            textAlign: "center",
                            padding: "6px 30px",
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* <CustomPagination
              page={syllabusPage}
              setPage={setSyllabusPage}
              totalPage={totalSyllabusPage <= 0 ? 1 : totalSyllabusPage}
            /> */}

            {/* Paging */}

            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <Pagination
                count={totalSyllabusPage <= 0 ? 1 : totalSyllabusPage}
                color="warning"
                page={syllabusPage}
                onChange={(event, value) => setSyllabusPage(value)}
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
}

const SectionComponent = ({ index, handleRemoveSection, section }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transition: isDragging ? transition : "",
    transform: CSS.Transform.toString(transform),
    border: "1px solid #D4D4D4",
    borderColor: isOver ? "#FF8A00" : "#D4D4D4",
  };

  return (
    <div
      className="px-4 pt-2 mt-2 pb-2 d-flex justify-content-between align-items-center syllabus-ad-create-syllabus-section"
      //   key={index}

      ref={setNodeRef}
      style={style}
    >
      <p className="mb-0">{section}</p>

      <div className="d-flex justify-content-between align-items-center">
        <div
          className="syllabus-ad-create-syllabus-section-remove"
          title="Remove"
        >
          <i
            onClick={() => handleRemoveSection(index)}
            style={{ fontSize: "18px" }}
            class="fa-solid fa-trash-can mx-3"
          ></i>
        </div>

        <div
          className="create-course-drag mx-2"
          // className="mx-2"
          disabled
          title="Drag"
          {...attributes}
          {...listeners}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-regular fa-hand" style={{ fontSize: "18px" }}></i>
        </div>
      </div>
    </div>
  );
};
