import { combineReducers } from "redux";
import searchQuery from '../components/header/redux/reducer';
import koms from '../components/results/redux/reducer'

export default combineReducers({searchQuery, koms});
