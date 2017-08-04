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
