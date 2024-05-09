import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import '../css/Scoreboard.css';
import StartOverButton from "../components/StartOverButton";

function Scoreboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [activeTimeFilter, setActiveTimeFilter] = useState(null);
    const [activeModeFilter, setActiveModeFilter] = useState(null);
    const navigate = useNavigate();


    const filterByGameModeAndTime = (mode, time) => {
        setActiveModeFilter(mode);
        setActiveTimeFilter(time);
        const filtered = users.filter(user => user.gameMode === mode && user.time === parseInt(time));
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetch(`${BASE_URL}/getAll`)
            .then(res => res.json())
            .then(result => {
                setUsers(result);
                setFilteredUsers(result);
                const defaultFilteredUsers = result.filter(user => user.gameMode === 'kerge' && user.time === 60);
                setFilteredUsers(defaultFilteredUsers);
                setActiveModeFilter('kerge');
                setActiveTimeFilter('60');
            });
    }, []);

    return (
        <div className="scoreboard-container">
            <div className="top-line">
                <h3>Anagrammimäng</h3>
            </div>

            <div className="scoreboard">
                <h3>Edetabel</h3>
                <div>
                    <Button label="1 min" className={`filter-buttons ${activeTimeFilter === '60' ? 'active' : ''}`} onClick={() => filterByGameModeAndTime(activeModeFilter, '60')} />
                    <Button label="3 min" className={`filter-buttons ${activeTimeFilter === '180' ? 'active' : ''}`} onClick={() => filterByGameModeAndTime(activeModeFilter, '180')} />
                    <Button label="5 min" className={`filter-buttons ${activeTimeFilter === '300' ? 'active' : ''}`} onClick={() => filterByGameModeAndTime(activeModeFilter, '300')} />
                </div>
                <div>
                    <Button label="Kerge" className={`filter-buttons ${activeModeFilter === 'kerge' ? 'active' : ''}`} onClick={() => filterByGameModeAndTime('kerge', activeTimeFilter)} />
                    <Button label="Raske" className={`filter-buttons ${activeModeFilter === 'raske' ? 'active' : ''}`} onClick={() => filterByGameModeAndTime('raske', activeTimeFilter)} />
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Skoor</th>
                        <th>Raskusaste</th>
                        <th>Aeg</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                            <td>{user.gameMode}</td>
                            <td>{user.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <StartOverButton />

        </div>
    );
}

export default Scoreboard;
