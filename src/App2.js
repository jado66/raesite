import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const routes = [
    {
      name: 'home',
      path: '/'
    },
    {
      name: 'blog',
      path: '/blog'
    }
  ]

  // translate (map) your array of objects into jsx
  const routeComponents = routes.map(({name, path}) => ((
    <Route key={name} exact path={path}>
      <h1 key ={name+"header"}>{name}</h1>
    </Route>
  )))
  
  return (
    <div className="App" >
      <Router>
        <Navbar routes = {routes} />
          <Switch>
            {routeComponents}          
          </Switch>
      </Router>
    </div>
  );
}

export default App;

function Navbar(props){
  const links = props.routes.map(({name, path}) => (
    <Link key={name} to={path}>{name}</Link>
  ))
    return(
        <div style={{justifyContent: "space-around", margin:"auto", display:"flex",justifyContent:"space-around",backgroundColor:"red"}}>
            {links}
        </div>
    )
}