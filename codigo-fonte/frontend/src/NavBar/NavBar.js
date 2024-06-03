import React from 'react';
import './NavBar.css'
import logoImg from './img/HomeOrganizerLogo.png';

function Navbar({ isLoginPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/Calendar"><img src={logoImg} alt="Logo" style={{ width: '300px', heigth: 'auto' }} /></a>
      </div>
      <div className="navbar-right">
        {isLoginPage ? (
            <a href="/Cadastro" className="nav-btn">FAZER CADASTRO</a>
        ) : (
            <a href="/Login" className="nav-btn">FAZER LOGIN</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;