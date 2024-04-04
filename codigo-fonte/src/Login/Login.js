import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css'

function Login() {
  return (
    <div>
      <Navbar isLoginPage={true} />
    <div className="login-container">
      <form className="login-form">
        <div className="form-group">
        <h2 className='form-text'>Login</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Fazer Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;