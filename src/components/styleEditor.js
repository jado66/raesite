import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faArrowsAltH, faFont,faTimes, faSave, faSortUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faYoutube, faTiktok, faDiscord, faEtsy, faGithub, faImdb, faLinkedinIn,faPatreon, faPinterestP, faReddit, faShopify, faSpotify, faSoundcloud, faSnapchatGhost } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import FontPicker from "font-picker-react";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Menu, MenuItem, MenuButton, MenuHeader,
         MenuDivider, FocusableItem, SubMenu} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import {
  Link
} from "react-router-dom";
export default class WebsiteStyleEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.webStyle,
                    showRibbon:true,
                    isMinimized:true
                  }

      this.componentMapping = {
        Email: faEnvelope,
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
    }


    componentDidMount(){

      let newState = {}
      let stored_lightShade  = localStorage.getItem("webStyle-lightShade");
      if (stored_lightShade){
        newState.lightShade = stored_lightShade
      }

      let stored_lightAccent = localStorage.getItem("webStyle-lightAccent");
      if (stored_lightAccent){
        newState.lightAccent = stored_lightAccent
      }
      let stored_mainBrandColor = localStorage.getItem("webStyle-mainBrandColor");
      if (stored_mainBrandColor){
        
        newState.mainBrandColor = stored_mainBrandColor

      }
      let stored_darkAccent = localStorage.getItem("webStyle-darkAccent");
      if (stored_darkAccent){
        
        newState.darkAccent = stored_darkAccent

      }
      let stored_darkShade = localStorage.getItem("webStyle-darkShade");
      if (stored_darkShade){
        
        newState.darkShade = stored_darkShade

      }
      // widths
      let stored_centerWidth = localStorage.getItem("webStyle-centerWidth");
      if (stored_centerWidth){
        
        newState.centerWidth = stored_centerWidth

      }
      let stored_secondCenterWidth = localStorage.getItem("webStyle-secondCenterWidth");
      if (stored_secondCenterWidth){
        newState.secondCenterWidth = stored_secondCenterWidth

      }


      this.setState(newState)

      this.props.updateWebStyle(newState)
    }

    handleFontChange = (name,font) =>{
      localStorage.setItem('webStyle-'+name,font.family);
      this.setState({
          [name]: font.family
        });

      this.props.updateWebStyle(this.state)
    }
  
    handleInputChange = (e) => {
      // this.state.lightShade = e.target.value;
      localStorage.setItem('webStyle-'+e.target.name,e.target.value);
      this.setState({
          [e.target.name]: e.target.value
      });

      this.props.updateWebStyle(this.state)
    }

    invertColors = () =>{
      this.setState({
        lightShade: this.state.darkShade,
        lightAccent: this.state.darkAccent,
        darkAccent: this.state.lightAccent,
        darkShade: this.state.lightShade
      }, function() {
        this.props.updateWebStyle(this.state)
      })
    }

    render() {

      let socialMediaSelectOptions = [
        <option>Facebook</option>,
        <option>Twitter</option>,
        <option>Instagram</option>,
        <option>Youtube</option>,
        <option>Tiktok</option>,
        <option>Discord</option>,
        <option>Etsy</option>,
        <option>Github</option>,
        <option>Imdb</option>,
        <option>LinkedinIn</option>,
        <option>Patreon</option>,
        <option>PinterestP</option>,
        <option>Reddit</option>,
        <option>Shopify</option>,
        <option>Spotify</option>,
        <option>Soundcloud</option>,
        <option>Snapchat</option>]

        let pages = this.props.pages.map(({name, path},index)=> 
        (
          <SubMenu label={name}>
                <FocusableItem>Name: <input type={"text"} value={name} onChange = {(e)=>{this.props.pageCallbacks.handleNameChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <FocusableItem>Path: <input type={"text"} value={path} onChange = {(e)=>{this.props.pageCallbacks.handlePathChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <MenuItem><Link to={path}>Visit Page</Link></MenuItem>
                <MenuDivider />
                <MenuItem><a onClick={()=>{this.props.pageCallbacks.deletePage(name,index)}}>Delete Page</a></MenuItem>
          </SubMenu>
        ))

        let socialMediaLinks = this.props.socialMedias.map(({location, link},index)=> 
        (
          <SubMenu label={location}>
                <FocusableItem>Site: <select onChange = {(e)=>{this.props.socialMediaCallbacks.handleSocialSiteChange(index,e.target.value)}} value={location}>{socialMediaSelectOptions}</select></FocusableItem>
                <FocusableItem>link: <input type={"text"} value={link} onChange = {(e)=>{this.props.socialMediaCallbacks.handleSocialLinkChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <MenuItem><Link to={link}>Visit Link</Link></MenuItem>
                <MenuDivider />
                <MenuItem><a onClick={()=>{this.props.socialMediaCallbacks.deleteSocialMedia(location,index)}}>Delete Link</a></MenuItem>
          </SubMenu>
        ))

        let showRibbonClass = (this.props.showStyleEditor? "" :" hidden")
      
        return (
          <div className={"nav nav-fill container-fluid border-bottom border-dark bg-light "+showRibbonClass} style={{position: "sticky",top: 0, alignSelf: "flex-start",zIndex:999}} >
            <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon   icon={faFont} /></MenuButton>} transition>
                <MenuHeader>Text</MenuHeader>
                <MenuDivider />
                <SubMenu label={"Primary Font"}>
                  <FontPickerDropDown label = {"Primary Front"} apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ" 
                                    activeFontFamily={this.state.secondaryFont} pickerId="primary"
                                    // onChange={(nextFont) => this.handleFontChange("primaryFont",nextFont)}
                                    />
                </SubMenu>
                <SubMenu label={"Secondary Font"}>
                  <FocusableItem className={"apply-font-secondary"}>
                    <FontPicker
                      apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ"
                      activeFontFamily={this.state.secondaryFont}
                      pickerId="secondary"
                      onChange={(nextFont) => this.handleFontChange("secondaryFont",nextFont)}
                    />
                  </FocusableItem>
                </SubMenu>
                
                {/* <MenuItem>Font Family</MenuItem> */}
                <MenuItem>Font Base Size</MenuItem>
            </Menu>
            <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle "}><FontAwesomeIcon   icon={faPalette} /></MenuButton>} transition>
                <MenuHeader>Colors</MenuHeader>
                <MenuDivider />
                <FocusableItem><input type={"color"} value ={this.state.lightShade} name = {"lightShade"} onChange = {this.handleInputChange}
                 style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Background Color</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.lightAccent} onChange = {this.handleInputChange} name = {"lightAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Primary Accent</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.mainBrandColor} onChange = {this.handleInputChange} name = {"mainBrandColor"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Main Brand Color</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.darkAccent} onChange = {this.handleInputChange} name = {"darkAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secoondary Accent</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.darkShade} onChange = {this.handleInputChange} name = {"darkShade"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secondary Shade (Font) </FocusableItem>
                <FocusableItem><button onClick={this.invertColors}>Invert Color Scheme</button> </FocusableItem>

            </Menu>
           
            <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon  icon={faArrowsAltH} /></MenuButton>} transition>
                <FocusableItem><input type={"range"} min = {0} max = {90} name = {"centerWidth"}  value ={this.state.centerWidth} onChange = {this.handleInputChange}/>Outer Width</FocusableItem>
                <FocusableItem><input type={"range"} min = {60} max = {100} name = {"secondCenterWidth"}  value ={this.state.secondCenterWidth} onChange = {this.handleInputChange}/>Inner Width</FocusableItem>

            </Menu>
           
            <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon  icon={faFile} /></MenuButton>} transition>
              <MenuHeader>Your Website Pages</MenuHeader>
              {pages}
              <MenuButton className={"styleEditorSubmenuIcon "} onClick = {()=>this.props.pageCallbacks.addPage()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
            </Menu>
            <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon  icon={faTwitter} /></MenuButton>} transition>
              <MenuHeader>Your Social Media Links</MenuHeader>
              {socialMediaLinks}
              <MenuButton className={"styleEditorSubmenuIcon"} onClick = {()=>this.props.socialMediaCallbacks.addSocialMedia()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
            </Menu>
            <MenuButton className={"nav-item styleEditorIcon"} onClick={()=>{alert("save");this.props.closeStyleEditor()}}><FontAwesomeIcon  icon={faSave} /></MenuButton>
            <MenuButton className={"nav-item styleEditorIcon"} onClick={()=>{alert("hide");this.props.minimizeStyleEditor()}}><FontAwesomeIcon  icon={faSortUp} /></MenuButton>

            <MenuButton className={"nav-item styleEditorIcon"} onClick={()=>{this.props.closeStyleEditor()}}><FontAwesomeIcon  icon={faTimes} /></MenuButton>
 
              {/* <FontAwesomeIcon className={"styleEditorIcon dropdown-toggle"}  icon={faPalette} />
              <FontAwesomeIcon className={"styleEditorIcon dropdown-toggle"}  icon={faArrowsAltH} /> */}
            
          </div>
          
        );
      
    }
  }


  
function FontPickerDropDown(props){
  const [searchParams, setSearchParams] = useState("")


  const filterFonts = (font) =>{
    let fontLower = font.family.toLowerCase()
    let result = fontLower.startsWith("r")
    return result
    
  }

  return(
      <div>
        <input value={searchParams} onChange={(evt)=>{setSearchParams(evt.target.value)}}/>
        <span>{searchParams}  </span>
                  
     
        <FontPicker
          apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ"
          activeFontFamily={props.activeFontFamily}
          pickerId={props.pickerId}
          // onChange={props.onChange}
          filter={(font) => {filterFonts(font)}}
        />
        </div>
  )
}