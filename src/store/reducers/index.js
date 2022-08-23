// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import equipmentView from './equipmentView';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, equipmentView });

export default reducers;
