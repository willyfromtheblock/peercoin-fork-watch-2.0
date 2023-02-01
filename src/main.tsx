import { render } from "preact";
import { App } from "./app";
import "./index.css";
import "./assets/dist/loading-bar.min.js";
import "./assets/dist/loading-bar.min.css";

render(<App />, document.getElementById("app") as HTMLElement);
