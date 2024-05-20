import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from './img/HomeOrganizerLogo.png';

function Navbar({ isLoginPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/Calendar"><img src={logoImg} alt="Logo" style={{ width: '300px', heigth: 'auto' }} /></a>
      </div>
      <div className="navbar-right">
        {isLoginPage ? (
          <Link to="/cadastro">
            <a className="btncadastro">FAZER CADASTRO</a>
          </Link>
        ) : (
          <Link to="/login">
            <a className="btncadastro">FAZER LOGIN</a>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;