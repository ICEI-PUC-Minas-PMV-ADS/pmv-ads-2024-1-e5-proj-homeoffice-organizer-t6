import React from 'react';
import axios from 'axios'; // Importe axios para fazer requisições HTTP
import { toast } from 'react-toastify';

const DeleteConfirmationModal = ({ collaboratorId, collaboratorName, onClose, setHomeOfficeEvents, homeOfficeEvents }) => {

    const handleDelete = async () => {
        try {
            // Realiza a requisição DELETE para excluir a data de home office
            const response = await axios.delete(`/collaborator-date-delete/${collaboratorId}/`);

            // Verifica se a exclusão foi bem-sucedida
            if (response.status === 200) {
                // Atualiza o estado local removendo o evento deletado
                const updatedEvents = homeOfficeEvents.filter(event => event.collaboratorId !== collaboratorId);
                setHomeOfficeEvents(updatedEvents);

                toast.success('Home office removido com sucesso!');
            } else {
                throw new Error('Erro ao excluir home office');
            }
        } catch (error) {
            console.error('Erro ao remover home office:', error);
            toast.error('Erro ao remover home office.');
        } finally {
            onClose(); // Fecha o modal de confirmação
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