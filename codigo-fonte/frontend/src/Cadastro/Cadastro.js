import React, { useState } from 'react';
import axios from 'axios';
import './Cadastro.css';
import Navbar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function SignUp() {
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
        confirmarSenha: false
    });

    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [credentialExist, setCredentialExist] = useState(false)

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

        setErrors(formErrors);

        if (Object.values(formErrors).some(error => error)) {
            return;
        }

        const dataToSend = {
            username: formData.email,
            first_name: formData.nome,
            password: formData.senha
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/signup/', dataToSend);
            console.log('Cadastro bem-sucedido:', response.data);
            setSuccessMessage('Sucesso! Seu cadastro foi feito com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Erro ao fazer o cadastro:', error);
            setCredentialExist(true)
        }
    };

    return (
        <div>
            <Navbar isLoginPage={false} />
            <div className="cadastro-container">
                {credentialExist && <p>Esse e-mail já existe</p>}
                <form className="cadastro-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2 className='form-text'>Fazer Cadastro</h2>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <input type="text" id="nome" name="nome" placeholder='Nome' value={formData.nome} onChange={handleChange}
                            className={errors.nome ? 'error' : ''} required />
                        {errors.nome && <span className="error-message">Por favor, insira um nome válido.</span>}
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}
                            className={errors.email ? 'error' : ''} required />
                        {errors.email && <span className="error-message">Por favor, insira um email válido.</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" id="senha" name="senha" placeholder='Senha' value={formData.senha} onChange={handleChange}
                            className={errors.senha ? 'error' : ''} required />
                        {errors.senha &&
                            <span className="error-message">A senha deve conter pelo menos 8 caracteres, incluindo uma letra minúscula e um número.</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder='Confirmar Senha' value={formData.confirmarSenha}
                            onChange={handleChange} className={errors.confirmarSenha ? 'error' : ''} required />
                        {errors.confirmarSenha && <span className="error-message">As senhas não correspondem.</span>}
                        <ul>
                            <a className="fs-14" href="/Login" >Já tenho uma conta</a>
                        </ul>
                    </div>
                    <button className="form-submit" type="submit">Criar Conta</button>
                </form>
                {successMessage && <p className="bottom-success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default SignUp;