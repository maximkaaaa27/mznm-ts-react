import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './styles/App.scss';
import { MyNavbar } from './components/MyNavbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { BadPath } from './pages/BadPath';
import { AdminPage } from './pages/AdminPage';
import { useAppSelector } from './redux/hooks';



function App() {
  const loading = useAppSelector(state => state.firebase.loading)

  return (
  <> 
    <MyNavbar /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shows" element={<Shows loading={loading}/>} />
      <Route path="/movies" element={<Movies loading={loading}/>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<BadPath />} />
    </Routes>
  </>
  );
}

export default App;
