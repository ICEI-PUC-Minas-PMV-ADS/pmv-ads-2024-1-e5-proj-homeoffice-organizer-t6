import React from 'react';
// import './CollaboratorModal.css';

const CollaboratorModal = ({ collaborators, handleCollaboratorChange, closeModal }) => {
    return (
        <div className="collaborator-modal">
            <div className="modal-content">
                <h2>Selecione um colaborador</h2>
                <select onChange={handleCollaboratorChange}>
                    <option value="">Selecione...</option>
                    {collaborators.map(collaborator => (
                        <option key={collaborator.id} value={collaborator.id}>
                            {collaborator.name}
                        </option>
                    ))}
                </select>
                <button onClick={closeModal}>Fechar</button>
            </div>
        </div>
    );
};

export default CollaboratorModal;