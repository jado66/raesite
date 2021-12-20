import LinkBox from "./linkBox"
import PictureFrame from "./pictureFrame"

export default function Mosaic(props){
    return(
        <div className = {"flex-row"} style = {{paddingTop:"80px", paddingBottom:"40px"}}>
            <div className = {"flex-col width-50"}>
                {/* <Image className={"boxShadow"} imgTitle = {"Headshot"} style = {{ width:"90%", margin:"auto", marginBottom:"40px", backgroundColor:props.webStyle.mainBrandColor}}/> */}
                {/* <div className={"boxShadow"} style = {{ width:"90%", margin:"auto", marginBottom:"40px", backgroundColor:props.webStyle.mainBrandColor,height:"400px"}}  > </div> */}
                <PictureFrame webStyle = {props.webStyle}/>
                <LinkBox title = {"Hey!"} subtitle = {"I'm LaRae"} linkText = {"Read More"} link = {"/about"}/>
            </div>
            <div className = {"flex-col width-50"}>
                <LinkBox title = {"Coaching & Consulting"} subtitle = {"with LaRae"} linkText = {"Read More"} link = {"/coaching"}/>
                {/* <div className={"boxShadow"} style = {{ width:"90%", margin:"auto", marginTop:"40px", backgroundColor:props.webStyle.mainBrandColor,height:"400px"}}  > </div> */}
                <PictureFrame webStyle = {props.webStyle}/>

                {/* <Image imgTitle = {"Headshot"} style = {{ width:"90%", margin:"auto", marginTop:"40px", backgroundColor:props.webStyle.mainBrandColor}}/> */}
            </div>
      </div>

    )
}