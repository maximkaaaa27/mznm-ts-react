import React from "react";
import { Link } from "react-router-dom";


export const BadPath = () => (
  <div className="m-3">
    <h1 className="p-3"> Ooops... Page not found =(</h1>
    <Link className="nav-link info" to="/">Go back</Link>
  </div>
)