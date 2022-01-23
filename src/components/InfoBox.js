import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "../styles/InfoBox.css";

const InfoBox = ({ title, cases, total, ...props }) => {
  return (
    <Card onClick={props.onClick} className="infoBox">
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography color="textSecondary" className="infoBox__total">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
