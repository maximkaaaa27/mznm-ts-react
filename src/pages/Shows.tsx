import React from "react";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";



export const Shows = () => {
  let db = 'no'
  const getData = (data: any) => {db = data}
  fetchFromRealtimeDB({id: 'shows/'}, getData)

  console.log( db )
  
  return(
  <>
    <h1 className="p-3">Shows</h1>
    <div className="btn btn-info"> DB </div>
  </>
  )
  };