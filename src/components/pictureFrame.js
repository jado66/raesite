import React from "react";
import { useEffect, useState } from "react";

export default function PictureFrame(props){
    const [image, setImage] = useState("")
    const [areButtonsVisible, setButtonsVisible] = useState(null)

    return(
        <div onMouseEnter={()=>{setButtonsVisible(true)}} onMouseLeave={()=>{setButtonsVisible(false)}}>
            <div className={"boxShadow imageCard"} style = {{ position: "relative",width:"90%", margin:"auto", marginBottom:"20px",marginTop:"20px", backgroundColor:props.webStyle.darkShade,height:"400px"}}  > 
            {image && 
                <img src={URL.createObjectURL(image)}/>
            }
            {
                areButtonsVisible &&
                <div style={{ position: "absolute",top: "0", left: "0",display:"flex",flexDirection:"row"}}>
                    <div style={{flexDirection:"row",justifyContent:'center',width:"100%",marginBottom:"10px",alignSelf:"flex-end"}}> 
                        {!image ?
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                console.log(event.target.files[0]);
                                setImage(event.target.files[0]);
                                }}
                            />
                            :
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                console.log(event.target.files[0]);
                                setImage(event.target.files[0]);
                                }}
                            />
                        }
                        {image &&
                            <button onClick={()=>setImage(null)}>Remove Picture</button>
                        }
                    </div>
                </div>
            }
            </div> 
        </div>
    )
}