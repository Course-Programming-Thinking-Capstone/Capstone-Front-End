import { useDispatch } from "react-redux";
import SyllabusInformationComponent from "./SyllabusInformationComponent";
import TeacherAccount from "../../TeacherAccount";
import { changeTeacherActiveMenu } from "../../../../../../store/slices/menu/menuSlice";

const SyllabusInformation = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "syllabuses" }));

  return <TeacherAccount child={<SyllabusInformationComponent />} />;
};
export default SyllabusInformation;
