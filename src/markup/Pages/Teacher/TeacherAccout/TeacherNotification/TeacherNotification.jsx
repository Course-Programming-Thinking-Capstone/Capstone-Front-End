import { useDispatch } from "react-redux";
import TeacherNotificationComponent from "./TeacherNotificationComponent";
import TeacherAccount from "../TeacherAccount";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";

const TeacherNotification = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "notification" }));

  return <TeacherAccount child={<TeacherNotificationComponent />} />;
};

export default TeacherNotification;
