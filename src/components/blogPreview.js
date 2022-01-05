import BlogBanner from "./blogBanner";
import React, { useState, useEffect, useCallback } from "react";

export default function BlogPreview(props) {
  
    const [blogCount, setBlogCount] = useState(0)

    const getBlogCount = async () => {
        // Get IP address for ADMIN rights
        const response = await fetch('http://localhost:9000/getBlogCount');
        const count = await response.text();
    
        setBlogCount(parseInt(count))
      }

    useEffect(() => {
        // Update the document title using the browser API
        // getIsUserAdmin();
        getBlogCount();
      }, []);

    var blogBanners = [];
    
    for (var i = 0; i < blogCount; i++) {
      if (i % 2 == 0){
        blogBanners.push(<BlogBanner blogID = {i+1} userIsAdmin = {false} viewAsNormalUser = {true} key={i} webStyle={props.webStyle}/>);
      }
      else{
        blogBanners.push(<BlogBanner blogID = {i+1}  userIsAdmin = {false} viewAsNormalUser = {true} reverseBanner = {true} key={i}  webStyle={props.webStyle}/>);
      }
    }
  
    return(
      <div>          
            <div id = "blog" style = {{paddingTop:"40px", marginBottom:"25px"}}>
              {blogBanners}
            </div>
      </div>
    );
  }