import React from "react";
import { authWithGoogle, signOutGoogle } from "../../redux/firebase/firebase";


export const AuthPage = () => {
  const authButtonHandler = () => {
    
   authWithGoogle()
   
  }


  return (
  <>
      <div className="btn btn-info m-3" onClick={authButtonHandler}>Google Вход</div>
      <div className="btn btn-danger m-3" onClick={() => signOutGoogle()}>Google Выход</div>
  </>

  )
}