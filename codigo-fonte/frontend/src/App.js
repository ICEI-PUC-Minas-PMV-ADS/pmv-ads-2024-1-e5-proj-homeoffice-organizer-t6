import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from "./Cadastro/Cadastro";
import Home from "./Home/Home";
import MyCalendar from './Calendar/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calendar" element={<MyCalendar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;