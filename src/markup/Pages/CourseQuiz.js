import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './../../images/background/test10.jpg';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import instance from '../../helper/apis/baseApi/baseApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clock from './../../images/background/clock.png';

export default function CourseQuiz() {
    const { quizId } = useParams(); // Get quizId from URL parameter
    const [quizData, setQuizData] = useState(null); // State to store the quiz data
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await instance.get(`api/v1/courses/study/section/quiz/${quizId}`); // Adjust the URL according to your API
                setQuizData(response.data);

            } catch (error) {

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


            // Handle the response as needed
            if (response.status === 200) {
                navigate('/courses-result', { state: { quizSubmit: data } });
            }
        } catch (error) {

            toast.error('Failed to submit the quiz.');
        }
    };

    const Question = ({ question, index }) => (
        <div className='quiz-question' style={{ backgroundColor: 'rgba(200, 200, 200, 0.8)', }}>
            <span style={{ fontSize: '20px', marginTop: '10px', color: 'white', fontWeight: '600', }}>Question {index + 1}.</span>
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
                {question.options.map((option) => (
                    <div key={option.id} className="col-lg-6 col-md-6 col-sm-12" style={{ cursor: 'pointer' }}>
                        <div
                            onClick={() => selectAnswer(question.id, option.id)}
                            style={{
                                backgroundColor: selectedAnswers[question.id] === option.id ? 'rgb(243 151 43)' : 'lightblue',
                                color: selectedAnswers[question.id] === option.id ? 'white' : 'black',
                                border: selectedAnswers[question.id] === option.id ? '1px solid rgba(255, 138, 0, 1)' : '1px solid lightblue',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                                flex: 1, justifyContent: 'center', paddingTop: 24, marginBottom: 30, borderRadius: 10
                            }}
                        >
                            <p style={{ textAlign: 'center', fontSize: 17 }}>{option.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (quizData && quizData.duration) {
            const durationInSeconds = quizData.duration * 60;
            setTimeLeft(durationInSeconds); 
        }
    }, [quizData]);

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }
        const countdown = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, [timeLeft]);

    const addLeadingZero = (number) => {
        return number < 10 ? `0${number}` : number;
    };
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    return (
        <div>
            {/* <Header /> */}
            <div className="quiz-header" style={{ backgroundColor: 'ghostwhite' }}>
                <div className="container">
                    <div className="row align-items-center">
                        {/* <div className='d-flex justify-content-center col-lg-1 col-md-1 d-sm-none d-md-block'>
                            <a href=""><i className="fa-solid fa-chevron-left"></i>Back</a>
                        </div> */}
                        <div className='col-lg-9 col-md-9 col-sm-10' style={{ height: '100px' }}>
                            {quizData && (
                                <div>
                                    <h5 style={{ fontSize: '26px', fontWeight: '700', marginTop: '15px' }}>Quiz: {quizData.title}</h5>
                                    <p style={{ fontSize: '18px' }}>Total {quizData.totalQuestion} questions</p>
                                </div>
                            )}
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2' style={{ display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <img src={clock} alt="Clock" style={{ width: 45, height: 45 }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
                                {timeLeft === 0 ? (
                                    <p>Time's up!</p>
                                ) : (
                                    <p style={{ fontSize: 20, margin: 0 }}>{addLeadingZero(minutes)} : {addLeadingZero(seconds)}</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '600px' }} >
                <div className="container">
                    <div style={{ height: '30px' }}></div>
                    {quizData && quizData.questions.map((question, index) => (
                        <Question key={question.id} question={question} index={index} />
                    ))}
                </div>
                <div>
                    {/* <div className='d-flex justify-content-center mt-5' style={{ marginTop: 0 }}>
                        <i style={{ color: '#6DCE63', fontSize: '24px' }} class="fa-regular fa-circle-check"></i>
                    </div> */}
                    {/* <div className='d-flex justify-content-center'>
                        <p style={{ color: '#6DCE63' }}>All done! Are you ready to submit your test?</p>
                    </div> */}
                    <div className='d-flex justify-content-center'>
                        <button onClick={handleSubmit} style={{ backgroundColor: '#FF8A00', color: 'white', borderRadius: '10px', padding: '12px', border: 'none', width: '150px', marginBottom: '20px',marginTop:'20px' }}>Submit</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
