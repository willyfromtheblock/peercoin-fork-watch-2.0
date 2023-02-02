import { useState, useEffect } from "preact/hooks";
import Progress from "react-circle-progress-bar";

export function App() {
  const [progress, setProgress] = useState(0.0);
  useEffect(() => {
    async function fetchProgress() {
      const response = await fetch(
        "https://fork.peercoinexplorer.net/current.dat"
      );
      const text = await response.text();
      setProgress(parseFloat(text.split(",")[1]));
    }
    fetchProgress();
  }, []);

  return (
    <div class="ppc-hero">
      <div class="flex-center m-t-3">
        <img
          class="ppc-logo"
          src="img/peercoin-horizontal-greenleaf-blacktext-transparent.svg"
          alt="peercoin logo"
        />
      </div>
      <h1>0.12 Fork Watcher</h1>
      <div class="ppc-background">
        <div class="flex-center m-y-3">
          <Progress
            progress={progress}
            // gradient={[
            //   { stop: 0.0, color: "#3cb054" },
            //   { stop: 1, color: "#3cb054" },
            // ]}
          />
        </div>
        <div class="block-center">
          <div>- 90% majority block version 4 over the last 1000 blocks </div>
          <div>- April 17th, 2023 - 12:00 UTC reached</div>
        </div>
        <div class="m-y-3">chart</div>
      </div>
    </div>
  );
}
