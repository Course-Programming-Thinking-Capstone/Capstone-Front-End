import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";
import TeacherAccount from "../TeacherAccount";
import TeacherClassComponent from "./TeacherClassComponent";
import { useDispatch } from "react-redux";

const TeacherClasses = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "classes" }));
  return <TeacherAccount child={<TeacherClassComponent />} />;
};

export default TeacherClasses;
