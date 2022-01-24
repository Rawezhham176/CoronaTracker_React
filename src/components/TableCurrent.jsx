import numeral from "numeral";
import React, { useState, useEffect } from "react";
import "../styles/Table.css";

const TableCurrent = ({ countries }) => {
  const [worldD, setworldD] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
          setworldD(data);
        });
    };
    console.log(worldD);
    fetchData();
  }, []);

  return (
    <div className="table">
      {Object.entries(worldD).map(([key, value]) => (
        <tr>
          <td>{key}</td>
          <td>
            <strong>{numeral(value).format(",")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default TableCurrent;
