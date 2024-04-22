import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);

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

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar">
      <h2>Calendário</h2>
      <div className="toolbar-container">
        <div className="toolbar">
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
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          toolbar={false}
          view={view}
        />
      </div>
    </div>
  );
};

export default MyCalendar;