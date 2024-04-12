import React, { useState } from 'react';
import Header from './../Layout/Header';
import PageTitle from './../Layout/PageTitle';
import Footer from '../Layout/Footer';
import background from './../../images/background/courseBackground.jpg';

export default function CourseStudy() {
    const [selectedContent, setSelectedContent] = useState(null);

    const pageStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const handleContentClick = (content) => {
        setSelectedContent(content);
    };

    const renderContent = () => {
        switch (selectedContent) {
            case 'video':
                return (
                    <div>
                        <iframe
                            width="100%"
                            height="600px"
                            src="https://www.youtube.com/embed/O36r05htZXU?si=VjRcukDHmxQZhIx-"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>

                        <div className='d-flex justify-content-center'>
                            <button className='button'>Mark as completed</button>
                        </div>
                    </div>
                );
            case 'reading':
                return (
                    <div>
                        Reading
                    </div>
                );
            case 'quiz':
                return (
                    <div>
                        Quiz
                    </div>
                );
            case 'game':
                return (
                    <div>
                        Game
                    </div>
                );
            default:
                return (
                    <>
                        <h2>Collapsed Sidebar</h2>
                        <p>Click on the menu items to render different content on the right.</p>
                    </>
                );
        }
    };

    return (
        <div>
            <Header />
            <div className="page" style={pageStyle}>
                <PageTitle motherMenu="Courses" activeMenu="Study" />
                <div className=''>
                    <div className="study d-flex">
                        <div style={{ backgroundColor: 'white', width: '30%' }}>
                            <div className='document d-flex' onClick={() => handleContentClick('video')} style={{ backgroundColor: selectedContent === 'video' ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px" }}>
                                <i class="fa-regular fa-circle-play"></i>
                                <div className='document-content'>
                                    <p>Welcome to technology!</p>
                                    <span>Video - 1min</span>
                                </div>
                            </div>
                            <div className='document d-flex' onClick={() => handleContentClick('reading')} style={{ backgroundColor: selectedContent === 'reading' ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px" }}>
                                <i class="fa-solid fa-book-open"></i>
                                <div className='document-content'>
                                    <p>Welcome to technology!</p>
                                    <span>Reading - 1min</span>
                                </div>
                            </div>
                            <div className='document d-flex' onClick={() => handleContentClick('reading')}>
                                <i class="fa-solid fa-book-open"></i>
                                <div className='document-content'>
                                    <p>Welcome to technology!</p>
                                    <span>Reading - 1min</span>
                                </div>
                            </div>
                            <div className='document d-flex' onClick={() => handleContentClick('video')}>
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
                        <div style={{ width: '70%' }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
