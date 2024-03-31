import '../css/GameOver.css';
import React from 'react';
import 'primeicons/primeicons.css';
import {Button} from "primereact/button";
import '../css/Game.css'


function GameOver() {
    return (
        <div className="all">

            <div className="top-line">
                <h3>Anagrammimäng</h3>
                <p>Kerge</p>
            </div>

            <div className="score">
                <h2>Mäng läbi!</h2>
                <h3>Sinu tulemus:</h3>
                <p>30p</p>
            </div>

            <div className="input">
                <h3>Sisesta oma nimi:</h3>
                <input type="text" className="input-box"/>
            </div>

            <Button label="SISESTA" className="sisesta-button" />
            <Button label="Alusta uuesti" className="return-button" />

        </div>

    );

}

export default GameOver;