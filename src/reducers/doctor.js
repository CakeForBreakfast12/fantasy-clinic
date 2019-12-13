const doctorReducerDefaultState = {
    allBookings: "",
    name: "",
    vacations: []
}

export default (state = doctorReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_DOCTOR_BOOKINGS': return { ...state, allBookings: action.bookings }
        case 'GET_DOCTOR_NAME': return { ...state, name: action.name }
        case 'GET_DOCTOR_VACATIONS': return { ...state, vacations: action.vacations }
        default: return state;
    }
}