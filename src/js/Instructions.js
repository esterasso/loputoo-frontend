import React from 'react';
import '../css/Instructions.css'
import StartOverButton from "../components/StartOverButton";

const Instructions = () => {
    return (
        <div>
            <div className="top-line">
                <h3>Anagrammimäng</h3>
            </div>
            <div className="instructions-container">
                <h3>Mängujuhend</h3>
                <ol className="list">
                    <li className="listItem">Enne mängu alustamist peab mängija valima mängu pikkuse minutites ja
                        raskustaseme ning seejärel vajutama “Mängima” nuppu.
                    </li>
                    <li className="listItem">Aeg läheb kohe käima ning mängijale kuvatakse sõna, millest ta peab hakkama
                        moodustama anagramme (sõna tähtede ümberpaigutus uute sõnade moodustamiseks, näiteks sõna "maasikas" anagramm on "saksimaa").
                        <b> Anagramm peab sisaldama kõiki tähti etteantud sõnas!
                            Luua võib ka kahesõnalisi anagramme, kus mõlemad sõnad peavad olema tähenduslikud, kuid ei pea olema seotud omavahel! </b>
                    </li>
                    <li className="listItem">Vajadusel saab mängija genereerida uue sõna, millest anagramme hakata
                        tegema.
                    </li>
                    <li className="listItem">Väljamõeldud anagrammi peab sisestama tekstikasti ning vajutama “Sisesta”
                        nuppu või klaviatuuril ENTERit.
                    </li>
                    <li className="listItem">Kui sisestatud anagramm on korrektne, saab mängija ühesõnalise anagrammi puhul 20 punkti ning kahesõnalise anagrammi puhul 10 punkti. Lisaks annab iga õige vastus 10
                        sekundit lisaaega.
                    </li>
                    <li className="listItem">Mäng kestab kuni aeg saab otsa, mille järel peab mängija sisestama oma nime
                        edetabeli jaoks.
                    </li>
                </ol>
            </div>
            <StartOverButton />
        </div>
    );
};

export default Instructions;
