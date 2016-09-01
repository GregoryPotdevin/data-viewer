import React from 'react'
import { AdminPanel } from '../components'

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
      <AdminPanel title="Calendrier" style={{height: '100%'}}>
        <div style={{height: 'calc(100% - 70px)'}}>
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
      </AdminPanel>
    )
  }
}