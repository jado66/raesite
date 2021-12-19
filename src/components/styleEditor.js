import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faArrowsAltH, faFont,faTimes, faSave, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuHeader,
  MenuDivider,
  FocusableItem,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default class WebsiteStyleEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.webStyle,
                    showRibbon:true,
                    isMinimized:true
                  }
    }
  
    handleInputChange = (e) => {
      // this.state.lightShade = e.target.value;

      this.setState({
          [e.target.name]: e.target.value
      });

      this.props.updateWebStyle(this.state)
    }

    render() {

        let showRibbonClass = (this.props.showStyleEditor? "" :"hidden")
      
        return (
          <div className={"flex-row"+showRibbonClass} style={{position: "sticky",top: 0, alignSelf: "flex-start",zIndex:999}} >
            <div style={{width:"100%",backgroundColor:"white",border:"1px solid black"}}>
            <div className={"flex-row "} style ={{width:"50%", justifyContent:"center",margin:"auto"}}>
            <Menu menuButton={<MenuButton className={"styleEditorIcon"}><FontAwesomeIcon   icon={faFont} /></MenuButton>} transition>
                <MenuHeader>Text</MenuHeader>
                <MenuDivider />
                <MenuItem>Font Family</MenuItem>
                <MenuItem>Font Base Size</MenuItem>
            </Menu>
            <Menu menuButton={<MenuButton className={"styleEditorIcon"}><FontAwesomeIcon   icon={faPalette} /></MenuButton>} transition>
                <MenuHeader>Colors</MenuHeader>
                <MenuDivider />
                <FocusableItem><input type={"color"} value ={this.state.lightShade} name = {"lightShade"} onChange = {this.handleInputChange}
                 style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Background Color</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.lightAccent} onChange = {this.handleInputChange} name = {"lightAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Accent Color</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.mainBrandColor} onChange = {this.handleInputChange} name = {"mainBrandColor"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Main Brand Color</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.darkAccent} onChange = {this.handleInputChange} name = {"darkAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />- Dark Accent</FocusableItem>
                <FocusableItem><input type={"color"} value ={this.state.darkShade} onChange = {this.handleInputChange} name = {"darkShade"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />- Text Color </FocusableItem>
            </Menu>
           
            <Menu menuButton={<MenuButton className={"styleEditorIcon"}><FontAwesomeIcon  icon={faArrowsAltH} /></MenuButton>} transition>
                <FocusableItem><input type={"range"} min = {0} max = {90} name = {"centerWidth"}  value ={this.state.centerWidth} onChange = {this.handleInputChange}/>Outer Width</FocusableItem>
                <FocusableItem><input type={"range"} min = {60} max = {100} name = {"secondCenterWidth"}  value ={this.state.secondCenterWidth} onChange = {this.handleInputChange}/>Inner Width</FocusableItem>

            </Menu>
            <Menu menuButton={<MenuButton className={"styleEditorIcon"}><FontAwesomeIcon  icon={faFile} /></MenuButton>} transition>
              <SubMenu label="Home Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.homePageName} onChange = {this.handleInputChange} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
              </SubMenu>
              <SubMenu label="Blog Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.blogPageName} onChange = {this.handleInputChange} name = {"blogPageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
              </SubMenu>
              <SubMenu label="Services Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.servicesPageName} onChange = {this.handleInputChange} name = {"servicesPageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
              </SubMenu>
              <SubMenu label="Portfolio Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.portfolioPageName} onChange = {this.handleInputChange} name = {"portfolioPageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
              </SubMenu>
              <SubMenu label="Shop Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.shopPageName} onChange = {this.handleInputChange} name = {"shopPageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
              </SubMenu>
              <SubMenu label="About Page">
                <FocusableItem>Page Name: <input type={"text"} value={this.state.aboutPageName} onChange = {this.handleInputChange} name = {"aboutPageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px", background:"none"}} /></FocusableItem>
              </SubMenu>
            </Menu>
            <MenuButton className={"styleEditorIcon"} onClick={()=>{alert("save");this.props.closeStyleEditor()}}><FontAwesomeIcon  icon={faSave} /></MenuButton>
            <MenuButton className={"styleEditorIcon"} onClick={()=>{alert("hide");this.props.minimizeStyleEditor()}}><FontAwesomeIcon  icon={faSortUp} /></MenuButton>

            <MenuButton className={"styleEditorIcon"} onClick={this.props.closeStyleEditor}><FontAwesomeIcon  icon={faTimes} /></MenuButton>
 
              {/* <FontAwesomeIcon className={"styleEditorIcon"}  icon={faPalette} />
              <FontAwesomeIcon className={"styleEditorIcon"}  icon={faArrowsAltH} /> */}
            </div>
            </div>
          </div>
          
        );
      
    }
  }
