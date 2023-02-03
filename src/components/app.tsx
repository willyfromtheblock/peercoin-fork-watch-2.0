import { useState, useEffect } from "preact/hooks";
import Progress from "react-circle-progress-bar";
import { Chart } from "./chart";

export function App() {
  const [progress, setProgress] = useState(0.0);
  const [isOver90Percent, setIsOver90Percent] = useState(false);
  const [forkActivated, setForkActivated] = useState(0);
  const activationTimeReached = Date.now() >= 1681732800 * 1000;

  useEffect(() => {
    async function fetchProgressAndReachedThreshold() {
      const currentResponse = await fetch(
        "https://fork.peercoinexplorer.net/current.dat"
      );
      const currentText = await currentResponse.text();
      const progressInBackend = parseFloat(currentText.split(",")[1]);
      setProgress(progressInBackend);
      setIsOver90Percent(progressInBackend >= 90 ? true : false);

      const reachedThresholdResponse = await fetch(
        "https://fork.peercoinexplorer.net/fork_activated.dat"
      );

      const forkActivatedResult = JSON.parse(
        await reachedThresholdResponse.text()
      );

      if (forkActivatedResult > 0) {
        setForkActivated(forkActivatedResult * 1000);
      }
    }
    fetchProgressAndReachedThreshold();
  }, []);

  return (
    <div class="ppc-hero">
      <div class="m-y-1">
        <div class="flex-center ppc-logo-container">
          <img
            class="ppc-logo"
            src="img/peercoin-horizontal-greenleaf-blacktext-transparent.svg"
            alt="peercoin logo"
          />
        </div>
        <h1>0.12 Fork Watcher</h1>
      </div>
      <div class="ppc-background">
        <div class="flex-center m-y-1">
          <Progress
            progress={progress}
            background="white"
            className="ppc-progress-circle"
            subtitle="Blocks v4"
            gradient={[
              { stop: 0.0, color: "black" },
              { stop: 1, color: "grey" },
            ]}
          />
        </div>
        <div>
          <table class="ppc-table">
            <tr>
              <td>
                <img
                  src={isOver90Percent ? "img/check.png" : "img/cross.png"}
                  alt="status"
                />
              </td>
              <td>
                90% majority block version 4 over the last 1000 blocks reached
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={
                    activationTimeReached ? "img/check.png" : "img/cross.png"
                  }
                  alt="status"
                />
              </td>
              <td>April 17th, 2023 - 12:00 UTC reached</td>
            </tr>
          </table>
          <div class="flex-center ppc-fork-active">
            {forkActivated > 0 ? (
              <h2>
                Fork activated since {new Date(forkActivated).toUTCString()}
              </h2>
            ) : (
              <h2>Fork not activated</h2>
            )}
          </div>
        </div>
        <div class="m-y-2 flex-center">
          <Chart />
        </div>
      </div>
      <footer class="ppc-footer m-y-1">
        <div>
          <a href="https://talk.peercoin.net/t/peercoin-v0-12-codename-ladybug-released/15969" rel="noopener norefferer" target="_blank">What is this about?</a>
        </div>
        <div class="ppc-donation">Donations: PM7jjBUPjzpkZy1UZtD7mvmHoXJ2BGvbx9</div>
      </footer>
    </div>
  );
}
