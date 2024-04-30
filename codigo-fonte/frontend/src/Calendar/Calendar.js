import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(moment().toDate());
  const [currentNavigation, setCurrentNavigation] = useState('');

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await fetch(`https://www.calendario.com.br/feriados-belo_horizonte-mg.php?ano=${year}`);
        const data = await response.json();
        const holidayEvents = data.map(holiday => ({
          title: holiday.name,
          start: new Date(holiday.date),
          end: new Date(holiday.date),
          allDay: true
        }));
        setEvents(holidayEvents);
      } catch (error) {
        console.error('Erro ao buscar feriados:', error);
      }
    };

    fetchHolidays();
  }, []);

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

  const getCurrentNavigation = (view, date) => {
    if (view === Views.DAY) return moment(date).format('dddd, DD/MM/YYYY');
    if (view === Views.WEEK) {
      const startOfWeek = moment(date).startOf('week').format('DD/MM/YYYY');
      const endOfWeek = moment(date).endOf('week').format('DD/MM/YYYY');
      return `${startOfWeek} a ${endOfWeek}`;
    }
    if (view === Views.MONTH) return moment(date).format('MMMM, YYYY');
    return '';
  };

  return (
    <div className="calendar">
      <h2>Calendário</h2>
      <div className="toolbar-container">
        <div className="toolbar">
          <div className="navigation-container">
            <button className="toolbar-button" onClick={onPrevClick}>{'←'}</button>
            <div className="navigation-info">{currentNavigation}</div>
            <button className="toolbar-button" onClick={onNextClick}>{'→'}</button>
          </div>

          <div className="date-container">
            <button className="toolbar-button" onClick={() => setDate(moment().toDate())}>
              Hoje
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
              className={`toolbar-button ${view === Views.MONTH ? 'selected' : ''}`}
              onClick={() => setView(Views.MONTH)}
            >
              Mês
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
          style={{ height: 900 }}
          toolbar={false}
          view={view}
          date={date}
        />
      </div>
    </div>
  );
};

export default MyCalendar;