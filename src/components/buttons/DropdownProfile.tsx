import React from 'react';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';


export const DropdownProfile = ({userPic, userName, signOut} : {
  userPic: string | undefined
  userName: string
  signOut: () => void
}) => {


  
return (

  <DropdownButton
    align={{lg: 'end'}}
    variant="secondary" 
    menuVariant="dark" 
    title={userName.split(' ')[0]}
  >
    <Dropdown.Header>
      { userPic && <Image src={userPic} className="user-pic" roundedCircle/> }
      { userName.split(' ')[0] + ' ' + userName.split(' ')[1].charAt(0) } 
    </Dropdown.Header>

    <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>

  </DropdownButton>
  )
}