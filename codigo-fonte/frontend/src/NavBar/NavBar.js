import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from './img/HomeOrganizerLogo.jpeg';
import './NavBar.css'

function Navbar({ pageName }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">

                <Link to="/home" className='navbar-link'>
                    <img src={logoImg} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                </Link>
            </div>
            <div className="navbar-right">
                {pageName === 'login' ? (
                    <Link to="/cadastro" className='navbar-link'>
                        <button className="navbar-button">FAZER CADASTRO</button>
                    </Link>
                ) : pageName === 'register' ? (
                    <Link to="/login" className='navbar-link'>
                        <button className="navbar-button">FAZER LOGIN</button>
                    </Link>
                ) : (
                    <Link to="/login" className='navbar-link'>
                        <button className="navbar-button">SAIR</button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;