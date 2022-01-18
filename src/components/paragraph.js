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

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {html: `<p>Here is a paragraph...</p>`};
    
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.webStyle.lightAccent !== this.props.webStyle.lightAccent) {
  //     alert("background color change")
  //   }
  // }
  

  handleChange = evt => {
    this.setState({html: evt.target.value});
    localStorage.setItem(this.props.id,evt.target.value);
  };

  componentDidMount(){
    const storedText = localStorage.getItem(this.props.id);

    if (storedText){
        this.setState({html: storedText})
    }
    // Set header to page name on new render
    
    else if (this.props.index === 0){
      this.setState({html: `<p>${this.props.pageName}</p>`})
    }
  }

  render = () => {

    return(
      <div className='px-4 font-shrink'>
            <ContentEditable
              
                    spellCheck = "false"
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='p'
                    />
                    </div>
            )
  };
};

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>