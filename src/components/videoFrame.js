import React from "react";
import { useEffect, useState } from "react";
import { compress, decompress } from "lz-string"

export default function VideoFrame(props){
    const [linkInput, setLinkInput] = useState("")
    const [videoSource, setVideoSource] = useState("")
    const [areButtonsVisible, setButtonsVisible] = useState(false)


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        // Update the document title using the browser API
        const storedVideoSource = localStorage.getItem(props.id);
        
        if (storedVideoSource){
            setVideoSource(storedVideoSource)
            // alert("video source")
        }
        else{
          setVideoSource("")
        }
    
    }, []);

    const addVideo = () =>{
        setVideoSource(linkInput);
        localStorage.setItem(props.id,linkInput);
        setLinkInput("")


    }

    const removeVideo = () => {
        setVideoSource("")
        localStorage.removeItem(props.id);
    }

    

    return(
        <div className="row" style = {{marginBottom:"40px"}} onMouseEnter={()=>{setButtonsVisible(true)}} onMouseLeave={()=>{setButtonsVisible(false)}}>
            <div  style = {{ position: "relative", margin:"auto", marginBottom:"20px",marginTop:"20px",minHeight:"100px",minWidth:"100px"}}  > 
            {videoSource ? 
                <div className="video-responsive boxShadow">
                    <iframe
                    width="853"
                    height="480"
                    src={videoSource}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; video-in-video"
                    allowFullScreen
                    title="Embedded Video"
                    />
                </div>
                :
                <div className="boxShadow" style={{width:"90%",minHeight:"300px",backgroundColor:props.webStyle.darkShade,margin:"auto"}}></div>
            }
            {
                areButtonsVisible &&
                <div style={{ position: "absolute",top: "0", left: "0",display:"flex",flexDirection:"row"}}>
                    <div style={{flexDirection:"row",justifyContent:'center',width:"100%",marginBottom:"10px",alignSelf:"flex-end"}}> 
                        {!videoSource ?
                            <div className="row">
                                <input type="text" placeholder="Link Goes Here" name="myVideo" value={linkInput} onChange={(e)=>{setLinkInput(e.target.value)}}/>
                                <input type="button" value={"Add Video"} onClick={addVideo}/>
                            </div>
                            :
                            <div className="row">
                                <input type="text" placeholder="Link Goes Here" name="myVideo" value={linkInput} onChange={(e)=>{setLinkInput(e.target.value)}}/>
                                <input type="button" value={"Change Video"} onClick={addVideo}/>
                            </div>
                            
                        }
                        {videoSource &&
                            <button onClick={()=>removeVideo()}>Remove Video</button>
                        }
                    </div>
                </div>
            }
            </div> 
        </div>
    )
}