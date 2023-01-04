import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + id;

    console.log(id);
    useEffect(() => {
        axios
          .get(url
          )
          .then(response => {
            setPlayer(response.data)
          });
      }, []);

      let playerArray = player.images_of_player
      //let profilepicture = player.profile_picture.guid

      //console.log(profilepicture);

  return (
    <div>

        <h1>{player.player_name}</h1>
        <p>{player.position}</p>
        {playerArray && playerArray.map(url =>
        <div key={url.ID}>
          <img src={url.guid}></img>
        </div>
      )}
        </div>
  );

}