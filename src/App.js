import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([{}]);

  useEffect(() => {

    let localPlayers = localStorage.getItem("players");
    if (localPlayers != null) {
      return setPlayers(JSON.parse(localPlayers));
    }

    axios
      .get("http://enkopingrugby.local/wp-json/wp/v2/posts"
      )
      .then(response => {

        let allPlayersFromApi = response.data.map((player => (
          {
            id: player.id,
            playername: player.player_name,
            position: player.position,
            profile_picture_Url: player.profile_picture.guid
          }
        )));

    setPlayers(allPlayersFromApi);
    localStorage.setItem("players", JSON.stringify(allPlayersFromApi));
    console.log(allPlayersFromApi);
  });
}, []);

let playersHTML = (<div>
{players && players.map(player =>
    <div key={player.id}>

        <h1>{player.playername}</h1>
        <img src={player.profile_picture_Url}></img>
        <p>{player.position}</p>
    </div>
)}
</div>)

return (
  <>{playersHTML}</>
);
}

export default App;