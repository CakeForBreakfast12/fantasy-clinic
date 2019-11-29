const doctorReducerDefaultState = {
    allBookings: "",
    name:""
}

export default (state = doctorReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_DOCTOR_BOOKINGS': return { ...state, allBookings: action.bookings }
        case 'GET_DOCTOR_NAME': return { ...state, name: action.name }
        default: return state;
    }
}