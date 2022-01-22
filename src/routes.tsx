import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { MoviesPage } from './pages/MoviesPage';
import { ShowsPage } from './pages/ShowsPage';
import { BadPath } from './pages/BadPath';
import { Movie } from './components/views/movies/Movie';


const contentLink = 'movies/'; // !!! important Key


export const useRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<ShowsPage />} />
      <Route path="movies" element={<MoviesPage /> } />
      <Route path="movies/:id" element={<Movie contentLink={contentLink}/>} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}