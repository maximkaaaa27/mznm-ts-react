import React from "react";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";



export const Shows = () => {

  const handle = fetchFromRealtimeDB({id: 'shows/'})

  console.log(handle)
  
  return(
  <>
    <h1 className="p-3">Shows</h1>
    <div className="btn btn-info"> DB </div>
  </>
  )
  };