import React from 'react'
import { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import ListItemEditable from './listItemEditable'
import ButtonEditable from './buttonEditable'

export default function ListComparisonTable (props){

    const [packagePlanCount, setPackagePlanCount] = useState(3)

    return(
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <PackagePlan webStyle = {props.webStyle} id = {props.id+"-1"}/>
            <PackagePlan webStyle = {props.webStyle} id = {props.id+"-2"}/>
            <PackagePlan webStyle = {props.webStyle} id = {props.id+"-3"}/>
        </div>
      )
};


function PackagePlan(props){
    const [headerHtml,setHeaderHtml] = useState("Package Name")
    const [priceHtml,setPriceHtml] = useState("$250")
    const contentEditable = [React.createRef(),React.createRef()] // Header, Price, Button


    const handleHeaderChange = (value) => {
        setHeaderHtml(value);
        localStorage.setItem(props.id+"-header",value);
      };

    const handlePriceChange = (value) => {
        setPriceHtml(value);
        localStorage.setItem(props.id+"-price",value);
    };

    useEffect(() => {
        const storedHeader = localStorage.getItem(props.id+'-header');
        const storedPrice = localStorage.getItem(props.id+'-price');    
    
        if (storedHeader){
            setHeaderHtml(storedHeader)
        }
        
        if (storedPrice){
            setPriceHtml(storedPrice)
        }
      }, []);

    return(
        <div className="col">
            <div className="card mb-4 rounded-3 boxShadow" style={{backgroundColor:props.webStyle.darkAccent}}>
            <div className="card-header py-3">
                <ContentEditable
                    style={{color:props.webStyle.lightShade}}
                    className="my-0 fw-normal"
                    spellCheck = "false"
                    innerRef={contentEditable[0]}
                    html={headerHtml} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(evt)=>{handleHeaderChange(evt.target.value)}} // handle innerHTML change
                    tagName='h4'/>
            </div>
            <div className="card-body rounded-bottom" style={{backgroundColor:props.webStyle.lightShade}}>
                {/* <h1 className="card-title pricing-card-title">$250</h1> */}
                <ContentEditable
                    style={{color:props.webStyle.darkShade}}
                    className="card-title pricing-card-title"
                    spellCheck = "false"
                    innerRef={contentEditable[1]}
                    html={priceHtml} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(evt)=>{handlePriceChange(evt.target.value)}} // handle innerHTML change
                    tagName='h1'/>
                <ul className="list-unstyled mt-3 mb-4">
                    
                <ListItemEditable id = {props.id+"listItem"}/>
            
                </ul>
                <ButtonEditable className={"w-100 btn btn-lg "} style = {{backgroundColor:props.webStyle.darkAccent, color: props.webStyle.lightShade}} callback = {()=>{alert("hi")}}/>
               
                {/* <button type="button" className="w-100 btn btn-lg btn-outline-dark">Sign Up</button> */}
            </div>
            </div>
        </div>
    )
}