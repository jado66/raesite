import Caption from "./caption"
import PictureFrame from "./pictureFrame"

export default function CaptionedPicture(props){
    const pictureFrameID = `${props.id}-rightPictureFrame`
    const captionID = `${props.id}-caption`
    return(
        <div className = {"row"} style = {{paddingTop:"40px", paddingBottom:"40px",justifyContent:"center",flex: 1,width:"100%"}}>
            <div className = {"col"} style={{width:"100%"}}>
            <PictureFrame webStyle = {props.webStyle} key = {pictureFrameID} id = {pictureFrameID}/>
            <Caption webStyle = {props.webStyle} key = {captionID} id = {captionID}/>
            </div>
        </div>

    )
}