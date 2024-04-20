import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import '../css/Scoreboard.css';

function Scoreboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    const filterByGameMode = (mode) => {
        const filtered = users.filter(user => user.gameMode === mode);
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetch(`${BASE_URL}/getAll`)
            .then(res => res.json())
            .then(result => {
                setUsers(result);
                setFilteredUsers(result);
                const defaultFilteredUsers = result.filter(user => user.gameMode === 'raske');
                setFilteredUsers(defaultFilteredUsers);
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
                    <Button label="Raske" className="filter-buttons" onClick={() => filterByGameMode('raske')} />
                    <Button label="Kerge" className="filter-buttons" onClick={() => filterByGameMode('kerge')} />
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Skoor</th>
                        <th>Raskusaste</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                            <td>{user.gameMode}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Button label="Alusta uuesti" className="return-button" onClick={handleHomeButtonClick} />
        </div>
    );
}

export default Scoreboard;
