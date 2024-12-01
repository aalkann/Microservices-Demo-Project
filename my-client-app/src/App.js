import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { keycloak, initializeKeycloak } from './helpers/keycloak';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      await initializeKeycloak();
      setIsAuthenticated(keycloak.authenticated);
    };
    if(!keycloak.didInitialize){
        initKeycloak();
    }
  }, []);

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </Router>
  );
}

export default App;
