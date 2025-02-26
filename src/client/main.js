import "./styles.css";

import { pageLoader } from "./paws.js";
import { paddingPaws } from "./mouse-chase.js";
import { setupCounter } from "./counter.js";
import grayPawLogo from "./PawSiren.png";

// Enable mouse follower
document.addEventListener('DOMContentLoaded', (event) => {
  paddingPaws();
  pageLoader();
});

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://github.com/catbyte-io/whimsical-whiskers" target="_blank">
      <img src="/whiskers_blue.png" class="logo mint" alt="Whisker logo" />
    </a>
    <a href="https://catbyte.dev" target="_blank">
      <img src="${grayPawLogo}" class="logo mint" alt="Gray Paw logo" />
    </a>
    <h1>Adopt Me!</h1>
    <div class="card">
      <input type="text" id="zipCode" placeholder="Enter your zipcode">
      <button id="find" type="button"></button>
    </div>
    <p class="read-the-docs">
      Enter your zipcode to find local pets to adopt
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
