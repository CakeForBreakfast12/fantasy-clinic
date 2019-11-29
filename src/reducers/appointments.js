//Expenses Reducer



export default (state = [], action) => {
    switch (action.type) {
        case 'GET_APPOINTMENTS':return action.appointments  
        case 'ADD_APPOINTMENT': return [...state, action.appointment]   
        default: return state;
    }

}