import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "preact/hooks";

export function Chart() {
  const [chartData, setChartData] = useState(Array<any>);
  let chartDataCache: Array<any> = [];

  useEffect(() => {
    async function fetchProgress() {
      const response = await fetch(
        "https://fork.peercoinexplorer.net/history_grouped.dat"
      );
      const text = await response.text();
      const splitText = text.split("\n");

      splitText.forEach((x) => {
        if (x.length > 0) {
          chartDataCache.push(JSON.parse(x));
        }
      });

      setChartData(chartDataCache);
    }
    fetchProgress();
  }, []);

  const options: Highcharts.Options = {
    colors: ["#3cb054", "#b35900", "dodgerblue"],
    title: {
      text: "v4 Blocks Progress",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      allowDecimals: false,
      title: {
        text: "Blocks",
        style: {
          "font-size": "0.8rem",
        },
      },
    },
    plotOptions: {
      series: {
        turboThreshold: 5000,
        dataGrouping: {
          enabled: true,
          forced: true,
        },
      },
    },
    yAxis: {
      title: {
        text: "Progress",
        style: {
          "font-size": "0.8rem",
        },
      },
      min: 0.1,
      minorTickInterval: "auto",
    },
    series: [
      {
        type: "line",
        name: "Progress",
        data: chartData,
      },
    ],
  };
  return (
    <div class="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
