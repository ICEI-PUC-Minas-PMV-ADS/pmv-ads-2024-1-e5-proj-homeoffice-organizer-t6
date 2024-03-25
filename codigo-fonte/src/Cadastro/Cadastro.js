import React, { useState } from 'react';
import './Cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    setFormData({
      nome: '',
      email: '',
      senha: ''
    })
  }

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-group">
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;