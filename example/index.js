import "react-chartjs-2";
import "react-player";

import sabrina from "sabrina";

sabrina(
  {
    "react-chartjs-2": ["Doughnut", "Line"],
    "react-player": [["default", "VideoPlayer"]],
  },
  {
    title: '☠️ Example! ☠️',
  },
)
  .then(
    () => new Promise(
      resolve => null,
    ),
  )
  .catch(console.error);
