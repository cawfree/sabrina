import { RECEIVE_LAYOUT, RECEIVE_META } from "./actionTypes";

export const receiveLayout = layout => ({
  type: RECEIVE_LAYOUT,
  layout
});

export const receiveMeta = (id, meta) => ({
  type: RECEIVE_META,
  id,
  meta
});

const depthOf = (obj = {}, depth = 1) =>
  Math.max(
    ...Object.values(obj).map(v =>
      !!v && typeof v === "object" ? depthOf(v, depth + 1) : depth
    )
  );

const addPaneRecursive = (id, layout, depth = 0) => {
  const direction = depth % 2 === 0 ? "row" : "column";
  if (!layout) {
    return id;
  } else if (typeof layout === "string") {
    return {
      direction,
      first: layout,
      second: id
    };
  } else if (typeof layout === "object") {
    const { first, second } = layout;
    if (!first || typeof first === "string") {
      return {
        ...layout,
        first: addPaneRecursive(id, first, depth + 1)
      };
    } else if (!second || typeof second === "string") {
      return {
        ...layout,
        second: addPaneRecursive(id, second, depth + 1)
      };
    } else {
      const firstPath = {
        ...layout,
        first: addPaneRecursive(id, first, depth + 1)
      };
      const secondPath = {
        ...layout,
        second: addPaneRecursive(id, second, depth + 1)
      };
      if (depthOf(firstPath) < depthOf(secondPath)) {
        return firstPath;
      }
      return secondPath;
    }
  }
  throw new Error(`Expected [object Object], but encountered ${layout}.`);
};

export const addPane = ({ id, ...extras }) => (dispatch, getState) =>
  Promise.resolve().then(() => {
    const { pane } = getState();
    const layout = pane.get("layout");
    dispatch(receiveMeta(id, extras));
    return dispatch(receiveLayout(addPaneRecursive(`${id}`, layout)));
  });
