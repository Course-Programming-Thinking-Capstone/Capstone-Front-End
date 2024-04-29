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
export const PublicPages = ["home", "classes", "courses", "classes-details", "payment-success"];

//Lưu đường dẫn các trang chung cho user đã đăng nhập. VD trang xem thông tin account.
export const CommonAuthenticatedPages = [];

//Lưu đường dẫn các trang error
export const ErrorPages = ["not-found"];

//Lưu đường dẫn các trang mà admin được truy cập
export const AdminPages = ["admin", "admin/dashboard", "admin/course", "admin/user", "admin/parent", "admin/student", "admin/staff", "admin/teacher", "admin/game", "admin/game-data", "admin/syllabusad", "admin/order", "admin/order-detail"];

//Lưu đường dẫn các trang mà staff được truy cập
export const StaffPages = ["staff", "staff/staff-notification", "staff/moderating", "staff/staff-order", "staff/staff-order-detail", "staff/class", "staff/course"];

//Lưu đường dẫn các trang mà teacher được truy cập
export const TeacherPages = [
    "teacher",
    "teacher/schedule",
    "teacher/notification",
    "teacher/courses",
    "teacher/classes",
    "teacher/syllabuses",
    "teacher/syllabuses/detail",
    "teacher/syllabuses/create-course",
    "teacher/quizzes",
    "teacher/setting",
];

//Lưu đường dẫn các trang mà parent được truy cập
export const ParentPages = ["classes", "account", "account/account-details", "account/payment-methods", "account/child-process", "account/child-process-detail", "account/course-process", "courses", "classes-detail", "payment", "payment-success", "order", "order-detail"];

//Lưu đường dẫn các trang mà student được truy cập
export const StudentPages = ["student-home", "schedule", "courses-plan", "courses-study", "courses-quiz", "courses-result"];

//Thông tin các role có trên hệ thống
export const UserRole = {
    AdminRole: "Admin",
    ParentRole: "Parent",
    StaffRole: "Staff",
    TeacherRole: "Teacher",
    StudentRole: "Student"
}
