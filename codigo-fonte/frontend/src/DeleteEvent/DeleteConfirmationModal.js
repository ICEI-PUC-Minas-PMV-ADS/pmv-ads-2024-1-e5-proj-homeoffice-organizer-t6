import React from 'react';

const DeleteConfirmationModal = ({ collaboratorDateId, collaboratorName, onDelete, onClose }) => {
    const handleDelete = () => {
        onDelete(collaboratorDateId);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Apagar?</h2>
                <p>Deseja realmente apagar a marcação de home office de {collaboratorName}?</p>
                <div className="modal-actions">
                    <button onClick={handleDelete}>Sim</button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;