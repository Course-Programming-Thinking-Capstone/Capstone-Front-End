import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import basic from '../../../../images/icon/basicGame.png';
import sequence from '../../../../images/icon/sequenceGame.png';
import loop from '../../../../images/icon/loopGame.png';
import functionGame from '../../../../images/icon/functionGame.png';
import condition from '../../../../images/icon/conditionGame.png';
import custom from '../../../../images/icon/customGame.png';

export default function Game() {
    const [enhancedModes, setEnhancedModes] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
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
                        id: foundMode ? foundMode.id : undefined // Include the ID for fetch in handleGameModeClick
                    };
                });
                setEnhancedModes(tempModes);
            } catch (error) {
                console.error('Error fetching game modes:', error);
            }
        };

        fetchGameModes();
    }, [accessToken]);

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
            navigate('/game-data', { state: { levels } });
        } catch (error) {
            console.error('Error fetching game levels:', error);
        }
    };

    return (
        <div className='game-setting'>
            <div className="game-setting-content">

                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>Game</h5>
                            <hr />
                        </div>
                        <i class="fa-solid fa-gamepad"></i>
                    </div>
                </div>
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
            </div>
        </div>
    )
}
