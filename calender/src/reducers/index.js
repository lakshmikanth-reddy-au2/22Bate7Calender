import {combineReducers} from 'redux';
import masterDataReducer from './masterReducer';

const allReducers = combineReducers({
    appData : masterDataReducer
});

export default allReducers
