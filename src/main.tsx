import { render } from "preact";
import { App } from "./app";
import "./scss/index.scss";

render(<App />, document.getElementById("app") as HTMLElement);
