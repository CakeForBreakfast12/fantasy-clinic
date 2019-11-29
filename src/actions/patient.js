import database from '../firebase/firebase';
import moment, { now } from 'moment';


//GET_PATIENT_INFO
export const getPatientInfo = ({ name, email, phone }) => ({
    type: 'GET_PATIENT_INFO',
    name,
    email,
    phone
})

export const startGetPatientInfo = (uid) => {
    return (dispatch) => {
        //const uid = getState().auth.uid
        return database.ref(`patients/${uid}/contactInfo`)
            .once("value")
            .then((snapshot) => {

                dispatch(getPatientInfo(snapshot.val()))

            })
    };
};


//GET_DOCTORS_LIST
export const getDoctorsList = (doctorsList) => ({
    type: 'GET_DOCTORS_LIST',
    doctorsList
})

export const startGetDoctorsList = () => {
    return (dispatch, ) => {
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
        return database.ref(`doctors/${doctorID}/bookings`).once('value').then(snapshot => {
            let schedule = [];
            snapshot.forEach(childSnapshot => {
                schedule.push({ ...childSnapshot.val() }.time)
            })
            schedule = schedule.filter(booking => moment(booking).isAfter(moment()))
            

            dispatch(getDoctorSchedule(schedule));
        })
    };
}