import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
    console.log(casesType);
  }
  return chartData;
};

const LineGraph = () => {
  const [xDatCases, setXCases] = useState([]);
  const [yDatCases, setYCases] = useState([]);
  const [xDatRecovered, setXRecovered] = useState([]);
  const [yDatRecovered, setYRecovered] = useState([]);
  const [xDatCasesDeaths, setXDeaths] = useState([]);
  const [yDatDeaths, setYDeaths] = useState([]);

  useEffect(() => {
    const xxC = [];
    const yyC = [];
    const xxR = [];
    const yyR = [];
    const xxD = [];
    const yyD = [];

    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((data) => {
          let chartDataCases = buildChartData(data, "cases");
          let chartDataRecovered = buildChartData(data, "recovered");
          let chartDataDeaths = buildChartData(data, "deaths");
          chartDataCases.forEach((value, key) => {
            xxC.push(value.x);
            yyC.push(value.y);
          });
          chartDataRecovered.forEach((value, key) => {
            xxR.push(value.x);
            yyR.push(value.y);
          });

          chartDataDeaths.forEach((value, key) => {
            xxD.push(value.x);
            yyD.push(value.y);
          });
        });
    };

    fetchData();
    setXCases(xxC);
    setYCases(yyC);
    setYRecovered(yyR);
    setYDeaths(yyD);
  }, []);

  const labels = xDatCases;

  const dataNew = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: yDatCases,
        borderColor: "rgb(255, 28, 28)",
        backgroundColor: "rgb(255, 255, 255)",
        color: "#fff",
      },
      {
        label: "Recovered",
        data: yDatRecovered,
        borderColor: "rgb(255, 28, 28)",
        backgroundColor: "rgb(0, 160, 21)",
        color: "#fff",
      },
      {
        label: "Deaths",
        data: yDatDeaths,
        borderColor: "rgb(255, 28, 28)",
        backgroundColor: "rgb(0, 0, 0)",
        color: "#fff",
      },
    ],
  };

  return (
    <div className="chart">
      <h3>Worldwide new cases</h3>
      <Line data={dataNew} />
    </div>
  );
};

export default LineGraph;
