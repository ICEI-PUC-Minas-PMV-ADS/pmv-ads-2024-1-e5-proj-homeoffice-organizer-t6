import React, {useState, useEffect, useCallback} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../NavBar/NavBar';
import './Calendar.css';
import CalendarToolbar from './CalendarToolbar';
import ModalCollaborator from "../NewCollaborator/ModalCollaborator";
import {showToast} from "../ToastContainer";
import EventModal from "../EventModal/EventModal";
import EventDetailModal from "../EventModal/EventDetailModal";
import './Select.css'
import {toast} from "react-toastify";
import ModalCollaborators from "../CollaboratorsModal/ModalCollaborators";

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [daysHome, setDaysHome] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(moment().toDate());
    const [currentNavigation, setCurrentNavigation] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

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

    const fetchCollaboratorDates = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/collaborator/collaborator-dates-list/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar as datas dos colaboradores.');
            }
            const data = await response.json();
            setDaysHome(data);
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

    const colors = [
        '#4053F7', '#F7404B', '#FAE400', '#FFA07A', '#36FA54',
        '#157B13', '#66FF33', '#40F753', '#A1FFA1', '#243328',
    ];

    const handleDrop = (e, slotInfo) => {
        e.preventDefault();
        const collaborator = JSON.parse(e.dataTransfer.getData('collaborator'));
        const newEvent = {
            title: collaborator.name,
            start: slotInfo.start,
            end: slotInfo.start,
            allDay: true
        };
        setEvents([...events, newEvent]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSlotSelect = (slotInfo) => {
        if (!selectedSector) {
            toast.error('Por favor, selecione um setor primeiro.');
            return;
        }
        setSelectedDate(slotInfo.start);
        openModal('collaborators');
    };

    const handleCollaboratorSelect = async (collaborator) => {
        if (events.some(event => moment(event.start).isSame(selectedDate, 'day'))) {
            toast.error('Já existe um evento para esta data.');
            return;
        }
        const newEvent = {
            title: collaborator.name,
            start: selectedDate,
            end: selectedDate,
            allDay: true
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    return (
        <div className="calendar-container">
            <Navbar/>
            <CalendarToolbar
                selectedSector={selectedSector}
                selectedCollaborator={selectedCollaborator}
                collaborators={collaborators}
                handleSectorChange={handleSectorChange}
                handleCollaboratorChange={handleCollaboratorChange}
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                currentNavigation={currentNavigation}
                view={view}
                setView={setView}
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
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: 700, width: '100%'}}
                        toolbar={false}
                        view={view}
                        date={date}
                        dayPropGetter={getDayProp}
                        onSelectEvent={handleSelectEvent}
                        views={['month']}
                    />
                </div>
            </div>
            {showModal && modalType === 'collaborators' && (
                <ModalCollaborators
                    selectedDate={selectedDate}
                    closeModal={closeModal}
                    collaborators={collaborators}
                    handleCollaboratorSelect={handleCollaboratorSelect}
                    events={events}
                    colors={colors}
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
        </div>
    );
};

export default MyCalendar;