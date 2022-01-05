// import React, { useEffect, useState } from 'react';
// import ContentEditable from 'react-contenteditable'

// export default function Header(props){
//     const [headerValue, setHeaderValue] = useState("Life By LaRae")
//     var inputProps = {}

//     useEffect( () => {
//         // Anything in here is fired on component mount.
//         // var myStorage = window.localStorage;
//         const storedHeader = localStorage.getItem(props.id);
//         alert(props.id+": "+storedHeader)
//      }, []);

//     if (props.userIsAdmin && ! props.viewAsNormalUser){
//         inputProps.contentEditable = "true"
//     }
    
//     return(
//     <div {...inputProps}  className="title" style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:props.webStyle.lightAccent}}>
//         ID:{props.id}<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>
//     </div>)
// }

import React from 'react'

import ContentEditable from 'react-contenteditable'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {html: `<h1>Header</h1>`};
    
  };

  componentDidUpdate(prevProps) {
    if (prevProps.webStyle.lightAccent !== this.props.webStyle.lightAccent) {
      alert("background color change")
    }
  }
  

  handleChange = evt => {
    this.setState({html: evt.target.value});
    localStorage.setItem(this.props.id,evt.target.value);
  };

  componentDidMount(){
    const storedHeader = localStorage.getItem(this.props.id);

    if (storedHeader){
        this.setState({html: storedHeader})
    }
    // Set header to page name on new render
    
    else if (this.props.index === 0){
      this.setState({html: `<h1>${this.props.pageName}</h1>`})
    }
  }

  render = () => {

    return(
            <div className="title" style = {{width:`${this.props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:this.props.webStyle.lightAccent}}>
            <ContentEditable
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
            </div>)
  };
};

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>