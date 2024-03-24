import demo from "./../../../../../images/gallery/demo.jpg";

const TeacherClassComponent = () => {
  return (
    <div className="teacher-classes">
      <div className="header">
        <div className="d-flex justify-content-start">
          <div>
            <h5 className="mb">My classes</h5>
            <hr />
          </div>
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
      <div className="teacher-classes-content">
        <h5>STUDENT IN EACH CLASS</h5>
        <div className="row" style={{ marginTop: "25px" }}>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div
              className="d-flex justify-content-start"
              style={{ marginTop: "25px" }}
            >
              <p style={{ color: "#FF8A00" }} className="mb">
                CLASS
              </p>
              <select style={{ marginLeft: "15px" }} name="" id="">
                <option value="">Class 1</option>
                <option value="">Class 2</option>
                <option value="">Class 3</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="right">
              <div className="d-flex">
                <p style={{ color: "#F15C58" }} className="mb">
                  Course
                </p>
                <span
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #1A9CB7",
                    borderRadius: "10px",
                    padding: "0px 5px",
                  }}
                >
                  What is programming?
                </span>
              </div>
              <div
                className="d-flex"
                style={{ paddingRight: "50px", marginTop: "15px" }}
              >
                <p style={{ color: "#F15C58" }} className="mb">
                  Number of students
                </p>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr className="item">
                <td>1</td>
                <td>
                  <img
                    className="img-responsive"
                    style={{ height: "50px", width: "50px" }}
                    src={demo}
                    alt=""
                  />
                </td>
                <td>Pitt</td>
                <td>35</td>
                <td>New York</td>
                <td>USA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassComponent;
