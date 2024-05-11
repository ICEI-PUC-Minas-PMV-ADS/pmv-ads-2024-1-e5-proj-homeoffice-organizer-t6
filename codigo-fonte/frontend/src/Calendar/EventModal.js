import React, { useState } from 'react';

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Criar Evento</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={eventData.title} onChange={handleChange} required />
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={eventData.description} onChange={handleChange} />
          <label htmlFor="start">Início:</label>
          <input type="datetime-local" id="start" name="start" value={eventData.start} onChange={handleChange} required />
          <label htmlFor="end">Fim:</label>
          <input type="datetime-local" id="end" name="end" value={eventData.end} onChange={handleChange} required />
          <button type="submit">Salvar</button>
        </form>
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

        /* Formulário */
        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 5px;
        }

        input[type="text"],
        input[type="datetime-local"],
        textarea {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button[type="submit"] {
          padding: 12px 24px;
          background-color: #DDAE3A;
          color: #212121;
          border: 2px solid #212121;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-weight: bold;
        }

        button[type="submit"]:hover {
          background-color: #C49C0A;
        }
      `}</style>
    </div>
  );
};

export default EventModal;