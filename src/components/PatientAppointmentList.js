import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import AppointmentListItem from './AppointmentListItem';

const PatientAppointmentList = (props) => {
    
    console.log(props);
    
    
    return (
        <div>
            <div>Hello,{props.patientName}</div>
            <div>
                {props.appointments.length===0? "You have no appointments":`You have ${props.appointments.length} appointments`}
            </div>
            
            <div>{props.appointments.map((appointment)=> <AppointmentListItem key={appointment.id} {...appointment}/>)}</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appointments:state.appointments,
    patientName:state.patient.name
})

export default connect(mapStateToProps)(PatientAppointmentList)
