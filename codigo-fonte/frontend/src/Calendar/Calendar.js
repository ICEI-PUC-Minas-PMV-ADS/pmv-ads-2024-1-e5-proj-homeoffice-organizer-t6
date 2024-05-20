import React, {useState, useEffect, useCallback} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import NewCollaboratorButton from "../NewCollaborator/NewCollaboratorButton";
import ModalCollaborator from "../NewCollaborator/ModalCollaborator";
import {showToast} from "../ToastContainer";
// import EventModal from "../EventModal/EventModal";
// import EventDetailModal from "../EventModal/EventDetailModal";
import './Select.css'

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(moment().toDate());
    const [currentNavigation, setCurrentNavigation] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState('');

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/2024`);
                const data = await response.json();
                const holidayEvents = data.map(holiday => ({
                    title: holiday.name,
                    start: moment(holiday.date).toDate(),
                    end: moment(holiday.date).toDate(),
                    allDay: true
                }));
                setEvents(holidayEvents);
            } catch (error) {
                console.error('Erro ao buscar feriados:', error);
            }
        };

        fetchHolidays();
    }, []);

    const fetchCollaborators = async (sector) => {
        try {
            let url = 'http://127.0.0.1:8000/collaborator/collaborators/';
            if (sector) {
                url += `?sector=${sector}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                showToast('Erro ao buscar colaboradores.', 'error');
            }
            const data = await response.json();
            setCollaborators(data);
        } catch (error) {
            console.error('Erro:', error);
            showToast('Erro ao buscar colaboradores.', 'error');
        }
    };

    useEffect(() => {
        fetchCollaborators(selectedSector);
    }, [selectedSector]);

    useEffect(() => {
        setCurrentNavigation(getCurrentNavigation(view, date));
    }, [view, date]);

    const localizer = momentLocalizer(moment);

    const onNextClick = useCallback(() => {
        if (view === Views.DAY) setDate(prevDate => moment(prevDate).add(1, 'd').toDate());
        if (view === Views.WEEK) setDate(prevDate => moment(prevDate).add(1, 'w').toDate());
        if (view === Views.MONTH) setDate(prevDate => moment(prevDate).add(1, 'M').toDate());
    }, [view]);

    const onPrevClick = useCallback(() => {
        if (view === Views.DAY) setDate(prevDate => moment(prevDate).subtract(1, 'd').toDate());
        if (view === Views.WEEK) setDate(prevDate => moment(prevDate).subtract(1, 'w').toDate());
        if (view === Views.MONTH) setDate(prevDate => moment(prevDate).subtract(1, 'M').toDate());
    }, [view]);

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getCurrentNavigation = (view, date) => {
        if (view === Views.DAY) return moment(date).format('dddd, DD/MM/YYYY');
        if (view === Views.WEEK) {
            const startOfWeek = moment(date).startOf('week').format('DD/MM/YYYY');
            const endOfWeek = moment(date).endOf('week').format('DD/MM/YYYY');
            return `${startOfWeek} - ${endOfWeek}`;
        }
        if (view === Views.MONTH) return moment(date).format('MMMM, YYYY');
        return '';
    };

    const getDayProp = (date) => {
        const dayOfWeek = date.getDay();
        const isCurrentMonth = moment(date).isSame(date, 'month');
        const isToday = moment(date).isSame(moment(), 'day'); // Verifica se é o dia atual

        const dayProp = {};

        if (!isCurrentMonth) {
            dayProp.className = 'other-month-day'; // Adiciona uma classe para dias fora do mês atual
        }

        if (isToday) {
            dayProp.className = (dayProp.className || '') + ' current-day'; // Adiciona a classe para o dia atual
        }

        return dayProp;
    };

    const handleSaveEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        openModal('detail');
    };

    const handleSectorChange = (e) => {
        setSelectedSector(e.target.value);
    };

    const handleCollaboratorChange = (e) => {
        setSelectedCollaborator(e.target.value);
    };


    return (
        <div className="calendar">
            <h2>Calendário</h2>
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
                        <button className="toolbar-button" onClick={onPrevClick}>
                            {'<'}
                        </button>
                        <div className="navigation-info">{currentNavigation}</div>
                        <button className="toolbar-button" onClick={onNextClick}>
                            {'>'}
                        </button>
                        <button
                            className={`toolbar-button ${view === Views.DAY ? 'selected' : ''}`}
                            onClick={() => setView(Views.DAY)}
                        >
                            Dia
                        </button>
                        <button
                            className={`toolbar-button ${view === Views.WEEK ? 'selected' : ''}`}
                            onClick={() => setView(Views.WEEK)}
                        >
                            Semana
                        </button>
                        <button
                            className={`toolbar-button ${
                                view === Views.MONTH ? 'selected' : ''
                            }`}
                            onClick={() => setView(Views.MONTH)}
                        >
                            Mês
                        </button>
                        <button className="toolbar-button" onClick={() => openModal('event')}>
                            Criar Evento
                        </button>
                    </div>
                </div>
            </div>

            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 900, width: '90vw'}}
                    toolbar={false}
                    view={view}
                    date={date}
                    dayPropGetter={getDayProp}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
            {showModal && modalType === 'collaborator' && (
                <ModalCollaborator closeModal={closeModal}/>
            )}
            {/* {showModal && modalType === 'event' && <EventModal closeModal={closeModal} onSave={handleSaveEvent}/>} */}{' '}
            {/* {showModal && modalType === 'detail' && <EventDetailModal closeModal={closeModal} event={selectedEvent}/>} */}{' '}
        </div>
    );
};

export default MyCalendar;