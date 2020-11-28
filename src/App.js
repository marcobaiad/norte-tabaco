import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Admin from './pages/Admin';
import CigarrillosPage from './pages/CigarrillosPage';
import FuegosAPage from './pages/FuegosAPage';

function App() {

  return (
    <>
      <div className="d-none">
        <a href="/fuegos-artificiales"></a>
        <a href="/admin"></a>
        <a href="/"></a>
      </div>
      <Route component={NavBar} />
      <Switch>
        <Route exact={true} path="/fuegos-artificiales" component={FuegosAPage} />
        <Route exact={true} path="/admin" component={Admin} />
        <Route exact={true} path="/" component={CigarrillosPage} />
      </Switch>
      <Route component={Footer} />
    </>
  );
}

export default App;
