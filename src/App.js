import React from 'react';
import './App.scss';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([{}]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://enkopingrugby.local/wp-json/wp/v2/posts?acf_format=standard"
      )
      .then(response => {

        let allPlayersFromApi = response.data.map((player => (
          {
            id: player.id,
            playername: player.acf.player_name,
            position: player.acf.position,
            profile_picture: player.acf.profile_picture
          }
        )));
        setPlayers(allPlayersFromApi);
      });
  }, []);

  const routeChange = (id) => {
    let path = `/` + id;
    navigate(path);
  }

  let playersHTML = (<div className="allPlayers">
    {players && players.map(player =>
      <div onClick={() => routeChange(player.id)} className="playerCard" key={player.id}>
        <img src={player.profile_picture}></img>
        <h1>{player.playername}</h1>
        <p>{player.position}</p>
      </div>
    )}
  </div>)

  return (
    <div>{playersHTML}</div>
  );
}

export default App;