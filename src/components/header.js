import React from 'react'
import ContentEditable from 'react-contenteditable'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {htmlHeader1: `Header`};
    
    
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
            // <div className="title" style = {{width:`${this.props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:this.props.webStyle.lightAccent}}>
            <div className="mb-5 ps-3 text-center " >

            <ContentEditable
                    className='apply-font-primary'
                    style={{color:this.props.webStyle.darkShade}}
                    spellCheck = "false"
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='h1' // Use a custom HTML tag (uses a div by default)
                    />
            </div>
            )
  };
};

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>