import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { BadPath } from './pages/BadPath';



export const useRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<Shows />} />
      <Route path="movies" element={<Movies /> } />
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}