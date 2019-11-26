
const patientReducerDefaultState = {
    name:"",
    uid:""
}

export default (state = patientReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_NAME_AND_UID': return { ...state, name: action.name, uid:action.uid };
        
        default: return state;
    }
}