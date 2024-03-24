import { useEffect, useState } from "react";
import simp from "./../../../../../images/gallery/simp.jpg";
import {
  getCourseById,
  getCoursesApi,
} from "../../../../../helper/apis/course/course";
import { useDispatch, useSelector } from "react-redux";
import { syllabusesSelector } from "../../../../../store/selector";
import { filterSyllabusesAsync } from "../../../../../store/thunkApis/syllabuses/syllabusesThunk";
import { filterSyllabus } from "../../../../../helper/apis/syllabus/syllabus";
import SyllabusInformation from "./syllabusInformation/SyllabusInformation";

const Syllabus = () => {
  //useDispath
  const dispatch = useDispatch();

  //set information message
  const [message, setMessage] = useState(undefined);

  //syllabus list
  const syllabuses = useSelector(syllabusesSelector);

  //current syllabus Id
  const [syllabusId, setSyllabusId] = useState(0);

  const [currentComponent, setCurrentComponent] = useState("default");
  // const [currentPageData, setCurrentPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseStructure, setCourseStructure] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    description: "Test create course",
    sections: [
      {
        id: 1,
        lessons: [],
        quizzes: [],
      },
      // Add other sections as needed
    ],
  });

  //log
  console.log(`Call syllabus`);

  const NewVideo = ({ removeSelf }) => {
    const [isVideoCollapseOpen, setIsVideoCollapseOpen] = useState(false);

    const toggleVideoCollapse = () => {
      setIsVideoCollapseOpen(!isVideoCollapseOpen);
    };

    const sectionActiveStyle = {
      borderBottom: "none",
    };

    return (
      <div style={{ marginTop: "15px" }}>
        <div
          className={`section d-flex justify-content-between ${
            isVideoCollapseOpen ? "active" : ""
          }`}
          style={isVideoCollapseOpen ? sectionActiveStyle : {}}
          onClick={toggleVideoCollapse}
        >
          <p className="mb-0 blue">Video 1</p>
          {isVideoCollapseOpen ? (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                class="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i className="fa-solid fa-chevron-up"></i>
            </div>
          ) : (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                class="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          )}
        </div>

        {isVideoCollapseOpen && (
          <div className="video-collapse">
            <p className="title red">Video's title</p>
            <input
              type="text"
              placeholder="Video's title"
              style={{ width: "100%", paddingLeft: "15px" }}
            />

            <p style={{ marginTop: "15px" }} className="title red">
              Upload a video file
            </p>
            <p className="mb-0">
              Max size <span className="orange">500Mb</span>. The required type
              of video is <span className="orange">MP4</span>.
            </p>
            <button className="button">
              <i className="fa-solid fa-circle-plus"></i> Upload file
            </button>
          </div>
        )}
      </div>
    );
  };

  const NewQuiz = ({ removeSelf }) => {
    const [isQuizCollapseOpen, setIsQuizCollapseOpen] = useState(false);
    const [questions, setQuestions] = useState([
      { choices: ["", "", "", ""], correctAnswer: null },
    ]);

    const toggleQuizCollapse = () => {
      setIsQuizCollapseOpen(!isQuizCollapseOpen);
    };

    const sectionActiveStyle = {
      borderBottom: "none",
    };

    const addQuestion = () => {
      setQuestions([
        ...questions,
        { choices: ["", "", "", ""], correctAnswer: null },
      ]);
    };

    const saveQuiz = () => {
      const formattedQuestions = questions.map((question) => ({
        title: question.title,
        options: question.choices.map((choice, index) => ({
          content: choice,
          isCorrect: index === question.correctAnswer,
        })),
      }));
    };

    const updateChoice = (questionIndex, choiceIndex, value) => {
      const newQuestions = questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          const newChoices = [...question.choices];
          newChoices[choiceIndex] = value;
          return { ...question, choices: newChoices };
        }
        return question;
      });
      setQuestions(newQuestions);
    };

    const markAsCorrect = (questionIndex, choiceIndex) => {
      const newQuestions = questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return { ...question, correctAnswer: choiceIndex };
        }
        return question;
      });
      setQuestions(newQuestions);
    };

    const removeQuestion = (questionIndex) => {
      const updatedQuestions = questions.filter(
        (_, index) => index !== questionIndex
      );
      setQuestions(updatedQuestions);
    };

    const newQuestion = (index) => {
      return (
        <div key={index} className="question" style={{ marginTop: "20px" }}>
          <div
            className="d-flex justify-content-end"
            style={{
              backgroundColor: "#F6D3C8",
              borderRadius: "5px 5px 0px 0px",
              padding: "5px 25px",
              height: "30px",
            }}
          >
            <i
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                removeQuestion(index);
              }}
              class="fa-solid fa-trash-can"
            ></i>
          </div>
          <div className="question-content">
            <p className="title red">Question</p>
            <input
              style={{
                border: "none",
                borderBottom: "1px solid #212121CC",
                outline: "none",
                width: "100%",
              }}
              type="text"
              placeholder="Write question"
            />

            <p className="title red">
              Multiple choices (Select the correct choice)
            </p>
            {questions[index].choices.map((choice, choiceIndex) => (
              <div
                key={choiceIndex}
                className="d-flex justify-content-start"
                style={{ marginTop: "10px" }}
              >
                <i
                  className={`mt-1 fa-regular ${
                    questions[index].correctAnswer === choiceIndex
                      ? "fa-solid fa-circle"
                      : "fa-regular fa-circle"
                  }`}
                  onClick={() => markAsCorrect(index, choiceIndex)}
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "#FF8A00",
                  }}
                ></i>
                <input
                  type="text"
                  placeholder={`Enter question's ${choiceIndex + 1} choice`}
                  value={choice}
                  style={{ width: "300px", outline: "none" }}
                  onChange={(e) =>
                    updateChoice(index, choiceIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div style={{ marginTop: "15px" }}>
        <div
          className={`section d-flex justify-content-between ${
            isQuizCollapseOpen ? "active" : ""
          }`}
          style={isQuizCollapseOpen ? sectionActiveStyle : {}}
          onClick={toggleQuizCollapse}
        >
          <p className="mb-0 blue">Quiz</p>
          {isQuizCollapseOpen ? (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                class="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i className="fa-solid fa-chevron-up"></i>
            </div>
          ) : (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                class="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          )}
        </div>

        {isQuizCollapseOpen && (
          <div className="quiz-collapse">
            <p className="title red mb-0">Set test time</p>
            <span style={{ fontSize: "12px", color: "#7F7C7C" }}>
              The minimum exam time is 5 minutes and the maximum is 20 minutes
            </span>
            <br />
            <input
              style={{ width: "50px", outline: "none" }}
              type="number"
              placeholder="10"
            />

            <p className="title red">Quiz Content</p>

            <div className="render-question">
              {questions.map((_, index) => newQuestion(index))}
            </div>

            <div className="d-flex justify-content-center">
              <button onClick={addQuestion}>Add question</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const NewDocument = ({
    sectionId,
    title,
    content,
    removeSelf,
    handleDocumentChange,
  }) => {
    const [documentTitle, setDocumentTitle] = useState(title || "");
    const [documentContent, setDocumentContent] = useState(content || "");
    const [isDocCollapseOpen, setIsDocCollapseOpen] = useState(false);

    const toggleDocCollapse = () => {
      setIsDocCollapseOpen(!isDocCollapseOpen);
    };

    // Call handleDocumentChange when the title changes
    const onTitleChange = (e) => {
      const newTitle = e.target.value;
      setDocumentTitle(newTitle);
      handleDocumentChange(sectionId, "title", newTitle);
    };

    // Call handleDocumentChange when the content changes
    const onContentChange = (e) => {
      const newContent = e.target.value;
      setDocumentContent(newContent);
      handleDocumentChange(sectionId, "content", newContent);
    };

    return (
      <div style={{ marginTop: "15px" }}>
        <div
          className={`section d-flex justify-content-between ${
            isDocCollapseOpen ? "active" : ""
          }`}
          style={isDocCollapseOpen ? { borderBottom: "none" } : {}}
          onClick={toggleDocCollapse}
        >
          <p className="mb-0 blue">Document 1</p>
          {isDocCollapseOpen ? (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                className="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i className="fa-solid fa-chevron-up"></i>
            </div>
          ) : (
            <div className="d-flex">
              <i
                style={{ marginRight: "15px" }}
                className="fa-solid fa-circle-minus"
                onClick={removeSelf}
              ></i>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          )}
        </div>

        {isDocCollapseOpen && (
          <div className="doc-collapse">
            <p className="title red">Document's title</p>
            <input
              type="text"
              placeholder="Document's title"
              style={{ width: "100%", paddingLeft: "15px" }}
              value={documentTitle}
              onChange={onTitleChange} // Correct usage
            />

            <p className="title red">Description</p>
            <textarea
              rows="4"
              placeholder="Write document's description"
              style={{ width: "100%" }}
              value={documentContent}
              onChange={onContentChange}
            ></textarea>
          </div>
        )}
      </div>
    );
  };

  const formatSectionData = (section) => {
    return {
      id: section.id,
      lessons: section.lessons.map((lesson) => {
        // Format each lesson based on its type
        if (lesson.type === "Video") {
          return {
            name: lesson.name,
            resourceUrl: lesson.resourceUrl,
            type: "Video",
          };
        } else if (lesson.type === "Document") {
          return {
            name: lesson.name,
            content: lesson.content,
            type: "Document",
          };
        }
      }),
      quizzes: section.quizzes.map((quiz) => {
        return {
          title: quiz.title,
          description: quiz.description,
          duration: quiz.duration,
          numberOfAttempt: quiz.numberOfAttempt,
          questions: quiz.questions.map((question) => {
            return {
              title: question.title,
              score: question.score,
              options: question.options.map((option) => {
                return {
                  content: option.content,
                  answerExplain: option.answerExplain,
                  isCorrect: option.isCorrect,
                };
              }),
            };
          }),
        };
      }),
    };
  };

  const saveSectionContent = async (sectionId) => {
    const section = courseData.sections.find((s) => s.id === sectionId);
    const formattedSectionData = formatSectionData(section);

    // Prepare the full course data in the required format
    const dataToSend = {
      ...courseData,
      sections: [formattedSectionData], // This example assumes updating one section at a time
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://www.kidpro-production.somee.com/api/v1/courses/${courseData.id}?action=Save`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save section content.");
      }

      const responseData = await response.json();
      console.log("Section content saved successfully:", responseData);
      // Handle further actions here, like notifying the user
    } catch (error) {
      console.error("Error saving section content:", error);
      // Handle error, like showing an error message
    }
  };

  // fetch syllabuses list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        dispatch(
          filterSyllabusesAsync({
            page: 1,
            size: 10,
          })
        );

        //log
        console.log(`Fetch data: ${JSON.stringify(syllabuses, null, 2)}`);
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

  const CreateCourse = ({ selectedCourse, goBack }) => {
    const initializedCourseStructure = {
      ...selectedCourse,

      //need to remove
      /*sections: selectedCourse.sections.map((section) => ({
          ...section,
          contentTypes: section.contentTypes || [], // Ensure each section has a contentTypes array
        })),*/
    };

    const [courseStructure, setCourseStructure] = useState(
      initializedCourseStructure
    );

    //remove
    const saveSectionContent = (sectionId) => {
      const updatedContentItems = courseStructure.sections
        .find((section) => section.id === sectionId)
        ?.contentTypes.map((contentType) => {
          // This is a simplified representation. You'll need to fetch the actual updated content from your state or components
          return {
            ...contentType,
            // title: Updated title from state or component,
            // content: Updated content from state or component,
          };
        });

      // Update the course structure with the updated content items for the section
      const updatedSections = courseStructure.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            contentTypes: updatedContentItems, // Assuming 'contentTypes' holds your content items
          };
        }
        return section;
      });

      // Update the course structure state
      setCourseStructure((prevState) => ({
        ...prevState,
        sections: updatedSections,
      }));

      // Here you can also make an API call to save the updated section content to the server
    };
    //remove

    //remove
    //update document - hàm đang bị sai - nên update trực tiếp document
    const handleDocumentChange = (sectionId, fieldName, value) => {
      // Update the course structure with the new document details
      const updatedSections = courseStructure.sections.map((section) => {
        if (section.id === sectionId) {
          // Update the document within the found section
          const updatedDocument = { ...section.document, [fieldName]: value };
          return { ...section, document: updatedDocument };
        }
        return section;
      });

      // Update the course structure state
      setCourseStructure((prevState) => ({
        ...prevState,
        sections: updatedSections,
      }));
    };
    //remove

    // Function to add a new content type to a section
    const addContentTypeToSection = (sectionId, contentType) => {
      switch (contentType) {
        case "Video": {
          //find section
          const sectionIndex = courseStructure.sections.findIndex(
            (section) => section.id === sectionId
          );

          //Add video to lesson
          let newLesson = {
            type: "Video",
          };

          const updatedCourseStructure = { ...courseStructure };

          updatedCourseStructure.sections[sectionIndex].lessons.push(newLesson);

          setCourseStructure(updatedCourseStructure);
        }

        case "Document": {
          //find section
          const sectionIndex = courseStructure.sections.findIndex(
            (section) => section.id === sectionId
          );

          //Add video to lesson
          let newLesson = {
            type: "Document",
          };

          const updatedCourseStructure = { ...courseStructure };

          updatedCourseStructure.sections[sectionIndex].lessons.push(newLesson);

          setCourseStructure(updatedCourseStructure);
        }
        case "Quiz": {
          //log
          console.log(`Call add new quiz.`);
        }

        default: {
          console.log(`Call method add content that not supported.`);
        }
      }

      //Log result
      console.log(
        `\nCourse entity to update: ${JSON.stringify(courseStructure, null, 2)}`
      );
    };

    // Function to remove a content type from a section
    const removeContentType = (sectionId, contentType, contentIndex) => {
      switch (contentType) {
        case "Video": {
          //find section
          const sectionIndex = courseStructure.sections.findIndex(
            (section) => section.id === sectionId
          );

          if (sectionIndex !== -1) {
            const updateSection = { ...courseStructure.sections[sectionIndex] };

            if (contentIndex > 0 && contentIndex < updateSection.lessons.size) {
              const updatedCourseStructure = { ...courseStructure };

              //remove lesson
              updatedCourseStructure.sections[sectionIndex].lessons.splice(
                contentIndex,
                1
              );

              setCourseStructure(updatedCourseStructure);
            }
          } else {
            console.error(`Lesson with index ${contentIndex} not found`);
          }
        }

        case "Document": {
          //find section
          const sectionIndex = courseStructure.sections.findIndex(
            (section) => section.id === sectionId
          );

          if (sectionIndex !== -1) {
            const updateSection = { ...courseStructure.sections[sectionIndex] };

            if (contentIndex > 0 && contentIndex < updateSection.lessons.size) {
              const updatedCourseStructure = { ...courseStructure };

              //remove lesson
              updatedCourseStructure.sections[sectionIndex].lessons.splice(
                contentIndex,
                1
              );

              setCourseStructure(updatedCourseStructure);
            }
          } else {
            console.error(`Lesson with index ${contentIndex} not found`);
          }
        }
        case "Quiz": {
          //log
          console.log(`Call add new quiz.`);
        }

        default: {
          console.log(`Call method add content that not supported.`);
        }
      }
    };

    // Function to render content types based on the state
    const renderContentTypes = (section) => {
      if (!Array.isArray(section.contentTypes)) {
        // If contentTypes is not an array, return null or an appropriate fallback
        return null;
      }

      return section.contentTypes.map((contentType) => {
        switch (contentType.type) {
          case "Video":
            return (
              <NewVideo
                key={contentType.id}
                removeSelf={() => removeContentType(section.id, contentType.id)}
              />
            );
          case "Document":
            return (
              <NewDocument
                key={contentType.id}
                sectionId={section.id}
                title={section.document ? section.document.title : ""}
                content={section.document ? section.document.content : ""}
                removeSelf={() => removeContentType(section.id, contentType.id)}
                handleDocumentChange={handleDocumentChange} // Pass the function here
              />
            );
          case "Quiz":
            return (
              <NewQuiz
                key={contentType.id}
                removeSelf={() => removeContentType(section.id, contentType.id)}
              />
            );
          default:
            return null;
        }
      });
    };

    return (
      <div className="teacher-create">
        <div className="create-course">
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
                <button onClick={goBack}>Back</button>
              </div>
            </div>
          </div>
          <div className="create-course-content">
            <div style={{ padding: "10px 20px" }}>
              <div className="d-flex">
                <div className="d-flex justify-content-start">
                  <p className="title blue">Course Title</p>
                </div>
                <div>
                  <p>{courseStructure.name}</p>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-start">
                  <p className="title blue">Section</p>
                  <span className="sub-title orange">*</span>
                </div>

                <div className="super-render">
                  {courseStructure.sections.map((section) => (
                    <div key={section.id}>
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${section.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${section.id}`}
                      >
                        {section.name}
                      </div>
                      <div id={`collapse${section.id}`} className="collapse">
                        <div className="render-content">
                          {renderContentTypes(section)}
                        </div>
                        <button
                          onClick={() =>
                            addContentTypeToSection(section.id, "Video")
                          }
                        >
                          Add Video
                        </button>
                        <button
                          onClick={() =>
                            addContentTypeToSection(section.id, "Document")
                          }
                        >
                          Add Document
                        </button>
                        <button
                          onClick={() =>
                            addContentTypeToSection(section.id, "Quiz")
                          }
                        >
                          Add Quiz
                        </button>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button onClick={() => saveSectionContent(section.id)}>
                          Save section
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="title blue">Image Course</p>
                <p className="mb-0">
                  Max size <span className="orange">100Mb</span>. The required
                  type image is <span className="orange">JPG, PNG</span>.
                </p>
                <button className="button">
                  <i class="fa-solid fa-circle-plus"></i> Upload file
                </button>
              </div>

              <div>
                <div className="d-flex">
                  <input id="check" type="checkbox" />
                  <label for="check">
                    Tôi sẽ chịu trách nhiệm nếu nội dung khóa học không chuẩn
                    mực với đạo đức của một giáo viên
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                  <button>SAVE DRAFT</button>
                  <button>POST COURSE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "syllabusInformation":
        return (
          <SyllabusInformation
            goBack={() => setCurrentComponent("default")}
            syllabusId={syllabusId}
            setCurrentComponent={setCurrentComponent}
          />
        );
      case "createCourse":
        return (
          <CreateCourse
            selectedCourse={selectedCourse}
            goBack={() => setCurrentComponent("syllabusInformation")}
          />
        );
      default:
        return (
          <div className="syllabus">
            <div className="header">
              <div className="d-flex justify-content-start">
                <div>
                  <h5 className="mb">CREATE COURSE</h5>
                  <hr />
                </div>
                <i class="fa-solid fa-book"></i>
              </div>
            </div>
            <div className="syllabus-content">
              <h5 className="mb-2 ms-3">Syllabus</h5>
              <hr style={{ margin: "0px" }} />
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
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>

                <div className="px-3" style={{ minHeight: "500px" }}>
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
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
                                Create date: {syllabus.createdDate}
                              </p>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setSyllabusId(syllabus.id);
                                setCurrentComponent("syllabusInformation");
                              }}
                              className="mt-3"
                              style={{
                                width: "100px",
                                backgroundColor: "#EF7E54",
                                border: "none",
                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  return renderComponent();
};

export default Syllabus;
