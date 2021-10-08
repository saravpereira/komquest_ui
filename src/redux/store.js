import { applyMiddleware, createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = enableBatching(reducer)

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
