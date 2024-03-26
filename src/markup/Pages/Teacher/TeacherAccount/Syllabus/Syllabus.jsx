import { useDispatch } from "react-redux";
import TeacherAccount from "../TeacherAccount";
import SyllabusComponent from "./SyllabusComponent";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";

const Syllabus = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "syllabuses" }));

  return <TeacherAccount child={<SyllabusComponent />} />;
};
export default Syllabus;
