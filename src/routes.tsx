import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { MoviesPage } from './pages/MoviesPage';
import { ShowPage } from './pages/ShowPage';
import { BadPath } from './pages/BadPath';
import { Movie } from './components/views/movies/Movie';





export const useRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<ShowPage />} />
      <Route path="movies" element={<MoviesPage /> } />
      <Route path="movies/:id" element={<Movie/>} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}