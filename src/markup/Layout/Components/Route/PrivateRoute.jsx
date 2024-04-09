import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";
import {
  AdminPages,
  CommonAuthenticatedPages,
  ParentPages,
  PublicPages,
  StaffPages,
  StudentPages,
  TeacherPages,
  UnauthenticatedPages,
  UserRole,
} from "./AuthPage";

const PrivateRoute = ({ page, component: Component }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!page) {
    return <Navigate to="/not-found" state={{ from: location }} replace />;
  } else {
    if (!user) {
      //Check case user have not logged in
      if (!PublicPages.includes(page) && !UnauthenticatedPages.includes(page)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      } else {
        return Component;
      }
    } else {
      if (UnauthenticatedPages.includes(page)) {
        //navigate to home page
        return <Navigate to="/home" state={{ from: location }} replace />;
      } else {
        switch (user.role) {
          case UserRole.AdminRole: {
            if (
              !PublicPages.includes(page) &&
              !CommonAuthenticatedPages.includes(page) &&
              !AdminPages.includes(page)
            ) {
              return (
                <Navigate to="/not-found" state={{ from: location }} replace />
              );
            } else {
              if (page === "home")
                return (
                  <Navigate to="/admin" state={{ from: location }} replace />
                );
              return Component;
            }
          }
          case UserRole.TeacherRole: {
            if (
              !PublicPages.includes(page) &&
              !CommonAuthenticatedPages.includes(page) &&
              !TeacherPages.includes(page)
            ) {
              return (
                <Navigate to="/not-found" state={{ from: location }} replace />
              );
            } else {
              if (page === "home")
                return (
                  <Navigate
                    to="/teacher"
                    state={{ from: location }}
                    replace
                  />
                );
              return Component;
            }
          }

          case UserRole.StaffRole: {
            if (
              !PublicPages.includes(page) &&
              !CommonAuthenticatedPages.includes(page) &&
              !StaffPages.includes(page)
            ) {
              return (
                <Navigate to="/not-found" state={{ from: location }} replace />
              );
            } else {
              if (page === "home")
                return (
                  <Navigate to="/staff" state={{ from: location }} replace />
                );
              return Component;
            }
          }

          case UserRole.ParentRole: {
            if (
              !PublicPages.includes(page) &&
              !CommonAuthenticatedPages.includes(page) &&
              !ParentPages.includes(page)
            ) {
              return (
                <Navigate to="/not-found" state={{ from: location }} replace />
              );
            } else {
              return Component;
            }
          }

          case UserRole.StudentRole: {
            if (
              !PublicPages.includes(page) &&
              !CommonAuthenticatedPages.includes(page) &&
              !StudentPages.includes(page)
            ) {
              return (
                <Navigate to="/not-found" state={{ from: location }} replace />
              );
            } else {
              return Component;
            }
          }

          default:
            return (
              <Navigate to="/not-found" state={{ from: location }} replace />
            );
        }
      }
    }
  }
};

export default PrivateRoute;
