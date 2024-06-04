import React from 'react';
import './ModalCollaborators.css';
import {toast} from 'react-toastify';

const ModalCollaborators = ({
                                selectedDate,
                                closeModal,
                                collaborators,
                                setHomeOfficeEvents,
                                homeOfficeEvents,
                                colors
                            }) => {
    const handleCollaboratorClick = async (collaborator) => {
        const newEvent = {
            title: collaborator.name,
            start: selectedDate,
            end: selectedDate,
            allDay: true,
            type: 'homeOffice'
        };

        // Adiciona o novo evento instantaneamente
        setHomeOfficeEvents([...homeOfficeEvents, newEvent]);

        try {
            const response = await fetch('http://127.0.0.1:8000/collaborator/api/collaborator-date/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collaborator_id: collaborator.id,
                    date: selectedDate.toISOString().split('T')[0], // Formata a data no formato YYYY-MM-DD
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao agendar home office');
            }

            closeModal();
            toast.success('Home office agendado com sucesso!');
        } catch (error) {
            console.error('Erro ao agendar home office:', error);
            toast.error(`Erro ao agendar home office. Detalhes: ${error.message}`);
            // Remove o evento adicionado caso ocorra algum erro
            setHomeOfficeEvents(prevEvents => prevEvents.filter(event => event !== newEvent));
        }
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
