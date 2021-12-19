import {
  Link
} from "react-router-dom";

export default function AdminPage(props) {
  
  const routeChange = () => {
    window.location.href = '/new-post';
  }

  return(
      <div>
        <h2>Hi LaRae! Welcome to your site!</h2>
        
        
        <div>
          <input type = {"button"} value = {"Create New Blog Post"} onClick = {routeChange}/>
          <input type = {"button"} value = {"Send New Email"}/>
          <input type = {"button"} value = {"Edit Website Styles"} onClick = {props.showWebsiteStyleEditor}/>

          <Link to = "/" onClick = {props.viewAsNormalUserCallback}>View Site As Non-Admin</Link>

          <div className={"flex-row"}>
            <div className={"flex-col width-50"}>
              <h3>IG Analytics</h3>
            </div>
            <div className={"flex-col width-50"}>
              <h3>Discovery Call Schedule</h3>
            </div>

          </div>
        </div>
      </div>
    ) 
  }