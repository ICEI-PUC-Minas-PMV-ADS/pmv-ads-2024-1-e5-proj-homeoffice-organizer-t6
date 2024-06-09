import React from 'react';

const DeleteConfirmationModal = ({ collaboratorId, collaboratorName, onDelete, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Apagar?</h2>
                <p>Deseja realmente apagar o home office de {collaboratorName}?</p>
                <div className="modal-actions">
                    <button onClick={() => onDelete(collaboratorId)}>Sim</button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;