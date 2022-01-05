import React from 'react'
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faYoutube, faTiktok, faDiscord, faEtsy, faGithub, faImdb, faLinkedinIn,faPatreon, faPinterestP, faReddit, faShopify, faSpotify, faSoundcloud, faSnapchatGhost } from "@fortawesome/free-brands-svg-icons"
import {
  Link
} from "react-router-dom";

export default class SocialLinks extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();

    this.componentMapping = {
      Email:faEnvelope,
      Facebook: faFacebookSquare,
      Twitter: faTwitter,
      Instagram: faInstagram,
      Youtube: faYoutube,
      Tiktok: faTiktok,
      Discord: faDiscord,
      Etsy: faEtsy,
      Github: faGithub,
      Imdb: faImdb,
      LinkedinIn: faLinkedinIn,
      Patreon: faPatreon,
      Pinterest: faPinterestP,
      Reddit: faReddit,
      Shopify: faShopify,
      Spotify: faSpotify,
      Soundcloud: faSoundcloud,
      Snapchat: faSnapchatGhost
    };

    this.links = [
      {
        icon  :"Instagram",
        href:"https://www.instagram.com/larae.day/"
      },
      {
        icon  :"Tiktok",
        href:"https://www.tiktok.com/@larae.day?"
      },
      {
        icon  :"Facebook",
        href:"https://www.facebook.com/larae.day.erwin/"
      },
      {
        icon  :"Pinterest",
        href:"https://www.pinterest.com/laraedaylifebylarae"
      },
      {
        icon  :"Email",
        href:"mailto:larae.day.lifebylarae@gmail.com"
      }
    ]
  };

  render = () => {

    const socialLinks = this.links.map(({icon,href}) =>
      <Link to={{ pathname: href}} target={"_blank"} key={icon} style={{color:this.props.webStyle.darkShade}}><FontAwesomeIcon className={"socialMediaLink"} icon={this.componentMapping[icon]} /></Link>
  );

    return(
            <div className="title" style = {{width:`${this.props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:this.props.webStyle.lightAccent, marginBottom:"25px"}}>
              <div className='flex-row' style={{justifyContent:"space-evenly"}}>
                {socialLinks}
              </div>
            </div>)
  };
};

//<h1 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{footerValue}</h1>