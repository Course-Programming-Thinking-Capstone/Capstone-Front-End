import { useDispatch } from "react-redux";
import TeacherAccount from "../TeacherAccount";
import TeacherSettingComponent from "./TeacherSettingComponent";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";

const TeacherSetting = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "setting" }));
  return <TeacherAccount child={<TeacherSettingComponent />} />;
};

export default TeacherSetting;
