import DynamicPage from '../components/dynamicPage';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function DynamicTestPage(props) {


    const adminProps = {
        componentOptions: ["Navbar","Header","Mosaic"],
        // webStyle: props.webStyle,
        pageType: "home",
        userIsAdmin: props.userIsAdmin,
        viewAsNormalUser: props.viewAsNormalUser,
        defaultComponentList: ["Header","Navbar","Mosaic","Header","Mosaic"]
    }
    
    return  <DynamicPage {...adminProps, props.webStyle} />

  }

