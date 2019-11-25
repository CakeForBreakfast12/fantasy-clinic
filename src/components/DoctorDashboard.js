import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'


const DoctorDashboard = ({ startLogout }) => {
    return (
        <div>
            <p>Your appointments for today</p>
            <button onClick={startLogout}>Log Out</button>
        </div>

    )
};


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(DoctorDashboard);