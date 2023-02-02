import { useState, useEffect } from "preact/hooks";
import Progress from "react-circle-progress-bar";

export function App() {
  const [progress, setProgress] = useState(0.0);
  const [isOver90Percent, setIsOver90Percent] = useState(false);
  const activationTimeReached = Date.now() >= 1681732800 * 1000;

  useEffect(() => {
    async function fetchProgress() {
      const response = await fetch(
        "https://fork.peercoinexplorer.net/current.dat"
      );
      const text = await response.text();
      const progressInBackend = parseFloat(text.split(",")[1]);
      setProgress(progressInBackend);
      setIsOver90Percent(progressInBackend >= 90 ? true : false);
    }
    fetchProgress();
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
              <td>90% majority block version 4 over the last 1000 blocks</td>
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
          <div class="block-center">
            {isOver90Percent && activationTimeReached ? (
              <h2>Fork activated</h2>
            ) : (
              <h2>Fork not activated</h2>
            )}
          </div>
        </div>

        {/* <div class="m-y-3">chart</div> */}
      </div>
      <footer class="ppc-footer block-center m-y-3">
        Donations: PM7jjBUPjzpkZy1UZtD7mvmHoXJ2BGvbx9
      </footer>
    </div>
  );
}
