import demo from "./../../../../../images/gallery/demo.jpg";

const TeacherNotificationComponent = () => {
  return (
    <div className="teacher-notification">
      <div className="header">
        <div className="d-flex justify-content-start">
          <div>
            <h5 className="mb">NOTIFICATIONS</h5>
            <hr />
          </div>
          <i class="fa-solid fa-bell"></i>
        </div>
      </div>
      <div className="item">
        <div className="d-flex justify-content-between">
          <div className="left d-flex justify-content-start">
            <img src={demo} alt="" />
            <div style={{ marginLeft: "20px" }}>
              <div className="d-flex justify-content-start">
                <p style={{ fontSize: "18px", fontWeight: 500 }}>
                  Course review results{" "}
                </p>
                <span>|</span>
                <span style={{ color: "#1A9CB7" }}>From Staff</span>
              </div>
              <p style={{ marginTop: "10px" }} className="mb">
                Lesson 1 is missing images and videos
              </p>
            </div>
          </div>
          <div className="right">
            <p>
              <i class="fa-regular fa-clock"></i> 09-02-2024 at 9:30 AM
            </p>
            <i
              style={{ marginTop: "10px", color: "red", float: "right" }}
              class="fa-solid fa-circle-xmark"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotificationComponent;
