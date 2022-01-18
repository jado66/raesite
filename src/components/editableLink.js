import React from 'react'

import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faPencilAlt,  faCheck} from '@fortawesome/free-solid-svg-icons'

export default class EditableLink extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {
                  mode:"link",
                  linkText: `New Link`,
                  tempLinkText:"New Link",
                  href:"",
                  tempHref:"",
                  showButtons:false};
    this.contentEditable = React.createRef();

  };  

  handleLinkHTMLChange = evt => {
    this.setState({tempLinkText: evt.target.value});
  };
  handleLinkHrefChange = evt => {
    this.setState({tempHref: evt.target.value});
  };

  saveLinkEdits = () =>{
    this.setState(prevState =>{
        
      let newLinkText = prevState.tempLinkText
      let newHref = prevState.tempHref

      if (newLinkText === ""){
        newLinkText = prevState.linkText
      }

      if (newHref === ""){
        newHref = prevState.href
      }

      localStorage.setItem(this.props.id+"-linkText",newLinkText);
      localStorage.setItem(this.props.id+"-href",newHref);

      return{
          href:newHref,
          linkText : newLinkText, //this retrieves the string inside > <
          mode:"link"
      }
     })
  }

  changeToEditMode(){
    this.setState(prevState =>{
        return{
            tempHref:prevState.href,
            html : prevState.linkText,
            mode:"edit"
        }
     })
  }

  componentDidMount(){
    const storedLinkText = localStorage.getItem(this.props.id+"-linkText");
    const storedLinkHref = localStorage.getItem(this.props.id+"-href");

    if (storedLinkText){
        this.setState({linkText: storedLinkText,mode:"link"})
    }

    if (storedLinkHref){
        this.setState({href: storedLinkHref,mode:"link"})
    }
  }

  setButtonsVisibility(showButtons){
    //   alert(showButtons)
      this.setState({showButtons:showButtons})
  }

  render = () => {

    return(
        <div onMouseEnter={() => {this.setButtonsVisibility(true)}} onMouseLeave={() => {this.setButtonsVisibility(false)}}>
            {this.state.mode == "edit" ?
            <div className='relative-div'>
                <div className={"col relative-r"} style={{color:this.props.webStyle.darkShade}}>
                    <FontAwesomeIcon className="icon-link" icon={ faCheck} onClick = {this.saveLinkEdits}/>
                </div>
                <div className="row">
                  <div className='col-5'>
                    <div class="input-group ">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Text:</span>
                      </div>
                      <input type="text" class="form-control" onChange={this.handleLinkHTMLChange} value={this.state.tempLinkText}/>
                    </div>
                  </div>
                  <div className='col-5'>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">href:</span>
                      </div>
                      <input type="text" class="form-control" onChange={this.handleLinkHrefChange} value={this.state.tempHref}/>
                    </div>
                  </div>
                </div>
              
                
            </div>
            :
            <div className='relative-div' >
                {this.state.showButtons && <div className={"col floatOnTopNoHeight"} style={{color:this.props.webStyle.darkShade, right:"0", justifyContent:"center",height:""}}>
                    <FontAwesomeIcon className="icon-link" icon={ faPencilAlt} onClick = {this.changeToEditMode.bind(this)}/>
                </div>}
                <a style={{color:this.props.webStyle.darkShade}} href={this.state.href}>{this.state.linkText}</a>
            </div>
            }
        </div>)
  };
};

