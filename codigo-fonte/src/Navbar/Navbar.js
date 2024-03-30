import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Home Office Organizer</h1>
      </div>
      <div className="navbar-right">
        <button>Fazer Login</button>
      </div>
    </nav>
  );
}

export default Navbar;