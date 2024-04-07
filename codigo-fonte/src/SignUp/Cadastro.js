import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Cadastro.css';
import axios from 'axios';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
    errorMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'senha' || name === 'confirmarSenha') {
      setErrors({
        ...errors,
        confirmarSenha: formData.senha !== value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = { ...errors };

    if (formData.senha !== formData.confirmarSenha) {
      formErrors.confirmarSenha = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      formErrors.email = true;
    }

    const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!senhaPattern.test(formData.senha)) {
      formErrors.senha = true;
    }

    setErrors(formErrors);

    if (Object.values(formErrors).some(error => error)) {
      return;
    }

    try {
      const response = await axios.post('http://seu-servidor/signup/', formData);
      console.log('Cadastro bem-sucedido:', response.data);
      // navegar pra home
    } catch (error) {
      console.error('Erro ao fazer o cadastro:', error);
      if (error.response && error.response.data) {
        setErrors({
          ...errors,
          errorMessage: error.response.data
        });
      } else {
        setErrors({
          ...errors,
          errorMessage: 'Erro ao fazer o cadastro. Por favor, tente novamente mais tarde.'
        });
      }
    }

    setFormData({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    });
  };

  return (
    <div>
      <Navbar isLoginPage={false} />
      <div className="cadastro-container">
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className='form-text'>Fazer Cadastro</h2>
            {errors.errorMessage && <span className="error-message">{errors.errorMessage}</span>}
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className={errors.nome ? 'error' : ''} required />
            {errors.nome && <span className="error-message">Por favor, insira um nome válido.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} required />
            {errors.email && <span className="error-message">Por favor, insira um email válido.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} className={errors.senha ? 'error' : ''} required />
            {errors.senha && <span className="error-message">A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} className={errors.confirmarSenha ? 'error' : ''} required />
            {errors.confirmarSenha && <span className="error-message">As senhas não correspondem.</span>}
          </div>
          <button type="submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;