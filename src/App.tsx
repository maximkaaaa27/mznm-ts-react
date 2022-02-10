import React from 'react';
import './styles/App.scss';
import './assets/beav_and_btth_card.webp';
import './assets/do_america.webp';
import './assets/office_card.webp';
import './assets/trainspot_card.webp';


import { useRoutes } from './routes'
import { MyNavbar } from './components/MyNavbar';
import { MyFooter } from './components/MyFooter';



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

        <footer className='my-footer'>
          <MyFooter />
        </footer> 

      </>
    )
}

export default App;
