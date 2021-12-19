import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import SplitForm from '../components/cardSplitForm';
import Navbar from '../components/navbar';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function CoachingPage(props) {

    const stripePromise = loadStripe('pk_test_51K2plRHzipHsLV0D1UzXDYJ1ml2qypA56f726zReCXnAaCiDXHWPGJh5b9R62uIojhmxjmVI6qiAsvAhPRQVMPns00DoK1ufI2');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };
    
    return(
    <div>
        <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>
        <h2>Want to trade me money for knowledge?</h2>
        <Elements stripe={stripePromise} >
            <SplitForm price = "$350.00"/>
        </Elements>

    </div>
    );
  }

