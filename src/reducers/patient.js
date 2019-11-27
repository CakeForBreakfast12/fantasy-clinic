
const patientReducerDefaultState = {
    name:"",
    uid:"",
    doctorsList:[]
}

export default (state = patientReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_NAME_AND_UID': return { ...state, name: action.name, uid:action.uid };
        case 'GET_DOCTORS_LIST': return { ...state, doctorsList: action.doctorsList };
        default: return state;
    }
}