import React from 'react';
import './EventModal.css';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Detalhes do Evento</h2>
        <p><strong>Título:</strong> {event.title}</p>
        <p><strong>Descrição:</strong> {event.description}</p>
        <p><strong>Início:</strong> {event.start}</p>
        <p><strong>Fim:</strong> {event.end}</p>
      </div>
    </div>
  );
};

export default EventDetailsModal;