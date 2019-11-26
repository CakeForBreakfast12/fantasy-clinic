import database from '../firebase/firebase';

// SET_EXPENSES
export const getAppointments = (appointments) => ({
    type: 'GET_APPOINTMENTS',
    appointments
})

export const startGetAppointments = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`appointments`).once('value').then(snapshot => {
            const appointments = []
            snapshot.forEach(childSnapshot => {
                const appointment = { ...childSnapshot.val() }
                if (appointment.patientUID == uid)
                    appointments.push({
                        id: childSnapshot.key,
                        ...appointment
                    })
            });
            dispatch(getAppointments(appointments))
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
      const appointment = { time, doctor, patientName, patientUID };
      
      return database.ref(`appointments`).push(appointment).then((ref) => {
        dispatch(addAppointment({
          id: ref.key,
          ...appointment
        }));
      });
    };
  };
  

