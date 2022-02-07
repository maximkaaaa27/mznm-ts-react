import React from "react";
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
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

            <div className="me-auto navbar-nav">
              <Link className="nav-link px-4" aria-current="page" to="/"> Home </Link>
              <Link className="nav-link px-4" to="/shows" > Shows </Link>
              <Link className="nav-link px-4" to="/movies" > Movies </Link>
            </div>

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