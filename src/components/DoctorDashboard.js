import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import DoctorsWeeklyCalendar from './DoctorsWeeklyCalendar';
import CreateOutOfOffice from './CreateOutOfOffice';


const DoctorDashboard = (props) => {
    return (
        <div>
            <p>{`Hello, ${props.name}!`}</p>
            <DoctorsWeeklyCalendar bookings={props.bookings} />
            <CreateOutOfOffice />
            <div>
                <button onClick={props.startLogout}>Log Out</button>
            </div>

        </div>

    )
};

const mapStateToProps = (state) => ({
    bookings: state.doctor.allBookings,
    name:state.doctor.name
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboard);