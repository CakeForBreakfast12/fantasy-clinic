import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import DoctorsWeeklyCalendar from './DoctorsWeeklyCalendar';


const DoctorDashboard = (props) => {
    return (
        <div>
            <p>Your appointments for today</p>
            <DoctorsWeeklyCalendar />
            <button onClick={props.startLogout}>Log Out</button>
        </div>

    )
};

const mapStateToProps = (state) => ({
    bookings: state.doctor.allBookings
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboard);