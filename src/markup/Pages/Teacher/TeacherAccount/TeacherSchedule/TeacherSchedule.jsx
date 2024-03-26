import { useDispatch } from "react-redux";
import TeacherScheduleComponent from "./TeacherScheduleComponent";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";
import TeacherAccount from "../TeacherAccount";

const TeacherSchedule = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "schedule" }));

  return <TeacherAccount child={<TeacherScheduleComponent />} />;
};

export default TeacherSchedule;
