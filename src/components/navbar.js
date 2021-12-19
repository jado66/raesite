import React from "react";
import {
  Link
} from "react-router-dom";



export default function Navbar(props){
    return(
            
        
            <div style={{backgroundColor:props.webStyle.darkShade,position: "sticky",top: 0, alignSelf: "flex-start",width:"100%"}} >
            <div className="topnav " style={{margin:"auto", display:"flex",justifyContent:"space-around"}}>
                <Link to="/" style={{color:props.webStyle.lightShade}}>{props.webStyle.homePageName}</Link>
                <Link to="/blog" style={{color:props.webStyle.lightShade}}>{props.webStyle.blogPageName}</Link>            
                <Link to="/advertising" style={{color:props.webStyle.lightShade}}>{props.webStyle.servicesPageName}</Link>         
                <Link to="/modeling" style={{color:props.webStyle.lightShade}}>{props.webStyle.portfolioPageName}</Link>            
                <Link to="/coaching" style={{color:props.webStyle.lightShade}}>{props.webStyle.shopPageName}</Link>           
                <Link to="/about" style={{color:props.webStyle.lightShade}}>{props.webStyle.aboutPageName}</Link>
                <Link to="/test" style={{color:props.webStyle.lightShade}}>Test</Link>
                {/* {props.userIsAdmin && ! props.viewAsNormalUser && */}
                    <Link to="/admin" style={{color:props.webStyle.lightShade}}>Manage</Link>
                {/* } */}
            </div>
            </div>        
    )
}