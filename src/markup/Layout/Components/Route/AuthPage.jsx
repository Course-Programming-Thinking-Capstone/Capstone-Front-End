// lưu đường dẫn các trang chưa xác thực như login, register. Khi người dùng 
// đã đăng nhập thì không được truy cập lại các trang này
export const UnauthenticatedPages = [
  "login",
  "register",
  "verify",
  "verify-confirm",
];

//Lưu đường dẫn các trang public. Mọi người dùng đều có thể truy cập 
//(cả đã đăng nhập và chưa đăng nhập)
export const PublicPages = ["",];

//Lưu đường dẫn các trang chung cho user đã đăng nhập. VD trang xem thông tin account.
export const CommonAuthenticatedPages = [""];

//Lưu đường dẫn các trang error
export const ErrorPages = ["error-404"];

//Lưu đường dẫn các trang mà admin được truy cập
export const AdminPages = ["admin", "admin/game", "admin/game-data", "admin/syllabusad"];

//Lưu đường dẫn các trang mà staff được truy cập
export const StaffPages = ["staff", "staff/moderating", "staff/staff-order", "staff/staff-order-detail", "staff/class"];

//Lưu đường dẫn các trang mà teacher được truy cập
export const TeacherPages = [
  "teacher-account",
  "teacher-account/schedule",
  "teacher-account/notification",
  "teacher-account/courses",
  "teacher-account/classes",
  "teacher-account/syllabuses",
  "teacher-account/syllabuses/detail",
  "teacher-account/syllabuses/create-course",
  "teacher-account/quizzes",
  "teacher-account/setting",
];

//Lưu đường dẫn các trang mà parent được truy cập
export const ParentPages = [];

//Lưu đường dẫn các trang mà student được truy cập
export const StudentPages = [];

//Thông tin các role có trên hệ thống
export const UserRole = {
    AdminRole : "Admin",
    ParentRole : "Parent",
    StaffRole: "Staff",
    TeacherRole: "Teacher",
    StudentRole: "Student"
}
