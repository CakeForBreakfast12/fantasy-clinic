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