import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './Cadastro.css';
import Navbar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    const navigate = useNavigate();
    const [credentialExist, setCredentialExist] = useState(false);

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
            const response = await axiosInstance.post('/auth/signup/', dataToSend);
            toast.success('Sucesso! Seu cadastro foi feito com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            toast.error(`Erro ao fazer o cadastro: ${error.message}`);
            if (error.response && error.response.status === 409) {
                setCredentialExist(true);
            }
        }
    };

    return (
        <div>
            <Navbar pageName={'register'}/>
            <div className="cadastro-container">
                {credentialExist && <p>Esse e-mail já existe</p>}
                <form className="cadastro-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2 className='form-text'>Fazer Cadastro</h2>
                        <input type="text" id="nome" name="nome" placeholder='Nome' value={formData.nome}
                               onChange={handleChange}
                               className={errors.nome ? 'input-error' : 'input-field'} required/>
                        {errors.nome && <span className="error-message">Por favor, insira um nome válido.</span>}
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder='Email' value={formData.email}
                               onChange={handleChange}
                               className={errors.email ? 'input-error' : 'input-field'} required/>
                        {errors.email && <span className="error-message">Por favor, insira um email válido.</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" id="senha" name="senha" placeholder='Senha' value={formData.senha}
                               onChange={handleChange}
                               className={errors.senha ? 'input-error' : 'input-field'} required/>
                        {errors.senha &&
                            <span className="error-message">A senha deve conter pelo menos 8 caracteres, incluindo uma letra minúscula e um número.</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder='Confirmar Senha'
                               value={formData.confirmarSenha}
                               onChange={handleChange} className={errors.confirmarSenha ? 'input-error' : 'input-field'}
                               required/>
                        {errors.confirmarSenha && <span className="error-message">As senhas não correspondem.</span>}
                    </div>
                    <div className="form-group">
                        <a className="link-existing-account" href="/login">Já tenho uma conta</a>
                    </div>
                    <button className="submit-button" type="submit">Criar Conta</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;