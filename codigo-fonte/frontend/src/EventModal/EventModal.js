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
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Criar Evento</h2>
                <label>Título:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Data:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
};

export default EventModal;