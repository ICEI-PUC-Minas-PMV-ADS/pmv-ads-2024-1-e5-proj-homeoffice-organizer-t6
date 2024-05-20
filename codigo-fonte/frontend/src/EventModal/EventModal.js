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
    </div>
  );
};

export default EventModal;