import moment from 'moment';

// Get visible expenses

export default (appointments, doctor, selectedDate) => {
    appointments = appointments
        .filter((appointment) => {
            const doctorMatch = appointment.doctor == doctor ? true : false
            const dateMatch = moment(appointment.time).isSame(selectedDate, "day")
            return doctorMatch && dateMatch
        })
        .sort((a, b) => a.time < b.time ? -1 : 1);
    return appointments

};