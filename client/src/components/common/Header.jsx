import React, { Fragment } from 'react'
import { Navbar ,Nav ,Button, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css"
import {GiChefToque} from 'react-icons/gi'

function Header(){

    return (
      <Fragment id="nav">
        <Navbar bg="light" variant="light">
        <Navbar.Brand className="header" href="/">
        <GiChefToque className="mb-1"/>
          <p1>Chefs Hat</p1>
        </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/"><p2>Home</p2></Nav.Link>
            <Nav.Link href="/about"><p2>About</p2></Nav.Link>
            <Nav.Link href="/users"><p2>Users</p2></Nav.Link>
            <Nav.Link href="restaurant"><p2>Restaurants</p2></Nav.Link>
        </Nav>

      <NavItem className="btn mt-1 btn-sm " >
        <Button className="btn1" variant="outline-success" href="/Login">Login</Button>
      </NavItem>
      <NavItem className="btn mt-1 btn-sm " >
        <Button className="btn2" variant="outline-success" href="/Register">Register</Button>
      </NavItem>
      </Navbar>
  </Fragment>
    )
}
export default Header