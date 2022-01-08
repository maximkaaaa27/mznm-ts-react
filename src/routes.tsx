import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { BadPath } from './pages/BadPath';
import { DoAmerica } from "./pages/mznm-movies/DoAmerica";
import { Trainspotting } from './pages/mznm-movies/Trainspotting';



export const useRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<Shows />} />
      <Route path="movies" element={<Movies /> } />
      <Route path="movies/doAmerica" element={<DoAmerica />} />
      <Route path="movies/trainsppt" element={<Trainspotting />} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}