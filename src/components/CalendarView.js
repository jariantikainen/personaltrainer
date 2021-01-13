import React, { useState, useEffect } from "react";
import '../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Typography } from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/en-gb';

moment.updateLocale('en-gb', {
  week: {
      dow: 1,
      doy: 1,
  },
});
// Calendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

const MyCalendar = () => { 
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => {
      return setTrainings(
        data.map(training => ({
          start: new Date(training.date),
          end: new Date(moment(training.date).add(training.duration, "minutes")),
          title: training.activity + ": " + training.customer.firstname + " " + training.customer.lastname
        }))
      );
    });
  };
  console.log("trainings", trainings);
  //console.log(moment.locale());
  
  return(
    <div>
      <div className="ag-theme-material" style={{ height: 700, width: '80%', margin: 'auto' }}>
      <Typography color="primary">
          <h1>Calendar</h1>
          </Typography>
      <Calendar
        localizer={localizer}
        events={trainings}
        defaultDate={new Date()}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
    </div>
  )
}

export default MyCalendar;