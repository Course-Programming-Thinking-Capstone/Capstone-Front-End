import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import bnr1 from './../../images/line2.png';
import teacherImage from './../../images/team/teacher.png';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://kidpro-production.somee.com/api/v1/users?role=Teacher')
            .then(response => response.json())
            .then(data => {
                setTeachers(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <Fragment>
            <Header />
            <div className="page-content">
                <PageTitle motherMenu="Teachers" activeMenu="Teachers" />
                <div className="content-block">
                    <div className="section-full bg-white content-inner" style={{ backgroundImage: "url(" + bnr1 + ")", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                        <div className="container">
                            <div className="section-head text-center">
                                <h2 className="head-title text-secondry">About the Teachers</h2>
                                <p>
                                    We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs
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
                                                    <Link to={`/teachers-details/${teacher.id}`}>
                                                        <img src={teacherImage} alt="" />
                                                    </Link>
                                                    <div className="overlay-bx">
                                                        <h5 className="team-title"><Link to={`/teachers-details/${teacher.id}`}>{teacher.fullName}</Link></h5>
                                                        <ul className="list-inline">
                                                            <li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
                                                            <li><Link to={"#"}><i className="fa-solid fa-envelope"></i></Link></li>
                                                        </ul>
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
}

export default Teachers;
