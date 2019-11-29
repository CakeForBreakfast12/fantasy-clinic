//Store creation
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import patientReducer from '../reducers/patient';
import appointmentsReducer from '../reducers/appointments';
import doctorReducer from '../reducers/doctor'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const appReducer = combineReducers({
        auth: authReducer,
        patient: patientReducer,
        appointments: appointmentsReducer,
        doctor: doctorReducer
    })

    const rootReducer=(state,action)=>{
        if(action.type==="LOGOUT"){
            return appReducer(undefined,action)
        }
        return appReducer(state, action)
    }

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

