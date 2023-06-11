import { Grid } from "@mui/material";
import React from "react";
import "./cardInformation.scss";

function CardInformation({ title, text, img }) {
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <div className="CardInformation">
        <div className="container" style={{backgroundImage: `url(${img})`}}>
          <div className="data">
            <h1 className="title_h">{title}</h1>
            <p className="text">{text}</p>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default CardInformation;
