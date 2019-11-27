
const patientReducerDefaultState = {
    name: "",
    doctorsList: [],
    doctorsSchedule: []
}

export default (state = patientReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_NAME': return { ...state, name: action.name };
        case 'GET_DOCTORS_LIST': return { ...state, doctorsList: action.doctorsList };
        case 'GET_SCHEDULE': return { ...state, doctorsSchedule: action.schedule }
        default: return state;
    }
}