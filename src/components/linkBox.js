// export default function LinkBox(props) {
//     return (
//       <div className={"link-box boxShadow"}>
//           <h2 contentEditable>{props.title}</h2>
//           <h3 contentEditable>{props.subtitle}</h3>
//           <a href = {props.link}>{props.linkText}</a>
//       </div>
//     )
//   }

import React from 'react'

import ContentEditable from 'react-contenteditable'

export default class LinkBox extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable1 = React.createRef();
    this.contentEditable2 = React.createRef();

    this.state = {h2: `<h2>Title</h2>`,
                  h3: `<h3>Subtitle</h3>`};
    
  };

  handleChangeH2 = evt => {
    this.setState({h2: evt.target.value});
    localStorage.setItem(this.props.id+'-h2',evt.target.value);
    // alert(`${this.props.id+'-h2'},${evt.target.value}`)
  };

  handleChangeH3 = evt => {
    this.setState({h3: evt.target.value});
    localStorage.setItem(this.props.id+'-h3',evt.target.value);
  };

  componentDidMount(){
    const storedH2 = localStorage.getItem(this.props.id+'-h2');
    const storedH3 = localStorage.getItem(this.props.id+'-h3');
    
    if (storedH2){
      this.setState({h2: storedH2})
    }
    else{
      this.setState({h2: `<h2>Title</h2>`})
    }
    
    if (storedH3){
      this.setState({h3: storedH3})
    }
    else{
      this.setState({h3: `<h3>Subtitle</h3>`})
    }
  }

  render = () => {

    return(
      <div className={"link-box boxShadow"}>
            <ContentEditable
                    innerRef={this.contentEditable1}
                    html={this.state.h2} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChangeH2} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
            <ContentEditable
                    innerRef={this.contentEditable2}
                    html={this.state.h3} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChangeH3} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
            
            <a href = {this.props.link}>{this.props.linkText}</a>
            </div>)
  };
};