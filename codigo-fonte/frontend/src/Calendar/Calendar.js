import React, {useState, useEffect, useCallback} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../NavBar/NavBar';
import './Calendar.css';
import CalendarToolbar from './CalendarToolbar';
import ModalCollaborator from "../NewCollaborator/ModalCollaborator";
import EventModal from "../EventModal/EventModal";
import EventDetailModal from "../EventModal/EventDetailModal";
import './Select.css'
import {toast} from "react-toastify";
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
        setCurrentNavigation(getCurrentNavigation(view, date));
    }, [view, date]);

    useEffect(() => {
        // Quando o setor selecionado mudar, filtrar os eventos de home office correspondentes ao setor
        const filteredEvents = homeOfficeEvents.filter(event => {
            // Se o setor não estiver selecionado, retorna todos os eventos de home office
            if (!selectedSector) return true;
            // Verifica se o colaborador associado ao evento pertence ao setor selecionado
            const collaborator = collaborators.find(collab => collab.name === event.title);
            return collaborator && collaborator.sector === selectedSector;
        });
        setFilteredHomeOfficeEvents(filteredEvents);
    }, [selectedSector, homeOfficeEvents, collaborators]);

    const localizer = momentLocalizer(moment);

    const onNextClick = useCallback(() => {
        setDate(prevDate => moment(prevDate).add(1, 'M').toDate());
    }, []);

    const onPrevClick = useCallback(() => {
        setDate(prevDate => moment(prevDate).subtract(1, 'M').toDate());
    }, []);

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getCurrentNavigation = (view, date) => {
        if (view === Views.MONTH) return moment(date).format('MMMM, YYYY');
        return '';
    };

    const getDayProp = (date) => {
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
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleSectorChange = (e) => {
        setSelectedSector(e.target.value);
        setSelectedCollaborator(''); // Limpa o colaborador selecionado
    };


    const handleCollaboratorChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setSelectedCollaborator('');
        } else {
            setSelectedCollaborator(value);
        }
    };

    useEffect(() => {
        // Filtrar eventos de home office com base no setor e colaborador selecionados
        const filteredHomeOfficeEvents = homeOfficeEvents.filter(event => {
            const collaborator = collaborators.find(collab => collab.name === event.title);
            return (
                selectedSector &&
                (!selectedSector || (collaborator && collaborator.sector === selectedSector)) &&
                (!selectedCollaborator || event.title === selectedCollaborator)
            );
        });

        // Manter todos os eventos que não são de home office
        const nonHomeOfficeEvents = events.filter(event => event.type !== 'homeOffice');

        // Combinar eventos filtrados de home office com os eventos que não são de home office
        setFilteredHomeOfficeEvents([...filteredHomeOfficeEvents, ...nonHomeOfficeEvents]);
    }, [selectedSector, selectedCollaborator, homeOfficeEvents, collaborators, events]);


    const collaboratorColors = [
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

    const handleSlotSelect = (slotInfo) => {
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

    const combinedEvents = [...filteredHomeOfficeEvents]; // Usar os eventos filtrados, incluindo não-homeOffice

    const eventPropGetter = (event) => {
        if (event.type === 'holiday') {
            return {style: {backgroundColor: '#0000000'}}; // Cor fixa para feriados
        } else if (event.type === 'homeOffice') {
            const collaboratorName = event.title;
            const collaboratorIndex = collaborators.findIndex(collaborator => collaborator.name === collaboratorName);
            const collaboratorColor = collaboratorColors[collaboratorIndex % collaboratorColors.length];
            return {style: {backgroundColor: collaboratorColor}}; // Cor dinâmica baseada no colaborador
        }
    };

    const handleCollaboratorNameStyle = (event) => {
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

        return {style};
    };

    const handleCollaboratorClick = (event) => {
        // Verifique se o item clicado é um colaborador
        if (event.type === 'homeOffice') {
            setSelectedEvent(event);
            setModalType('deleteConfirmation'); // Definir o tipo do modal como 'deleteConfirmation'
            setShowModal(true); // Abrir o modal
        }
    };

    return (
        <div className="calendar-container">
            <Navbar pageName={''}/>
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
                    onDrop={(e) => handleDrop(e, {start: selectedDate})}
                    onDragOver={handleDragOver}
                >
                    <Calendar
                        selectable
                        onSelectSlot={handleSlotSelect}
                        localizer={localizer}
                        events={combinedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: 700, width: '100%'}}
                        toolbar={false}
                        view={view}
                        date={date}
                        dayPropGetter={getDayProp}
                        onSelectEvent={handleCollaboratorClick}
                        views={['month']}
                        eventPropGetter={eventPropGetter}
                        eventContent={handleCollaboratorNameStyle}
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
            {showModal && modalType === 'event' && <EventModal closeModal={closeModal} onSave={handleSaveEvent}/>}
            {showModal && modalType === 'detail' && <EventDetailModal closeModal={closeModal} event={selectedEvent}/>}
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