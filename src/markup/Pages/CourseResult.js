import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import backgroundImage from './../../images/background/test10.jpg';

import win from './../../images/background/test6.jpg';

import { useLocation } from 'react-router-dom';
import { borderRadius } from '@mui/system';

export default function CourseResult() {
    const location = useLocation();
    const quizSubmit = location.state?.quizSubmit?.quizSubmit;

    const Question = ({ question }) => (
        <div className='quiz-question' style={{ backgroundColor: 'rgba(200, 200, 200, 0.8)', marginTop: '50px' }}>
            <span style={{ fontSize: '20px', marginTop: '10px', color: 'white', fontWeight: '600', }}>Question {question.order}.</span>
            <div style={{
                display: 'flex',
                backgroundColor: '#a5c6d0',
                alignItems: 'center',
                border: '1px solid #a5c6d0',
                padding: '120px 10px',
                width: '50%',
                borderRadius: 10,
                marginBottom: 30,
                marginLeft: '25%',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            }}>
                <h5 style={{ fontSize: '24px', marginTop: '10px', margin: 'auto', textAlign: 'center' }}>{question.title}</h5>
            </div>
            <div className="row justify-content-center">
                {question.options.map((option) => {
                    let bgColor = option.isStudentChoose ? 'rgb(243 151 43)' : 'lightblue';
                    let colorTxT = option.isStudentChoose ? 'white' : 'black';
                    let bor = option.isStudentChoose ? '1px solid rgba(255, 138, 0, 1)' : '1px solid lightblue';

                    return (
                        <div key={option.optionId} className="col-lg-6 col-md-6 col-sm-12">
                            <div
                                className='answer'
                                style={{
                                    backgroundColor: bgColor,
                                    padding: '10px',
                                    margin: '5px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    color: colorTxT,
                                    border: bor,
                                    textAlign: 'center',
                                    flex: 1, justifyContent: 'center', paddingTop: 24, marginBottom: 30, borderRadius: 10,
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <p style={{ textAlign: 'center', fontSize: 17 }}>{option.content}</p>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );


    useEffect(() => {

    }, [location.state]);

    if (!quizSubmit || !quizSubmit.questionDtos) {
        return <div>Loading quiz results...</div>;
    }

    return (
        <div>
            <Header />
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, width: '100%', height: '70%', paddingBottom: 50 }} >
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            // backgroundImage: `url(${win})`,
                            backgroundColor: '#f3b648', width: '50%', marginTop: 50, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center'
                            , borderRadius: 10,
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        }}>
                            <h5 style={{ fontSize: '30px', textAlign: 'center', margin: 0, color: 'white', fontWeight: 'bold' }}>Your score</h5>
                            <p style={{ fontSize: '30px', textAlign: 'center', margin: 0, color: 'white', fontWeight: 'bold' }}>
                                <span>{quizSubmit && quizSubmit.score}</span>
                            </p>
                        </div>
                    </div>
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



