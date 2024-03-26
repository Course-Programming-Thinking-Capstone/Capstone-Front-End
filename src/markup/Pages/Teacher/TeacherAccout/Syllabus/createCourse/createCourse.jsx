import { useDispatch, useSelector } from "react-redux";
import {
  createCourseIdSelector,
  createCourseSelector,
} from "../../../../../../store/selector";
import { useEffect, useState } from "react";
import { getCourseByIdAsync } from "../../../../../../store/thunkApis/course/courseThunk";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const createCourse = useSelector(createCourseSelector);

  const navigate = useNavigate();

  const courseId = useSelector(createCourseIdSelector);

  //use state
  const [message, setMessage] = useState(undefined);

  const goBack = () => {
    navigate(-1);
  };

  // fetch course detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCourseByIdAsync(courseId));
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.Message}`);
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          console.log(`Error message abc: ${error.message}`);
          setMessage(error.message || "Undefined.");
        }
      } finally {
      }
    };
    fetchData();
  }, [dispatch]);

  const initializedCourseStructure = {
    ...createCourse,

    //need to remove
    /*sections: selectedCourse.sections.map((section) => ({
          ...section,
          contentTypes: section.contentTypes || [], // Ensure each section has a contentTypes array
        })),*/
  };

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

  // // Function to remove a content type from a section
  // const removeContentType = (sectionId, contentType, contentIndex) => {
  //   switch (contentType) {
  //     case "Video": {
  //       //find section
  //       const sectionIndex = courseStructure.sections.findIndex(
  //         (section) => section.id === sectionId
  //       );

  //       if (sectionIndex !== -1) {
  //         const updateSection = { ...courseStructure.sections[sectionIndex] };

  //         if (contentIndex > 0 && contentIndex < updateSection.lessons.size) {
  //           const updatedCourseStructure = { ...courseStructure };

  //           //remove lesson
  //           updatedCourseStructure.sections[sectionIndex].lessons.splice(
  //             contentIndex,
  //             1
  //           );

  //           setCourseStructure(updatedCourseStructure);
  //         }
  //       } else {
  //         console.error(`Lesson with index ${contentIndex} not found`);
  //       }
  //     }

  //     case "Document": {
  //       //find section
  //       const sectionIndex = courseStructure.sections.findIndex(
  //         (section) => section.id === sectionId
  //       );

  //       if (sectionIndex !== -1) {
  //         const updateSection = { ...courseStructure.sections[sectionIndex] };

  //         if (contentIndex > 0 && contentIndex < updateSection.lessons.size) {
  //           const updatedCourseStructure = { ...courseStructure };

  //           //remove lesson
  //           updatedCourseStructure.sections[sectionIndex].lessons.splice(
  //             contentIndex,
  //             1
  //           );

  //           setCourseStructure(updatedCourseStructure);
  //         }
  //       } else {
  //         console.error(`Lesson with index ${contentIndex} not found`);
  //       }
  //     }
  //     case "Quiz": {
  //       //log
  //       console.log(`Call add new quiz.`);
  //     }

  //     default: {
  //       console.log(`Call method add content that not supported.`);
  //     }
  //   }
  // };

  // // Function to render content types based on the state
  // const renderContentTypes = (section) => {
  //   if (!Array.isArray(section.contentTypes)) {
  //     // If contentTypes is not an array, return null or an appropriate fallback
  //     return null;
  //   }

  //   return section.contentTypes.map((contentType) => {
  //     switch (contentType.type) {
  //       case "Video":
  //         return (
  //           <NewVideo
  //             key={contentType.id}
  //             removeSelf={() => removeContentType(section.id, contentType.id)}
  //           />
  //         );
  //       case "Document":
  //         return (
  //           <NewDocument
  //             key={contentType.id}
  //             sectionId={section.id}
  //             title={section.document ? section.document.title : ""}
  //             content={section.document ? section.document.content : ""}
  //             removeSelf={() => removeContentType(section.id, contentType.id)}
  //             handleDocumentChange={handleDocumentChange} // Pass the function here
  //           />
  //         );
  //       case "Quiz":
  //         return (
  //           <NewQuiz
  //             key={contentType.id}
  //             removeSelf={() => removeContentType(section.id, contentType.id)}
  //           />
  //         );
  //       default:
  //         return null;
  //     }
  //   });
  // };

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
              {/* return link */}
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
                <p>{createCourse.name}</p>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-start">
                <p className="title blue">Section</p>
                <span className="sub-title orange">*</span>
              </div>

              <div className="super-render">
                {createCourse.sections.map((section) => (
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
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="title blue">Course picture</p>
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
                  Tôi sẽ chịu trách nhiệm nếu nội dung khóa học không chuẩn mực
                  với đạo đức của một giáo viên
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

export default CreateCourse;
