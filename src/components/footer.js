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
  };

  render = () => {

    const socialLinks = this.props.socialMedias.filter(({location}) => {
      if (location === "New Link") {
        return false; // skip
      }
      return true;
    }).map(({link,location}) =>
      <Link className='col' key = {location} to={{ pathname: link}} target={"_blank"} key={location} style={{color:this.props.webStyle.darkShade}}><FontAwesomeIcon className={"socialMediaLink m-auto"} icon={this.componentMapping[location]} /></Link>
    );

    return(
            <div className='mt-5' style = {{width:`${this.props.webStyle.centerWidth}%`, margin:"25px auto"}}>
              <div className='row' style={{justifyContent:"space-evenly"}}>
                {socialLinks}
              </div>
            </div>)
  };
};

