import React from 'react';
import './ModalCollaborators.css';
import {toast} from 'react-toastify';
import moment from 'moment';

const ModalCollaborators = ({
    selectedDate,
    closeModal,
    collaborators,
    setHomeOfficeEvents,
    homeOfficeEvents,
    colors
}) => {
    // função para verificar se um colaborador já tem duas datas na mesma semana
    const collaboratorHasTwoDatesInWeek = (collaborator) => {
        const startOfWeek = moment(selectedDate).startOf('isoWeek');
        const endOfWeek = moment(selectedDate).endOf('isoWeek');

        const eventsThisWeek = homeOfficeEvents.filter(event => {
            const eventDate = moment(event.start);
            return event.title === collaborator.name &&
                   eventDate.isBetween(startOfWeek, endOfWeek, null, '[]');
        });

        return eventsThisWeek.length >= 2;
    };

    // função para verificar se um colaborador já está marcado na data selecionada
    const collaboratorAlreadyBookedOnDate = (collaborator) => {
        return homeOfficeEvents.some(event =>
            event.title === collaborator.name &&
            moment(event.start).isSame(selectedDate, 'day')
        );
    };

    const handleCollaboratorClick = async (collaborator) => {
        // funçao que cria evento com a data de home office do colaborador
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
            // funçao que faz chamada de criação de home office do colaborador
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
            toast.error(`Erro ao agendar home office.`);
            // remove o evento adicionado caso ocorra algum erro
            setHomeOfficeEvents(prevEvents => prevEvents.filter(event => event !== newEvent));
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Selecione um Colaborador</h2>
                {collaborators.map((collaborator, index) => (
                    !collaboratorHasTwoDatesInWeek(collaborator) && !collaboratorAlreadyBookedOnDate(collaborator) && (
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
                    )
                ))}
            </div>
        </div>
    );
};

export default ModalCollaborators;
