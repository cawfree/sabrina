import initialState from "./model";

import { RECEIVE_LAYOUT, RECEIVE_META } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_LAYOUT:
      const { layout } = extras;
      return state.set("layout", layout);
    case RECEIVE_META:
      const { id, meta } = extras;
      return state.setIn(["meta", id], Object.freeze(meta));
    default:
      return state;
  }
};
