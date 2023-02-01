import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import "./app.css";
import Progress from "react-circle-progress-bar";

export function App() {
  const [data, setData] = useState(0.0);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://peercoinexplorer.net/forkwatch/data/current.dat"
      );
      const text = await response.text();
      setData(parseFloat(text.split(",")[1]));
    }
    fetchData();
  }, []);

  return (
    <div class="loader-container">
      <Progress
        progress={data}
        gradient={[
          { stop: 0.0, color: "#3cb054" },
          { stop: 1, color: "#3cb054" },
        ]}
      />
    </div>
  );
}
