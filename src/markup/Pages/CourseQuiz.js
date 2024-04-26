import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './../../images/background/test10.jpg';
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
                console.log('Cong test ', response.data);
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

    const Question = ({ question }) => (
        <div className='quiz-question' style={{ backgroundColor: 'rgba(200, 200, 200, 0.8)', }}>
            <span style={{ fontSize: '20px', marginTop: '10px', color: 'white', fontWeight: '600', }}>Question {question.id}.</span>
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
                            // className='answer'
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

    return (
        <div>
            {/* <Header /> */}
            <div className="quiz-header" style={{backgroundColor:'ghostwhite'}}>
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
                        <div className='col-lg-2 col-md-2 col-sm-2'>
                            <p>dong ho</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <div className="quiz-content" style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '600px' }} >
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
