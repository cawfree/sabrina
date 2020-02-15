import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as pane } from "./pane";
import { reducer as socket } from "./socket";

export default () =>
  createStore(
    combineReducers({ pane, socket }),
    applyMiddleware(thunkMiddleware)
  );
