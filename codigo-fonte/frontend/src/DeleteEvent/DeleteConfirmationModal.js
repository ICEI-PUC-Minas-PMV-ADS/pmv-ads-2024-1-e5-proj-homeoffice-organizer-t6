import React from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const DeleteConfirmationModal = ({ collaboratorId, collaboratorName, onDelete, onClose, setHomeOfficeEvents, homeOfficeEvents }) => {

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/collaborator/api/collaborator-date/${collaboratorId}`);
            
            const updatedEvents = homeOfficeEvents.filter(event => event.collaboratorId !== collaboratorId);
            setHomeOfficeEvents(updatedEvents);
    
            toast.success('Home office removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover home office:', error);
            toast.error('Erro ao remover home office.');
        } finally {
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Apagar?</h2>
                <p>Deseja realmente apagar o home office de {collaboratorName}?</p>
                <div className="modal-actions">
                    <button onClick={handleDelete}>Sim</button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;