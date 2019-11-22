import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'


const DoctorDashboard = ({startLogout}) => (
    <button onClick={startLogout}>Log Out</button>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(DoctorDashboard);