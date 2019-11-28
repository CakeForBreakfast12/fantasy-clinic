import database from '../firebase/firebase';

// GET_APPOINTMENTS
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



// ADD_APPOINTMENT
export const addAppointment = (appointment) => ({
  type: 'ADD_APPOINTMENT',
  appointment
});

export const startAddAppointment = (appointmentData = {}) => {
  return (dispatch, getState) => {
    const {
      time = 0,
      doctorID = '',
      doctorName = '',
      patientName = getState().patient.name,
      patientUID = getState().auth.uid,
      patientEmail = getState().patient.email,
      patientPhone = getState().patient.phone
    } = appointmentData;
    const appointment = { time, doctorName };
    const booking = { time, }
    const patientInfo = { patientName, patientEmail, patientPhone }

    return (
      database.ref(`doctors/${doctorID}/bookings`)
        .push(booking)
        .then((ref) =>
          database.ref(`doctors/${doctorID}/bookings/${ref.key}/patientInfo`)
            .set(patientInfo)
        )
        .then(
          database.ref(`patients/${patientUID}/appointments`)
            .push(appointment)
            .then((ref) => {
              dispatch(addAppointment({
                id: ref.key,
                ...appointment
              }));
            })
        )
    )
  };
};


