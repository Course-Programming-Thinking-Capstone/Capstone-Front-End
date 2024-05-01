import DatePicker from "react-datepicker";
import demo from "./../../../../../images/gallery/demo.jpg";
import { useState, useEffect } from "react";
import instance from "../../../../../helper/apis/baseApi/baseApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TeacherSettingComponent = () => {
  const [selectedMenu, setSelectedMenu] = useState("editProfile");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  // Form states initialized with API data
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personalInformation, setPersonalInformation] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`api/v1/users/account`);
        const data = response.data;
        setInfo(data);
        // Initialize form state
        setFullName(data.fullName || "");
        setDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth) : new Date());
        setGender(data.gender || "");
        setPhoneNumber(data.phoneNumber || "");
        setPersonalInformation(data.personalInformation || "");
        setPreview(data.pictureUrl || "");
      } catch (error) {
        console.error('Failed to fetch account details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

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

  const renderProfileImageSection = () => {
    if (preview) {
      return (
        <img
          className="img-responsive"
          src={preview}
          alt="Avatar Preview"
          style={{ marginRight: "10px" }}
        />
      );
    } else {
      return (
        <button
          style={{
            fontSize: "24px",
            backgroundColor: "#FF8A00",
            color: "white",
            padding: "10px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
          onClick={() => document.getElementById('avatarInput').click()}
        >
          +
        </button>
      );
    }
  };

  const validateForm = () => {
    const currentYear = new Date().getFullYear();
    const dobYear = dateOfBirth.getFullYear();
    const age = currentYear - dobYear;

    if (age < 12) {
      toast.error("Teacher must be older than 12 years old.");
      return false;
    }

    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      toast.error("Phone number must be between 10 and 15 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const formData = {
      teacherName: fullName,
      dateOfBirth: dateOfBirth.toISOString().substring(0, 10), // Format date as YYYY-MM-DD
      gender,
      phoneNumber,
      personalInformation
    };
    console.log('formData: ', formData);

    setLoading(true);
    try {
      const response = await instance.put('api/v1/teachers/profile', formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "editProfile":
        return (
          <div className="edit-profile">
            <ToastContainer />
            <div className="d-flex justify-content-start">
              {renderProfileImageSection}
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
                <label htmlFor="avatarInput" style={{ cursor: "pointer", color: "#FF8A00" }}>
                  <i className="fa-solid fa-upload"></i> Click to upload
                </label>
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">First and last name</p>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter full name"
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
                    selected={dateOfBirth}
                    onChange={(date) => setDateOfBirth(date)}
                    dateFormat="dd-MM-yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
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
                      className="fa-solid fa-calendar-days"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">Gender</p>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  style={{ width: "100%", height: "50px" }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <p className="mb">Phone number</p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  style={{ width: "100%", height: "50px" }}
                />
              </div>
            </div>

            <div>
              <p>Personal information</p>
              <textarea
                placeholder="Write your personal information here"
                value={personalInformation}
                onChange={e => setPersonalInformation(e.target.value)}
                maxLength="256"
                className="form-control w-100"
                style={{ minHeight: "150px" }}
              ></textarea>
            </div>
            <button onClick={handleSubmit} disabled={loading}>
              Save Profile
            </button>
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
            className={`mb ${selectedMenu === "editProfile" ? "active-menu-item" : ""
              }`}
          >
            <p className="mb">Edit profile</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("password")}
            className={`mb ${selectedMenu === "password" ? "active-menu-item" : ""
              }`}
            style={{ marginLeft: "15px" }}
          >
            <p className="mb">Password</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("socialProfile")}
            className={`mb ${selectedMenu === "socialProfile" ? "active-menu-item" : ""
              }`}
            style={{ marginLeft: "15px" }}
          >
            <p className="mb">Social profile</p>
            <hr />
          </div>
          <div
            onClick={() => handleMenuClick("certificate")}
            className={`mb ${selectedMenu === "certificate" ? "active-menu-item" : ""
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

export default TeacherSettingComponent;
