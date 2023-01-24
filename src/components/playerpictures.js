import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import LightGallery from 'lightgallery/react';
import '../App.scss';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export function Playerpictures(props) {

    const [allImages, setAllImages] = useState([{}]);

    let picturesHTML = <></>

    const url = "https://incandescent-downtown.localsite.io/wp-json/wp/v2/posts/" + props.id + "?acf_format=standard";

    useEffect(() => {
        axios
        .get(url, {
            auth: {
                username: "expansion",
                password: "wiggly",
            }
        }
            )
            .then(response => {
                setAllImages(response.data.images_of_player)
            });
    }, []);

    if (allImages != false) {
        if (allImages.length > 0) {
            picturesHTML = (
                <LightGallery
                    speed={500}
                    addClass={"testing-stuff"}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {
                        allImages.map(image =>
                            <a href={image.guid}>
                            <img style={{width:"150px", height:"102px", "object-fit":"cover", opacity:"0.9"}} alt="Bild på spelaren" src={image.guid}></img>
                            </a>
                        )
                    }
                </LightGallery>
            )
        }
    }


    return (<section className='pictures-of-player'>{picturesHTML}</section>)
}