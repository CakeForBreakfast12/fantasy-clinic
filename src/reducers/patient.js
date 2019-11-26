
const patientReducerDefaultState = {
    name:""
}

export default (state = patientReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_NAME': return { ...state, name: action.name };
        
        default: return state;
    }
}