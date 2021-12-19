import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';


import BlogBanner from "./components/blogBanner";
import ViewPostPage from "./pages/viewBlogPostPage";
// import Image from "./components/image";
import WebsiteStyleEditor from "./components/styleEditor";
import Navbar from "./components/navbar";

import CoachingPage from "./pages/coachingPage";
import AdvertisingPage from "./pages/advertisingPage";
import CreatePostPage from "./pages/createBlogPostPage";
import AdminPage from "./pages/adminPage";
import AboutPage from "./pages/aboutPage";
import ModelingPage from "./pages/modelingPage"
import Header from "./components/header";
import DynamicPage from "./components/dynamicPage";
import Mosaic from "./components/mosaic";
import Blog from "./pages/blogPage";

function App() {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [viewAsNormalUser, setViewAsNormalUser] = useState(false);
  const [blogCount, setBlogCount] = useState(0)
  const [isShowWebsiteStyleEditor, showWebsiteStyleEditor] = useState(false)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [webStyle,setWebStyle] = useState(
    {
    // Website colors
      lightShade: "#EEF0F3",
      lightAccent: "#53B2A1",
      mainBrandColor: "#805BBD",
      darkAccent: "#3eb489" ,
      darkShade: "#2b2d44",
      // widths
      centerWidth:60,
      secondCenterWidth:90,
      // page names
      homePageName: "Home",
      blogPageName: "Blog",
      servicesPageName: "Advertising",
      portfolioPageName: "Modeling",
      shopPageName: "Coaching",
      aboutPageName: "About"
      }
    )

  useEffect(() => {
    // Update the document title using the browser API
    getIsUserAdmin();
    getBlogCount();
  });

  const updateWebStyle = (state) => {
    setWebStyle({...webStyle,
                 ...state})
    forceUpdate()
    // alert("tests")
  }

  const updateBlogCount = () => {
    getBlogCount();
  }

  const getIsUserAdmin = async () => {
    // Get IP address for ADMIN rights
    // const response = await fetch('https://geolocation-db.com/json/');
    // const data = await response.json();
    // setUserIsAdmin(data.IPv4 === "108.51.21.72")
    setUserIsAdmin(true)
    // alert(data.IPv4 === "108.51.21.72")
  }

  const getBlogCount = async () => {
    // Get IP address for ADMIN rights
    const response = await fetch('http://localhost:9000/getBlogCount');
    const count = await response.text();

    setBlogCount(parseInt(count))
  }


  return (
    <div className="App" style={{backgroundColor:webStyle.lightShade}}>
      
      { isShowWebsiteStyleEditor == true && 
        <WebsiteStyleEditor webStyle = {webStyle} updateWebStyle = {updateWebStyle} closeStyleEditor = {()=>{showWebsiteStyleEditor(false);}}/>
      }

      


      <Router>
          <Switch>
          <Route path="/blog">
              <Blog webStyle = {webStyle}/>
          </Route>
          <Route path="/modeling">
              <ModelingPage webStyle = {webStyle} />
          </Route>
          <Route path="/advertising">
              <AdvertisingPage  webStyle = {webStyle}/>
          </Route>
          <Route path="/coaching">
              <CoachingPage  webStyle = {webStyle}/>
          </Route>
          <Route path="/about">
              <AboutPage  webStyle = {webStyle} />
          </Route>
          <Route path="/admin">
              <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/>
          </Route>
          <Route path="/edit-post/:id" component = {CreatePostPage}/>

          <Route path="/new-post">
              <CreatePostPage updateBlogCount = {updateBlogCount} webStyle = {webStyle}/>
          </Route>
          <Route path="/test">
              <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser}
                            defaultComponentList = { ["Header","Navbar","Mosaic","Header","Mosaic"]}  componentOptions = {["Navbar","Header","Mosaic"]}
                               updateWebStyle = {updateWebStyle} closeStyleEditor = {()=>{showWebsiteStyleEditor(false);}}/>
          </Route>
          <Route path="/blog-post/:id" component = {ViewPostPage}/>
          <Route path="/">
              <Home webStyle = {webStyle} blogCount = {blogCount} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser} />
          </Route>
          
          
        </Switch>
      </Router>
    </div>
  );
}

function Home(props) {
  


  var blogBanners = [];
  
  for (var i = 0; i < props.blogCount; i++) {
    if (i % 2 == 0){
      blogBanners.push(<BlogBanner blogID = {i+1} userIsAdmin = {props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser} key={i} webStyle={props.webStyle}/>);
    }
    else{
      blogBanners.push(<BlogBanner blogID = {i+1}  userIsAdmin = {props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser} reverseBanner = {true} key={i}  webStyle={props.webStyle}/>);
    }
  }

  return(
    
    <div >
        <Header webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>
        <Navbar webStyle = {props.webStyle} userIsAdmin ={props.userIsAdmin} viewAsNormalUser = {props.viewAsNormalUser}/>

      {/* <APITestLink/> */}
      <div style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:props.webStyle.lightAccent}}>
        <div style ={{width:`${props.webStyle.secondCenterWidth}%`, margin:"auto"}}>
          
         
        <Mosaic webStyle = {props.webStyle}/>
         
        
          <div id = "blog" style = {{paddingTop:"40px"}}>
            {blogBanners}
          </div>

        </div>
      </div>
    </div>
  );
}

// function Blog() {
//   return(
//     <div>
//       <h2>Blog</h2>;
//     </div>
//   ) 
// }






// function Coaching() {
//   return <h2>Coaching</h2>;
// }


class APITestLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "Backend not started" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(error => {
            console.log(error)
        });
      
  }

  componentWillMount() {
      this.callAPI();
  }
  
  render(){
    return(    
      <p>{this.state.apiResponse}</p>
      )
  }  subtitle
  
}

function BlogPost(props){
  return (
    <div style={{width:"60%", margin:"auto", paddingTop:"60px", paddingBottom:"80px", textAlign:"left"}}>
      <h2 style = {{textAlign:"center"}}>{props.title}</h2>
      <p style={{textIndent: "1.5em"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Tristique senectus et netus et malesuada fames. Convallis convallis tellus id interdum. Turpis nunc eget lorem dolor sed viverra. Vitae congue eu consequat ac. Vitae elementum curabitur vitae nunc sed. Id diam maecenas ultricies mi eget mauris. Malesuada fames ac turpis egestas maecenas pharetra. Morbi non arcu risus quis varius quam quisque. Cursus in hac habitasse platea dictumst quisque sagittis. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Suspendisse interdum consectetur libero id faucibus nisl. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Pulvinar etiam non quam lacus.</p>

      <p style={{textIndent: "1.5em"}}>Facilisi etiam dignissim diam quis. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Pellentesque habitant morbi tristique senectus et. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Eget aliquet nibh praesent tristique magna sit amet purus. Risus sed vulputate odio ut enim blandit. Facilisi nullam vehicula ipsum a arcu cursus. Morbi tempus iaculis urna id. Amet nulla facilisi morbi tempus iaculis urna. Dolor sit amet consectetur adipiscing elit. At elementum eu facilisis sed odio morbi. Ac orci phasellus egestas tellus rutrum tellus. Diam in arcu cursus euismod. At urna condimentum mattis pellentesque id nibh tortor id. Nec dui nunc mattis enim ut tellus. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.</p>

      <p style={{textIndent: "1.5em"}}>Leo vel orci porta non pulvinar neque laoreet suspendisse. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Ullamcorper sit amet risus nullam eget. Id aliquet lectus proin nibh nisl condimentum id venenatis. In est ante in nibh mauris cursus mattis molestie a. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. In eu mi bibendum neque. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Mauris cursus mattis molestie a iaculis at erat. Scelerisque varius morbi enim nunc faucibus a. Enim tortor at auctor urna nunc id cursus metus aliquam. Nec ullamcorper sit amet risus nullam eget felis eget. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Non enim praesent elementum facilisis leo. Tempor orci dapibus ultrices in iaculis nunc. Posuere ac ut consequat semper viverra nam libero justo. Adipiscing commodo elit at imperdiet dui accumsan sit.</p>

      <p style={{textIndent: "1.5em"}}>Eu non diam phasellus vestibulum lorem sed risus. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Porttitor massa id neque aliquam vestibulum morbi blandit. Tristique et egestas quis ipsum suspendisse ultrices gravida. Accumsan lacus vel facilisis volutpat. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Non arcu risus quis varius. Varius sit amet mattis vulputate enim. Feugiat nisl pretium fusce id velit ut tortor. Duis convallis convallis tellus id interdum. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Porttitor lacus luctus accumsan tortor posuere ac. Volutpat consequat mauris nunc congue nisi vitae suscipit.</p>

      <p style={{textIndent: "1.5em"}}>Faucibus in ornare quam viverra orci sagittis. Libero justo laoreet sit amet cursus sit amet dictum. Id nibh tortor id aliquet lectus proin nibh nisl. Tortor condimentum lacinia quis vel eros donec. Eget egestas purus viverra accumsan in nisl. Sed turpis tincidunt id aliquet risus feugiat in ante. Lorem mollis aliquam ut porttitor leo a. Posuere urna nec tincidunt praesent. Urna id volutpat lacus laoreet non curabitur gravida. Ut morbi tincidunt augue interdum velit. Sit amet nisl suscipit adipiscing. Faucibus nisl tincidunt eget nullam. Massa sapien faucibus et molestie ac. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Habitant morbi tristique senectus et. Risus quis varius quam quisque id diam vel quam elementum. Aliquam sem fringilla ut morbi.</p>
    </div>
  )
}




export default App;
