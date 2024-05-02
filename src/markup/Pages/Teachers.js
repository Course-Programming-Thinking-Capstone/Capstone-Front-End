import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import bnr1 from "./../../images/line2.png";
import teacherImage from "./../../images/team/teacher.png";
import instance from "../../helper/apis/baseApi/baseApi";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(`api/v1/parents/teachers`);
        const data = response.data;
        setTeachers(data);
        
      } catch (error) {

      } finally{
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="page-content">
        <PageTitle motherMenu="Teachers" activeMenu="Teachers" />
        <div className="content-block">
          <div
            className="section-full bg-white content-inner"
            style={{
              backgroundImage: "url(" + bnr1 + ")",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              <div className="section-head text-center">
                <h2 className="head-title text-secondry">About the Teachers</h2>
                <p>
                  We have an excellent teacher to child ratio at our
                  Kindergarten to ensure that each child receives the attention
                  he or she needs
                </p>
              </div>
              <div className="row">
                {isLoading ? ( // Check if data is loading
                  <div className="text-center">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : (
                  teachers.map((teacher, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                      <div className="dlab-box box-frame1 team-box m-b40">
                        <div className="dlab-thum">
                          <Link to={`/teachers-details/${teacher.teacherId}`}>
                            <img src={teacherImage} alt="" />
                          </Link>
                          <div className="overlay-bx">
                            <h5 className="team-title">
                              <Link to={`/teachers-details/${teacher.teacherId}`}>
                                {teacher.teacherName}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Teachers;
