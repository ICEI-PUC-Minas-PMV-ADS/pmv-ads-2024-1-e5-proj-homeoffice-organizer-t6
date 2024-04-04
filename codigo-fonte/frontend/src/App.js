import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Cadastro from './Cadastro/Cadastro';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;