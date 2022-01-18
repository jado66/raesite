import React, { useEffect, useRef, useState } from 'react'

import ContentEditable from 'react-contenteditable'

export default class DynamicForm extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditableTitle = React.createRef();
    this.contentEditableSubtitle = React.createRef();
    this.contentEditables = [React.createRef(),React.createRef()];

    this.state = {title: `Title`,
                  subtitle: `Subtitle`,
                  inputCount: 2};
    
  };

  handleTitleChange = (evt) => {
    this.setState({title: evt.target.value});
    localStorage.setItem(this.props.id+'-title',evt.target.value);
  };
  handleSubtitleChange = (evt) => {
    this.setState({subtitle: evt.target.value});
    localStorage.setItem(this.props.id+'-subtitle',evt.target.value);
  };

  addInputForm(){
    this.setState({inputCount:this.state.inputCount+1}, function(){
      localStorage.setItem(this.props.id+'-labelCount',this.state.inputCount);
    })

  }

  componentDidMount(){
    const storedTitle = localStorage.getItem(this.props.id+'-title');
    const storedSubtitle = localStorage.getItem(this.props.id+'-subtitle');
    const storedLabelCount = localStorage.getItem(this.props.id+'-labelCount');


    if (storedTitle){
      this.setState({title: storedTitle})
    }
    
    if (storedSubtitle){
      this.setState({subtitle: storedSubtitle})
    }

    if (storedLabelCount){
      this.setState({inputCount:parseInt(storedLabelCount)})
    }
    
  }

  render = () => {

    return(
      <div className={"link-box boxShadow mb-5 p-5"} style={{backgroundColor:this.props.webStyle.lightShade}}>
            
            <ContentEditable
                    className='apply-font-primary'
                    style={{color:this.props.webStyle.darkShade}}
                    innerRef={this.contentEditableTitle}
                    html={this.state.title} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleTitleChange} // handle innerHTML change
                    tagName='h1' // Use a custom HTML tag (uses a div by default)
                    />
            <ContentEditable
                    className='apply-font-secondary'
                    style={{color:this.props.webStyle.darkShade}}
                    innerRef={this.contentEditableSubtitle}
                    html={this.state.subtitle} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleSubtitleChange} // handle innerHTML change
                    tagName='h4' // Use a custom HTML tag (uses a div by default)
                    />
            
            <form className='py-3'>
              {[...Array(this.state.inputCount)].map((x, i) =>
                 <EditableFormInput key ={`${this.props.id}-${i}`} id = {`${this.props.id}-${i}`}/>
              )}
             
              {/* <EditableFormInput/>
              <EditableFormInput/> */}
              <div className = "mb-3">
                <button type="button"  className = "form-label btn" onClick={this.addInputForm.bind(this)} >+</button>
              </div>
              <button type="submit" className = "btn " style={{color:this.props.webStyle.lightShade,backgroundColor:this.props.webStyle.darkAccent}}>Submit</button>
            </form>
            
            </div>)
  };
};


function EditableFormInput(props){
  const [label, setLabel] = useState("Input Label")

  const contentEditable = useRef();

  useEffect(() => {
    const storedLabel = localStorage.getItem(props.id+'-label');
    
    if (storedLabel){
      setLabel(storedLabel)
    }
  }, []);

  const handleLabelChange = (value) => {
    setLabel(value);
    localStorage.setItem(props.id+'-label',value);
  };

  return(
    <div className = "mb-3">
      <ContentEditable
        className="form-label"
        spellCheck = "false"
        innerRef={contentEditable}
        html={label} // innerHTML of the editable div
        disabled={false}       // use true to disable editing
        onChange={(evt)=>{handleLabelChange(evt.target.value)}} // handle innerHTML change
        tagName='label' // Use a custom HTML tag (uses a div by default)
        />
      <input type="input" className = "form-control"/>
      {/* <div id="emailHelp" className = "form-text">We'll never share your email with anyone else.</div> */}
    </div>
  )
}