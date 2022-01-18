import InstagramFeed  from 'react-ig-feed'
import 'react-ig-feed/dist/index.css'
import Navbar from '../components/navbar'

export default function ModelingPage(props) {
    return(
      <div>
        <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>
        <InstagramFeed token="IGQVJWUnR4bFkxSW9ZAdHMwX294bVZArMEdfcWtvVmtadTgyVHRXMzRlZAHBnVzZATRVRCemo3dlZAFWk5GdGlqY05BanlNXzVWWTRaZA2xMVmRTRnNvWWZAHMkNwOHhpSTlTRWIxQW9pUUtDRU5hY3dZAOUNhaAZDZD"  counter="6"/>
        <h2>Ooh La La I'm So Sexy - Pay To Take Pictures Of Me </h2>
        <div className={"col"} style =  {{width:"60%", margin:"auto",paddingTop:"10px",paddingBottom:"50px"}}>
            <input style = {{paddingLeft:"5px"}} placeholder={"Name *"}></input>
            <input style = {{paddingLeft:"5px"}} placeholder={"Email *"}></input>
            <input style = {{paddingLeft:"5px"}} placeholder={"Subject"}></input>
            <textarea placeholder={"Messege"} style =  {{paddingLeft:"5px", height:"150px",paddingTop:"6px",paddingBottom:"50px"}}></textarea>
            <input type="button" value="Send" style = {{width:"20%"}}></input>
        </div>
      </div>
    ) 
  }