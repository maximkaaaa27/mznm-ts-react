import React from "react";
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, Image, Navbar } from 'react-bootstrap';
import { useAppSelector } from "../redux/hooks";
import { authWithGoogle, signOutGoogle } from "../redux/firebase/firebase";


export const MyNavbar = () => {

  const user = useAppSelector(state => state.auth.user)
  const userPic = () => user.pic === null ? undefined : user.pic
  

  return (
    <Navbar collapseOnSelect
      bg="secondary"
      variant="dark"
      expand="lg"
      >

    <Navbar.Brand>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/mznm-ts.appspot.com/o/mznm%2Fmznm-logo.png?alt=media&token=097c4e30-9922-46ec-a161-73a161ec3e31"
      width="35"
      height="30"
      className="d-inline-block align-top"
      alt="."
    /> MZNM Studio
    </Navbar.Brand>

    
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-3"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="d-flex menu-link">
            <Link className="nav-link dark" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/shows" >Shows</Link>
            <Link className="nav-link" to="/movies" >Movies</Link>
          </div>
          <div className="pe-3">
          {user.name ? 
          <DropdownButton
          align={{lg: 'end'}}
          variant="secondary" 
          menuVariant="dark" 
          title={user.name.split(' ')[0]}
          >
            <Dropdown.Header>
              {userPic() && 
              <Image src={userPic()} roundedCircle style={{"backgroundSize": "32px 32px", "height": "32px", "width": "32px", "marginRight": "0.5rem"}}/>
              }
              {user.name.split(' ')[0] + ' ' + user.name.split(' ')[1].charAt(0)} 
              </Dropdown.Header>
            <Dropdown.Item onClick={() => signOutGoogle()}>Sign out</Dropdown.Item>
          </DropdownButton>
          : <Button variant="secondary" onClick={() => authWithGoogle()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          </Button>
          
        }
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}