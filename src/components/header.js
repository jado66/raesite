// import React, { useEffect, useState } from 'react';
// import ContentEditable from 'react-contenteditable'

// export default function Header(props){
//     const [headerValue, setHeaderValue] = useState("Life By LaRae")
//     var inputProps = {}

//     useEffect( () => {
//         // Anything in here is fired on component mount.
//         // var myStorage = window.localStorage;
//         const storedHeader = localStorage.getItem(props.id+'-header');
//         alert(props.id+": "+storedHeader)
//      }, []);

//     if (props.userIsAdmin && ! props.viewAsNormalUser){
//         inputProps.contentEditable = "true"
//     }
    
//     return(
//     <div {...inputProps}  className="title" style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:props.webStyle.lightAccent}}>
//         ID:{props.id}<h1 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h1>
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

  handleChange = evt => {
    this.setState({html: evt.target.value});
    localStorage.setItem(this.props.id+'-header',evt.target.value);
  };

  componentDidMount(){
    const storedHeader = localStorage.getItem(this.props.id+'-header');

    if (storedHeader){
        this.setState({html: storedHeader})
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

//<h1 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h1>