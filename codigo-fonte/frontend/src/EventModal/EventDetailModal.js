import React from 'react';
import './EventDetailsModal.css';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const EventDetailModal = ({ closeModal, event }) => {
    if (!event) return null;

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/event/events/delete/${event.id}`, {
                method: 'DELETE'
            });
            if (response.status === 204) {
                toast.success('Evento apagado');
                closeModal();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error('Erro ao deletar esse evento');
            }
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
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
                <p><strong>Data:</strong> {new Date(event.start).toLocaleString()}</p>
                <button className="delete-button" onClick={handleDelete}>Deletar Evento</button>
            </div>
        </div>
    );
};

export default EventDetailModal;