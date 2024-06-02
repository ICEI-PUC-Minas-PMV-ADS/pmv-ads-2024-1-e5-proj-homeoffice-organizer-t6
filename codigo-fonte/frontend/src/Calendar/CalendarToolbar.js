import React from 'react';
import NewCollaboratorButton from "../NewCollaborator/NewCollaboratorButton";
import './Select.css';

const CalendarToolbar = ({
                             selectedSector,
                             selectedCollaborator,
                             collaborators,
                             handleSectorChange,
                             handleCollaboratorChange,
                             onPrevClick,
                             onNextClick,
                             currentNavigation,
                             openModal
                         }) => {
    return (
        <div className="content-page">
            <div className="toolbar-container">
                <div className="toolbar">
                    <div className="left-buttons">
                        <div className="collaborator-container">
                            <NewCollaboratorButton
                                onClick={() => openModal('collaborator')}
                                className="left-button"
                            />
                            <div className="select-container">
                                <select
                                    className="select"
                                    value={selectedSector}
                                    onChange={handleSectorChange}
                                >
                                    <option value="">Selecione um setor</option>
                                    <option value="atendimento">Atendimento</option>
                                    <option value="comunicação">Comunicação</option>
                                    <option value="conteúdo">Conteúdo</option>
                                    <option value="financeiro">Financeiro</option>
                                    <option value="onidevs">Onidevs</option>
                                    <option value="qh4">QH4</option>
                                    <option value="rh">RH</option>
                                </select>
                                <div className="select-arrow"></div>
                            </div>
                            <div className="select-container">
                                <select
                                    className="select"
                                    value={selectedCollaborator}
                                    onChange={handleCollaboratorChange}
                                >
                                    <option value="">Selecione um colaborador</option>
                                    {selectedSector &&
                                        collaborators
                                            .filter(
                                                collaborator =>
                                                    collaborator.sector === selectedSector
                                            )
                                            .map(collaborator => (
                                                <option key={collaborator.id} value={collaborator.name}>
                                                    {collaborator.name}
                                                </option>
                                            ))}
                                </select>
                                <div className="select-arrow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="right-buttons">
                        <div className="options-container">
                            <button className="toolbar-button" onClick={onPrevClick}>
                                {'<'}
                            </button>
                            <div className="navigation-info">{currentNavigation}</div>
                            <button className="toolbar-button" onClick={onNextClick}>
                                {'>'}
                            </button>
                            <button className="toolbar-button" onClick={() => openModal('event')}>
                                Criar Evento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarToolbar;