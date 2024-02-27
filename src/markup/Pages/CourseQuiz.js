import React from 'react';
import backgroundImage from './../../images/background/quizBackground.jpg';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';

export default function CourseQuiz() {
    const Question = () => {
        return (
            <div className='quiz-question'>

                <span style={{ fontSize: '14px', marginTop: '10px' }}>Question 1</span>
                <h5 style={{ fontSize: '24px', marginTop: '10px' }}>Ai là người đẹp trai nhất trong nhóm ?</h5>
                <span style={{ fontSize: '14px', marginTop: '10px', color: 'rgba(255, 138, 0, 1)' }}>Choose the correct answer</span>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className='answer'>
                            <p>Vũ</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className='answer'>
                            <p>Vũ</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className='answer'>
                            <p>Vũ</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className='answer'>
                            <p>Vũ</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="quiz-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className='d-flex justify-content-center col-lg-1 col-md-1 d-sm-none d-md-block'>
                            <a href=""><i className="fa-solid fa-chevron-left"></i>Back</a>
                        </div>
                        <div className='col-lg-9 col-md-9 col-sm-10' style={{ height: '100px' }}>
                            <h5 style={{ fontSize: '26px', fontWeight: '700', marginTop: '15px' }}>Quiz: Test your tech knowledge</h5>
                            <p style={{ fontSize: '18px' }}>Total 3 questions</p>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2'>
                            <p>dong ho</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} s>
                <div className="container">
                    <div style={{height: '30px'}}></div>
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                </div>
            </div>
            <Footer />
        </div>
    )
}
