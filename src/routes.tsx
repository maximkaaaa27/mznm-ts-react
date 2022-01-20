import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { MoviePage } from './pages/MoviePage';
import { ShowPage } from './pages/ShowPage';
import { BadPath } from './pages/BadPath';
import { store } from './redux/store';
import { Movie } from './components/views/movies/Movie';
import { fetchFromRealtimeDB } from './redux/firebase/firebase';



export const useRoutes = () => {

  const movies = store.getState().firebase.movies



  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<ShowPage />} />
      <Route path="movies" element={<MoviePage /> } />
      {movies.map(movie => (
        <Route key={movie.id} path={'movies/' + movie.id} element={<Movie movie={movie}/>} />
      ))}
      {/* </Route> */}
      <Route path="*" element={<BadPath />} />
    </Routes>
  )
}