import { RECEIVE_SOCKET } from "./actionTypes";
import { addPane } from "../pane";

const receiveSocket = socket => ({
  type: RECEIVE_SOCKET,
  socket
});

const onMessage = message => (dispatch, getState) =>
  Promise.resolve().then(() => {
    const { type, ...extras } = message;
    switch (type) {
      case "pane":
        const { pane } = extras;
        return dispatch(addPane(pane));
        break;
      default:
        return Promise.reject(`Encountered unreconigzed type, ${type}.`);
    }
  });

export const openSocket = () => (dispatch, getState) =>
  Promise.resolve()
    .then(() => {
      const { socket } = getState();
      const port = socket.get("port");
      return dispatch(receiveSocket(new WebSocket(`ws://localhost:${port}`)));
    })
    .then(() => {
      const { socket: model } = getState();
      const socket = model.get("socket");
      socket.onmessage = ({ data }) => dispatch(onMessage(JSON.parse(data)));
      return Promise.resolve(socket);
    });

export const writeToSocket = obj => (dispatch, getState) =>
  Promise.resolve().then(() => {
    if (!!obj && typeof obj === "object") {
      const { socket: model } = getState();
      const socket = model.get("socket");
      return socket.send(JSON.stringify(obj));
    }
    return Promise.reject(
      new Error(`Expected [object Object], encountered ${obj}.`)
    );
  });
