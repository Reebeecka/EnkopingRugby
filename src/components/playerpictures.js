import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";

import LightGallery from 'lightgallery/react';

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

    let imagesHTML = <></>
    let testHTML = <></>

    const url = "http://enkopingrugby.local/wp-json/wp/v2/posts/" + props.id + "?acf_format=standard";

    useEffect(() => {
        axios
            .get(url
            )
            .then(response => {
                setAllImages(response.data.images_of_player)
            });
    }, []);

    if (allImages != false) {
        if (allImages.length > 0) {
            testHTML = (<div className="App">
                <LightGallery
                    speed={500}
                    addClass={"testing-stuff"}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {
                        allImages.map(image =>
                            <a href={image.guid}>
                            <img style={{width:"150px", height:"102px", "object-fit":"cover", opacity:"0.9"}} src={image.guid}></img>
                            </a>
                        )
                    }
                </LightGallery>
            </div>)
        }
    }



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

    return (<div>{testHTML}</div>)
}