/**
 * @jest-environment node
 */

import "@babel/polyfill";
import axios from "axios";

import sabrina from "../index.js";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should export a configurable remote logging interface", async () => {
  await sabrina();

  await new Promise(resolve => setTimeout(resolve, 5000));

  await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    url: "http://localhost:3000/pane",
    method: "post",
    data: {
      title: "Validation Loss",
      children: {
        _: "div",
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "blue"
        }
      }
    }
  });

  await new Promise(resolve => null);
});
