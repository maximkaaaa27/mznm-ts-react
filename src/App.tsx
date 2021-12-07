import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './styles/App.scss';
import { MyNavbar } from './components/MyNavbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';



function App() {


  return (
  <> 
    <MyNavbar /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  </>
  );
}

export default App;
