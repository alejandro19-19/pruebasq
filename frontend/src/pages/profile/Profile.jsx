import "./profile.scss";
import { Settings } from "../../components/settings/Settings";
import Header from "../../components/header/Header";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import home_icon from "../../assets/home2.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useFetch } from "../../hooks/useFetch";

const Profile = () => {
  const context = useContext(Context);
  console.log(context.appState.typeUser)
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { data, loading } = useFetch(
    `http://127.0.0.1:8000/core/${context.appState.typeUser}`,
    context.appState.token
  );
  return (
    <div className="Profile">
      <div
        className="home_profile"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home_icon} alt="home" />
      </div>
      <div className="settings_profile">
        <Settings />
      </div>
      <Header title={"Profile"} subtitle={"Manage yuor information"} />
      <div className="formulario">
        <p>Datos personales</p>
        {loading && <div className="loading"></div>}
        {!loading && (
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Box className="input_form" sx={{ gridColumn: "span 2" }}>
              <p className="title">Nombre</p>
              <p className="data">{data.info_user.id_user.nombre}</p>
            </Box>
            <Box className="input_form" sx={{ gridColumn: "span 2" }}>
              <p className="title">Apellido</p>
              <p className="data">{data.info_user.id_user.apellido}</p>
            </Box>
            <Box className="input_form" sx={{ gridColumn: "span 4" }}>
              <p className="title">Email</p>
              <p className="data">{data.info_user.id_user.email}</p>
            </Box>
            <Box className="input_form" sx={{ gridColumn: "span 4" }}>
              <p className="title">Dirección de residencia</p>
              <p className="data">{data.info_user.id_user.direccion}</p>
            </Box>
            <Box className="input_form" sx={{ gridColumn: "span 2" }}>
              <p className="title">Fecha de nacimiento</p>
              <p className="data">{data.info_user.id_user.fecha_nacimiento}</p>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Profile;
