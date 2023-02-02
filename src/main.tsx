import { render } from "preact";
import { App } from "./app";
import "./scss/index.scss";
import "./scss/google-fonts-roboto.css";

render(<App />, document.getElementById("app") as HTMLElement);
