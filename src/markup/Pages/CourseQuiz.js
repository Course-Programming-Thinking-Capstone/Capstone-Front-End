import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from './../../images/background/quizBackground.jpg';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import instance from '../../helper/apis/baseApi/baseApi';

export default function CourseQuiz() {
    const { quizId } = useParams(); // Get quizId from URL parameter
    const [quizData, setQuizData] = useState(null); // State to store the quiz data

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await instance.get(`api/v1/courses/study/section/quiz/${quizId}`); // Adjust the URL according to your API
                setQuizData(response.data); // Store the fetched data in state
                console.log('response.data: ', response.data);
            } catch (error) {
                console.error('Failed to fetch quiz data:', error);
            }
        };

        fetchQuizData();
    }, [quizId]);

    const Question = ({ question }) => (
        <div className='quiz-question'>
            <span style={{ fontSize: '14px', marginTop: '10px' }}>Question {question.id}</span>
            <h5 style={{ fontSize: '24px', marginTop: '10px' }}>{question.title}</h5>
            <span style={{ fontSize: '14px', marginTop: '10px', color: 'rgba(255, 138, 0, 1)' }}>Choose the correct answer</span>
            <div className="row">
                {question.options.map(option => (
                    <div key={option.id} className="col-lg-6 col-md-6 col-sm-12">
                        <div className='answer'>
                            <p>{option.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

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
                    <div style={{ height: '30px' }}></div>
                    {quizData && quizData.questions.map(question => (
                        <Question key={question.id} question={question} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
