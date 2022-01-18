import React from "react";
import {
  Link
} from "react-router-dom";
import { Menu, MenuItem, MenuButton, SubMenu} from '@szhsin/react-menu';
import { faAngleDoubleRight, faAngleDoubleLeft, faPlus, faPencilAlt, faTrashAlt,  faCheck, faTimes, faSortDown, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentEditable from 'react-contenteditable'


import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faYoutube, faTiktok, faDiscord, faEtsy, faGithub, faImdb, faLinkedinIn,faPatreon, faPinterestP, faReddit, faShopify, faSpotify, faSoundcloud, faSnapchatGhost, faGooglePlusG } from "@fortawesome/free-brands-svg-icons"


export default class Navbar extends React.Component {
    constructor(props) {
      super(props);

      let menuItems = this.props.pages;
      menuItems.forEach(menuItem=>{
        menuItem.mode = "add/move"
      })

      this.state = {
        showMenu: false,
        areButtonsVisible: false,
        menuItems : menuItems,
        mode: "add/move"
      };

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
    }
    

    deleteMenuItem(index,dontAsk) {
      // alert("Delete at index "+index)
      if (window.confirm('Are you sure you want to delete this menu item?') || dontAsk) {
        let newMenuItemList = [...this.state.menuItems.slice(0,index),...this.state.menuItems.slice(index+1)]

        this.setState({mode:"add/move",menuItems:newMenuItemList}, function() {
          this.returnToNormalState();
        });
        localStorage.setItem('navbar',JSON.stringify(newMenuItemList));

        // I don't want this to load from local storage yet
      } 
    }

    addMenuItemBelow(index){
      alert(`Add menu item below ${index}`)
    }

    moveMenuItemLeft(index){
      this.swapMenuItems(index,index-1)
    }

    moveMenuItemRight(index){
      this.swapMenuItems(index,index+1)
    }

    swapMenuItems(indexA,indexB){
      // alert(`Swap menuItem ${indexA} and ${indexB}`)
      if (Math.max(indexA,indexB) == this.state.menuItems.length){
        return
      }

      let newMenuItemList = [...this.state.menuItems];
      let tempMenuItem = {...this.state.menuItems[indexB]};

      newMenuItemList[indexB] = {...newMenuItemList[indexA]};
      newMenuItemList[indexA] = tempMenuItem

      this.setState({menuItems:newMenuItemList});
      localStorage.setItem('navbar',JSON.stringify(newMenuItemList));
    }

    addMenuItemAtIndex(index){
      let newMenuItem = {}
      newMenuItem.name = "New MenuItem";
      newMenuItem.path = "/"
      newMenuItem.mode = "add/move"
      
      let newMenuItemList = [...this.state.menuItems.slice(0,index),newMenuItem,...this.state.menuItems.slice(index)]

      this.setState({menuItems: newMenuItemList})

      localStorage.setItem('navbar',JSON.stringify(newMenuItemList));
    }

    editMenuItemAtIndex(index,newName,newPath){
      // alert("Change menuItem at index "+index + ` to ${newName}:${newPath}`)
      let newMenuItemList = [...this.state.menuItems];
      
      // if (newMenuItemList[index].name == "New MenuItem" && newName != "New MenuItem"){
      //   if (!this.props.pageCallbacks.checkIfPageExists(newName)){
      //     alert("This page does not exist")
      //   }
      // }
      if (!this.isPathExternal(newPath)){
        if(!this.props.pageCallbacks.checkIfPageExists(newPath)){
          if (window.confirm(`You don't have any pages with the path ${newPath}. Would you like to create one?`)){
            this.props.pageCallbacks.addPage(newName,newPath)
          }
        }
      }

      newMenuItemList[index] = {name:newName,path:newPath}

      this.setState({mode:"add/move",menuItems:newMenuItemList}, function() {
        this.returnToNormalState();
      });
      localStorage.setItem('navbar',JSON.stringify(newMenuItemList));
    }

    setButtonsVisibility(val){
      // alert(val)
      this.setState({areButtonsVisible:val})
    }

     componentDidMount(){
      let menuItems = JSON.parse(localStorage.getItem('navbar'))
  
      // menuItems.filter((menuItem) => menuItem.name != "")

      if (menuItems){ 
        menuItems.forEach(menuItem=>{
          menuItem.mode = "add/move"
        })
        this.setState({menuItems: menuItems})
      }
      else{
        menuItems = this.props.pages;
        localStorage.setItem('navbar',JSON.stringify(menuItems));
      }
    }

    changeToEditMode(){
      if (this.state.mode != "edit"){
        let menuItems = [...this.state.menuItems];
        menuItems.forEach(menuItem=>{
          menuItem.mode = "edit"
        })

        this.setState({menuItems:menuItems,mode:"edit"})

      }
      else{
        this.returnToNormalState()
      }
    }

    changeToDeleteMode(){
      if (this.state.mode != "delete"){
        let menuItems = [...this.state.menuItems];
        menuItems.forEach(menuItem=>{
          menuItem.mode = "delete"
        })

        this.setState({menuItems:menuItems,mode:"delete"})

      }
      else{
        this.returnToNormalState()
      }
    }

    returnToNormalState(){
      let menuItems = [...this.state.menuItems];
        menuItems.forEach(menuItem=>{
          menuItem.mode = "add/move"
        })

        this.setState({menuItems:menuItems,mode:"add/move"})
    }

    isPathExternal(url){
      const tmp = document.createElement('a');
      tmp.href = url;
      return tmp.host !== window.location.host;
    }
    toggleMenu(){
      this.setState({ showMenu: !this.state.showMenu })
    }  

    render(){
      let callbacks = {
        deleteMenuItem: this.deleteMenuItem.bind(this),
        moveMenuItemLeft: this.moveMenuItemLeft.bind(this),
        moveMenuItemRight: this.moveMenuItemRight.bind(this),
        addMenuItemAtIndex: this.addMenuItemAtIndex.bind(this),
        editMenuItemAtIndex: this.editMenuItemAtIndex.bind(this),
        returnToNormalState: this.returnToNormalState.bind(this),
        addMenuItemBelow: this.addMenuItemBelow.bind(this)
      }

      const show = (this.state.showMenu) ? "show" : "" ;

      const menuItems = []
      this.state.menuItems.forEach((menuItem,index) => {
        
        if (index == 2){
          menuItem = [menuItem.name,{name:"Life Coaching",path:"/life-coaching"},{name:"Influencer Coaching",path:"/coaching-and-consulting"},
                                    {name:"Social Media Strategy",path:"/coaching-and-consulting"},{name:"Talent Training",path:"/talent-training"}]
          }
                                    // If the menuItem is an object and not a list of menuItems
        if (menuItem.constructor == Object) {
          let isExternalMenuItem = this.isPathExternal(menuItem.path) 

          let newMenuItem = (isExternalMenuItem ?
                      <Link className="link" className = {"navMenu apply-font-primary"} to={{ pathname: menuItem.path}} target="_blank" style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={menuItem.name+menuItem.path}>{menuItem.name}</Link>
                        :
                        <Link className="link" className = {"navMenu apply-font-primary"} to={menuItem.path} style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={menuItem.name+menuItem.path}>{menuItem.name}</Link>
                      )
          menuItems.push(
            <AdminMenuItemWrapper key={menuItem.name+menuItem.path+"-admin"} adminProps = {this.props.adminProps} webStyle = {this.props.webStyle} isMenu = {false} isMobile = {this.props.isMobile}
                                index = {index} callbacks = {callbacks} mode = {this.state.mode} menuItem = {menuItem} menuItemCount = {this.state.menuItems.length}>
              {newMenuItem}
            </AdminMenuItemWrapper>)
          }
        else
        {
          // If the menuItem is list
          let newMenuItemsList = [...menuItem].slice(1)
          let newMenuItems = newMenuItemsList.map(({name, path})=> (
            <MenuItem className={"apply-font-primary"} styles = {{textAlign:"left", hover: {color: 'white', backgroundColor: 'black'},active: {backgroundColor: 'black'}}}><Link className="link navMenu" to={path} style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={name+path}>{name}</Link></MenuItem>
          ))


          let newMenu = <Menu className={"nav apply-font-primary"} menuStyles={{color: this.props.webStyle.lightShade, backgroundColor: this.props.webStyle.darkAccent, }} menuButton={<MenuButton className="navMenuHeader" styles={{color:this.props.webStyle.lightShade}}>{menuItem[0]}<FontAwesomeIcon style={{marginLeft:"10px"}} icon={faSortDown} /></MenuButton>}  transition>
                              {newMenuItems}
                              <MenuItem className={"apply-font-primary"} styles = {{hover: {color: this.props.webStyle.lightShade, backgroundColor: this.props.webStyle.darkAccent},active: {backgroundColor: 'black'}}}><FontAwesomeIcon  icon={faPlus}/></MenuItem>
                            </Menu>
          // <Link className="link" to={menuItem[1].path} style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={menuItem.name+menuItem.path}>{menuItem[0]}</Link>
            
          menuItems.push(
          <AdminMenuItemWrapper key={menuItem[0].name+menuItem[1].path+"-admin"} adminProps = {this.props.adminProps} webStyle = {this.props.webStyle} isMenu = {true} isMobile = {this.props.isMobile}
                                index = {index} callbacks = {callbacks} mode = {this.state.mode} menuItem = {menuItem[1]} menuItemCount = {this.state.menuItems.length}>
          {newMenu}
          </AdminMenuItemWrapper>
          )
        }
      })

      const socialLinks = this.props.socialMedias.filter(({location}) => {
        if (location === "New Link") {
          return false; // skip
        }
        return true;
        }).map(({link,location}) =>
          <li>
            <Link className='col' key = {location} to={{ pathname: link}} target={"_blank"} key={location} style={{color:this.props.webStyle.lightShade}}><FontAwesomeIcon className={"sm-icons"} icon={this.componentMapping[location]} /></Link>
          </li>
        );
    
    return(
            // <div className="fullWidth" style={{backgroundColor:"black",position: "sticky",top: 0, alignSelf: "flex-start",zIndex:1}}
            //      onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
                
                
            //     {this.state.areButtonsVisible &&
            //     <div className="floatOnTop" style={{justifyContent:"space-around",display: "flex", flexDirection: "column", height: "100%",left:"100px"}}>
            //       <div>
            //         {this.state.mode == "add/move"?
            //         <div style={{zIndex:999}}>
            //           <FontAwesomeIcon  style={{color:this.props.webStyle.lightShade,left:"25px", fontSize:"x-large",paddingBottom:"3px"}} icon={faPencilAlt} onClick={this.changeToEditMode.bind(this)}/>
            //           <FontAwesomeIcon  style={{color:this.props.webStyle.lightShade, fontSize:"x-large",paddingBottom:"3px",marginLeft:"30px"}} icon={faTrashAlt} onClick={this.changeToDeleteMode.bind(this)}/>
            //         </div >
            //         :
            //           <FontAwesomeIcon  style={{color:this.props.webStyle.lightShade,left:"25px", fontSize:"x-large",paddingBottom:"3px"}} icon={faTimes} onClick={this.returnToNormalState.bind(this)}/>
            //         }
            //         </div>
            //     </div>
            //     }
            //     {menuItems}
            //   </div>
            <div className="relative-div">
              <div className="relative-r boxShadow" style={{backgroundColor:this.props.webStyle.darkAccent,left:"-50%",width:"200%"}}>
              </div>   
                              
      
              <nav className="navbar navbar-expand-lg navbar-dark px-5 mb-5  " style={{marginLeft:"-6em",marginRight:"-6em",backgroundColor:this.props.webStyle.darkAccent}}>
                <a className="navbar-brand" style={{color:this.props.webStyle.lightShade}} href="/">Life By LaRae</a>
                {/* {this.props.isMobile?<span>M</span>:<span>D</span>} */}
                <button className="navbar-toggler" type="button" onClick={ this.toggleMenu.bind(this) }>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                  <div className="navbar-nav justify-content-evenly ms-0 " style={{flexGrow:1}}>
                    {menuItems}
                    {this.props.isMobile &&
                      <Link className="link" className = {"navMenu apply-font-primary text-left"} target="_blank" style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} 
                            onClick = {()=>{this.props.addMenuItemAtIndex(this.state.menuItems.length)}}>+</Link>
                    }
                  </div>
                  <div style={{right:"0"}}>
                  <ul class="navbar-nav sm-icons " >
                    {socialLinks}
                    {

                    }
                  </ul>
                  </div>
                </div>
              </nav>  
            </div>
          
              
    )
  }

}

class AdminMenuItemWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areButtonsVisible: false,
      menuItemHtml: `<a>${this.props.menuItem.name}</a>`,
      menuItemPath: this.props.menuItem.path
    };
  }

  setButtonsVisibility(showButtons){
    // if (this.adminProps.userIsAdmin)
        this.setState({areButtonsVisible: showButtons})
  }

  handleMenuItemHTMLChange = evt => {
    this.setState({menuItemHtml: evt.target.value});
  };

  handleMenuItemPathChange = evt => {
    this.setState({menuItemPath: evt.target.value});
  };

  editMenuItem(){
    if (this.state.menuItemPath == this.props.menuItem.path && this.state.menuItemHtml == `<a>${this.props.menuItem.name}</a>`){
      this.props.callbacks.returnToNormalState();
      this.setButtonsVisibility(false)
      // alert("hi")
      return
    }

    if (this.state.menuItemHtml == "" || this.state.menuItemHtml == "<br>"){
      if (window.confirm('Are you sure you want to delete this menuItem?')) {
        this.props.callbacks.deleteMenuItem(this.props.index,true)
        return
      } else {
        this.setState({menuItemHtml: `<a>${this.props.menuItem.name}</a>`})
        this.setButtonsVisibility(false)
        return
      }
    }

    let menuItemName = this.state.menuItemHtml.match(/(?<=>)[^/</>]*(?=<)/g)
    this.props.callbacks.editMenuItemAtIndex(this.props.index,menuItemName,this.state.menuItemPath)
    this.forceUpdate();
  }

  render() {

    let mode = this.props.menuItem.mode;

    if (this.props.menuItem.name == `New MenuItem`){
      mode = "edit"
    }

    let buttonClass = this.state.areButtonsVisible ? "" :"hidden"

    // buttonClass = "hidden"-3

    return ( 
      <div className={"relative-div flex-grow-1 "+(this.props.isMobile?"":"text-center")} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
        {/* Arrows and pluses */}
        {mode == "add/move" &&
        <div className={buttonClass}>
          {/* {this.props.isMobile?<span>M</span>:<span>D</span>} */}
          
          
          {this.props.isMobile ?
          <div>
            {/* Mobile */}
            <div className="relative-r" style={{color:this.props.webStyle.lightShade,right:".5em"}}>
              {this.props.index != 0 && <FontAwesomeIcon className="icon-link m-auto" icon={faAngleDoubleUp} onClick = {()=>{this.props.callbacks.moveMenuItemLeft(this.props.index)}}/>}
            </div>
            <div className={"relative-r"} style={{color:this.props.webStyle.lightShade,right:"1.5em"}}>
              {this.props.index != this.props.menuItemCount-1 &&<FontAwesomeIcon className="icon-link m-auto" icon={faAngleDoubleDown} onClick = {()=>{this.props.callbacks.moveMenuItemRight(this.props.index)}}/>}
            </div> 
          </div>
          :
          <div>
            {/* Desktop */}
              <div className="relative-l" style={{color:this.props.webStyle.lightShade,left:"1em"}}>
                <FontAwesomeIcon className="icon-link m-auto" icon={faPlus} onClick = {()=>{this.props.callbacks.addMenuItemAtIndex(this.props.index)}}/>
              </div>
              <div className={"relative-r"} style={{color:this.props.webStyle.lightShade,right:"1em"}}>
                <FontAwesomeIcon className="icon-link m-auto" icon={faPlus} onClick = {()=>{this.props.callbacks.addMenuItemAtIndex(this.props.index+1)}}/>
              </div>

              <div className="relative-l" style={{color:this.props.webStyle.lightShade,left:"0em"}}>
                {this.props.index != 0 && <FontAwesomeIcon className="icon-link m-auto" icon={faAngleDoubleLeft} onClick = {()=>{this.props.callbacks.moveMenuItemLeft(this.props.index)}}/>}
              </div>
              <div className={"relative-r"} style={{color:this.props.webStyle.lightShade,right:"0em"}}>
                {this.props.index != this.props.menuItemCount-1 &&<FontAwesomeIcon className="icon-link m-auto" icon={faAngleDoubleRight} onClick = {()=>{this.props.callbacks.moveMenuItemRight(this.props.index)}}/>}
              </div> 
          </div>
          }
        </div>}
        {/* Main Content */}
        {this.props.children}
      </div>
    
      // <div className = {"row"} style={{flex:"0 0"}} >
      //   {/* To the right of component */}
      //   <div className = {"col floatOnTopCentered "+buttonClass} style={{color:this.props.webStyle.lightShade}}>
      //     {/* <FontAwesomeIcon className="icon-menuItem" icon={faPencilAlt} onClick = {()=>{this.props.callbacks.addMenuItemAtIndex(this.props.index)}}/> */}
      //   </div>
      //   <div className = {"row relative-div"} style={{padding:"0px 50px"}}>
      //       {mode == "add/move" && <div>
      //         <div className={"col relative-l "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
      //           <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addMenuItemAtIndex(this.props.index)}}/>
      //         </div>
      //         <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"0px", justifyContent:"center"}}>
      //           {this.props.index != 0 && <FontAwesomeIcon className="icon-link" icon={faAngleDoubleLeft} onClick = {()=>{this.props.callbacks.moveMenuItemLeft(this.props.index)}}/>}
      //         </div>
      //       </div>}
      //       {mode == "delete" && <div>
      //         <div className={"col floatOnTop"} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
      //           <FontAwesomeIcon className="icon-link" icon={faTrashAlt} onClick = {()=>{this.props.callbacks.deleteMenuItem(this.props.index)}}/>
      //         </div>
      //       </div>}

      //       {mode != "edit" && 
      //         <div style={{position:"relative", padding:"16px 0px"}}>
              
      //           
      //           {mode != "delete" && ! this.props.isMenu &&
      //           <div className={"floatOnTop "+buttonClass} style={{textAlign:"center",width:"100%",top:"55%"}}>
      //             <FontAwesomeIcon style={{color:this.props.webStyle.lightShade, fontSize:"x-large"}} className={"icon-link"} icon={faSortDown} onClick = {()=>{this.props.callbacks.addMenuItemBelow(this.props.index)}}/>
      //           </div>}
      //         </div>
      //       }
      //       {mode == "edit" && 
      //         <div className="col">
      //           <ContentEditable
      //             style={{color:this.props.webStyle.lightShade,marginTop:"10px"}}
      //             innerRef={this.contentEditable}
      //             html={this.state.menuItemHtml} // innerHTML of the editable div
      //             onChange={this.handleMenuItemHTMLChange} // handle innerHTML change
      //             />
      //           {!this.props.isMenu && <input type="text" value={this.state.menuItemPath} 
      //                  style={{marginBottom:"10px"}}
      //                  onChange={this.handleMenuItemPathChange}/>}
      //         </div>}

      //         {mode == "edit" && <div>
      //         <div className={"col floatOnTop"} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
      //           <FontAwesomeIcon className="icon-link" icon={ faCheck} onClick = {this.editMenuItem.bind(this)}/>
      //         </div>
      //       </div>}

      //       {mode == "add/move" && <div>
            
      //         {this.props.index != this.props.menuItemCount-1 &&<div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"0px", justifyContent:"center"}}>
      //           <FontAwesomeIcon className="icon-link" icon={faAngleDoubleRight} onClick = {()=>{this.props.callbacks.moveMenuItemRight(this.props.index)}}/>
      //         </div>}
      //         <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
      //           <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addMenuItemAtIndex(this.props.index+1)}}/>
      //         </div>
      //       </div>}
      //     </div>
      //   </div>
    )
  };
}

