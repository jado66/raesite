import React, { Component } from "react";

export default class ViewPostPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { 
          blogObject: {
            title: "",
            date: "",
            body: "",
            caption: "" 
          },
          blogID: this.props.match.params.id
        };
      }
    

      componentDidMount() {
        this.getBlogObject()
      }

      getBlogObject() {
        fetch(`http://localhost:9000/retrieveBlogPost?blogID=${this.state.blogID}`)
          .then(res => res.json())  
          .then(res => {
              this.setState({ blogObject: JSON.parse(res)})
            //   alert(res)
            })
            .catch(error => {
              alert(error)
          });
    }
     
    render() {
        return (
            <div style = {{width:"100%", margin:"auto",paddingBottom:"60px"}}>
        
        <form id = {"newBlogForm"} className = {"col"} style={{width:"60%",backgroundColor:"white",margin:"auto",borderRadius:"15px"}}>
          <div style={{margin:"auto"}}>
          <div className = {"row"}>
          <input className = {"newPostInput"} name = "title" type={"text"} readOnly style={{width:"65%",paddingTop:"60px",paddingBottom:"40px",paddingLeft:"10px", border:"none",fontSize:"xx-large"}} 
            value ={this.state.blogObject.title}
            /> 

          <input className = {"newPostInput"} name = "date" type={"text"} readOnly style={{width:"30%",margin:"auto",marginBottom:"40px", border:"none",fontSize:"xx-large"}}
            value ={this.state.blogObject.date}
            /> 

          </div>
          
          <textarea className = {"newPostInput"} name={"postBody"} readOnly style={{width:"100%",height:"500px", padding:"10px", border:"none",fontSize:"x-large"}}
            value = {this.state.blogObject.body}> </textarea>
          <br/>
          
          </div>
        </form>
      </div>
            );
    }
}
