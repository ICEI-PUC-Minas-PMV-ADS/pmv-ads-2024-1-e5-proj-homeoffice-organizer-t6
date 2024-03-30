import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não correspondem.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!senhaPattern.test(formData.senha)) {
      alert('A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.');
      return;
    }

    console.log('Dados do formulário:', formData);
    setFormData({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    });
  };

  return (
    <div>
      <Navbar />
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className='form-text'>Fazer Cadastro</h2>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
    </div>
  );
}

export default Cadastro;