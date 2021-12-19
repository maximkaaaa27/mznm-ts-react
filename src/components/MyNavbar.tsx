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
    
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-3"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Link className="nav-link dark" aria-current="page" to="/">Home</Link>
          <Link className="nav-link" to="/shows" >Shows</Link>
          <Link className="nav-link" to="/movies" >Movies</Link>
        </Navbar.Collapse>


        <div className="me-2">
        {user.name ? 
          <DropdownButton menuVariant="dark" title={user.name.split(' ')[0]}>
            <Link className="nav-link dropdown-item" to="/admin">Admin</Link>
            <Dropdown.Item onClick={() => signOutGoogle()}>Sign out</Dropdown.Item>
          </DropdownButton>
          : <Button variant="secondary" onClick={() => authWithGoogle()}>
            Sign In
          </Button>
        }


          
        </div>   
        {userPic() && 
          <Image src={userPic()} roundedCircle style={{"backgroundSize": "32px 32px", "height": "32px", "width": "32px", "marginRight": "0.5rem"}}/>
        }


    </Navbar>
  )
}