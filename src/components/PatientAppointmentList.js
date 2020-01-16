import React from 'react';
import { connect } from 'react-redux';
import AppointmentListItem from './AppointmentListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { startLogout } from '../actions/auth';

const PatientAppointmentList = (props) => {

    return (
        <div>
            <div className="wrapper header">
                <div className="content-container content-container--header">
                    <div className="header__brand"><b>FANTASY</b> CLINIC</div>
                    <div><strong>{props.patientName}</strong></div>
                    <a className="button button--link register-login-text" onClick={props.startLogout}>Log Out <FontAwesomeIcon icon={faSignOutAlt} /></a>
                </div>
            </div>
            <div className="content-container article small">
                <h1>{props.appointments.length === 0 ? "You have no appointments" : `You have ${props.appointments.length} appointments`}</h1>
                {props.appointments
                    .sort((a, b) => a.time < b.time ? -1 : 1)
                    .map((appointment) => <AppointmentListItem key={appointment.id} {...appointment} />)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appointments: state.appointments,
    patientName: state.patient.name
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointmentList)
