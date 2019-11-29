
const patientReducerDefaultState = {
    name: "",
    email: "",
    phone: "",
    doctorsList: [],
    doctorsSchedule: []
}

export default (state = patientReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_INFO': return { ...state, name: action.name, email: action.email, phone: action.phone };
        case 'GET_DOCTORS_LIST': return { ...state, doctorsList: action.doctorsList };
        case 'GET_SCHEDULE': return { ...state, doctorsSchedule: action.schedule }
        default: return state;
    }
}