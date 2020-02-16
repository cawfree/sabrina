# sabrina

<p align="center">
  <img src="./assets/title.png" width="256" height="256">
</p>

sabrina is a dashboard server built using [express](https://github.com/expressjs/express), whose [React](https://github.com/facebook/react) DOM is dynamically controlled by client `POST` requests.

> ⚠️ This project is currently experimental, so you must **use at your own risk**. It is in no way fit for a production environment.

## 🔥 Features

  -  ⛏️ It's extensible! 
    - You can configure sabrina to support the visualisation of _any_ React [Component](https://reactjs.org/docs/react-component.html)s.
    - Rendered layouts are described using [propeteer](https://github.com/cawfree/propeteer), so we can specify whatever [props](https://reactjs.org/docs/components-and-props.html) you want on rendered components.
  - ⚡ It's asynchronous!
    - Using [websockets](https://github.com/websockets/ws), sabrina will publish all dashboard updates to all client browsers at once.
  - 🔋 It's batteries included!
    - sabrina comes pre-packaged with [react-mosaic](https://github.com/nomcopter/react-mosaic), so you get _awesome_ window management for free.
    - It's bundled using [parcel](https://github.com/parcel-bundler/parcel), so you _know_ it's fast.

## 🚀 Getting Started

Using [`npm`]():

```bash
npm i sabrina
```

Using [`yarn`]():

```bash
yarn add sabrina
```

## 📌 Usage

In this example, we'll use [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) to render a [`<Doughnut />`]. We'll start by importing the server and configuring it to support this kind of component.

```javascript
import "react-chartjs-2";
import sabrina from "sabrina";

sabrina({
  'react-chartjs-2': ['Doughnut'],
});
```

When we run our application, it'll by default get published to [http://localhost:3000](http://localhost:3000):

```shell
$ ./node_modules/.bin/babel-node ./index.js
⚡ Available at http://localhost:3000
```

Finally, we can start populating our dashboard by making some [`POST`](https://en.wikipedia.org/wiki/POST_(HTTP)) requests to the `/pane` [route](https://expressjs.com/en/guide/routing.html), which is used to add new tiled window content to the dashboard. Below, we use [`axios`](https://github.com/axios/axios):

```javascript
import axios from "axios";

axios({
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  url: "http://localhost:3000/pane",
  method: "post",
  data: {
    title: "📊 ich bin ein berliner",
    children: {
      _: "Doughnut",
      data: {
        labels: ["How awesome is sabrina?"],
        datasets: [{
          data: [100],
          backgroundColor: [
            "#00FF00",
          ]
        }],
      }
    }
  }
});
```

And this will publish our new chart data to all connected clients. Simple!

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
