import React from "react";
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useAppSelector } from "../redux/hooks";


export const MyNavbar = () => {

  const user = useAppSelector(state => state.auth)



  return (
    <Navbar collapseOnSelect
      bg="secondary"
      variant="dark"
      expand="lg"
      >
    
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-3"/>

        <Navbar.Collapse id="responsive-navbar-nav">
        <Link className="nav-link dark" aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/shows" >Shows</Link>
        <Link className="nav-link" to="/movies" >Movies</Link>
        <Link className="nav-link" to="/auth">Sign In</Link>
        </Navbar.Collapse>
        <Navbar.Brand >{user.user.name}</Navbar.Brand>
    </Navbar>
  )
}