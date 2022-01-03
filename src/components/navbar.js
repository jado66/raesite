import React from "react";
import {
  Link
} from "react-router-dom";

import {
    Menu,
    MenuItem,
    MenuButton,
    MenuHeader,
    MenuDivider,
    FocusableItem,
    SubMenu,
  } from '@szhsin/react-menu';
  import '@szhsin/react-menu/dist/index.css';
  import '@szhsin/react-menu/dist/transitions/slide.css';

import { useEffect, useState } from "react";


export default function Navbar(props){

    const stargingMenu = [["Home","/"],["About","/about"],["Advertising","/advertising"],["Coaching","/coaching"]]

    const [navbarList, setNavbarList] = useState(stargingMenu)
    const [areButtonsVisible, setButtonsVisible] = useState(false)
    const [isAddButtonVisible, showAddButton] = useState(false);

    const [newLinkInput, setNewLinkInput] = useState("")

    const menuItems = []

    navbarList.forEach((name, index) => {
      menuItems.push(<Link to={name[1]} style={{color:props.webStyle.lightShade}}>{name[0]}</Link>)
    });

    const addNewLinkAtIndex = () => { // Need to be replaced with list of objects or they will get rerendered
      stargingMenu.push([newLinkInput,"/"])
    }

    const updateNewLinkInput = (e) =>  {
      setNewLinkInput(e.target.value);
    }

    //  onMouseEnter={()=>{setButtonsVisible(true)}} onMouseLeave={()=>{setButtonsVisible(false)}} >

    return(
            <div className="fullWidth" style={{backgroundColor:props.webStyle.darkShade,position: "sticky",top: 0, alignSelf: "flex-start",zIndex:1}}>
                
              <div className="topnav " style={{margin:"auto", display:"flex",justifyContent:"space-evenly",width:"80%"}}>
                
                {menuItems}
                {/* <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > About </MenuButton>
                
                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Advertising </MenuButton>

                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Coaching </MenuButton>

                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}} > Blog </MenuButton> */}

                {areButtonsVisible &&
                <Link to={"/admin"} style={{color:props.webStyle.lightShade}}>Admin</Link>
                }

                {areButtonsVisible &&
                <MenuButton styles={{color:props.webStyle.lightShade, background:"none",border:"none",fontFamily:"Great Vibes",fontSize: "x-large"}}
                  onClick={()=>{showAddButton(true)}}>+</MenuButton>
                }
              </div>

              {isAddButtonVisible &&
              <div>
                <input placeholder={"Text..."} value={newLinkInput} onChange={updateNewLinkInput}/><input type={"button"} value = {"Add"} onClick={()=>{showAddButton(false);addNewLinkAtIndex()}}/>
              </div>
              }
            </div>        
    )
}