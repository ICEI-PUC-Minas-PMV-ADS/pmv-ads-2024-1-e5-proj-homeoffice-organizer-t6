import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './ModalCollaborator.css';
import { showToast } from "../ToastContainer";

const ModalCollaborator = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sector, setSector] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se todos os campos foram preenchidos
        if (!name || !email || !sector) {
            showToast('Preencha todos os campos!', 'error');
            return;
        }

        try {
            // Realiza a chamada para criar o colaborador no backend
            let formData = new FormData();
            formData.append('name', name)
            formData.append('email', email)
            formData.append('sector', sector)
            const response = await axiosInstance.post('/collaborator/create-collaborator/', formData);

            showToast('Colaborador adicionado com sucesso.', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Erro:', error);
            showToast('Erro ao adicionar colaborador', 'error');
        }

        // Limpa os campos após adicionar o colaborador
        setName('');
        setEmail('');
        setSector('');
        closeModal();
    };


    return (
        <div className="modal-collaborator">
            <div className="modal-collaborator-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Adicionar Colaborador</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input
                        id="collaboratorName"
                        name="collaboratorName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="department">Setor:</label>
                    <select
                        id="department"
                        name="department"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                    >
                        <option value="">Selecione um setor</option>
                        <option value="atendimento">Atendimento</option>
                        <option value="comunicação">Comunicação</option>
                        <option value="conteúdo">Conteúdo</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="onidevs">Onidevs</option>
                        <option value="qh4">QH4</option>
                        <option value="rh">RH</option>
                    </select>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalCollaborator;