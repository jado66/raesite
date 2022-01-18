import React from "react";
import { useEffect, useState, useRef } from "react";
import { compress, decompress } from "lz-string"
import PictureFrame from "./pictureFrame";

export default class SlideShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pictureIndex: 0,
            pictureCount: 6
        }
      }

    // Similar to componentDidMount and componentDidUpdate:
    componentDidMount(){

        // Update the document title using the browser API
    }

    nextSlide(direction){
        if(direction < 0 && this.state.pictureIndex > 0){
            this.setState(prevState => ({pictureIndex: prevState.pictureIndex-1}))
         }
        if(direction > 0 && this.state.pictureIndex < this.state.pictureCount-1){
            this.setState(prevState => ({pictureIndex: prevState.pictureIndex+1}))
         }
    }

    addSlide(){
        
    }

    render(){   
        const numbertext = {color: "white", fontSize: "large", padding: "8px 12px", position: "absolute",
                            top: 25, left:15, zIndex:1,fontWeight: "bold"} 
        const arrow = {cursor: "pointer", position: "absolute", top: "50%", width: "auto", padding: "16px", marginTop: "-35px", 
                       color: "white", fontWeight: "bold", fontSize: "x-large", borderRadius: "0 3px 3px 0", userSelect: "none", zIndex:1}
            
        return(
            <div className="g-0 mb-5">
                {this.state.pictureIndex >0 && 
                    <a style={{...arrow,left:15}} onClick = {()=>{this.nextSlide(-1)}}>&#10094;</a>}
                {this.state.pictureIndex < this.state.pictureCount - 1 && 
                    <a style={{...arrow,right:15}} onClick = {()=>{this.nextSlide(1)}}>&#10095;</a>}
                {this.state.pictureIndex == this.state.pictureCount - 1 && 
                    <a style={{...arrow,right:15}} onClick = {()=>{this.nextSlide(1)}}>&#x002B;</a>}
                <div className="numberText" style={numbertext}>{this.state.pictureIndex+1} / {this.state.pictureCount}</div>
                <PictureFrame webStyle = {this.props.webStyle} key = {`${this.props.id}-P${this.state.pictureIndex}`} id = {`${this.props.id}-P${this.state.pictureIndex}`}
                              adminProps = {this.adminProps}/> 
            </div>
        )
    }
}