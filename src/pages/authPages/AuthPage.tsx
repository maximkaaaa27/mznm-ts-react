import React from "react";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from '../../redux/firebase/firebase';
import { useAppDispatch } from "../../redux/hooks";
import { logIn } from "../../redux/auth/authSlice";

export const AuthPage = () => {

  const provider = new GoogleAuthProvider();
  const userUID = process.env.REACT_APP_USER_UID;
  const dispatch = useAppDispatch();

  const authButtonHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        let token = null;
         if (credential) {
           token = credential.accessToken;
         } 
        const user = result.user;
        if (token) {
          dispatch(logIn({user: user.uid, token}))
          console.log(userUID);
        } else {
          console.error('Oh, dear, wrong gear');
        }
      })
      .catch((error) => {
        console.error('Google Popup' + error.code)
      })
  }


  return (
    <div className="btn btn-info m-3" onClick={authButtonHandler}>Google Вход</div>
  )
}