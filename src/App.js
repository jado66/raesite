import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation 
} from "react-router-dom";
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import './BootstrapOverrides.css'
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
import Navbar from "./components/navbar";
import CheckoutPage from "./pages/checkoutPage";

function App() {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [viewAsNormalUser, setViewAsNormalUser] = useState(false);
  const [isShowWebsiteStyleEditor, showWebsiteStyleEditor] = useState(true)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [width, setWidth] = useState(window.innerWidth);
  
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
      primaryFont:"Merienda",
      secondaryFont:""
      }
    )

  const [pages,setPages] = useState([
    {
      name:"Home",
      path:"/"
    },
    {
      name:"Blog",
      path:"/blog"
    },
    {
      name: "Partnerships",
      path:"/partnerships"
    },
    {
      name:"Coaching",
      path:"/coaching"
    },
    { 
      name:"Talent",
      path:"/talent"
    },
    {
      name:"Shop",
      path:"/shop"
    }
  ])
  const [socialMedias,setSocialMedias] = useState([
    {
      location  :"Instagram",
      link:"https://www.instagram.com/larae.day/"
    },
    {
      location  :"Tiktok",
      link:"https://www.tiktok.com/@larae.day?"
    },
    {
      location  :"Facebook",
      link:"https://www.facebook.com/larae.day.erwin/"
    },
    {
      location  :"Pinterest",
      link:"https://www.pinterest.com/laraedaylifebylarae"
    },
    {
      location  :"Email",
      link:"mailto:larae.day.lifebylarae@gmail.com"
    }
  ])
  // const [pageUrls,setPageUrls] = useState(["/","/blog","/shop","/about"])

  

  const templates = {
    "Home":["Header","Navbar","Mosaic","BlogPreview"],
    "Blog":["Header","Navbar"],
    "Partnerships":["Header","Navbar"],
    "Coaching":["Header","Navbar"]
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 991;


  useEffect(() => {
    // Update the document title using the browser API
    getIsUserAdmin();
    setPagesFromStorage();
    setSocialMediasFromStorage();
    // getBlogCount();
  }, []);

  useEffect(() => {
    localStorage.setItem('site-pages',JSON.stringify(pages))
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('social-medias',JSON.stringify(socialMedias))
  }, [socialMedias]);

  const setPagesFromStorage = () =>{
    let pages = JSON.parse(localStorage.getItem('site-pages'))
  
    if (pages){ 
      setPages(pages)
    }
  }

  const setSocialMediasFromStorage = () =>{
    let socialMedias = JSON.parse(localStorage.getItem('social-medias'))
  
    if (socialMedias){ 
      setSocialMedias(socialMedias)
    }
  }

  const handlePageNameChange = (index,name) => {
    let newPage = {}
    setPages( arr => {
      newPage.path = arr[index].path;
      newPage.name = name;
   
      return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
      ); // Callback to save to storage
  }

  const handlePagePathChange = (index,path) => {
    let newPage = {}
    setPages( arr => {
      newPage.path = path;
      newPage.name = arr[index].name;
   
      return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
      );
  }

  const checkIfPageExists = (path) => {
    let pageExists = false
    pages.forEach(page => {
      if (page.path === path){
        pageExists = true;
      }
    })
    return pageExists;
  }

  const deletePage = (pageName, index) => {
    let sureDelete = prompt(`Are you sure you would like to delete the page ${pageName}? This action is irreversible. Type "YES" to delete this page:`, "");

    if (sureDelete === "YES"){
      setPages( arr => {     
        return [...arr.slice(0,index) ,...arr.slice(index+1)]}
        );
    }
  }

  const addPage = (name,path) => {
    // alert("New Page")
    if (!name){
      name = "New Page"
    }
    if (!path){
      path = "/new-page"
    }
    
    let newPage = {}
    setPages( arr => {
      newPage.path = path;
      newPage.name = name;
   
      return [...arr, newPage]}
      );
  }

  // Social
  const handleSocialSiteChange = (index,location) => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.link = arr[index].link;
      newSocialMedia.location = location;
   
      return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
      ); // Callback to save to storage
  }

  const handleSocialLinkChange = (index,link) => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.location = arr[index].location;
      newSocialMedia.link = link;

   
      return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
      );
  }

  const deleteSocialMedia = (location, index) => {
    let sureDelete = window.confirm(`Are you sure you would like to your social media link to ${location}`);

    if (sureDelete){
      setSocialMedias( arr => {     
        return [...arr.slice(0,index) ,...arr.slice(index+1)]}
        );
    }
  }

  const addSocialMedia = () => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.location = "New Link";
      newSocialMedia.link = "/";
   
      return [...arr, newSocialMedia]}
      );
  }

  const pageCallbacks = {
    addPage: addPage,
    deletePage: deletePage,
    handleNameChange: handlePageNameChange,
    handlePathChange: handlePagePathChange,
    checkIfPageExists: checkIfPageExists
  }

  const socialMediaCallbacks = {
    addSocialMedia: addSocialMedia,
    deleteSocialMedia: deleteSocialMedia,
    handleSocialSiteChange: handleSocialSiteChange,
    handleSocialLinkChange: handleSocialLinkChange,
  }

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

  let componentOptions = ["PlanComparison","ListComparisonTable","Paragraph","QuickLink","PictureFrame","Navbar","Header","Footer","Mosaic","DynamicForm","CardPaymentBlock","CaptionedPicture","BlogPreview","VideoFrame","SlideShow"]

  // const routes = []
  // pageNames.forEach((name, index) => { 
    // let template = checkForTemplate(name);
  // let newPath = pageUrls[index]
  let routeComponents  = pages.map(({name, path})=> (
    <Route exact path = {path} key = {name+"Route"}>
      <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser} key = {name+"Page"} pageName = {name}
                    pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} socialMediaCallbacks = {socialMediaCallbacks}
                    defaultComponentList = { ["Header","Navbar"]} componentOptions = {componentOptions} isMobile = {isMobile}
                    updateWebStyle = {updateWebStyle} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowWebsiteStyleEditor}/>
    </Route>
     
    // routes.push(newRoute)
  ))
  // alert(routes.length)


  return (
    <div className="App h-100" style={{minHeight:"100vh", overflowX: "hidden",}}>
      <Router>
        {/* <Navbar webStyle = {webStyle}/> */}
        {/* <Fade> */}
          <Switch>
          {routeComponents}
          <Route path="/admin">
              <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/>
          </Route>
          <Route path="/checkout">
              <CheckoutPage  webStyle = {webStyle}/>
          </Route>
          <Route>
            <HeaderView webStyle = {webStyle} userIsAdmin = {userIsAdmin} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias}/>
              {/* <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/> */}
          </Route>
        </Switch>
        {/* </Fade> */}
      </Router>

    </div>
  );
}

export default App;

function HeaderView(props) {
  const location = useLocation();
  const pageList = props.pages.map(({name, path})=> (<p>- {name}: {path}</p>))
  console.log(location.pathname);

  const pageNameArr = location.pathname.slice(1).split(/[\-\_]/g)

  for (let i = 0; i < pageNameArr.length; i++) {
    pageNameArr[i] = pageNameArr[i][0].toUpperCase() + pageNameArr[i].substr(1);
  }

  const pageName = pageNameArr.join(" ");

  return (
    <div style={{height:"100%"}}>
      <Navbar {...props} socialMedias = {props.socialMedias}/>
      <div style={{width:"50%", margin:"auto"}}>
      <h3>• The page <span style={{fontWeight:"bolder"}}>{location.pathname}</span> does not exist within this website.</h3>
      

      <button onClick={()=>{props.pageCallbacks.addPage(pageName,location.pathname)}}>Create New Page</button>

      <h4>The following pages are included in the website:</h4>
      <ul style={{width:"50%", marginLeft:"40%", textAlign:"left"}}>
        {pageList}
      </ul>

      <h4>To change page names and paths please see the page menu in the admin edit section.</h4>

      </div>
    </div>
    )
}
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