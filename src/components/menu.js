"use strict"
import React from 'react'
import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Badge} from 'react-bootstrap'

class Menu extends React.Component {
  render(){
    return(
      <Navbar inverse fixedTop>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/">Home</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="/about">About</NavItem>
      <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="/admin">Admin</NavItem>
      <NavItem eventKey={2} href="/cart">Your Cart
      { (this.props.cartItemsNumber > 0) ? (
      <Badge className="badge">{this.props.cartItemsNumber}</Badge>):('') }
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
  }
}
export default Menu
