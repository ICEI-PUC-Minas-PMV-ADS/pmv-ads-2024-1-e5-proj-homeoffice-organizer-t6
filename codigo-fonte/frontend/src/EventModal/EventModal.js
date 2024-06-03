import React, { useState } from 'react';
import './EventModal.css';

const EventModal = ({ closeModal, onSave }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleSave = () => {
        const newEvent = {
            title,
            start: new Date(date),
            end: new Date(date),
        };
        onSave(newEvent);
        closeModal();
    };

    return (
        <div className="event-modal"> {/* Defina a classe "event-modal" aqui */}
            <div className="event-modal-content"> {/* Defina a classe "event-modal-content" aqui */}
                <span className="event-close" onClick={closeModal}>&times;</span>
                <h2>Criar Evento</h2>
                <label>Título:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Data:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button type="submit" onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
};

export default EventModal;