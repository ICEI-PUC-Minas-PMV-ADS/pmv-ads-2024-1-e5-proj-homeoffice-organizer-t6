import React from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const DeleteConfirmationModal = ({ collaboratorDateId, onClose, setHomeOfficeEvents, homeOfficeEvents }) => {
    const handleDelete = async () => {
        try {
            // Realiza a requisição DELETE para excluir a associação de colaborador com data
            const response = await axiosInstance.delete(`/collaborator-date-delete/${collaboratorDateId}/`);

            if (response.status === 204) {
                // Atualiza o estado local de homeOfficeEvents removendo o evento deletado
                const updatedEvents = homeOfficeEvents.filter(event => event.id !== collaboratorDateId);
                setHomeOfficeEvents(updatedEvents);

                toast.success('Associação de colaborador com data de home office deletada com sucesso.');
            } else {
                throw new Error('Erro ao excluir associação de colaborador com data de home office');
            }
        } catch (error) {
            console.error('Erro ao remover home office:', error);
            toast.error('Erro ao remover home office.');
        } finally {
            onClose(); // Fecha o modal de confirmação após a operação
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Apagar?</h2>
                <p>Deseja realmente apagar o home office associado?</p>
                <div className="modal-actions">
                    <button onClick={handleDelete}>Sim</button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;