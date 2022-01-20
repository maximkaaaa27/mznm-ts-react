import React from 'react';
import './styles/App.scss';
import { useRoutes } from './routes'
import { MyNavbar } from './components/MyNavbar';



function App() {
  
  const routes = useRoutes();

  return (
  <> 
    <MyNavbar /> 
    {routes}
  </>
  );
}

export default App;
