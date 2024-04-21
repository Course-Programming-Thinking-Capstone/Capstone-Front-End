import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

//Component
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import VideoPopup from "../Element/VideoPopup";
//Images
import bnr1 from "./../../images/line2.png";
import bnr2 from "./../../images/background/bg4.jpg";
import team1 from "./../../images/team/pic1.jpg";
import instance from "../../helper/apis/baseApi/baseApi";

export default function TeachersDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await instance.get(`api/v1/teachers/${id}`);
          const data = response.data;
          setTeacher(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <Fragment>
      <Header />
      <div className="page-content">
        <PageTitle
          motherMenu="Teachers Details"
          activeMenu="Teachers Details"
        />
        <div className="content-block">
          <div
            className="section-full bg-white content-inner-2 teacher-info"
            style={{
              backgroundImage: "url(" + bnr1 + ")",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              {isLoading ? ( // Check if data is loading
                <div className="text-center">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 m-b15">
                    <div className="teacher-meida">
                      <img src={team1} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 teacher-content align-self-center">
                    <h2 className="teacher-title">{}</h2>
                    <span className="teacher-coures">English</span>
                    <p className="m-b15">{teacher.description}</p>
                    <ul className="list-inline">
                      <li>
                        <Link to={"#"}>
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"}>
                          <i className="fa fa-google-plus"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"}>
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"}>
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"}>
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="section-full content-inner-2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 section-head">
                  <h2 className="text-secondry">My Skills</h2>
                  <p className="m-b0">
                    Suspendisse facilisis commodo lobortis. Nullam mollis
                    lobortis ex vel faucibus. Proin nec viverra turpis. Nulla
                    eget justo scelerisque, pretium purus vel, congue libero.
                    Suspendisse potenti. Sed risus nisi Suspendisse potenti. Sed
                    risus nisi Suspendisse potenti. Sed risus nisi{" "}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div className="progress-section">
                    <div className="progress-bx">
                      <h6 className="title">2D Drawings</h6>
                      <div className="count-box">93%</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-blue"
                          style={{ width: "93%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="progress-bx">
                      <h6 className="title">3D Modeling</h6>
                      <div className="count-box">70%</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-green"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="progress-bx">
                      <h6 className="title">Moodboard</h6>
                      <div className="count-box">48%</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-orange"
                          style={{ width: "48%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
