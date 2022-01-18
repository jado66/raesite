import React from "react";
import {
  Link
} from "react-router-dom";

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

import { useEffect, useState } from "react";
import { faAngleDoubleRight, faAngleDoubleLeft, faPlus, faPencilAlt, faTrashAlt,  faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentEditable from 'react-contenteditable'


export default class Navbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = 
      {
        links : props.routes,
        mode: "edit"
      };


    }

    deleteLink(index) {
      alert("Delete at index "+index)
      let newLinkList = [...this.state.links.slice(0,index),...this.state.links.slice(index+1)]

      this.setState({mode:"add/move",links:newLinkList})
      // I don't want this to load from local storage yet
      // localStorage.setItem('navbar',JSON.stringify(newLinkList));

    }

    moveLinkLeft(index){
      this.swapLinks(index,index-1)
    }

    moveLinkRight(index){
      this.swapLinks(index,index+1)
    }

    swapLinks(indexA,indexB){
      // alert(`Swap link ${indexA} and ${indexB}`)
      let newLinkList = [...this.state.links];
      let tempLink = {...this.state.links[indexB]};
      newLinkList[indexA] = tempLink

      this.setState({links:newLinkList});
      localStorage.setItem('navbar',JSON.stringify(newLinkList));
    }

    addLinkAtIndex(index){
      alert("Add new link at index "+index)
    }

    editLinkAtIndex(index,newName,newPath){
      // alert("Change link at index "+index + ` to ${newName}:${newPath}`)
      let newLinkList = [...this.state.links];
      newLinkList[index] = {name:newName,path:newPath}

      this.setState({mode:"add/move",links:newLinkList});
      localStorage.setItem('navbar',JSON.stringify(newLinkList));

    }

    returnToNormalState(){
      this.setState({mode:"add/move"});
    }

    // componentDidMount(){
    //   let links = JSON.parse(localStorage.getItem('navbar'))
  
    //   if (links){ 
    //       this.setState({links: links})
    //   }
    //   else{
    //     links = this.props.routes;
    //     localStorage.setItem('navbar',JSON.stringify(links));
    //   }
    // }

    render(){


      let callbacks = {
        deleteLink: this.deleteLink.bind(this),
        moveLinkLeft: this.moveLinkLeft.bind(this),
        moveLinkRight: this.moveLinkRight.bind(this),
        addLinkAtIndex: this.addLinkAtIndex.bind(this),
        editLinkAtIndex: this.editLinkAtIndex.bind(this),
        returnToNormalState: this.returnToNormalState.bind(this)

      }

    //  onMouseEnter={()=>{setButtonsVisible(true)}} onMouseLeave={()=>{setButtonsVisible(false)}} >
    const routeLinks = []
      this.state.links.forEach((link,index) => {
        alert(JSON.stringify(link))
        routeLinks.push(
          <AdminLinkWrapper key={link.name+"admin"} adminProps = {this.props.adminProps} webStyle = {this.props.webStyle} index = {index} callbacks = {callbacks} mode = {this.state.mode} link = {link}>
            <Link to={link.path} style={{color:this.props.webStyle.lightShade}} key={link.name+link.path}>{link.path}</Link>
          </AdminLinkWrapper>)
      });
    
    // return(
    //     <div style={{justifyContent: "space-around", margin:"auto", display:"flex",justifyContent:"space-around"}}>
    //         {links}
    //     </div>
    // )
    return(
            <div className="fullWidth" style={{backgroundColor:this.props.webStyle.darkShade,position: "sticky",top: 0, alignSelf: "flex-start",zIndex:1}}>
                
              <div className="topnav " style={{margin:"auto", display:"flex",justifyContent:"space-evenly",width:"80%"}}>
                
                {routeLinks}
                {/* <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > About </MenuButton>
                
                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Advertising </MenuButton>

                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Coaching </MenuButton>

                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Blog </MenuButton> */}

               
                {/* {areButtonsVisible &&
                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}}
                  onClick={()=>{showAddButton(true)}}>+</MenuButton>
                } */}
              </div>

              
            </div>        
    )
  }

}

class AdminLinkWrapper extends React.Component {
  constructor(props) {
      super(props);
      this.children = props.children;

      this.setButtonsVisibility = this.setButtonsVisibility.bind(this);

      this.state = {
          areButtonsVisible: false,
          newLinkIndex:-1,
          linkHtml: `<a>${this.props.link.name}</a>`,
          linkPath: this.props.link.path
      };

      this.adminProps = props.adminProps
      this.contentEditable = React.createRef();

    }

  setButtonsVisibility(showButtons){
      if (this.adminProps.userIsAdmin)
          this.setState({areButtonsVisible: showButtons})
  }

  handleLinkHTMLChange = evt => {
    this.setState({linkHtml: evt.target.value});
  };

  handleLinkPathChange = evt => {
    this.setState({linkPath: evt.target.value});
  };

  editLink(){
    if (this.state.linkPath == this.props.link.path){
      this.props.callbacks.returnToNormalState();
      return
    }

    let linkName = this.state.linkHtml.replace('<a>','').replace('</a>','').trim();
    this.props.callbacks.editLinkAtIndex(this.props.index,linkName,this.state.linkPath)
  }


  render() {

      let buttonClass = this.state.areButtonsVisible ? "" :"hidden"
      
      // buttonClass = ""

  return ( 
      
      <div className = {"row"} style={{flex:"0 0"}} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
        {/* To the right of component */}
        <div className = {"col floatOnTopCentered "+buttonClass} style={{color:this.props.webStyle.lightShade}}>
          {/* <FontAwesomeIcon className="icon-link" icon={faPencilAlt} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index)}}/> */}
        </div>
        <div className = {"row"} style={{position:"relative", padding:"0px 50px"}}>
            {this.props.mode == "add/move" && <div>
              <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index)}}/>
              </div>
              <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"0px", justifyContent:"center"}}>
                {this.props.index != 0 && <FontAwesomeIcon className="icon-link" icon={faAngleDoubleLeft} onClick = {()=>{this.props.callbacks.moveLinkLeft(this.props.index)}}/>}
              </div>
            </div>}
            {this.props.mode == "delete" && <div>
              <div className={"col floatOnTop"} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faTrashAlt} onClick = {()=>{this.props.callbacks.deleteLink(this.props.index)}}/>
              </div>
            </div>}

            {this.props.mode != "edit" && this.children}

            {this.props.mode == "edit" && 
              <div className="col">
                <ContentEditable
                  style={{color:this.props.webStyle.lightShade,marginTop:"10px"}}
                  innerRef={this.contentEditable}
                  html={this.state.linkHtml} // innerHTML of the editable div
                  onChange={this.handleLinkHTMLChange} // handle innerHTML change
                  />
                <input type="text" value={this.state.linkPath} 
                       style={{marginBottom:"10px"}}
                       onChange={this.handleLinkPathChange}/>
              </div>}

              {this.props.mode == "edit" && <div>
              <div className={"col floatOnTop"} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={ faCheck} onClick = {this.editLink.bind(this)}/>
              </div>
            </div>}

            {this.props.mode == "add/move" && <div>
              <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"0px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faAngleDoubleRight} onClick = {()=>{this.props.callbacks.moveLinkRight(this.props.index)}}/>
              </div>
              <div className={"col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index+1)}}/>
              </div>
            </div>}
          </div>
        </div>
  )

  };
}
/* 
<div className = {"col floatOnTopRight"}>
                <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline",zIndex:999}}>
                    {/* {this.props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentLeft}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} }

                    <div className = {"row"}>
                        <button  className = {buttonClass} onClick = {this.openAddComponentLeft}>Add <FontAwesomeIcon   icon={faSortUp} /></button>
                        {this.props.index != 0 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentUp(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
                    </div>
                    
                    <div className = {"row"}>
                    <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.deleteComponent(this.props.index)}}>Delete</button >
                    <button  className = {buttonClass} onClick = {this.closeAddComponents}>X</button >
                    </div>
                    
                    <div className = {"row"}>
                        <button  className = {buttonClass} onClick = {this.openAddComponentBelow}>Add <FontAwesomeIcon   icon={faSortDown} /></button>

                        {this.props.index != this.props.componentCount - 1 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentDown(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
                    </div>
                </div>
            </div>
             */ 
