import { applyMiddleware, createStore, compose } from "redux";
import { enableBatching } from "redux-batched-actions";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducer";

const reduxMute = !!process.env.REDUX_LOGGER_MUTE;

const devMode = !["production", "test"].includes(process.env.NODE_ENV);
const reduxDevtoolsExtensionEnabled =
  !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const reduxLoggerEnabled =
  devMode && (reduxMute || !reduxDevtoolsExtensionEnabled);

const middleware = [thunk];

// Add any action types you want to mute here and enable with `REDUX_LOGGER_MUTE=true` as an
// envvar when starting the app.
const LOGGER_MUTED_TYPES = [];

if (process.env.REDUX_LOGGER_MUTE) {
  console.log(
    "The following Redux actions have been muted in `client/src/redux/store.js`:"
  );
  console.table(LOGGER_MUTED_TYPES);
}

if (devMode && reduxLoggerEnabled) {
  middleware.push(
    createLogger({
      predicate: (_, args) => {
        if (!process.env.REDUX_LOGGER_MUTE) return true;
        if (args?.type && LOGGER_MUTED_TYPES.includes(args?.type)) return false;

        return true;
      },
    })
  );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  enableBatching(reducer),
  composeEnhancers(applyMiddleware(...middleware))
);
