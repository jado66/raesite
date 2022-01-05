import React from "react";
import {
  Link
} from "react-router-dom";

import { faAngleDoubleRight, faAngleDoubleLeft, faPlus, faPencilAlt, faTrashAlt,  faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentEditable from 'react-contenteditable'


export default class Navbar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        areButtonsVisible: false,
        links : this.props.routes,
        mode: "add/move"};
    }

    deleteLink(index) {
      // alert("Delete at index "+index)
      let newLinkList = [...this.state.links.slice(0,index),...this.state.links.slice(index+1)]

      this.setState({mode:"add/move",links:newLinkList})
      // I don't want this to load from local storage yet
      localStorage.setItem('navbar',JSON.stringify(newLinkList));
      this.forceUpdate();

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

      newLinkList[indexB] = {...newLinkList[indexA]};
      newLinkList[indexA] = tempLink

      this.setState({links:newLinkList});
      localStorage.setItem('navbar',JSON.stringify(newLinkList));
    }

    addLinkAtIndex(index){
      let newLink = {}
      newLink.name = "New Link";
      newLink.path = "/"
      
      let newLinkList = [...this.state.links.slice(0,index),newLink,...this.state.links.slice(index)]

      this.setState({links: newLinkList})

      localStorage.setItem('navbar',JSON.stringify(newLinkList));
    }

    editLinkAtIndex(index,newName,newPath){
      // alert("Change link at index "+index + ` to ${newName}:${newPath}`)
      let newLinkList = [...this.state.links];
      
      if (newLinkList[index].name == "New Link" && newName != "New Link"){
        alert("Add new page")
      }
      newLinkList[index] = {name:newName,path:newPath}

      
      let internalLink = this.isLinkExternal()


      this.setState({mode:"add/move",links:newLinkList});
      localStorage.setItem('navbar',JSON.stringify(newLinkList));
    }

    setButtonsVisibility(val){
      // alert(val)
      this.setState({areButtonsVisible:val})
    }

     componentDidMount(){
      let links = JSON.parse(localStorage.getItem('navbar'))
  
      // links.filter((link) => link.name != "")

      if (links){ 
          this.setState({links: links})
      }
      else{
        links = this.props.routes;
        localStorage.setItem('navbar',JSON.stringify(links));
      }
    }

    changeToEditMode(){
      if (this.state.mode != "edit"){
        this.setState({mode:"edit"})
      }
      else{
        this.returnToNormalState();
      }
    }

    returnToNormalState(){
      this.setState({mode:"add/move"});
    }

    isLinkExternal(url){
      const tmp = document.createElement('a');
      tmp.href = url;
      return tmp.host !== window.location.host;
    }

    render(){
      let callbacks = {
        deleteLink: this.deleteLink.bind(this),
        moveLinkLeft: this.moveLinkLeft.bind(this),
        moveLinkRight: this.moveLinkRight.bind(this),
        addLinkAtIndex: this.addLinkAtIndex.bind(this),
        editLinkAtIndex: this.editLinkAtIndex.bind(this),
        returnToNormalState: this.returnToNormalState.bind(this)
      }

    const routeLinks = []
      this.state.links.forEach((link,index) => {
        // alert(JSON.stringify(link))
        
        let isExternalLink = this.isLinkExternal(link.path) 

        let newLink = (isExternalLink ?
                      <Link className="link" to={{ pathname: link.path}} target="_blank" style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={link.name+link.path}>{link.name}</Link>
                       :
                       <Link className="link" to={link.path} style={{color:this.props.webStyle.lightShade, whiteSpace:"nowrap"}} key={link.name+link.path}>{link.name}</Link>
                      )
        routeLinks.push(
          <AdminLinkWrapper key={link.name+link.path+"-admin"} adminProps = {this.props.adminProps} webStyle = {this.props.webStyle}  index = {index} callbacks = {callbacks} mode = {this.state.mode} link = {link}>
            {newLink}
          </AdminLinkWrapper>)
      });
    
    return(
            <div className="fullWidth" style={{backgroundColor:"black",position: "sticky",top: 0, alignSelf: "flex-start",zIndex:1}}
                 onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
                
              <div className="topnav " style={{margin:"auto", display:"flex",justifyContent:"space-evenly",width:"80%"}}>
                
                {this.state.areButtonsVisible &&
                <div className="floatOnTop" style={{justifyContent:"space-around",display: "flex", flexDirection: "column", height: "100%",left:"100px"}}>
                  <div>
                    {this.state.mode == "edit"?
                      <FontAwesomeIcon  style={{color:this.props.webStyle.lightShade,left:"25px", fontSize:"x-large",paddingBottom:"3px"}} icon={faTimes} onClick={this.changeToEditMode.bind(this)}/>
                    :
                      <FontAwesomeIcon  style={{color:this.props.webStyle.lightShade,left:"25px", fontSize:"x-large",paddingBottom:"3px"}} icon={faPencilAlt} onClick={this.changeToEditMode.bind(this)}/>
                    }
                    </div>
                </div>
                }
                {routeLinks}
              </div>

              
            </div>        
    )
  }

}

class AdminLinkWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areButtonsVisible: false,
      linkHtml: `<a>${this.props.link.name}</a>`,
      linkPath: this.props.link.path
    };
  }

  setButtonsVisibility(showButtons){
    // if (this.adminProps.userIsAdmin)
        this.setState({areButtonsVisible: showButtons})
  }

  handleLinkHTMLChange = evt => {
    this.setState({linkHtml: evt.target.value});
  };

  handleLinkPathChange = evt => {
    this.setState({linkPath: evt.target.value});
  };

  editLink(){
    if (this.state.linkPath == this.props.link.path && this.state.linkHtml == `<a>${this.props.link.name}</a>`){
      this.props.callbacks.returnToNormalState();
      // alert("hi")
      return
    }

    if (this.state.linkHtml == "" || this.state.linkHtml == "<br>"){
      if (window.confirm('Are you sure you want to delete this link?')) {
        this.props.callbacks.deleteLink(this.props.index)
        return
      } else {
        this.setState({linkHtml: `<a>${this.props.link.name}</a>`})
        return
      }
      this.props.callbacks.deleteLink(this.props.index)
      return
    }

    let linkName = this.state.linkHtml.replace('<a>','').replace('</a>','').trim();
    this.props.callbacks.editLinkAtIndex(this.props.index,linkName,this.state.linkPath)
    this.forceUpdate();
  }

  render() {

    let mode = this.props.mode;

    if (this.props.link.name == `New Link`){
      mode = "edit"
    }

    let buttonClass = this.state.areButtonsVisible ? "" :"hidden"

    return ( 
      <div className = {"flex-row"} style={{flex:"0 0"}} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
        {/* To the right of component */}
        <div className = {"flex-col floatOnTopCentered "+buttonClass} style={{color:this.props.webStyle.lightShade}}>
          {/* <FontAwesomeIcon className="icon-link" icon={faPencilAlt} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index)}}/> */}
        </div>
        <div className = {"flex-row"} style={{position:"relative", padding:"0px 50px"}}>
            {mode == "add/move" && <div>
              <div className={"flex-col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index)}}/>
              </div>
              <div className={"flex-col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,left:"0px", justifyContent:"center"}}>
                {this.props.index != 0 && <FontAwesomeIcon className="icon-link" icon={faAngleDoubleLeft} onClick = {()=>{this.props.callbacks.moveLinkLeft(this.props.index)}}/>}
              </div>
            </div>}
            {mode == "delete" && <div>
              <div className={"flex-col floatOnTop"} style={{color:this.props.webStyle.lightShade,left:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faTrashAlt} onClick = {()=>{this.props.callbacks.deleteLink(this.props.index)}}/>
              </div>
            </div>}

            {mode != "edit" && this.props.children}

            {mode == "edit" && 
              <div className="flex-col">
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

              {mode == "edit" && <div>
              <div className={"flex-col floatOnTop"} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={ faCheck} onClick = {this.editLink.bind(this)}/>
              </div>
            </div>}

            {mode == "add/move" && <div>
              <div className={"flex-col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"0px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faAngleDoubleRight} onClick = {()=>{this.props.callbacks.moveLinkRight(this.props.index)}}/>
              </div>
              <div className={"flex-col floatOnTop "+buttonClass} style={{color:this.props.webStyle.lightShade,right:"25px", justifyContent:"center"}}>
                <FontAwesomeIcon className="icon-link" icon={faPlus} onClick = {()=>{this.props.callbacks.addLinkAtIndex(this.props.index+1)}}/>
              </div>
            </div>}
          </div>
        </div>
    )
  };
}
