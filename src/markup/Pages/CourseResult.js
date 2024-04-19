import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import backgroundImage from './../../images/background/quizBackground.jpg';
import { useLocation } from 'react-router-dom';

export default function CourseResult() {
    const location = useLocation();
    const quizSubmit = location.state?.quizSubmit?.quizSubmit;

    const Question = ({ question }) => (
        <div className='quiz-question'>
            <h5>{question.title}</h5>
            <div className="row">
                {question.options.map((option) => {
                    // Determine the background color based on the correctness and student's choice
                    let bgColor;
                    if (option.isCorrect) {
                        bgColor = '#6DCE63'; // green background for correct answers
                    } else if (!option.isCorrect && option.isStudentChoose) {
                        bgColor = '#FF6B6B'; // red background for wrong selected answers
                    } else {
                        bgColor = 'white'; // white background for non-selected options
                    }

                    return (
                        <div key={option.optionId} className="col-lg-6 col-md-6 col-sm-12">
                            <div
                                className='answer'
                                style={{
                                    backgroundColor: bgColor,
                                    // Other styles...
                                }}
                            >
                                <p>{option.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    useEffect(() => {
        console.log(location.state); // Check what's being passed in the state
    }, [location.state]);
    

    if (!quizSubmit || !quizSubmit.questionDtos) {
        return <div>Loading quiz results...</div>; // Or some other placeholder content
    }

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
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '600px' }} >
                <div className="container">
                <div style={{ height: '30px' }}></div>
                    {quizSubmit && quizSubmit.questionDtos.map((question) => (
                        <Question key={question.questionId} question={question} />
                    ))}
                </div>

            </div>
            <Footer />
        </div>
    )
}
