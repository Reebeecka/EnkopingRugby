import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { Playerpictures } from "./playerpictures"
import firstPlaceSVG from "../1st-place-medal.svg";
import secondPlaceSVG from "../2nd-place-medal.svg";
import thirdPlaceSVG from "../3rd-place-medal.svg";
import { motion } from "framer-motion";
import '../App.scss';

export function Player() {

    const { id } = useParams()
    const [player, setPlayer] = useState([{}]);
    const [theMedals, setTheMedals] = useState([]);

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + id + "?acf_format=standard";

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

        setTheMedals(allMedals);
    }, [player]);


    let medaljHTML = (<section className='allMedals'>
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
    </section>)


    return (
        <motion.div className='playerProfile'
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}>
            <secion className="player-main-info">
                <img src={player.profile_picture}></img>
                <secction className="player-main-info-text">
                    <div className='information-background'><h3 id='player-position'>{player.position}</h3></div>
                    <div className='small-information-background' id='player-age-div'><h3 id="player-age">{player.age} år</h3></div>
                    <div className='small-information-background' id='player-height-div'><h3 id='player-height'>{player.height} cm</h3></div>
                    <div className='small-information-background' id='player-weight-div'><h3 id="player-weight">{player.weight} kg</h3></div>
                    <div className='smallest-information-background' id='player-started-rugby-div'><p id="player-started-rugby">Började spela rugby {player.started_rugby}</p></div>
                    <div className='smallest-information-background' id="player-in-enkoping-div"><p id='player-in-enkoping'>Började i Enköping {player.in_enkoping_since}</p></div>
                    <section className='other-clubs'>
                        <h4>Andra klubbar hon spelat i:</h4>
                        <p>{player.other_clubs}</p>
                    </section>
                </secction>
                {medaljHTML}
            </secion>
            <section className='player-allStories'>
                <p className='best-about-team'>{player.best_about_team}</p>
                <section className='player-stories'>
                    <h5>Spelaren berättar en rolig rugby historia:</h5>
                    <p>{player.funny_story}</p>
                    <h5>Skador från rugbyn:</h5>
                    <p>{player.injuries}</p>
                    <h5>Bästa rugbyminne!</h5>
                    <p>{player.best_memory}</p>
                </section>
            </section>

            <Playerpictures id={id}></Playerpictures>
        </motion.div>
    );


}