import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'


const CreateAppointment = ({startLogout}) => {    
    return(
        <div>
        <h3>Please fill in the details</h3>
        <button onClick={startLogout}>Log Out</button>
        </div>
    
    )
};


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(CreateAppointment);