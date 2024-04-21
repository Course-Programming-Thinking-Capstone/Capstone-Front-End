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
                    // Determine the background color based on the student's choice
                    let bgColor = option.isStudentChoose ? '#d1e7dd' : '#f8f9fa'; // Light green for chosen, light grey for others

                    return (
                        <div key={option.optionId} className="col-lg-6 col-md-6 col-sm-12">
                            <div
                                className='answer'
                                style={{
                                    backgroundColor: bgColor,
                                    padding: '10px',
                                    margin: '5px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
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
        console.log(location.state); // Debugging to see what's being passed in the state
    }, [location.state]);

    if (!quizSubmit || !quizSubmit.questionDtos) {
        return <div>Loading quiz results...</div>; // Placeholder content while loading
    }

    return (
        <div>
            <Header />
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '600px' }} >
                <div className='d-flex justify-content-center mt-5'>
                    <div>
                        <h5 style={{fontSize:'30px'}}>Your score</h5>
                        <p style={{fontSize:'30px'}} className='text-center'>
                            <span>{quizSubmit && quizSubmit.score}</span>
                        </p>
                    </div>
                </div>
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



