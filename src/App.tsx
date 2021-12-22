import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './styles/App.scss';
import { MyNavbar } from './components/MyNavbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { BadPath } from './pages/BadPath';
import { AdminPage } from './pages/AdminPage';


function App() {


  return (
  <> 
    <MyNavbar /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  </>
  );
}

export default App;
