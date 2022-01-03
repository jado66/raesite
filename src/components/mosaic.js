import LinkBox from "./linkBox"
import PictureFrame from "./pictureFrame"

export default function Mosaic(props){
    const rightLinkBoxID = `${props.id}-rightLinkBox`
    const rightPictureFrameID = `${props.id}-rightPictureFrame`
    const leftLinkBoxID = `${props.id}-leftLinkBox`
    const leftPictureFrameID = `${props.id}-leftPictureFrame`


    return(
        <div className = {"flex-row"} style = {{paddingTop:"40px", paddingBottom:"40px"}}>
            <div className = {"flex-col width-50"}>
                {/* <Image className={"boxShadow"} imgTitle = {"Headshot"} style = {{ width:"90%", margin:"auto", marginBottom:"40px", backgroundColor:props.webStyle.mainBrandColor}}/> */}
                {/* <div className={"boxShadow"} style = {{ width:"90%", margin:"auto", marginBottom:"40px", backgroundColor:props.webStyle.mainBrandColor,height:"400px"}}  > </div> */}
                <PictureFrame webStyle = {props.webStyle} key = {leftPictureFrameID} id = {leftPictureFrameID}/>
                <LinkBox title = {"Hey!"} subtitle = {"I'm LaRae"} linkText = {"Read More"} link = {"/about"} key = {leftLinkBoxID} id = {leftLinkBoxID}/>
            </div>
            <div className = {"flex-col width-50"}>
                <LinkBox title = {"Coaching & Consulting"} subtitle = {"with LaRae"} linkText = {"Read More"} link = {"/coaching"} key = {rightLinkBoxID} id = {rightLinkBoxID}/>
                {/* <div className={"boxShadow"} style = {{ width:"90%", margin:"auto", marginTop:"40px", backgroundColor:props.webStyle.mainBrandColor,height:"400px"}}  > </div> */}
                <PictureFrame webStyle = {props.webStyle} key = {rightPictureFrameID} id = {rightPictureFrameID}/>

                {/* <Image imgTitle = {"Headshot"} style = {{ width:"90%", margin:"auto", marginTop:"40px", backgroundColor:props.webStyle.mainBrandColor}}/> */}
            </div>
      </div>

    )
}