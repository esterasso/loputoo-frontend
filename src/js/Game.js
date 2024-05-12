import React, {useState, useEffect} from 'react';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import StartOverButton from '../components/StartOverButton';
import {useLocation} from 'react-router-dom';
import {Message} from "primereact/message";
import {Dialog} from 'primereact/dialog';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

function Game() {
    const [word, setWord] = useState('');
    const location = useLocation();
    const [timer, setTimer] = useState(location.state.time || null);
    const [points, setPoints] = useState(0);
    const [showError, setShowError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [gameOverVisible, setGameOverVisible] = useState(false);
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendInput()
        }
    }

    const showGameOverPopup = () => {
        setGameOverVisible(true);
    };

    const handleCompetitorNameSubmit = () => {
        const username = document.querySelector('.input-box-name').value;
        const score = points;
        const gameMode = location.state.difficulty;
        const time = parseInt(location.state.time);

        if (username.trim() === '') {
            setNameError('Nimi ei saa olla tühi.');
        } else {
            setNameError('');
            fetch(`${BASE_URL}/addScore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    score,
                    gameMode,
                    time
                }),
            })
                .then(e => {
                    navigate('/scoreBoard');
                })
                .catch(error => {
                    console.error('Problem with backend:', error);
                });

        }
    };

    const hideGameOverPopup = () => {
        setGameOverVisible(false);
    };

    const fetchNewWord = () => {
        fetch(`${BASE_URL}/anagrams?difficulty=${location.state.difficulty}`)
            .then((response) => response.json())
            .then((data) => {
                setWord(data.anagram);
                document.querySelector('.input-box').value = '';
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        const startTimer = () => {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(intervalId);
                        showGameOverPopup();
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(intervalId);
        };

        fetch(`${BASE_URL}/anagrams?difficulty=${location.state.difficulty}`)
            .then((response) => response.json())
            .then((data) => {
                setWord(data.anagram);
                startTimer();
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [location.state.difficulty]);

    const sendInput = () => {
        const input = document.querySelector('.input-box');
        const anagram = document.querySelector('.word')
        const inputValue = input.value;
        const anagramValue = anagram.textContent;

        const wordsCount = inputValue.split(' ');

        if (inputValue.trim() === '') {
            console.error('Tühja sisendit ei saa saata')
        } else {
            fetch(`${BASE_URL}/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputValue,
                    anagramValue,
                }),
            })
                .then(response => {
                    if (response.status === 500) {
                        setShowError(true);
                    }
                    if (response.status === 200) {
                        setShowError(false);
                        setInputValue('');
                        if (wordsCount.length === 1) {
                            setPoints(prevPoints => prevPoints + 20);
                        } else {
                            setPoints(prevPoints => prevPoints + 10);
                        }
                        setTimer(prevTimer => prevTimer + 10);
                        fetchNewWord();
                    }
                })
                .catch(error => {
                    console.error('Problem with backend:', error);
                });
        }
    };

    return (
        <div>
            <div className="container">
                <h3>Anagrammimäng</h3>
                <h3>{points} p</h3>
                <h3>{location.state.difficulty}</h3>
                <h3>{timer} sec</h3>
            </div>

            <div className="container-word">
                <p className="word">{word || "Loading..."}</p>
                <button className="circle-button" onClick={fetchNewWord}>
                    <FontAwesomeIcon icon={faRedo} />
                </button>
            </div>

            <input
                type="text"
                className="form-control input-box"
                value={inputValue}
                onKeyUp={handleKeyPress}
                onChange={handleInputChange}
            />

            <div className="error-msg" style={{display: showError ? 'block' : 'none'}}>
                <Message severity="warn" text="Vale vastus, proovi uuesti"/>
            </div>
            <Dialog
                header="Mäng läbi"
                visible={gameOverVisible}
                onHide={hideGameOverPopup}
                className="game-over-dialogue"
            >
                <p>Sinu mäng on lõppenud. Sisesta mängija nimi:</p>

                <div className="inputName">
                    <input type="text" className="input-box-name" required/>
                    <div className="error-msg" style={{display: nameError ? 'block' : 'none'}}>
                        <Message severity="error" text={nameError}/>
                    </div>
                </div>
                <Button className="sisesta-button-na" label="Sisesta" onClick={handleCompetitorNameSubmit}/>
            </Dialog>
            <div className="row mt-3">
                <div className="col">
                    <Button onClick={sendInput} className="sisesta-button-n">Sisesta</Button>
                </div>
            </div>
            <StartOverButton/>
        </div>
    );
}

export default Game;
