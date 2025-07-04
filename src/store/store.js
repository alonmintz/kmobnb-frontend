import { legacy_createStore as createStore, combineReducers } from "redux";

import { stayReducer } from "./reducers/stay.reducer";
import { userReducer } from "./reducers/user.reducer";
import { reviewReducer } from "./reducers/review.reducer";
import { systemReducer } from "./reducers/system.reducer";

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;
export const store = createStore(rootReducer, middleware);
