import React from 'react'
import { useState,useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

export default function ListItemEditable(props){
    const [innerHtml,setInnerHtml] = useState("-")
    const contentEditable = React.createRef()

    useEffect(() => {
        const storedListItem = localStorage.getItem(props.id+'-list');
        
        if (storedListItem){
            setInnerHtml(storedListItem)
        }

      }, []);

    const changeInnerHTML = (value) =>{
        setInnerHtml(value)
        localStorage.setItem(props.id+'-list',value);
    }

    return(
        <ContentEditable
            className={props.className}
            spellCheck = "false"
            innerRef={contentEditable}
            html={innerHtml} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={(evt)=>{changeInnerHTML(evt.target.value)}} // handle innerHTML change
            tagName='li'/>
    )
}