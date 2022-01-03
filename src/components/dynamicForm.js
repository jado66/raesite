import React from 'react'

import ContentEditable from 'react-contenteditable'

export default class DynamicForm extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditableTitle = React.createRef();
    this.contentEditableSubtitle = React.createRef();
    this.contentEditables = [React.createRef(),React.createRef()];

    this.state = {title: `<h2>Title</h2>`,
                  subtitle: `<h3>Subtitle</h3>`,
                  labels: [`<label>Name</label>`,
                           `<label>Email</label>`]};
    
  };

  handleInputChange = (evt,index) => {
    
    let newLabels = [...this.state.labels]
    newLabels[index] = evt.target.value

    this.setState({labels: newLabels});
  };
  handleTitleChange = (evt) => {
    this.setState({title: evt.target.value});
    localStorage.setItem(this.props.id+'-title',evt.target.value);
  };
  handleSubtitleChange = (evt) => {
    this.setState({subtitle: evt.target.value});
    localStorage.setItem(this.props.id+'-subtitle',evt.target.value);
  };

  componentDidMount(){
    const storedTitle = localStorage.getItem(this.props.id+'-title');
    const storedSubtitle = localStorage.getItem(this.props.id+'-subtitle');
    
    if (storedTitle){
      this.setState({title: storedTitle})
    }
    else{
      this.setState({title: `<h2>Form Title</h2>`})
    }
    
    if (storedSubtitle){
      this.setState({subtitle: storedSubtitle})
    }
    else{
      this.setState({subtitle: `<h3>Form Subtitle</h3>`})
    }
  }

  render = () => {

    let formLabels = this.state.labels.map((labelVal,index) => (
        <ContentEditable
          innerRef={this.contentEditable1}
          html={this.state.labels[index]} // innerHTML of the editable div
          disabled={false}       // use true to disable editing
          onChange={(evt)=>{this.handleInputChange(evt,index)}} // handle innerHTML change
          tagName='header' // Use a custom HTML tag (uses a div by default)
          />
        ))

    let formInputs = this.state.labels.map((labelVal,index) => (
      <input key ={`input-${index}`}/>
      ))

    return(
      <div className={"link-box boxShadow"} style={{marginBottom:"20px",marginTop:"20px",width:"100%"}}>
            
            <ContentEditable
                    innerRef={this.contentEditableTitle}
                    html={this.state.title} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleTitleChange} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
            <ContentEditable
                    innerRef={this.contentEditableSubtitle}
                    html={this.state.subtitle} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleSubtitleChange} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
                    <div className='flex-row' style={{margin:"auto",width:"50%"}}>
                      <div className='flex-col' style={{margin:"auto",width:"50%"}}>
                        {formLabels}
                      </div>
                      <div className='flex-col' style={{margin:"auto",width:"50%"}}>
                        {formInputs}
                      </div>
                    </div>
            
            </div>)
  };
};