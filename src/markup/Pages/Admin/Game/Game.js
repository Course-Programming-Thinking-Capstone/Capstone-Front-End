import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import basic from '../../../../images/icon/basicGame.png';
import sequence from '../../../../images/icon/sequenceGame.png';
import loop from '../../../../images/icon/loopGame.png';
import functionGame from '../../../../images/icon/functionGame.png';
import condition from '../../../../images/icon/conditionGame.png';
import custom from '../../../../images/icon/customGame.png';
import simp from '../../../../images/gallery/simp.jpg';

export default function Game() {
    const [enhancedModes, setEnhancedModes] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [viewGameData, setViewGameData] = useState(false);
    const [gameLevels, setGameLevels] = useState([]);

    useEffect(() => {
        if (!viewGameData) {
            const fetchGameModes = async () => {
                try {
                    const response = await fetch('https://www.kidpro-production.somee.com/api/v1/games/game-mode', {
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
                    const typeToId = {
                        'Basic': 1,
                        'Sequence': 2,
                        'Loop': 3,
                        'Function': 4,
                        'Condition': 5,
                        'Custom': 6,
                    };
                    const tempModes = [
                        { typeName: 'Basic', src: basic },
                        { typeName: 'Sequence', src: sequence },
                        { typeName: 'Loop', src: loop },
                        { typeName: 'Function', src: functionGame },
                        { typeName: 'Condition', src: condition },
                        { typeName: 'Custom', src: custom },
                    ].map(mode => {
                        const foundMode = data.find(m => m.typeName.toLowerCase() === mode.typeName.toLowerCase());
                        return {
                            ...mode,
                            totalLevel: foundMode ? foundMode.totalLevel : 0,
                            // Use the mapping to assign the correct id
                            id: typeToId[mode.typeName]
                        };
                    });
                    setEnhancedModes(tempModes);
                } catch (error) {
                    console.error('Error fetching game modes:', error);
                }
            };

            fetchGameModes();
        }
    }, [viewGameData, accessToken]);

    const handleGameModeClick = async (modeId) => {
        if (typeof modeId === 'undefined') return;

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
            const levels = await response.json();
            console.log('levels: ', levels);
            setGameLevels(levels);
            setViewGameData(true);
        } catch (error) {
            console.error('Error fetching game levels:', error);
        }
    };

    const handleBackButtonClick = () => {
        setViewGameData(false);
    };

    return (
        <div className='game-setting'>
            <div className="game-setting-content">
                {viewGameData ? (
                    <div className="header">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className='mb'>Game Data</h5>
                                <hr />
                            </div>
                            <button onClick={handleBackButtonClick} style={{backgroundColor: '#7F7C7C', border:'none', borderRadius:'8px', color:'white'}}>Back</button>
                        </div>
                    </div>
                ) : (
                    <div className="header">
                        <div className="d-flex justify-content-start">
                            <div>
                                <h5 className='mb'>Game Modes</h5>
                                <hr />
                            </div>
                            <i class="fa-solid fa-gamepad"></i>
                        </div>
                    </div>
                )}

                {viewGameData ? (
                    <div>
                        <div className="d-flex justify-content-start" style={{ width: '30%', border: '1px solid #EF7E54', padding: '10px 15px', borderRadius: '10px', color: 'white' }}>
                            <div className='text-center' style={{ width: '50%' }}>
                                <h5 className='mb-0'> MODE</h5>
                            </div>
                            <div className="d-flex justify-content-around" style={{ width: '50%', backgroundColor: '#FF8A00', borderRadius: '10px' }}>
                                <p className='mb-0'>Total level</p>
                                <span>{gameLevels.length}</span>
                            </div>
                        </div>
                        <div className="py-3 px-3" style={{}}>

                            {gameLevels.length > 0 ? (
                                gameLevels.map((level, index) => (
                                    <div key={index} className='mt-3 py-3 px-4 d-flex justify-content-between' style={{backgroundColor:'white', borderRadius:"8px"}}>
                                        <div>
                                            <p className='mb-0'>Level {level.levelIndex + 1}</p>
                                        </div>
                                        <div>
                                            <button style={{backgroundColor:'#EF7E54', color:'white', border:'none', borderRadius:'8px'}}>View/Edit</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No levels to display</p> // Placeholder for empty or loading state
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='row'>
                        {enhancedModes.map(({ typeName, src, totalLevel, id }) => (
                            <div className="item col-lg-6 col-md-6 col-sm-12" key={typeName} onClick={() => handleGameModeClick(id)}>
                                <div className="item-content">
                                    <p className="title blue fw-bold mb-2">{typeName} mode</p>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex level">
                                            <span>{totalLevel}</span>
                                            <p className='mb-0 ms-2'>Level</p>
                                        </div>
                                        <div>
                                            <img className='img-responsive' src={src} alt={`${typeName} mode`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
