import React from 'react';
import { useEffect, useState } from "react";
import env from "react-dotenv";

// import photo from ''

export default function Image(props) {
    const [image, setImage] = useState()

    useEffect(() => {
    //    t(env.PUBLIC_URL)
        // import picture from '../images/Headshot.jpg'

        const picture = React.lazy(() => import('../images/Headshot.jpg'));
        setImage(picture)
        // import('../images/Headshot.jpg').then(setImage)
    }, [props.src])


    return (image ? <img className={"boxShadow"} src={image} style = {{...props.style, height:"400px"}} /> : 'Loading...')
}