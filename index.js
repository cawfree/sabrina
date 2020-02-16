import nanoid from "nanoid";
import express from "express";
import WebSocket, { Server as WebSocketServer } from "ws";
import { exec } from "child_process";
import { json } from "body-parser";
import { copy, remove } from "fs-extra";
import { promises as fs } from "fs";
import { sep, dirname } from "path";
import appRootPath from "app-root-path";

const modulePath = appRootPath.path;//dirname(require.resolve('sabrina'));

const push = (wss, data) =>
  wss.clients.forEach(client => {
    const { readyState } = client;
    readyState === WebSocket.OPEN && client.send(data);
  });

const shell = cmd =>
  new Promise((resolve, reject) =>
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      return resolve();
    })
  );

const statics = (path, flag, impl) =>
  fs
    .readFile(path, "utf8")
    .then(data => fs.writeFile(path, data.replace(flag, impl), "utf8"));

const buildDynamics = socket =>
  Promise.resolve(`${modulePath}${sep}build`).then(tmp =>
    copy(`${modulePath}${sep}src`, tmp)
      .then(() =>
        statics(
          `${tmp}${sep}socket${sep}model.js`,
          "__PORT__",
          `const __PORT__ = ${socket};`
        )
      )
      // TODO: externalize
      .then(() =>
        statics(
          `${tmp}${sep}pane${sep}components${sep}Pane.js`,
          "__IMPORTS__",
          "import { Doughnut } from 'react-chartjs-2';",
        )
      )
      .then(() =>
        statics(
          `${tmp}${sep}pane${sep}components${sep}Pane.js`,
          "__LOOK_UP_TABLE__",
          `const __LOOK_UP_TABLE__ = {
            div: props => <div {...props} />,
            Doughnut: props => <Doughnut {...props} />,
          };`
        )
      ) 
      .then(() => Promise.reject('e'))
      .then(() => shell(`babel ${tmp} -d ${tmp} --presets @babel/preset-env,@babel/preset-react`))
      .then(() =>
        shell(
          `${appRootPath}${sep}node_modules${sep}.bin${sep}parcel build ${tmp}${sep}index.html --out-dir ${modulePath}${sep}public`
        )
      )
      .then(() => remove(tmp)),
  );

const pane = wss => (req, res, next) =>
  Promise.resolve(nanoid())
    .then(id => ({
      type: "pane",
      // TODO: enforce this structure
      pane: { id, title: req.body.title, children: req.body.children }
    }))
    .then(data =>
      Promise.resolve()
        .then(() => push(wss, JSON.stringify(data)))
        .then(() => res.status(200).send(data))
    )
    .catch(next);

export default (port = 3000, socket = 40510) =>
  Promise.resolve() 
    .then(() => buildDynamics(socket))
    .then(() => new WebSocketServer({ port: socket }))
    .then(
      wss =>
        new Promise(resolve =>
          express()
            .use(json())
            .use(express.static(`${modulePath}${sep}public`))
            .post("/pane", pane(wss))
            .listen(port, resolve)
        )
    )
    .then(() => console.log(`⚡ Available at http://localhost:${port}`));
