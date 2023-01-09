import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
export function Playerpictures(props) {

    const [allImages, setAllImages] = useState([{}]);

    let imagesHTML = <></>

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + props.id + "?acf_format=standard";

    useEffect(() => {
        axios
            .get(url
            )
            .then(response => {
                setAllImages(response.data.images_of_player)
            });
    }, []);



    console.log(allImages);
    if (allImages != false) {
        if (allImages.length > 0) {
            imagesHTML = (<div>
                {allImages.map(image =>
                        <img src={image.guid}></img>
                )}
            </div>)
        }
    }

    return (<div>{imagesHTML}</div>)
}