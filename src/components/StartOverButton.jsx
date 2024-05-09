import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Game.css';

const StartOverButton = () => {
    return (
        <Link to="/">
            <button className="return-button">Tagasi algusesse</button>
        </Link>
    );
};

export default StartOverButton;