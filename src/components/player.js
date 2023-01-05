import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import {Playerpictures} from "./playerpictures"

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);
    let medals = []

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + id + "?acf_format=standard";

    console.log(id);
    useEffect(() => {
        axios
          .get(url
          )
          .then(response => {
            setPlayer(response.data.acf)
          });
      }, [id]);

      useEffect(() => {

        if(player.medal_5.placement != Number){
            console.log("hej")
        }
        console.log(player.medal_5.placement);
        medals.push(player.medal_1);
        console.log(medals);
      }, [player]);

  return (
    <div>
        <img src={player.profile_picture}></img>
        <h1>{player.player_name}</h1>
        <p>{player.position}</p>
        <Playerpictures></Playerpictures>
        </div>
  );
        

}