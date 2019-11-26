//Store creation
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import patientReducer from '../reducers/patient';
import appointmentsReducer from '../reducers/appointments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
           auth: authReducer,
           patient:patientReducer,
           appointments:appointmentsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

