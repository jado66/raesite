import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import { Menu, MenuItem, MenuButton, SubMenu} from '@szhsin/react-menu';
import { faAngleDoubleRight, faAngleDoubleLeft, faPlus, faPencilAlt, faTrashAlt,  faCheck, faTimes, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentEditable from 'react-contenteditable'

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  render() {

  const show = (this.state.menu) ? "show" : "" ;

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
          <a className="nav-item nav-link" href="/">Features</a>
          <a className="nav-item nav-link" href="/">Pricing</a>
          <a className="nav-item nav-link" href="/">logout</a>
        </div>
      </div>
    </nav>

  );
  }
}