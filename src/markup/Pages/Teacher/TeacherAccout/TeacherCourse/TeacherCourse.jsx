import { useDispatch } from "react-redux";
import TeacherAccount from "../TeacherAccount";
import TeacherCourseComponent from "./TeacherCourseComponent";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";

const TeacherCourse = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "myCourses" }));

  return <TeacherAccount child={<TeacherCourseComponent />} />;
};

export default TeacherCourse;
