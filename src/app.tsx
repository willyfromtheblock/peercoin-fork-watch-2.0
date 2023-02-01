import { useState, useEffect } from "preact/hooks";
import "./app.css";

export function App() {
  let [data, setData] = useState(0.0);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://peercoinexplorer.net/forkwatch/current.dat"
      );
      const text = await response.text();
      setData(parseFloat(text.split(",")[1]));
    }
    fetchData();
  });
  console.log(data);
  return (
    <>
      <div class="loader-container">
        <div
          id="loader"
          class="ldBar"
          data-type="fill"
          data-fill-dir="btt"
          data-img="img/peercoin.svg"
          data-value={data}
        />
      </div>
    </>
  );
}
