import { useDispatch } from "react-redux";
import TeacherAccount from "../TeacherAccount";
import QuizComponent from "./QuizComponent";
import { changeTeacherActiveMenu } from "../../../../../store/slices/menu/menuSlice";

const Quiz = () => {
  const dispatch = useDispatch();

  //change active menu
  dispatch(changeTeacherActiveMenu({ teacherActiveMenu: "quizzes" }));
  return <TeacherAccount child={<QuizComponent />} />;
};

export default Quiz;
