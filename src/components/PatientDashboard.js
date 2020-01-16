import React from 'react';
import PatientAppointmentList from '../components/PatientAppointmentList';
import CreateAppointment from '../components/CreateAppointment';


const PatientDashboard = () => {
    return (
        <div>
            <PatientAppointmentList />
            <CreateAppointment />
        </div>
    )
};

export default PatientDashboard;