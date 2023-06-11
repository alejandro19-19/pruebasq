import { useState } from "react";
import "./roomState.scss";
import img1 from "../../assets/img5.png";
import home_icon from "../../assets/home2.png";
import Header from "../../components/header/Header";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/Context";
import AlertMessage from "../../components/alertMessage/AlertMessage";
import { useNavigate } from "react-router-dom";

const RoomState = ({ type }) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");
  const context = useContext(Context);
  const navigate = useNavigate("");
  console.log(context.appState.temporalData);

  async function unassignRoom() {
    fetch("http://127.0.0.1:8000/core/rooms/unassign", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id_user: context.appState.temporalData.id_user.id,
      }),
    })
      .then((res) => {
        console.log(res);
        setMessage("La habitación ahora está libre");
        setTypeError("success");
        setAlert(true);
        setTimeout(() => {
          navigate("/rooms");
        }, 1000);
      })
      .then((res) => {
        setMessage("La habitación ahora está libre");
        setTypeError("success");
        setAlert(true);
      })
      .catch((error) => {
        setMessage("Ha ocurrido un error");
        setTypeError("error");
        setAlert(true);
      });
  }

  return (
    <div className="RoomState">
      {alert ? <AlertMessage message={message} type={typeError} /> : null}
      <div
        className="home_roomState"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home_icon} alt="home" />
      </div>
      <Header title={"Profile"} subtitle={"Manage yuor information"} />
      <div className="container">
        <section className="status">
          <img src={img1} alt="room" />
          <div className="number_room">
            {type === "occupied"
              ? context.appState.temporalData.habitacion_id.numero
              : context.appState.temporalData.numero}
          </div>
          <div className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quam
            iusto necessitatibus tenetur beatae fugit autem rerum neque culpa
            dicta perferendis explicabo maxime, sunt ea adipisci nobis ipsa
            accusantium dolorum.
          </div>
          <div className="status_room">
            {type === "occupied" ? "Ocupado" : "Libre"}
          </div>
        </section>
        <section className="information">
          {/* <h1>INFORMACIÓN</h1> */}
          {type === "occupied" && (
            <>
              <p>Esta habitación está reservada por:</p>
              <div className="inputs">
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": "span 4",
                  }}
                >
                  <Box className="input_form" sx={{ gridColumn: "span 2" }}>
                    <p className="title">Nombre</p>
                    <p className="data">
                      {context.appState.temporalData.id_user.nombre}
                    </p>
                  </Box>
                  <Box className="input_form" sx={{ gridColumn: "span 2" }}>
                    <p className="title">Apellido</p>
                    <p className="data">
                      {context.appState.temporalData.id_user.apellido}
                    </p>
                  </Box>
                  <Box className="input_form" sx={{ gridColumn: "span 4" }}>
                    <p className="title">Email</p>
                    <p className="data">
                      {context.appState.temporalData.id_user.email}
                    </p>
                  </Box>
                  <Box className="input_form" sx={{ gridColumn: "span 4" }}>
                    <p className="title">Dirección de residencia</p>
                    <p className="data">
                      {context.appState.temporalData.id_user.direccion}
                    </p>
                  </Box>
                  <Box className="input_form" sx={{ gridColumn: "span 2" }}>
                    <p className="title">Fecha de nacimiento</p>
                    <p className="data">
                      {context.appState.temporalData.id_user.fecha_nacimiento}
                    </p>
                  </Box>
                </Box>
              </div>
              <button
                onClick={() => {
                  unassignRoom();
                }}
              >
                Quitar reserva
              </button>
            </>
          )}
          {type === "free" && (
            <>
              <p>Esta habitación está libre</p>
              <button>Reservar</button>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default RoomState;
