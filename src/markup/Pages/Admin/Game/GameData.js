import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import simp from '../../../../images/gallery/simp.jpg';
import { useLocation } from 'react-router-dom';

export default function GameData() {
    const location = useLocation();
    const { levels } = location.state;
    const accessToken = localStorage.getItem('accessToken');

    const [gameLevels, setGameLevels] = useState([]);

    useEffect(() => {
        const fetchLevels = async () => {
            // Access the modeId from location.state
            const { modeId } = location.state || {};

            if (!modeId) {
                console.error('Mode ID is undefined.');
                return;
            }

            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/games/game-mode/${modeId}/game-level`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setGameLevels(data);
            } catch (error) {
                console.error('Failed to fetch game levels:', error);
            }
        };

        fetchLevels();
    }, [location.state]);

    return (
        <div className='admin-syllabus'>
            <div className='syllabus'>
                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>GAME</h5>
                            <hr />
                        </div>
                        <i class="fa-solid fa-book"></i>
                    </div>
                </div>

                <div className="syllabus-content">
                    <div className='d-flex justify-content-between'>
                        <div className="d-flex justify-content-start" style={{ width: '30%', border: '1px solid #EF7E54', padding: '10px 15px', borderRadius: '10px', color: 'white' }}>
                            <div className='text-center' style={{ width: '50%' }}>
                                <h5 className='mb-0'> ... MODE</h5>
                            </div>
                            <div className="d-flex justify-content-around" style={{ width: '50%', backgroundColor: '#FF8A00', borderRadius: '10px' }}>
                                <p className='mb-0'>Total level</p>
                                <span>{levels.length}</span>
                            </div>
                        </div>
                        <div>
                            <button style={{ backgroundColor: '#EF7E54', color: 'white', border: 'none', borderRadius: '10px', padding: '5px 10px' }}><i class="fa-solid fa-circle-plus"></i>        Create syllabus</button>
                        </div>
                    </div>

                    <div>
                        <div className="search d-flex justify-content-center">
                            <input type="text" placeholder='Search course' />
                            <div className='text-center' style={{ height: '30px', border: '1px solid #988E8E66', borderLeft: 'none', width: '5%', paddingTop: '5px', borderRadius: '0 10px 10px 0' }}>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>

                        <div className='px-3'>
                            {levels.map((level, index) => (
                                <div key={index} className="syllabus-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex justify-content-start">
                                            <img className='img-responsive' src={simp} alt="" />
                                            <div className='ms-3'>
                                                <p className='mb-1 mt-2'>Level {level.levelIndex + 1} </p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='mt-3' style={{ width: '100px', backgroundColor: '#EF7E54', border: 'none', borderRadius: '10px', color: 'white' }}>View/Edit</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center">
                            <ReactPaginate />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
