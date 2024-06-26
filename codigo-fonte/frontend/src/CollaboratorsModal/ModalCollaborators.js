import React from 'react';
import './ModalCollaborators.css';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import moment from 'moment';

const ModalCollaborators = ({
    selectedDate,
    closeModal,
    collaborators,
    setHomeOfficeEvents,
    homeOfficeEvents,
    colors
}) => {
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

    const collaboratorAlreadyBookedOnDate = (collaborator) => {
        return homeOfficeEvents.some(event =>
            event.title === collaborator.name &&
            moment(event.start).isSame(selectedDate, 'day')
        );
    };

    const handleCollaboratorClick = async (collaborator) => {
        const newEvent = {
            title: collaborator.name,
            start: selectedDate,
            end: selectedDate,
            allDay: true,
            type: 'homeOffice'
        };

        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

            // POST para adicionar data de home office para o colaborador
            const response = await axiosInstance.post('/collaborator/api/collaborator-date/', {
                collaborator_id: collaborator.id,
                date: formattedDate,
            });

            if (response.status !== 201) {
                throw new Error('Erro ao agendar home office');
            }

            // Atualiza o estado local com o novo evento
            setHomeOfficeEvents([...homeOfficeEvents, { ...newEvent, id: response.data.id }]);
            closeModal();
            toast.success('Home office agendado com sucesso!');
        } catch (error) {
            console.error('Erro ao agendar home office:', error);
            toast.error('Erro ao agendar home office.');
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