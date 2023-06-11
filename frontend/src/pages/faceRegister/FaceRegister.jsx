import "./faceRegister.scss";
import Settings from "../../components/settings/Settings";
import Header from "../../components/header/Header";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import home_icon from "../../assets/home2.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//import { DataObjectOutlined } from "@mui/icons-material";

function FaceRegister({ userType }) {
  const [t] = useTranslation("faceRegister");

  const [data, setData] = useState({
    tipo: userType,
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    fecha_nacimiento: "",
    salario: "0",
    password: "",
  });

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const consultaUsuarioBD = async (datos) => {
    const data = await fetch("http://127.0.0.1:8000/core/create", datos);
    return data.json();
  };

  const handleFormSubmit = async (values) => {
    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tipo: userType,
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        direccion: values.direccion,
        fecha_nacimiento: values.fecha_nacimiento,
        salario: values.salario,
        password: values.contraseña,
      }),
    };

    console.log("los Datos:", datos);

    const response = await consultaUsuarioBD(datos);

    console.log("response:", response);
  };

  function submit(values) {
    handleFormSubmit(values);
  }
  return (
    <>
      <div className="FaceRegister">
        <div
          className="home_faceRegister"
          onClick={() => {
            navigate("/home");
          }}
        >
          <img src={home_icon} alt="home" />
        </div>
        <div className="settings_faceRegister">
          <Settings />
        </div>
        <Header title={t("title")} subtitle={t("sub_title")} />
        <div className="formulario">
          <p>{t("sub_text")}</p>
          <Formik onSubmit={submit} initialValues={data}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={t("name")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="nombre"
                    disabled={false}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={t("last_name")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="apellido"
                    disabled={false}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={t("email")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="email"
                    disabled={false}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={t("address")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="direccion"
                    disabled={false}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label={t("date")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="fecha_nacimiento"
                    disabled={false}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {userType == "Receptionist" && (
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={t("salary")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="salario"
                      disabled={false}
                      sx={{ gridColumn: "span 4" }}
                    />
                  )}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label={t("password")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="contraseña"
                    disabled={false}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  mt="20px"
                >
                  <Button type="submit" variant="contained">
                    {t("register")}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default FaceRegister;
