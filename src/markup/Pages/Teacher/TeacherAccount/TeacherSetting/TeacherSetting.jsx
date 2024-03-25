import DatePicker from "react-datepicker";
import demo from "./../../../../../images/gallery/demo.jpg";
import { useState } from "react";

const TeacherSetting = () => {
  // State to track the current selected menu
  const [selectedMenu, setSelectedMenu] = useState("editProfile");

  // Handler function to change the selected menu
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  //upload avatar
  const [avatar, setAvatar] = useState(null); // For storing the file
  const [preview, setPreview] = useState(""); // For storing the image preview URL

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setAvatar(null);
      setPreview("");
    }
  };

  const [newChildDOB, setNewChildDOB] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "editProfile":
        return (
          <div className="edit-profile">
            <div className="d-flex justify-content-start">
              {preview ? (
                <img
                  className="img-responsive"
                  src={preview}
                  alt="Avatar Preview"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  className="img-responsive"
                  src={demo}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              )}
              <div>
                <p className="mb">Your avatar</p>
                <span>JPG or PNG no bigger than 10Mb</span>
                <br />
                <input
                  type="file"
                  id="avatarInput"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                  accept="image/png, image/jpeg"
                />
                <label
                  htmlFor="avatarInput"
                  style={{ cursor: "pointer", color: "#FF8A00" }}
                >
                  <i className="fa-solid fa-upload"></i> Click to upload
                </label>
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">First and last name</p>
                <input
                  type="text"
                  placeholder="Kim Jennie"
                  style={{
                    width: "100%",
                    height: "50px",
                    paddingLeft: "15px",
                  }}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">Date of birth</p>
                <div className="d-flex">
                  <DatePicker
                    wrapperClassName="datePicker"
                    selected={newChildDOB}
                    onChange={(date) => setNewChildDOB(date)}
                  />
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                      border: "1px solid #21212180",
                      borderLeft: "none",
                      height: "50px",
                    }}
                  >
                    <i
                      style={{ marginTop: "15px" }}
                      class="fa-solid fa-calendar-days"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">Gender</p>
                <select style={{ width: "50%", height: "50px" }} name="" id="">
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Other</option>
                </select>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">Phone number</p>
                <input
                  style={{ width: "100%", height: "50px" }}
                  type="text"
                  placeholder="+84 123123123"
                />
              </div>
            </div>

            <div>
              <p>Personal information</p>
              <textarea
                placeholder="Write the reason for order cancel"
                value={inputValue}
                onChange={handleChange}
                maxLength="256"
                className="form-control w-100"
                style={{ minHeight: "150px" }}
              ></textarea>
            </div>
          </div>
        );
      case "password":
        return (
          <div className="teacher-password">
            <p className="mb">Current password</p>
            <input type="password" placeholder="Current password" />

            <p className="mb" style={{ marginTop: "20px" }}>
              New password
            </p>
            <input type="password" placeholder="New password" />

            <p className="mb" style={{ marginTop: "20px" }}>
              Confirm new password
            </p>
            <input type="password" placeholder="Confirm new password" />
            <br />

            <button
              style={{
                backgroundColor: "#1A9CB7",
                color: "white",
                width: "150px",
                borderRadius: "10px",
                height: "40px",
                marginTop: "20px",
                border: "none",
              }}
            >
              Save password
            </button>
          </div>
        );
      case "socialProfile":
        return <div>Social Profile Content Here</div>;
      case "certificate":
        return <div>Certificate Content Here</div>;
      default:
        return <div>Select a menu</div>;
    }
  };

  return (
    <div className="teacher-setting">
      <div className="header">
        <div className="d-flex justify-content-start">
          <div>
            <h5 className="mb">SETTING</h5>
            <hr />
          </div>
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>
      <div className="teacher-setting-content">
        <div className="setting-menu d-flex justify-content-start">
          <div
            onClick={() => handleMenuClick("editProfile")}
            className={`mb ${
              selectedMenu === "editProfile" ? "active-menu-item" : ""
            }`}
          >
            <p className="mb">Edit profile</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("password")}
            className={`mb ${
              selectedMenu === "password" ? "active-menu-item" : ""
            }`}
            style={{ marginLeft: "15px" }}
          >
            <p className="mb">Password</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("socialProfile")}
            className={`mb ${
              selectedMenu === "socialProfile" ? "active-menu-item" : ""
            }`}
            style={{ marginLeft: "15px" }}
          >
            <p className="mb">Social profile</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("certificate")}
            className={`mb ${
              selectedMenu === "certificate" ? "active-menu-item" : ""
            }`}
            style={{ marginLeft: "15px" }}
          >
            <p className="mb">Certificate</p>
            <hr />
          </div>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default TeacherSetting;
