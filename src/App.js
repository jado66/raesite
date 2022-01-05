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
import TestPage from "./pages/testPage";

function App() {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [viewAsNormalUser, setViewAsNormalUser] = useState(false);
  const [isShowWebsiteStyleEditor, showWebsiteStyleEditor] = useState(true)
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

  const [routes,setRoutes] = useState([
    {
      name:"Home",
      path:"/"
    },
    {
      name:"Blog",
      path:"/blog"
    },
    {
      name: "Shop",
      path:"/shop"
    },
    {
      name:"About",
      path:"/about"
    }])
  // const [pageUrls,setPageUrls] = useState(["/","/blog","/shop","/about"])

  const templates = {
    "Home":["Header","Navbar","Mosaic","BlogPreview"],
    "Blog":["Header","Navbar"],
    "Shop":["Header","Navbar"],
    "About":["Header","Navbar"]
  }

  useEffect(() => {
    // Update the document title using the browser API
    getIsUserAdmin();
    // getBlogCount();
  }, []);

  const updateWebStyle = (state) => {
    setWebStyle({...webStyle,
                 ...state})
    forceUpdate()
    // alert("tests")
  }

  // const updateBlogCount = () => {
  //   getBlogCount();
  // }

  const getIsUserAdmin = async () => {
    // Get IP address for ADMIN rights
    // const response = await fetch('https://geolocation-db.com/json/');
    // const data = await response.json();
    // setUserIsAdmin(data.IPv4 === "108.51.21.72")
    setUserIsAdmin(true)
    // alert(data.IPv4 === "108.51.21.72")
  }

  // const getBlogCount = async () => {
  //   // Get IP address for ADMIN rights
  //   const response = await fetch('http://localhost:9000/getBlogCount');
  //   const count = await response.text();

  //   setBlogCount(parseInt(count))
  // }
  // const checkForTemplate = (pageName) => {
  //   if (pageName in templates){
  //     return templates[pageNames]
  //   }
  //   else {
  //     return ["Header","Navbar"]
  //   }
  // }

  const hideWebsiteStyleEditor = () => {
    // alert("hide")
    showWebsiteStyleEditor(false)
  }

  let componentOptions = ["PictureFrame","Navbar","Header","Footer","Mosaic","DynamicForm","CardPaymentBlock","CaptionedPicture","BlogPreview","VideoFrame","SlideShow"]

  // const routes = []
  // pageNames.forEach((name, index) => { 
    // let template = checkForTemplate(name);
  // let newPath = pageUrls[index]
  let routeComponents  = routes.map(({name, path})=> (<Route exact path = {path} key = {name+"Route"}>
      <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser} key = {name+"Page"} pageName = {name}
                    routes = {routes}
                    defaultComponentList = { ["Header","Navbar"]} componentOptions = {componentOptions}
                    updateWebStyle = {updateWebStyle} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowWebsiteStyleEditor}/>
    </Route>
     
    // routes.push(newRoute)
  ))
  // alert(routes.length)


  return (
    <div className="App" style={{backgroundColor:webStyle.lightShade}}>
      
      <Router>
        {/* <Navbar webStyle = {webStyle}/> */}
        {/* <Fade> */}
          <Switch>
          {routeComponents}
          <Route path="/blog-static">
              <Blog webStyle = {webStyle}/>
          </Route>
          <Route path="/modeling-static">
              <ModelingPage webStyle = {webStyle} />
          </Route>
          <Route path="/advertising-static">
              <AdvertisingPage  webStyle = {webStyle}/>
          </Route>
          <Route path="/coaching-static">
              <CoachingPage  webStyle = {webStyle}/>
          </Route>
          <Route path="/about-static">
              <AboutPage  webStyle = {webStyle} />
          </Route>
          <Route path="/admin">
              <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/>
          </Route>
          {/* <Route path="/edit-post/:id" component = {CreatePostPage}/> */}

          {/* <Route path="/new-post">
              <CreatePostPage updateBlogCount = {updateBlogCount} webStyle = {webStyle}/>
          </Route>  */}
         
          
        </Switch>
        {/* </Fade> */}
      </Router>
    </div>
  );
}

export default App;
/*
 <Route path="/test">
              { <TestPage/> 
              <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser}
                            defaultComponentList = { ["Header","Navbar","Mosaic","Header","Mosaic","BlogPreview"]}  componentOptions = {["Navbar","Header","Mosaic","DynamicForm","CardPaymentBlock","BlogPreview"]}
                               updateWebStyle = {updateWebStyle} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowWebsiteStyleEditor}/>
          </Route>
          <Route path="/blog-post/:id" component = {ViewPostPage}/>
          <Route path="/">
          <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser}
                            defaultComponentList = { ["Header","Navbar","Mosaic","Header","Mosaic","BlogPreview"]}  componentOptions = {["Navbar","Header","Mosaic","DynamicForm","CardPaymentBlock","BlogPreview"]}
                               updateWebStyle = {updateWebStyle} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowWebsiteStyleEditor}/>
          </Route>
          
*/