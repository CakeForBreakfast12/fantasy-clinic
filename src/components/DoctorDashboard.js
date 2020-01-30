import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import DoctorsWeeklyCalendar from './DoctorsWeeklyCalendar';
import CreateOutOfOffice from './CreateOutOfOffice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


const DoctorDashboard = (props) => {
    return (
        <div>
            <div className="wrapper header">
                <div className="content-container content-container--header">
                    <div className="header__brand"><b>FANTASY</b> CLINIC</div>
                    <p>{`Hello, ${props.name}!`}</p>
                    <a className="button button--link register-login-text" onClick={props.startLogout}>Log Out <FontAwesomeIcon icon={faSignOutAlt} /></a>
                </div>

            </div>
            <div className="content-container col2-container create-appointment">
                <div className="article-column-left">
                    <DoctorsWeeklyCalendar bookings={props.bookings} />
                </div>
                <div className="article-column-right">
                    <CreateOutOfOffice />
                </div>


            </div>


        </div>

    )
};

const mapStateToProps = (state) => ({
    bookings: state.doctor.allBookings,
    name: state.doctor.name
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboard);