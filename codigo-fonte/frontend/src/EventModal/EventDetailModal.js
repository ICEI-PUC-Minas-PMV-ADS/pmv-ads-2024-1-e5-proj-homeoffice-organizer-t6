import React from 'react';
import './EventDetailsModal.css';
import { toast } from 'react-toastify';

const EventDetailModal = ({ closeModal, event }) => {
    if (!event) return null;

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/event/events/delete/${event.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success('Evento apagado');
                closeModal();
                window.location.reload()
            } else {
              console.log(event)
                toast.error('Erro ao deletar esse evento');
            }
        } catch (error) {
            console.log(event)
            toast.error('Erro ao deletar esse evento');
        }
    };

    return (
        <div className="modal open">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Detalhes do Evento</h2>
                <p><strong>Título:</strong> {event.title}</p>
                <p><strong>Descrição:</strong> {event.description}</p>
                <p><strong>Início:</strong> {new Date(event.start).toLocaleString()}</p>
                <p><strong>Fim:</strong> {new Date(event.end).toLocaleString()}</p>
                <button className="delete-button" onClick={handleDelete}>Deletar Evento</button>
            </div>
        </div>
    );
};

export default EventDetailModal;