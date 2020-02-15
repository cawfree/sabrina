import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import useDarkMode from "use-dark-mode";

import createStore from "./createStore";
import { openSocket } from "./socket";

import PaneContainer from "./pane/containers/PaneContainer";

const store = createStore();
const { dispatch, getState } = store;

const App = ({ ...extraProps }) => {
  const { value, toggle } = useDarkMode(true);
  useEffect(() => dispatch(openSocket()) && undefined, []);
  return (
    <Provider store={store}>
      <PaneContainer />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
