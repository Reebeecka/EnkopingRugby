import React from 'react';
import './App.scss';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


function App() {
  const [players, setPlayers] = useState([{}]);
  let navigate = useNavigate();

  window.onbeforeunload = function () {
    localStorage.clear();
  }


  useEffect(() => {
    let item = localStorage.getItem("players");
    if (item != null) {
      localStorage.setItem("heading", "Enköping Rugbyklubb Damer");
      window.dispatchEvent(new Event('storage'))
      return setPlayers(JSON.parse(item));
    }
    localStorage.setItem("heading", "Enköping Rugbyklubb Damer");
    window.dispatchEvent(new Event('storage'))
    axios
      .get("https://incandescent-downtown.localsite.io/wp-json/wp/v2/posts?per_page=100&acf_format=standard&orderby=title&order=asc", {
        auth: {
          username: "expansion",
          password: "wiggly",
        }
      }
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
        localStorage.setItem("players", JSON.stringify(allPlayersFromApi));
      });
  }, []);


  const routeChange = (id) => {
    let path = `/` + id;
    navigate(path);
  }

  let playersHTML = (<div className="allPlayers">

    {players && players.map((player, index) =>
      <button onClick={() => routeChange(player.id)} className="playerCard" key={index}>
        <img alt="Bild på spelare" src={player.profile_picture}></img>
        <h1 >{player.playername}</h1>
        <p >{player.position}</p>
      </button>
    )}
  </div>)

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1.5, ease: "easeOut" }}>
      <div className='follow-team'>
        <h2>Följ damerna fram till nästa SM medalj! </h2>
        <h2>Se alla våra spelare! Tryck på en spelare för att läsa mer.</h2>
      </div>
      <div>{playersHTML}</div>
    </motion.div>
  );
}

export default App;