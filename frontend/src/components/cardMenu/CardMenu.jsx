import { useState } from "react";
import "./cardMenu.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const CardMenu = ({ title, description, image, number, color, path }) => {
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const navigate = useNavigate();

  return (
    <div
      className="CardMenu"
      onClick={() => {
        navigate(path);
      }}
      // style={{width: `${isNonMobile? "350px": "200px"}`, height: `${isNonMobile? "450px": "300px"}`}}
    >
      <div className="container__CardMenu">
        <div className="bg" style={{ backgroundImage: `url(${image})` }}></div>
        <div
          className="color__bg"
          style={{
            backgroundColor: `${
              color === "red" ? "rgba(102, 0, 0, 0.9)" : "rgba(55, 4, 59, 0.9)"
            }`,
          }}
        ></div>
        <div className="number">{number}</div>
        <div className="text">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
