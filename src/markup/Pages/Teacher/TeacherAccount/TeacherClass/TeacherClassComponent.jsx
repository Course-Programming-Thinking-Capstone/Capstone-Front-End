import { useDispatch } from "react-redux";
import defaultAvatar from "./../../../../../images/gallery/default-user.jpg";
import { useEffect, useState } from "react";
import {
  getAccountCLass,
  getCLassById,
} from "../../../../../helper/apis/class/class";
import { convertGenderEnumToString } from "../../../../../helper/utils/EnumUtil";
import { calculateAgeV1 } from "../../../../../helper/utils/DateUtil";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../../Layout/Components/LoadingSpinner";
import "./TeacherClass.css";

const TeacherClassComponent = () => {
  const dispatch = useDispatch();

  // const classes = useSelector(classesSelector);

  //useState
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);

  const [isClassesLoading, setIsClassesLoading] = useState(false);
  const [isClassDetailLoading, setIsClassDetailLoading] = useState(false);

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

  const handleSelectedClassChange = async (event) => {
    const changeIndex = event.target.value;

    if (classes != null) {
      try {
        setIsClassDetailLoading(true);
        const currentId = classes[changeIndex]?.classId;
        const data = await getCLassById(currentId);
        setCurrentClass(data);
      } catch (error) {
        let message = "";
        if (error.response) {
          message = error.response?.data?.message || "Something wrong.";
        } else {
          message = error.message || "Something wrong.";
        }
        notifyApiFail(message);
      } finally {
        setIsClassDetailLoading(false);
      }
    }

    setSelectedClassIndex(changeIndex);
  };

  const fetchData = async () => {
    try {
      setIsClassesLoading(true);
      let data = await getAccountCLass();

      //set classes
      setClasses(data);

      if (data != null && data.length > 0) {
        setIsClassDetailLoading(true);
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
      notifyApiFail(message);
    } finally {
      setIsClassesLoading(false);
      setIsClassDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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

      <ToastContainer />
      <div className="teacher-classes-content py-3">
        <h5 style={{textAlign:'center',fontSize:'25px',fontWeight:'600'}}>Student list</h5>
        {isClassesLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {classes === null ? (
              <p>There is no classes</p>
            ) : (
              <>
                <div className="row" style={{ marginTop: "25px" }}>
                  <div>
                    <div className="right" style={{borderRadius:20,boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",backgroundColor:'white'}}>
                      <div className="d-flex justify-content-start align-items-center">
                        <p style={{ color: "#F15C58",width:'70px',fontWeight:'bold' }} className="mb">
                          Course: 
                        </p>
                        <span
                          style={{
                            backgroundColor: "white",
                            border: "1px solid white",
                            borderRadius: "10px",
                            padding: "0.5rem 1rem",
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            fontWeight:'500'
                          }}
                        >
                          {currentClass != null && currentClass?.courseName}
                        </span>
                      </div>
                      <div>
                        <div
                          className="d-flex justify-content-start align-items-center"
                          style={{ marginTop: "25px" }}
                        >
                          <p style={{ color: "#F15C58",width:'70px',fontWeight:'bold'  }} className="mb">
                            Class:
                          </p>
                          <select
                            onChange={handleSelectedClassChange}
                            value={selectedClassIndex}
                            style={{padding: "0.5rem 1rem", backgroundColor:'white',
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                          width:'17.7rem',color:'black'}}
                          >
                            {classes !== null &&
                              classes?.map((element, index) => (
                                <option key={index} value={index}>
                                  {element?.classCode}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-start align-items-center"
                        style={{ paddingRight: "50px", marginTop: "15px" }}
                      >
                        <p style={{ color: "#F15C58",width:'70px',fontWeight:'bold' }} className="mb">
                          Student:
                        </p>
                        <span style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',border:'1px solid white',padding:'0.3rem 1rem',borderRadius:5,backgroundColor:'white'}}>
                          {currentClass !== null && currentClass.totalStudent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {!isClassesLoading && isClassDetailLoading ? (
                  <LoadingSpinner />
                ) : (
                  currentClass &&
                  currentClass.students?.length > 0 && (
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
                          {currentClass.students.map((student, index) => (
                            <tr key={index} className="item teacher-class-item">
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  className="img-responsive"
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%",
                                    border: "1px solid #f7f8fb",
                                  }}
                                  src={student?.image ?? defaultAvatar}
                                  alt="Student avatar"
                                />
                              </td>
                              <td><div className="teacher-class td">{student?.studentName}</div></td>
                              <td>
                                {calculateAgeV1(student?.dateOfBirth) ?? ""}
                              </td>
                              <td>
                                {student?.gender != null
                                  ? convertGenderEnumToString(student.gender)
                                  : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherClassComponent;
