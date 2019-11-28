import React from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const CalendarContainer = () => {

    let events = [{
        title: 'event',
        start: moment().startOf('day').add(8, 'hours').toDate(),
        end: moment().startOf('day').add(9, 'hours').toDate(),
        allDay: false
    }]




    const divStyle = {
        height: '500px',
    }

    return (
        <div style={divStyle}>
            <Calendar
                culture={"en-GB"}
                localizer={localizer}
                events={events}
            />
        </div>
    );

}

export default CalendarContainer;