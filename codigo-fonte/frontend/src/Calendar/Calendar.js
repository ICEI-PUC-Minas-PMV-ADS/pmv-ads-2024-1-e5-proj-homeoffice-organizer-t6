import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // Função para buscar os feriados na API
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`https://www.calendario.com.br/feriados-belo_horizonte-mg.php?ano=${year}`);
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error('Erro ao buscar feriados:', error);
      }
    };

    fetchHolidays();
  }, [year]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Função para verificar se um dia é feriado
  const isHoliday = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return holidays.some(holiday => holiday.date === dateString);
  };

  // Função para aplicar estilos aos dias do calendário
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isHoliday(date)) {
        return 'holiday';
      }
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return 'weekend';
      }
    }
    return null;
  };

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
  };

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
          onChange={onChange}
          value={date}
          className="custom-calendar"
          tileClassName={tileClassName} // Aplicando a função para definir a classe dos dias
        />
      </div>
    </div>
  );
};

export default MyCalendar;

