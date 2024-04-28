import { useDispatch } from "react-redux";
import demo from "./../../../../../images/gallery/demo.jpg";
import { useEffect, useState } from "react";
import { getAccountCLass, getCLassById } from "../../../../../helper/apis/class/class";
import { convertGenderEnumToString } from "../../../../../helper/utils/EnumUtil";
import { calculateAgeV1 } from "../../../../../helper/utils/DateUtil";

const TeacherClassComponent = () => {

  const dispatch = useDispatch();

  // const classes = useSelector(classesSelector);

  //useState
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);

  const [isClassesLoading, setIsClassesLoading] = useState(false);
  const [isClassDetailLoading, setIsClassDetailLoading] = useState(false);

  const handleSelectedClassChange = async (event) => {
    const changeIndex = event.target.value;

    if (classes != null) {
      const currentId = classes[changeIndex]?.classId;
      const data = await getCLassById(currentId);
      setCurrentClass(data);
    }

    setSelectedClassIndex(changeIndex);
  }

  const fetchData = async () => {
    try {

      let data = await getAccountCLass();

      //set classes
      setClasses(data);

      if (data != null && data.length > 0) {
        const currentId = data[0]?.classId;
        data = await getCLassById(currentId);
        setCurrentClass(data);
      }


    } catch (error) {
      let message = "";
      if (error.response) {
        message = error.response?.data?.message || "Something wrong.";
      } else {
        message = error.message || "Something wrong.";
      }
      //log
      console.log(`Error when fetch classes of teacher notification: ${message}`);
    }
  }

  useEffect(() => {

    fetchData();

  }, [dispatch])


  return (
    <div className="teacher-classes">
      <div className="header">
        <div className="d-flex justify-content-start">
          <div>
            <h5 className="mb">My classes</h5>
            <hr />
          </div>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
      <div className="teacher-classes-content py-3">
        <h5 >Student list</h5>
        <div className="row" style={{ marginTop: "25px" }}>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div
              className="d-flex justify-content-start"
              style={{ marginTop: "25px" }}
            >
              <p style={{ color: "#FF8A00" }} className="mb">
                Class
              </p>
              <select style={{ marginLeft: "15px" }} onChange={handleSelectedClassChange} value={selectedClassIndex}>
                {classes !== null && classes?.map((element, index) => (
                  <option key={index} value={index}>{element?.classCode}</option>
                ))
                }
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="right">
              <div className="d-flex justify-content-start align-items-center">
                <p style={{ color: "#F15C58" }} className="mb">
                  Course
                </p>
                <span
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #1A9CB7",
                    borderRadius: "10px",
                    padding: "0px 5px",
                  }}
                >
                  {currentClass != null && currentClass?.courseName}
                </span>
              </div>
              <div
                className="d-flex justify-content-start align-items-center"
                style={{ paddingRight: "50px", marginTop: "15px" }}
              >
                <p style={{ color: "#F15C58" }} className="mb">
                  Number of students
                </p>
                <span>{currentClass !== null && currentClass.totalStudent}</span>
              </div>
            </div>
          </div>
        </div>

        {currentClass && currentClass.students?.length > 0 && (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Image</th>
                  <th>Full name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {currentClass.students.map((student, index) =>
                  <tr key={index} className="item">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="img-responsive"
                        style={{ height: "50px", width: "50px" }}
                        src={student?.image ?? demo}
                        alt="Student avatar"
                      />
                    </td>
                    <td>{student?.studentName}</td>
                    <td>{calculateAgeV1(student?.dateOfBirth) ?? ""}</td>
                    <td>{student?.gender != null ? convertGenderEnumToString(student.gender) : ""}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherClassComponent;
