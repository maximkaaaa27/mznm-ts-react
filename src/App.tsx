import React from 'react';
import './styles/App.scss';
import { useRoutes } from './routes'
import { MyNavbar } from './components/MyNavbar';



function App() {
  const routes = useRoutes();

    return (
      <>
        <header>
          <MyNavbar />
        </header> 

        <main>
          <div className="page">
            {routes}
          </div>
        </main> 

      </>
    )
}

export default App;
