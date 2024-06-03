import React from 'react';
import './ModalCollaborators.css';

const ModalCollaborators = ({ selectedDate, closeModal, collaborators, setEvents, events, colors }) => {
    const handleCollaboratorClick = (collaborator) => {
        const newEvent = {
            title: collaborator.name,
            start: selectedDate,
            end: selectedDate,
            allDay: true,
            color: collaborator.color
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Selecione um Colaborador</h2>
                {collaborators.map((collaborator, index) => (
                    <div
                        key={collaborator.id}
                        className="collaborator-item"
                        style={{
                            backgroundColor: colors[index % colors.length],
                        }}
                        onClick={() => handleCollaboratorClick(collaborator)}
                    >
                        {collaborator.name}
                    </div>
                ))}
                <button onClick={closeModal}>Cancelar</button>
            </div>
        </div>
    );
};

export default ModalCollaborators;