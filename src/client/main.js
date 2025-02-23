import "./styles.css";

import { paddingPaws } from "./mouse-chase.js";
import { setupCounter } from "./counter.js";
import grayPawLogo from "./PawSiren.png";

// Enable mouse follower
document.addEventListener('DOMContentLoaded', (event) => {
  paddingPaws();
});

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://github.com/catbyte-io/whimsical-whiskers" target="_blank">
      <img src="/whiskers_blue.png" class="logo mint" alt="Whisker logo" />
    </a>
    <a href="https://catbyte.dev" target="_blank">
      <img src="${grayPawLogo}" class="logo mint" alt="Gray Paw logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
