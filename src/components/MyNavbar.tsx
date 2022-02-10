import React from "react";
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useAppSelector } from "../redux/hooks";
import { authWithGoogle, signOutGoogle } from "../redux/firebase/firebase";
import { PersonIcon } from "./icons/person";
import { DropdownProfile } from "./buttons/DropdownProfile";


export const MyNavbar = () => {

  const user = useAppSelector(state => state.auth.user)
  const userPic = () => user.pic === null ? undefined : user.pic
  

  return (
    <>
      <Navbar 
        collapseOnSelect
        bg="secondary"
        variant="dark"
        expand="lg"
        fixed="top"
        className="py-1"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mx-3 my-1"/>

          <div className="my-navbar-brand">
            <div className="my-navbar-brand__logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/mznm-ts.appspot.com/o/mznm%2Fmznm-logo.png?alt=media&token=097c4e30-9922-46ec-a161-73a161ec3e31"
                alt="..."
              />
            </div>

            <div className="my-navbar-brand__title">
              MZNM Studio
            </div>
          </div>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" eventKey="home" className="px-4">Home</Nav.Link>
              <Nav.Link as={Link} to="/shows" eventKey="shows" className="px-4">Shows</Nav.Link>
              <Nav.Link as={Link} to="/movies" eventKey="movies" className="px-4">Movies</Nav.Link>
            </Nav>

            <div className="pe-3">
                {(user.name) ? 
                <DropdownProfile userPic={userPic()} userName={user.name} signOut={signOutGoogle} />
                : <Button variant="secondary" onClick={() => authWithGoogle()}>
                    <PersonIcon />
                  </Button>
                }
            </div>
            
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}