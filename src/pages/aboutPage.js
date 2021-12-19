import MailchimpFormContainer from "../components/mailchimpFormContainer";
import Navbar from "../components/navbar";

export default function About(props) {
    return (
      <div>
        <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>
        <h2>About Me</h2>
        <image scr="https://picsum.photos/200/300"></image>
        <MailchimpFormContainer/>

        {/* <Calend
        // onEventClick={onEventClick}
        // onNewEventClick={onNewEventClick}
        // events={[]}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        // initialView={CALENDAR_VIEW.WEEK}
        // disabledViews={[CALENDAR_VIEW.DAY]}
        // onSelectView={onSelectView}
        // selectedView={selectedView}
        // onPageChange={onPageChange}
      /> */}
      </div>
    
      );
  
  }