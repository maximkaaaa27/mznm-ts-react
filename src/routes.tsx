import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { MoviesPage } from './pages/MoviesPage';
import { ShowsPage } from './pages/ShowsPage';
import { BadPath } from './pages/BadPath';
import { Movie } from './components/views/movies/Movie';
import { TvShow } from './components/views/shows/TvShow';


const MOVIES = 'movies/'; // !!! important Key
const SHOWS ='shows/';

export const useRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<ShowsPage />} />
      <Route path="shows/:id" element={<TvShow contentLink={SHOWS}/>} />
      <Route path="movies" element={<MoviesPage /> } />
      <Route path="movies/:id" element={<Movie contentLink={MOVIES}/>} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}