import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './../../images/background/quizBackground.jpg';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import instance from '../../helper/apis/baseApi/baseApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CourseQuiz() {
    const { quizId } = useParams(); // Get quizId from URL parameter
    const [quizData, setQuizData] = useState(null); // State to store the quiz data
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const navigate = useNavigate();

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

    const selectAnswer = (questionId, optionId) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    const handleSubmit = async () => {
        // Check if all questions have been answered
        if (quizData.questions.some((question) => !selectedAnswers[question.id])) {
            toast.error('Please answer all questions.');
            return;
        }

        // Construct the quizResults array from selectedAnswers
        const quizResults = quizData.questions.map((question) => ({
            questionId: question.id,
            optionId: selectedAnswers[question.id],
        }));

        try {
            const response = await instance.post('api/v1/courses/quiz/submit', {
                quizId: quizData.id,
                quizResults,
                duration: 0,
                quizMinutes: 5, // For now, we are hardcoding this value
            });

            const data = await response.data;
            console.log('data: ', data);

            // Handle the response as needed
            if (response.status === 200) {
                navigate('/courses-result', { state: { quizSubmit: data } });
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast.error('Failed to submit the quiz.');
        }
    };

    function startCountdown(duration) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            // Update the display element with the current time
            document.getElementById('time').textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                clearInterval(interval);
                document.getElementById('time').textContent = "00:00";
            }
        }, 1000);
    }

    const Question = ({ question }) => (
        <div className='quiz-question'>
            <span style={{ fontSize: '14px', marginTop: '10px' }}>Question {question.id}</span>
            <h5 style={{ fontSize: '24px', marginTop: '10px' }}>{question.title}</h5>
            <span style={{ fontSize: '14px', marginTop: '10px', color: 'rgba(255, 138, 0, 1)' }}>Choose the correct answer</span>
            <div className="row">
                {question.options.map((option) => (
                    <div key={option.id} className="col-lg-6 col-md-6 col-sm-12" style={{ cursor: 'pointer' }}>
                        <div
                            className='answer'
                            onClick={() => selectAnswer(question.id, option.id)}
                            style={{
                                backgroundColor: selectedAnswers[question.id] === option.id ? 'rgba(255, 138, 0, 1)' : '',
                            }}
                        >
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
            <ToastContainer />
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '600px' }} >
                <div className="container">
                    <div style={{ height: '30px' }}></div>
                    {quizData && quizData.questions.map(question => (
                        <Question key={question.id} question={question} />
                    ))}
                </div>
                <div>
                    <div className='d-flex justify-content-center mt-5'>
                        <i style={{ color: '#6DCE63', fontSize: '24px' }} class="fa-regular fa-circle-check"></i>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p style={{ color: '#6DCE63' }}>All done! Are you ready to submit your test?</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button onClick={handleSubmit} style={{ backgroundColor: '#FF8A00', color: 'white', borderRadius: '5px', padding: '12px', border: 'none', width: '150px' }}>Submit</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
