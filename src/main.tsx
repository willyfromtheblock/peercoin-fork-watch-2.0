import { render } from "preact";
import { App } from "./components/app";
import "./scss/index.scss";

render(<App />, document.getElementById("app") as HTMLElement);
