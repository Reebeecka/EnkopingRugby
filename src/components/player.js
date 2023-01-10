import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { Playerpictures } from "./playerpictures"
import backgoundSVG from "../background.svg";
import firstPlaceSVG from "../1st-place-medal.svg";
import secondPlaceSVG from "../2nd-place-medal.svg";
import thirdPlaceSVG from "../3rd-place-medal.svg";
import { motion } from "framer-motion";

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);
    const [theMedals, setTheMedals] = useState([]);

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

        console.log("from medals", allMedals);
        setTheMedals(allMedals);
    }, [player]);


    let medaljHTML = (<div>
        {theMedals[0] != undefined && theMedals.map(medaljen =>
            <div>
                {medaljen.placement == 1 && (
                    <div className='medal' id='first-place'>
                        <img src={firstPlaceSVG}></img>
                        <p>{medaljen.tournament}</p>
                        <p className='bold'>{medaljen.team}</p>
                    </div>
                )}
                {medaljen.placement == 2 && (
                    <div className='medal' id='second-place'>
                        <img src={secondPlaceSVG}></img>
                        <p>{medaljen.tournament}</p>
                        <p className='bold'>{medaljen.team}</p>
                    </div>
                )}
                {medaljen.placement == 3 && (
                    <div className='medal' id='third-place'>
                        <img src={thirdPlaceSVG}></img>
                        <p>{medaljen.tournament}</p>
                        <p className='bold'>{medaljen.team}</p>
                    </div>
                )}
            </div>
        )}
    </div>)


    return (
        <motion.div className='playerProfile'
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}>
            <img id="backgroundSVG" src={backgoundSVG} alt="Your SVG" />
            <img src={player.profile_picture}></img>
            <h1 className='player-name'>{player.player_name}</h1>
            <div className='information-background'><h2 id='player-position'>{player.position}</h2></div>
            <div className='small-information-background' id='player-age-div'><h3 id="player-age">{player.age} år</h3></div>
            <div className='small-information-background' id='player-height-div'><h3 id='player-height'>{player.height} cm</h3></div>
            <div className='small-information-background' id='player-weight-div'><h3 id="player-weight">{player.weight} kg</h3></div>
            <div className='smallest-information-background' id='player-started-rugby-div'><p id="player-started-rugby">Började spela {player.started_rugby}</p></div>
            <div className='smallest-information-background' id="player-in-enkoping-div"><p id='player-in-enkoping'>Började i Enköping {player.in_enkoping_since}</p></div>
            <section className='other-clubs'>
                <h4>Andra klubbar {player.player_name.split(" ")[0]} spelat i:</h4>
                <p>{player.other_clubs}</p>
            </section>
            <section className='player-stories'>
            <p>{player.funny_story.replace(/\r\n/g, '<br/>')}</p>
            <p>{player.injuries}</p>
            <p>{player.best_memory.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2')}</p>
            </section>
            <p>{player.best_about_team.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2')}</p>

            {medaljHTML}
            <Playerpictures id={id}></Playerpictures>
        </motion.div>
    );


}