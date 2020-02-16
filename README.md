# sabrina

sabrina is a dashboard server built using [express](), whose [React]() DOM is dynamically controlled by client `POST` requests.

> ⚠️ This project is currently experimental, so you must **use at your own risk**. It is in no way fit for a production environment.

## Features

  -  ⛏️ It's extensible! 
    - You can configure sabrina to support the visualisation of _any_ React [Component]()s.
    - Rendered layouts are described using [propeteer](), so we can specify whatever [props]() you want on rendered components.
  - ⚡ It's asynchronous!
    - Using [websockets](), sabrina will publish all dashboard updates to all client browsers at once.
  - 🔋 It's batteries included!
    - sabrina comes pre-packaged with [react-mosaic](), so you get _awesome_ window management for free.
    - It's compiled using [parcel](), so you _know_ it's fast.

## Getting Started

Using [`npm`]():

```bash
npm i sabrina
```

Using [`yarn`]():

```bash
yarn add sabrina
```

## Example

In this example, we'll use [react-chartjs-2]() to render a [`<Doughnut />`]. We'll start by importing the server and configuring it to support this kind of component.

```javascript
import "react-chartjs-2";
import sabrina from "sabrina";

sabrina({
  'react-chartjs-2': ['Doughnut'],
});
```

When we run our application, it'll by default get published to [http://localhost:3000](http://localhost:3000):



## License
[MIT](https://opensource.org/licenses/MIT)
