import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from "use-dark-mode";

import createStore from "./createStore";
import { openSocket } from "./socket";

import PaneContainer from "./pane/containers/PaneContainer";

const store = createStore();
const { dispatch, getState } = store;

const App = ({ ...extraProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { value, toggle } = useDarkMode(isDarkMode);
  useEffect(() => dispatch(openSocket()) && undefined, []);
  return (
    <Provider store={store}>
      <PaneContainer />
      <div
        style={{
          zIndex: 10,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      >
        <DarkModeToggle
          size={80}
          onChange={() => [
            setIsDarkMode(!isDarkMode),
            setTimeout(toggle, 500),
          ]}
          checked={!isDarkMode}
        />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
