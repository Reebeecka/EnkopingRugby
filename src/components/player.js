import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { Playerpictures } from "./playerpictures"

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);

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

    let allMedals = [];
    allMedals.push(player.medal_1, player.medal_2, player.medal_3, player.medal_4, player.medal_5, player.medal_6, player.medal_7, player.medal_8, player.medal_9)

    console.log(allMedals);

    let medaljHTML = (<div>
        {allMedals[0] != undefined && allMedals.map(medaljen =>
            <div>
                {medaljen.placement == 1 && (
                    <div className='bajs'>
                        <p>{medaljen.placement}</p>
                    </div>
                )}
                {medaljen.placement == 2 && (
                    <div className='bajs'>
                        <p>{medaljen.placement}</p>
                    </div>
                )}
                {medaljen.placement == 3 && (
                    <div className='bajs'>
                        <p>{medaljen.placement}</p>
                    </div>
                )}
            </div>
        )}
    </div>)


    return (
        <div>
            <img src={player.profile_picture}></img>
            <h1>{player.player_name}</h1>
            <p>{player.position}</p>
            <p>{player.age} år</p>
            <p>{player.height} cm</p>
            <p>{player.weight} kg</p>
            <p>Började spela {player.started_rugby}</p>
            <p>Började i Enköping {player.in_enkoping_since}</p>
            <p>{player.funny_story}</p>
            <p>{player.injuries}</p>
            <p>{player.best_memory}</p>
            <p>Andra klubbar {player.other_clubs}</p>
            <p>{player.best_about_team}</p>

            {medaljHTML}
            <Playerpictures></Playerpictures>
        </div>
    );


}