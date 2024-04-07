import { useDispatch } from "react-redux";
import { changeTeacherActiveMenu } from "../../../../../../store/slices/menu/menuSlice";
import CreateCourseComponent from "./CreateCourseComponent";
import TeacherAccount from "../../TeacherAccount";

const CreateCourseContent = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "syllabuses" }));

  return <TeacherAccount child={<CreateCourseComponent />} />;
};
export default CreateCourseContent;
