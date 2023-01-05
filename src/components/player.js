import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { Playerpictures } from "./playerpictures"

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);
    const [medalj, setMedalj] = useState([{}]);

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + id + "?acf_format=standard";

    console.log(id);
    useEffect(() => {
        axios
            .get(url
            )
            .then(response => {
                setPlayer(response.data.acf)
            });
    }, []);


    useEffect(() => {

        let allMedals = [];
        allMedals.push(player.medal_1, player.medal_2, player.medal_3, player.medal_4, player.medal_5, player.medal_6, player.medal_7, player.medal_8, player.medal_9)
        setMedalj(allMedals);

    }, [player]);

console.log(medalj)

    return (
        <div>
            <img src={player.profile_picture}></img>
            <h1>{player.player_name}</h1>
            <p>{player.position}</p>
            <Playerpictures></Playerpictures>
        </div>
    );


}