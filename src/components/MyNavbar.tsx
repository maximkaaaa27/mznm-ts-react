import React from "react";
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';


export const MyNavbar = () => {


  //const [nameUser, setNameUser] = useState('Puy')
  


  return (
    <Navbar collapseOnSelect
      bg="secondary"
      variant="dark"
      expand="lg"
      >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* <Navbar.Brand>{nameUser}</Navbar.Brand> */}
        <Navbar.Collapse id="responsive-navbar-nav">
        <Link className="nav-link dark" aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/shows" >Shows</Link>
        <Link className="nav-link" to="/movies" >Movies</Link>
        <Link className="nav-link" to="/auth">Sign In</Link>
        </Navbar.Collapse>
    </Navbar>
  )
}