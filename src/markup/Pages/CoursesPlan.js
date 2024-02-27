import React, { useState } from 'react';
import teacher from './../../images/team/teacher.png';
import Footer from '../Layout/Footer';
import Header from './../Layout/Header';
import PageTitle from './../Layout/PageTitle';

export default function CoursesPlan() {
    const CollapsibleQuestion = ({ id, title, children }) => {
        // State to track if the collapsible content is visible
        const [isOpen, setIsOpen] = useState(false);

        // Function to toggle the isOpen state
        const toggleCollapse = (e) => {
            e.preventDefault(); // Prevent the default anchor link behavior
            setIsOpen(!isOpen);
        };

        const linkClass = isOpen ? "link-open" : "link-closed";

        return (
            <>
                <a
                    href={`#${id}`}
                    className={`btn btn-primary ${linkClass}`}
                    onClick={toggleCollapse}
                    style={{ fontSize: '18px' }}
                >
                    <i className="fa-solid fa-chevron-right"></i> {title}
                </a><br />
                <div id={id} style={{ display: isOpen ? 'block' : 'none' }} className="collapse">
                    <div>
                        <div className='content row'>
                            <div className='col-lg-8'>
                                <div className='document d-flex'>
                                    <i class="fa-regular fa-circle-play"></i>
                                    <div className='document-content'>
                                        <p>Welcome to technology!</p>
                                        <span>Video - 1min</span>
                                    </div>
                                </div>
                                <div className='document d-flex'>
                                    <i class="fa-solid fa-book-open"></i>
                                    <div className='document-content'>
                                        <p>Welcome to technology!</p>
                                        <span>Reading - 1min</span>
                                    </div>
                                </div>
                                <div className='document d-flex'>
                                    <i class="fa-solid fa-book-open"></i>
                                    <div className='document-content'>
                                        <p>Welcome to technology!</p>
                                        <span>Reading - 1min</span>
                                    </div>
                                </div>
                                <div className='document d-flex'>
                                    <i class="fa-regular fa-circle-play"></i>
                                    <div className='document-content'>
                                        <p>Welcome to technology!</p>
                                        <span>Video - 1min</span>
                                    </div>
                                </div>
                                <div className='document d-flex'>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    <div className='document-content'>
                                        <p>Graded Quiz: Test your tech knowledge!</p>
                                        <span>Quiz - 10 questions</span>
                                    </div>
                                </div>
                                <div className='document d-flex'>
                                    <i class="fa-solid fa-gamepad"></i>
                                    <div className='document-content'>
                                        <p>Practice game</p>
                                        <span>Map 1 - level 1</span>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-4'>
                                <button>Get started</button>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </>
        );
    };

    return (
        <div>
            <Header />
            <div className="page-content">
                <PageTitle motherMenu="Courses" activeMenu="Courses" />
                <div className="container">
                    <div className="plan row">
                        <div className="col-lg-3">
                            <div className='d-flex'>
                                <div><img src={teacher} /></div>
                                <div className='teacher'>
                                    <p>Teacher</p>
                                    <p>Yua Mikami</p>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className='title'>Age</td>
                                        <td className='content'>Suitable for children 7 years and older</td>
                                    </tr>
                                    <tr>
                                        <td>Language</td>
                                        <td className='content'>English/Vietnamese</td>
                                    </tr>
                                    <tr>
                                        <td>Graduate</td>
                                        <td className='content'>Complete all quiz with score higher than 80</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="plan-content col-lg-9">
                            <h5>What is proggraming?</h5>
                            <div>
                                <ul className='d-flex justify-content-around'>
                                    <li><i class="fa-solid fa-book-open-reader"></i>  Lessons</li>
                                    <li><i class="fa-regular fa-circle-play"></i>  Videos</li>
                                    <li><i class="fa-solid fa-file-lines"></i>  Documents</li>
                                    <li><i class="fa-solid fa-pen-to-square"></i>  Quiz</li>
                                    <li><i class="fa-solid fa-gamepad"></i>  Game</li>
                                </ul>
                            </div>
                            <hr />
                            <p>Thay An rat dep trai</p>
                            <p>Show learning object</p>
                            <div>
                                <CollapsibleQuestion id="demo1" title="Lesson 1">

                                </CollapsibleQuestion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
