import database from '../firebase/firebase';

//GET_DOCTOR_BOOKINGS
export const getDoctorBookings = (bookings) => ({
    type: 'GET_DOCTOR_BOOKINGS',
    bookings
})

export const startGetDoctorBookings = (doctorID) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid

        return database.ref(`doctors/${doctorID}/bookings`).once('value').then(snapshot => {
            const bookings = []
            snapshot.forEach(childSnapshot => {
                bookings.push({
                    time: { ...childSnapshot.val() }.time,
                    patientInfo: { ...childSnapshot.val() }.patientInfo,
                    bookingID: childSnapshot.key
                })
            });
            dispatch(getDoctorBookings(bookings))
        });
    };
}

//GET_DOCTOR_NAME
export const getDoctorName = (name) => ({
    type: 'GET_DOCTOR_NAME',
    name
})

export const startGetDoctorName = (doctorID) => {
    return (dispatch, getState) => {
        return database.ref(`doctors/${doctorID}/name`).once('value').then(snapshot => {
            dispatch(getDoctorName(snapshot.val()))
        });
    };
}

//GET_DOCTOR_VACATIONS
export const getDoctorVacations = (vacations) => ({
    type: 'GET_DOCTOR_VACATIONS',
    vacations
})

export const startGetDoctorVacations = (doctorID) => {
    return (dispatch, getState) => {
        return database.ref(`doctors/${doctorID}/vacations`).once('value').then(snapshot => {
            const vacations=[];
            snapshot.forEach(childSnapshot=>{
                vacations.push(childSnapshot.val())                
            })
            dispatch(getDoctorVacations(vacations))
        });
    };
}

export const startUpdateVacations = (vacations) => {
    return (dispatch, getState) => {
        const doctorID = getState().auth.uid
        return database.ref(`doctors/${doctorID}/vacations`).set(vacations)
            
        };
    };
