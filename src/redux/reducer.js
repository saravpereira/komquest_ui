import { combineReducers } from "redux";
import { loadingBarReducer } from 'react-redux-loading-bar'
import searchQuery from '../components/header/redux/reducer';
import koms from '../components/results/redux/reducer'

export default combineReducers({searchQuery, koms, loadingBar: loadingBarReducer});
