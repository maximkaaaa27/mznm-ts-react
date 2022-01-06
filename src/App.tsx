import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './styles/App.scss';
import { MyNavbar } from './components/MyNavbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { BadPath } from './pages/BadPath';
import { DoAmerica } from './pages/mznm-movies/DoAmerica'



function App() {


  return (
  <> 
    <MyNavbar /> 
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="shows" element={<Shows />} />
      <Route path="movies" element={<Movies /> } />
      <Route path="movies/doAmerica" element={<DoAmerica />} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  </>
  );
}

export default App;
