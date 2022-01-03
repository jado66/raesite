import CardPaymentBlock from '../components/cardPaymentBlock';
import Navbar from '../components/navbar';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function CoachingPage(props) {


    
    return(
    <div>
        <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>
        <h2>Want to trade me money for knowledge?</h2>
        <CardPaymentBlock/>
      
    </div>
    );
  }

