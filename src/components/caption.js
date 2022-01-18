import React from 'react'
import ContentEditable from 'react-contenteditable'

export default class Caption extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();

    this.state = {p: `<p>Caption text goes here</p>`};
    
  };

  handleChange = evt => {
    this.setState({p: evt.target.value});
    localStorage.setItem(this.props.id,evt.target.value);
  };

  componentDidMount(){
    const storedValue = localStorage.getItem(this.props.id);
    
    if (storedValue){
      this.setState({p: storedValue})
    }
    else{
      this.setState({p: `<p>Caption text goes here</p>`})
    }
    
  }

  render = () => {

    return(
        <div className={"link-box boxShadow"}>
            <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.p} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName='header' // Use a custom HTML tag (uses a div by default)
                />
        </div>)
  };
};