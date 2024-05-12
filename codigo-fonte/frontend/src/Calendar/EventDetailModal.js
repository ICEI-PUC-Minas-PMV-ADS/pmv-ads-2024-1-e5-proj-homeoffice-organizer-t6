import React from 'react';

const EventDetailModal = ({ isOpen, onClose, event }) => {
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
      <style jsx>{`
        /* Estilos do modal */
        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal.open {
          display: block;
        }

        /* Conteúdo do Modal */
        .modal-content {
          background-color: #fefefe;
          margin: 10% auto;
          padding: 20px;
          border: 1px solid #888;
          border-radius: 5px;
          width: 60%;
          max-width: 500px;
        }

        /* Botão de Fechar */
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default EventDetailModal;