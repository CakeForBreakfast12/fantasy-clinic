import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import PatientAppointmentList from '../components/PatientAppointmentList';
import CreateAppointment from '../components/CreateAppointment';
import database, { firebase } from '../firebase/firebase'


const PatientDashboard = ({startLogout}) => {    
    return(
        <div>
        <PatientAppointmentList />
        <CreateAppointment />
        <button onClick={startLogout}>Log Out</button>
        </div>
    
    )
};


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(PatientDashboard);