import React, { useState, useEffect } from "react";
import { Line, Doughnut, Pie } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";
import "../styles/Charts.css";
import { FormControl, MenuItem, Select } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const buildChartData = (data) => {
  let chartData = [];
  data.forEach((value, key) => {
    let newDataPoint = {
      country: value.country,
      total: value.timeline[0].total,
    };

    chartData.push(newDataPoint);
  });
  return chartData;
};

const Charts = () => {
  const [country, setCountry] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [countryTotal, setCountryTotal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=true"
      )
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data);
          const c = [];
          const t = [];
          chartData.forEach((value, key) => {
            c.push(value.country);
            t.push(value.total);
          });
          setCountryNames(c);
          setCountryTotal(t);
          setCountry(chartData);
        });
    };
    fetchData();
  }, []);

  const da = {
    labels: countryNames,
    datasets: [
      {
        label: "# of Votes",
        data: countryTotal,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //   const onCountryChange = async (e) => {
  //     const countryCode = e.target.value;

  //     const url =
  //       countryCode === "worldwide"
  //         ? "https://disease.sh/v3/covid-19/all"
  //         : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  //     await fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCountry(countryCode);
  //       });
  //   };

  return (
    <div className="charts">
      {/* <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown" style={{ borderColor: "white" }}>
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
            style={{ color: "white" }}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> */}
      <Doughnut data={da} className="dou" />
      {/* <Pie data={da} /> */}
    </div>
  );
};

export default Charts;
