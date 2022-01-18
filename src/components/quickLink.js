import EditableLink from "./editableLink";

export default function QuickLink(props){
  return <div style={{position:"relative",width:"50%",margin:"auto", border:`2px solid ${props.webStyle.darkShade}`,
  backgroundColor:props.webStyle.lightShade, padding:"5px 0px", margin:"5px auto", borderRadius:"10px"}}>
    <EditableLink webStyle = {props.webStyle} id = {props.id} adminProps = {props.adminProps} />

  </div>
} 