import database from '../firebase/firebase';

// SET_EXPENSES
export const getAppointments = (appointments) => ({
  type: 'GET_APPOINTMENTS',
  appointments
})

export const startGetAppointments = (uid) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid

    return database.ref(`patients/${uid}/appointments`).once('value').then(snapshot => {
      const appointments = []
      snapshot.forEach(childSnapshot => {
        const appointment = { ...childSnapshot.val() }
        appointments.push({
          id: childSnapshot.key,
          ...appointment
        })
      });
      dispatch(getAppointments(appointments))
    });
  };
}

//GET_DOCTORS_LIST
export const getDoctorsList = (doctorsList) => ({
  type: 'GET_DOCTORS_LIST',
  doctorsList
})

export const startGetDoctorsList = () => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid

    return database.ref(`doctors`).once('value').then(snapshot => {
      const doctorsList = []
      snapshot.forEach(childSnapshot => {
        doctorsList.push({
          doctorName: { ...childSnapshot.val() }.name,
          doctorUID: childSnapshot.key
        })
      });
      dispatch(getDoctorsList(doctorsList))
    });
  };
}

// ADD_EXPENSE
export const addAppointment = (appointment) => ({
  type: 'ADD_APPOINTMENT',
  appointment
});

export const startAddAppointment = (appointmentData = {}) => {
  return (dispatch) => {
    const {
      time = 0,
      doctor = '',
      patientName = '',
      patientUID = '0'
    } = appointmentData;
    const appointment = { time, doctor };

    return database.ref(`patients/${patientUID}/appointments`).push(appointment).then((ref) => {
      dispatch(addAppointment({
        id: ref.key,
        ...appointment
      }));
    });
  };
};


