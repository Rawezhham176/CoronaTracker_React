import numeral from "numeral";
import React from "react";
import "../styles/Table.css";

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format(",")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
