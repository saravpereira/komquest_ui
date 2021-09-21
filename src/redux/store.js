import { applyMiddleware, createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import reducer from "./reducer";

const middleware = [thunk];

export const store = createStore(
  enableBatching(reducer),
  composeWithDevTools(applyMiddleware(...middleware))
);
