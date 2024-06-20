import {toast} from "react-toastify";
import {useState} from "react";
import './DeleteCollaborator.css'

const ModalDeleteCollaborator = ({closeModal, collaborators}) => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState('');

    const handleSectorChange = (e) => {
        setSelectedSector(e.target.value);
        setSelectedCollaborator('');
    };

    const handleCollaboratorChange = (e) => {
        setSelectedCollaborator(e.target.value);
    };

    const handleDelete = async () => {
        if (selectedCollaborator) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/collaborator/collaborator/${selectedCollaborator}/`, {
                    method: 'DELETE',
                });

                if (response.status === 204) {
                    toast.success('Colaborador deletado com sucesso.');
                } else {
                    toast.error('Erro ao deletar colaborador.');
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                closeModal();
            } catch (error) {
                console.error('Erro:', error);
                toast.error('Erro ao deletar colaborador.');
                closeModal();
            }
        } else {
            toast.error('Por favor, selecione um colaborador.');
        }
    };

    const filteredCollaborators = collaborators.filter(collaborator => collaborator.sector === selectedSector);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Deletar Colaborador</h2>
                <p>Selecione um setor e um colaborador para deletar:</p>
                <select
                    className="white-select"
                    value={selectedSector}
                    onChange={handleSectorChange}
                >
                    <option value="">
                        {selectedSector ? 'Limpar filtro' : 'Selecione um setor'}
                    </option>
                    <option value="atendimento">Atendimento</option>
                    <option value="comunicação">Comunicação</option>
                    <option value="conteúdo">Conteúdo</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="onidevs">Onidevs</option>
                    <option value="qh4">QH4</option>
                    <option value="rh">RH</option>
                </select>
                <select
                    className="white-select"
                    value={selectedCollaborator}
                    onChange={handleCollaboratorChange}
                    disabled={!selectedSector}
                >
                    <option value="">Selecione um colaborador</option>
                    {filteredCollaborators.map(collaborator => (
                        <option key={collaborator.id} value={collaborator.id}>
                            {collaborator.name}
                        </option>
                    ))}
                </select>
                <div className="modal-buttons">
                    <button className="button delete-button" onClick={handleDelete}>Deletar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteCollaborator;