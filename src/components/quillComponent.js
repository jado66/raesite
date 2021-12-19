import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class QuillEditor extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
          text: "",
        }
      }
    
      modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    
      render() {
        return (
          <div className="text-editor" style={{backgroundColor:this.props.webStyle.lightShade}}>
            <ReactQuill modules={this.modules}
                        formats={this.formats}
                        style = {{backgroundColor:"white",minHeight:"400px",backgroundColor:this.props.webStyle.lightShade,
                                  border:"0"}}>
                <div className="my-editing-area" style={{width:`${this.props.webStyle.secondCenterWidth}%`,margin:"auto",
                                                         backgroundColor:this.props.webStyle.lightShade,border:"none"}}/>
            </ReactQuill>
          </div>
          
        );
      }
    }