const doctorReducerDefaultState = {
    allBookings: ""
}

export default (state = doctorReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_DOCTOR_BOOKINGS': return { ...state, allBookings: action.bookings }
        default: return state;
    }
}