import React from 'react';
import './App.scss';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import backgoundSVG from "./background.svg";

function App() {
  const [players, setPlayers] = useState([{}]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://enkopingrugby.local/wp-json/wp/v2/posts?per_page=100&acf_format=standard"
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
    <img id="backgroundSVG" src={backgoundSVG} alt="Your SVG" />
    {players && players.map(player =>
      <div onClick={() => routeChange(player.id)} className="playerCard" key={player.id}>
        <img src={player.profile_picture}></img>
        <h1>{player.playername}</h1>
        <p>{player.position}</p>
      </div>
    )}
  </div>)

  return (
    <>
    <h2>Följ damerna fram till nästa SM medalj! </h2>
    <h2>Se alla våra spelare! Tryck på en spelare för att läsa mer.</h2>
    <div>{playersHTML}</div>
    </>
  );
}

export default App;