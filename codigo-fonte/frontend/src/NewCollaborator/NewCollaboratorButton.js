import React from 'react';
import './NewCollaboratorButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewCollaboratorButton = ({ onClick }) => {
    return (
        <button className="new-collaborator-button" onClick={onClick}>
            <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
            <span className="text">Adicionar Colaborador</span>
        </button>
    );
};

export default NewCollaboratorButton;