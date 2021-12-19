import React, { useState, useEffect } from "react";
import QuillEditor from "../components/quillComponent";

export default function CreatePostPage(props) {
  const [postDate, setPostDate] = useState(new Date().toISOString().substr(0,10));
  const [postTitle,setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")

  useEffect(() => {
    
    if (props.match) {
      getBlogObject();
    }
  }, [])

  const getBlogObject = () => {
    fetch(`http://localhost:9000/retrieveBlogPost?blogID=${props.match.params.id}`)
      .then(res => res.json())  
      .then(res => {
          let blogObject = JSON.parse(res)
          setPostBody(blogObject.body)
          setPostDate(blogObject.date)
          setPostTitle(blogObject.title)

        })
        .catch(error => {
          alert(error)
      });
    }

  const saveExistingPost = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({postDate:postDate,postTitle:postTitle,postBody:postBody, blogID:props.match.params.id})
    };
    fetch('http://localhost:9000/saveBlogPost', requestOptions)
        .then(res => res.text())
        .then(res => {
          alert(res)
          props.updateBlogCount()
          window.location.href = '../'
        })
        // .then(async response => {
        //     alert(JSON.stringify(response))
        // })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            alert(error)
        });
  }

  const createNewPost = () => {
    // props.updateBlogPost()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({postDate:postDate,postTitle:postTitle,postBody:postBody})
    };
    fetch('http://localhost:9000/createBlogPost', requestOptions)
        .then(res => res.text())
        .then(res => {
          alert(res)
          props.updateBlogCount()
          window.location.href = '../'
        })
        // .then(async response => {
        //     alert(JSON.stringify(response))
        // })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            alert(error)
        });


    // alert("New post added")
  };  


  return(
      <div style = {{backgroundColor:props.webStyle.mainBrandColor}}>
        <div className={"boxShadowSides"} style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",paddingBottom:"60px",backgroundColor:props.webStyle.lightShade}}>

        <h2 style={{marginTop:"0",paddingTop:"20px"}}>This is how your blog post will look to viewers:</h2>
        
        <QuillEditor  webStyle = {props.webStyle}/>
        
        </div>
       

      </div>
    ) 
  }