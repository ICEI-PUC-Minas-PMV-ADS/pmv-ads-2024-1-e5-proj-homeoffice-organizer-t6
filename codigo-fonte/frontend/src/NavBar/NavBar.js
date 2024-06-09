import React from 'react';
import {Link} from 'react-router-dom';
import logoImg from './img/HomeOrganizerLogo.png';

function Navbar({pageName}) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/Calendar">
                    <img src={logoImg} alt="Logo" style={{width: '300px', height: 'auto'}}/>
                </a>
            </div>
            <div className="navbar-right">
                {pageName === 'login' ? (
                    <Link to="/cadastro">
                        <span className="btncadastro">FAZER CADASTRO</span>
                    </Link>
                ) : pageName === 'register' ? (
                    <Link to="/login">
                        <span className="btncadastro">FAZER LOGIN</span>
                    </Link>
                ) : (
                    <Link to="/login">
                        <span className="btncadastro">SAIR</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;