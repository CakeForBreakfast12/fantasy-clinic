import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import AppointmentListItem from './AppointmentListItem';

const PatientAppointmentList = (props) => {

    return (
        <div>
            <div>Hello,{props.patientName}</div>
            <div>
                {props.appointments.length === 0 ? "You have no appointments" : `You have ${props.appointments.length} appointments`}
            </div>

            <div>{
                props.appointments
                    .sort((a, b) => a.time < b.time ? -1 : 1)
                    .map((appointment) => <AppointmentListItem key={appointment.id} {...appointment} />)
            }</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appointments: state.appointments,
    patientName: state.patient.name
})

export default connect(mapStateToProps)(PatientAppointmentList)