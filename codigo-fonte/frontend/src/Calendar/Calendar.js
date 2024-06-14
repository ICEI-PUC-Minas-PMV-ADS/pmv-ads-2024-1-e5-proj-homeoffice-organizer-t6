import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../NavBar/NavBar';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalCollaborator from "../NewCollaborator/ModalCollaborator";
import EventModal from "../EventModal/EventModal";
import EventDetailModal from "../EventModal/EventDetailModal";
import { toast } from "react-toastify";
import ModalCollaborators from "../CollaboratorsModal/ModalCollaborators";
import DeleteConfirmationModal from "../DeleteEvent/DeleteConfirmationModal";

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [homeOfficeEvents, setHomeOfficeEvents] = useState([]);
    const [filteredHomeOfficeEvents, setFilteredHomeOfficeEvents] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentNavigation, setCurrentNavigation] = useState('');
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            // função que busca feriados em uma api pública e insere no calendario como um evento
            try {
                const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/2024`);
                const data = await response.json();
                const holidayEvents = data.map(holiday => ({
                    title: holiday.name,
                    start: moment(holiday.date).toDate(),
                    end: moment(holiday.date).toDate(),
                    allDay: true,
                    type: 'holiday'
                }));
                setEvents(holidayEvents);
            } catch (error) {
                console.error('Erro ao buscar feriados:', error);
            }
        };

        fetchHolidays();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            // função que pega a lista de eventos que já foi criada pelo usuário
            try {
                const response = await fetch('http://127.0.0.1:8000/event/events-list/');
                if (!response.ok) {
                    throw new Error('Erro ao buscar eventos.');
                }
                const data = await response.json();
                const eventList = data.map(event => ({
                    title: event.title,
                    description: event.description,
                    start: moment(event.date).toDate(),
                    end: moment(event.date).toDate(),
                    allDay: true,
                    type: 'event'
                }));
                setEvents(prevEvents => [...prevEvents, ...eventList]);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error.message);
            }
        };

        fetchEvents();
    }, []);

    const fetchCollaboratorDates = async () => {
        // função que busca os dias de home office que foram marcados para os colaboradores
        try {
            const response = await fetch(`http://127.0.0.1:8000/collaborator/collaborator-dates-list/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar as datas dos colaboradores.');
            }
            const data = await response.json();
            const collaboratorEvents = data.map(item => ({
                id: item.id,
                title: item.collaborator,
                start: moment(item.date).toDate(),
                end: moment(item.date).toDate(),
                allDay: true,
                type: 'homeOffice'
            }));
            setHomeOfficeEvents(collaboratorEvents);
            setFilteredHomeOfficeEvents(collaboratorEvents);
        } catch (error) {
            console.error('Erro ao buscar as datas dos colaboradores:', error.message);
        }
    };

    useEffect(() => {
        fetchCollaboratorDates();
    }, []);

    const fetchCollaborators = async (sector) => {
        // função que pega o nome dos colaboradores e o filtra por determinado setor (de acordo com o setor que esta selecionado no select)
        try {
            let url = 'http://127.0.0.1:8000/collaborator/collaborators/';
            if (sector) {
                url += `?sector=${sector}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar colaboradores.');
            }
            const data = await response.json();
            setCollaborators(data);
        } catch (error) {
            console.error('Erro ao buscar colaboradores:', error.message);
            toast.error('Erro ao buscar colaboradores.');
        }
    };

    useEffect(() => {
        fetchCollaborators(selectedSector);
    }, [selectedSector]);

    useEffect(() => {
        // garante que a navegação atual seja sempre atualizada conforme a visualização e a data mudam, mantendo a interface do usuário sincronizada com os valores selecionados.
        setCurrentNavigation(getCurrentNavigation(view, date));
    }, [view, date]);

    useEffect(() => {
        // Quando o setor selecionado mudar, filtra os eventos de home office correspondentes ao setor
        const filteredEvents = homeOfficeEvents.filter(event => {
            // Se o setor não estiver selecionado, não retorna nenhum dia de home office
            if (!selectedSector) return true;
            // Verifica se o colaborador associado ao evento pertence ao setor selecionado
            const collaborator = collaborators.find(collab => collab.name === event.title);
            return collaborator && collaborator.sector === selectedSector;
        });
        setFilteredHomeOfficeEvents(filteredEvents);
    }, [selectedSector, homeOfficeEvents, collaborators]);

    const localizer = momentLocalizer(moment);

    const onNextClick = useCallback(() => {
        // função para atualizar a data ao avançar para o próximo mês
        setDate(prevDate => moment(prevDate).add(1, 'M').toDate());
    }, []);

    const onPrevClick = useCallback(() => {
        // função para atualizar a data ao retorceder para o mês anterior
        setDate(prevDate => moment(prevDate).subtract(1, 'M').toDate());
    }, []);

    const openModal = (type) => {
        // função pra abrir um modal com base no tipo fornecido
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        // função pra fechar o modal
        setShowModal(false);
    };

    const getCurrentNavigation = (view, date) => {
        // função para obter a navegação atual (mês/ano) com base na visualização e data atual
        if (view === Views.MONTH) return moment(date).format('MMMM, YYYY');
        return '';
    };

    const getDayProp = (date) => {
        // função para obter as propriedades do dia no calendário
        const isCurrentMonth = moment(date).isSame(date, 'month');
        const isToday = moment(date).isSame(moment(), 'day');

        const dayProp = {};

        if (!isCurrentMonth) {
            dayProp.className = 'other-month-day';
        }

        if (isToday) {
            dayProp.className = (dayProp.className || '') + ' current-day';
        }

        return dayProp;
    };

    const handleDeleteHome = async (collaboratorId) => {
        //função para deletar o "evento" de home office de determinado colaborador
        try {
            const response = await fetch(`http://127.0.0.1:8000/collaborator/collaborator-date-delete/${collaboratorId}/`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir home office');
            }
            setHomeOfficeEvents(prevEvents => prevEvents.filter(e => e.id !== collaboratorId));
            toast.success('Marcação excluída com sucesso!');
            closeModal();
        } catch (error) {
            console.error('Erro ao excluir home office:', error);
            toast.error(`Erro ao excluir home office`);
        }
    };

    const handleSaveEvent = (newEvent) => {
        // função para salvar "evento" de home office do colaborador
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleSectorChange = (e) => {
        // função que lida com a mudança de setor
        setSelectedSector(e.target.value);
        setSelectedCollaborator(''); // Limpa o colaborador selecionado
    };


    const handleCollaboratorChange = (e) => {
        // função que lida com a mudança de colaborador
        const value = e.target.value;
        if (value === '') {
            setSelectedCollaborator('');
        } else {
            setSelectedCollaborator(value);
        }
    };

    useEffect(() => {
        // funçao que filtra "eventos" de home office com base no setor e colaborador selecionados
        const filteredHomeOfficeEvents = homeOfficeEvents.filter(event => {
            const collaborator = collaborators.find(collab => collab.name === event.title);
            return (
                selectedSector &&
                (!selectedSector || (collaborator && collaborator.sector === selectedSector)) &&
                (!selectedCollaborator || event.title === selectedCollaborator)
            );
        });

        // Mantem todos os eventos que não são de home office
        const nonHomeOfficeEvents = events.filter(event => event.type !== 'homeOffice');

        // Combina eventos filtrados de home office com os eventos que não são de home office (feriados e eventos criados pelo usuário)
        setFilteredHomeOfficeEvents([...filteredHomeOfficeEvents, ...nonHomeOfficeEvents]);
    }, [selectedSector, selectedCollaborator, homeOfficeEvents, collaborators, events]);

    const handleCollaboratorNameStyle = (event) => {
        // essa função é usada pra definir o nome do colaborador como o "título do evento"
        const collaboratorName = event.title;
        const collaboratorIndex = collaborators.findIndex(collaborator => collaborator.name === collaboratorName);
        const collaboratorColor = collaboratorColors[collaboratorIndex % collaboratorColors.length];

        const style = {
            backgroundColor: collaboratorColor,
            color: 'white',
            borderRadius: '3px',
            padding: '3px',
            display: 'inline-block',
            cursor: 'pointer'
        };

        return { style };
    };

    const collaboratorColors = [
        // essas sao as cores dos do container de cada colaborador de acordo com a ordem de criação.
        '#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#33FFA5',
        '#A533FF', '#FFA533', '#33FFFA', '#FF3357', '#57FF33',
    ];

    const handleDrop = (e, slotInfo) => {
        e.preventDefault();
        const collaborator = JSON.parse(e.dataTransfer.getData('collaborator'));
        const newEvent = {
            title: collaborator.name,
            start: slotInfo.start,
            end: slotInfo.start,
            allDay: true,
            type: 'homeOffice'
        };
        setHomeOfficeEvents([...homeOfficeEvents, newEvent]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleInvalidDaySelect = (slotInfo) => {
        // função que lida com a seleção de um dia inválido pra marcar home office no calendário. (se a pessoa selecionar um evento, feriado ou fim de semana, aparece a msg que não é possível fazer home office naquele dia)
        const selectedDayHasEvent = combinedEvents.some(event =>
            moment(event.start).isSame(slotInfo.start, 'day') && event.type === 'event'
        );

        const selectedDayIsHoliday = combinedEvents.some(event =>
            moment(event.start).isSame(slotInfo.start, 'day') && event.type === 'holiday'
        );

        const selectedDay = moment(slotInfo.start).day(); // 0: Domingo, 6: Sábado
        const isWeekend = (selectedDay === 0 || selectedDay === 6);

        if (selectedDayHasEvent || selectedDayIsHoliday || isWeekend) {
            toast.error('Não é possível fazer home office nesse dia.');
        } else {
            if (!selectedSector) {
                toast.error('Por favor, selecione um setor primeiro.');
                return;
            }
            setSelectedDate(slotInfo.start);
            openModal('collaborators');
        }
    };

    const handleCollaboratorSelect = async (collaborator) => {
        // função para selecionar um colaborador e atribuir o home office em uma data específica (na data que ele clicou)
        if (homeOfficeEvents.some(event => moment(event.start).isSame(selectedDate, 'day'))) {
            toast.error('Já existe um evento para esta data.');
            return;
        }
        const newEvent = {
            id: Date.now(),
            title: collaborator.name,
            start: selectedDate,
            end: selectedDate,
            allDay: true,
            type: 'homeOffice'
        };
        setHomeOfficeEvents(prevHomeOfficeEvents => [...prevHomeOfficeEvents, newEvent]);
        closeModal();
    };

    const combinedEvents = [...filteredHomeOfficeEvents]; // Usa os eventos filtrados, incluindo sem ser home office

    const eventPropGetter = (event) => {
        // essa funçao diferencia o estilo de cada tipo de 'evento' no calendário. Se é feriado ou evento criado o container é preto.
        if (event.type === 'holiday' || event.type === 'event') {
            return {
                style: {
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '5px',
                    padding: '2px 5px',
                    height: '1vw',
                    fontSize: '0.75vw'

                }
            };
        } else if (event.type === 'homeOffice') {
            const collaboratorName = event.title;
            const collaboratorIndex = collaborators.findIndex(collaborator => collaborator.name === collaboratorName);
            const collaboratorColor = collaboratorColors[collaboratorIndex % collaboratorColors.length];
            return {
                style: {
                    backgroundColor: collaboratorColor,
                    color: 'white',
                    borderRadius: '5px',
                    padding: '2px 5px',
                    height: '1vw',
                    fontSize: '0.75vw'
                }
            };
        }
        return {};
    };

    const handleCollaboratorClick = (event) => {
        // Verifica se o item clicado é um colaborador
        if (event.type === 'homeOffice') {
            setSelectedEvent(event);
            setModalType('deleteConfirmation'); // Define o modal que vai abrir como o de confirmação pra deletar aquele home office
            setShowModal(true); // Abre o modal
        }
    };

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
                                <button className="toolbar-button" onClick={() => openModal('collaborator')}>
                                    <span className="icon"><FontAwesomeIcon icon={faPlus} /> </span>
                                    <span className="text">Adicionar Colaborador</span>
                                </button>
                                <div className="select-container">
                                    <select
                                        className="select"
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
                                    <div className="select-arrow"></div>
                                </div>
                                <div className="select-container">
                                    <select
                                        className="select"
                                        value={selectedCollaborator}
                                        onChange={handleCollaboratorChange}
                                    >
                                        <option value="">
                                            {selectedCollaborator ? 'Limpar filtro' : 'Selecione um colaborador'}
                                        </option>
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
                                    <span className="icon"><FontAwesomeIcon icon={faPlus} /> </span>
                                    <span className="text">Criar Evento</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <Navbar pageName={''} />
            <CalendarToolbar
                selectedSector={selectedSector}
                selectedCollaborator={selectedCollaborator}
                collaborators={collaborators}
                handleSectorChange={handleSectorChange}
                handleCollaboratorChange={handleCollaboratorChange}
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                currentNavigation={currentNavigation}
                openModal={openModal}
            />
            <div className="calendar-content">
                <div
                    className="calendar-wrapper"
                    onDrop={(e) => handleDrop(e, { start: selectedDate })}
                    onDragOver={handleDragOver}
                >
                    <Calendar
                        selectable
                        onSelectSlot={handleInvalidDaySelect}
                        localizer={localizer}
                        events={combinedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 'calc(100vh - 200px)', width: '100%' }}
                        toolbar={false}
                        view={view}
                        date={date}
                        dayPropGetter={getDayProp}
                        onSelectEvent={handleCollaboratorClick}
                        views={['month']}
                        eventPropGetter={eventPropGetter}
                        eventContent={handleCollaboratorNameStyle}
                        showMultiDayTimes
                        showMore={() => null}
                    />
                </div>
            </div>
            {showModal && modalType === 'collaborators' && (
                <ModalCollaborators
                    selectedDate={selectedDate}
                    closeModal={closeModal}
                    collaborators={collaborators}
                    handleCollaboratorSelect={handleCollaboratorSelect}
                    colors={collaboratorColors}
                    homeOfficeEvents={homeOfficeEvents}
                    setHomeOfficeEvents={setHomeOfficeEvents}
                />
            )}
            {showModal && modalType === 'collaborator' && (
                <ModalCollaborator
                    selectedDate={selectedDate}
                    closeModal={closeModal}
                />
            )}
            {showModal && modalType === 'event' && <EventModal closeModal={closeModal} onSave={handleSaveEvent} />}
            {showModal && modalType === 'detail' && <EventDetailModal closeModal={closeModal} event={selectedEvent} />}
            {showModal && modalType === 'deleteConfirmation' && selectedEvent && (
                <DeleteConfirmationModal
                    collaboratorId={selectedEvent.id}
                    collaboratorName={selectedEvent.title}
                    onDelete={handleDeleteHome}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default MyCalendar;