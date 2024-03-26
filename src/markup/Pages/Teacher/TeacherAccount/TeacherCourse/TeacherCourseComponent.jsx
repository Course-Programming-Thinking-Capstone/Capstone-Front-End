import { useState } from "react";
import simp from "./../../../../../images/gallery/simp.jpg";

const TeacherCourseComponent = () => {
  const [activeMenu, setActiveMenu] = useState("all");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "all":
        return (
          <div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="item finish">
                  <img src={simp} alt="" />
                  <p>What is programming?</p>
                  <span>Finished</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="item censor">
                  <img src={simp} alt="" />
                  <p>What is programming?</p>
                  <span>Censoring</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "finished":
        return <div>Finished Courses Content</div>;
      case "censoring":
        return <div>Censoring Courses Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="teacher-course">
      <div className="header">
        <div className="d-flex justify-content-start">
          <div>
            <h5 className="mb">My courses</h5>
            <hr />
          </div>
          <i class="fa-solid fa-book-open"></i>
        </div>
      </div>
      <div className="sub-menu d-flex justify-content-start">
        <div
          onClick={() => handleMenuClick("all")}
          className={activeMenu === "all" ? "active" : ""}
        >
          <p className="mb">All course</p>
          <hr />
        </div>
        <div
          style={{ marginLeft: "15px" }}
          onClick={() => handleMenuClick("finished")}
          className={activeMenu === "finished" ? "active" : ""}
        >
          <p className="mb">Finished</p>
          <hr />
        </div>
        <div
          style={{ marginLeft: "15px" }}
          onClick={() => handleMenuClick("censoring")}
          className={activeMenu === "censoring" ? "active" : ""}
        >
          <p className="mb">Censoring</p>
          <hr />
        </div>
      </div>
      <div className="search">
        <div className="content d-flex justify-content-start">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search courses" />
        </div>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default TeacherCourseComponent;
