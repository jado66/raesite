import Navbar from "../components/navbar"

export default function AdvertisingPage(props) {
    return (
      <div style = {{width:"100%", margin:"auto", backgroundColor:"white"}}>
      <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>

        <div style = {{width:"60%", margin:"auto",paddingTop:"20px"}}>
          <h2 style={{marginTop:"0"}}>Advertising</h2>
          <div style = {{height:"300px", width:"100%", margin:"auto", marginBottom:"40px", backgroundColor:"cyan", border:"3px solid black"}}></div>
          <h3>Partner with LaRae</h3>
          <p style = {{width:"58%", margin:"auto",textAlign:"left", padding:"10px"}}>Please fill out the form below or email me at larae.day.lifebylarae@gmail.com if you are interested in collaborating, advertising, sponsoring, or featuring your services or products on my social media platforms or blog. My media kit is available upon request.</p>
        
          <div className={"col"} style =  {{width:"60%", margin:"auto",paddingTop:"20px",paddingBottom:"50px"}}>
            <input style = {{paddingLeft:"5px"}} placeholder={"Name *"}></input>
            <input style = {{paddingLeft:"5px"}} placeholder={"Email *"}></input>
            <input style = {{paddingLeft:"5px"}} placeholder={"Subject"}></input>
            <textarea placeholder={"Messege"} style =  {{paddingLeft:"5px", height:"150px",paddingTop:"6px",paddingBottom:"50px"}}></textarea>
            <input type="button" value="Send" style = {{width:"20%"}}></input>
          </div>
        </div>
      </div>
    )
   
  }