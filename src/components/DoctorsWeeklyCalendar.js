import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'

import '../styles/styles.scss'




const DoctorsWeeklyCalendar = (props) => {
    let events = []

    if (props.bookings.length) {
        events = props.bookings.map(booking => ({
            title: `${booking.patientInfo.patientName} 
                          ✆ ${booking.patientInfo.patientPhone}
                          ✉ ${booking.patientInfo.patientEmail}`,
            start: moment(booking.time).toDate(),
            end: moment(booking.time).add(30, 'minutes').toDate(),
            allDay: false
        })
        )
    }


    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            defaultView="dayGridWeek"
            header={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            weekends={false}
            events={events}
            height={500}
            selectable={true}
            select={()=>alert('selected ' + info.startStr + ' to ' + info.endStr)}
                
        />
    )


}

export default DoctorsWeeklyCalendar;


