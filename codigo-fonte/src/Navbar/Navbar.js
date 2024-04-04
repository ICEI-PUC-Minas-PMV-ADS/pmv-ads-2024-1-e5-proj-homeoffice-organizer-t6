import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from './img/logo.png';

function Navbar({ isLoginPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoImg} alt="Logo" style={{ width: '300px', heigth: 'auto' }} />
      </div>
      <div className="navbar-right">
        {isLoginPage ? (
          <Link to="/cadastro">
            <button>Fazer Cadastro</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Fazer Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;