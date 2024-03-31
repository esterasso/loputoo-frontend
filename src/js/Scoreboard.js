import '../css/Scoreboard.css';
import React, {useEffect, useState} from 'react';
import 'primeicons/primeicons.css';
import {Button} from "primereact/button";
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from '../config';

function Scoreboard() {

    const[users, setUsers]=useState([])
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    useEffect(()=>{
        fetch(`${BASE_URL}/getAll`)
            .then(res=>res.json())
            .then((result)=>{
            setUsers(result);
            console.log(result);
        }
    )
    }, [])

    return(
      <div>

          <div className="top-line">
              <h3>Anagrammimäng</h3>
              <p>Kerge</p>
          </div>

          <div className="scoreboard">
              <h3>Edetabel</h3>
              <table>
                  <thead>
                  <tr>
                      <th>Name</th>
                      <th>Skoor</th>
                      <th>Raskusaste</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((user) => (
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