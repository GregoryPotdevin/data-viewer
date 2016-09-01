import React from 'react'

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import events from './events'
console.log("events", events)

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export class CalendarApp extends React.Component {
  render(){
    return (
      <div style={{padding: 24, fontSize: '0.8em', height: '100%'}}>
        <BigCalendar
          culture="fr"
          events={events}
          messages={{
            month: "mois",
            week: "semaine",
            day: "jour",
            today: "aujourd'hui",
            previous: "précédent",
            next: "suivant",
          }}
        />
      </div>
    )
  }
}