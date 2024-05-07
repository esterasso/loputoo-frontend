import '../css/Homepage.css';
import React, {useState} from 'react';
import {Button} from 'primereact/button';
import 'primeicons/primeicons.css';
import { Message } from 'primereact/message';
import {Link, useNavigate} from 'react-router-dom';


const Homepage = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false);

    const handleTimeButtonClick = (time) => {
        setSelectedTime(time);
    };

    const handleDifficultyButtonClick = (dif) => {
        setSelectedDifficulty(dif);
    };

    const handlePlayButtonClick = () => {
        if (selectedTime !== null && selectedDifficulty !== null) {
            navigate('/game', { state: { time: selectedTime, difficulty: selectedDifficulty } });
        } else {
            setShowWarning(true);
        }
    };

    const handleEdetabelButtonClick = () => {
        navigate('/scoreboard');
    };

    const handleInstructionsButtonClick = () => {
        navigate('/instructions');
    };

    return (
        <div>
            <div className="purple-area">

                <h1>Anagrammimäng</h1>
                <p>Lõbus mäng kõigile huvilistele!</p>
                <div className="box">
                    <h4>Vali mängukestus:</h4>
                    <div className="title_div">
                        <Button
                            label="1 min"
                            className={`time-button ${selectedTime === '60' ? 'active' : ''}`}
                            onClick={() => handleTimeButtonClick('60')}
                        />
                        <Button
                            label="3 min"
                            className={`time-button ${selectedTime === '180' ? 'active' : ''}`}
                            onClick={() => handleTimeButtonClick('180')}
                        />
                        <Button
                            label="5 min"
                            className={`time-button ${selectedTime === '300' ? 'active' : ''}`}
                            onClick={() => handleTimeButtonClick('300')}
                        />
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="box">
                    <h4>Vali raskustase:</h4>
                    <div className="title_div">
                        <Button
                            label="Kerge"
                            className={`time-button ${selectedDifficulty === 'kerge' ? 'active' : ''}`}
                            onClick={() => handleDifficultyButtonClick('kerge')}
                        />
                        <Button
                            label="Raske"
                            className={`time-button ${selectedDifficulty === 'raske' ? 'active' : ''}`}
                            onClick={() => handleDifficultyButtonClick('raske')}
                        />
                        <div className="error-msg" style={{ display: showWarning ? 'block' : 'none' }}>
                            <Message severity="warn" text="Palun vali aeg ja raskusaste" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="white-area">
                <button className="button-mangima" onClick={handlePlayButtonClick}>
                    Mängima
                </button>
                <button className="button-edetabel" onClick={handleEdetabelButtonClick}>
                    Edetabel
                </button>
                <button className="button-info" onClick={handleInstructionsButtonClick}>
                    Mängujuhend
                </button>
            </div>
        </div>
    );
}


export default Homepage;
