import React from 'react';
import './EventModal.css';

const EventDetailsModal = ({ closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Adicionar Colaborador</h2>
                <form>
                    <label htmlFor="collaboratorName">Nome:</label>
                    <input type="text" id="collaboratorName" name="collaboratorName" />
                    <label htmlFor="department">Departamento:</label>
                    <select id="department" name="department">
                        <option value="department1">Departamento 1</option>
                        <option value="department2">Departamento 2</option>
                        <option value="department3">Departamento 3</option>
                    </select>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    );
};

export default EventDetailsModal;