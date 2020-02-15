import initialState from "./model";

import { RECEIVE_SOCKET } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_SOCKET:
      const { socket } = extras;
      return state.set("socket", socket);
    default:
      return state;
  }
};
