import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const MyCalendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
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
  }, [year]);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar">
      <h2>Calendário</h2>
      <div className="calendar-controls">
        <label htmlFor="yearSelect">Ano:</label>
        <select id="yearSelect" value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;