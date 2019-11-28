import database from '../firebase/firebase';

//GET_PATIENT_INFO
export const getPatientInfo = ({name,email,phone}) => ({
    type: 'GET_PATIENT_INFO',
    name,
    email,
    phone
})

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

// GET_SCHEDULE
export const getDoctorSchedule = (schedule) => ({
    type: 'GET_SCHEDULE',
    schedule
})



export const startGetDoctorSchedule = (doctorID) => {
    return (dispatch) => {
        const schedule = [];

        return database.ref(`doctors/${doctorID}/bookings`).once('value').then(snapshot => {
            snapshot.forEach(childSnapshot => {
                const booking = childSnapshot.val();
                schedule.push(booking.time)
            })
            dispatch(getDoctorSchedule(schedule));
        })
    };
}