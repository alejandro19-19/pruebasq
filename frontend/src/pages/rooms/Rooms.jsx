import Settings from "../../components/settings/Settings";
import Header from "../../components/header/Header";
import { useTranslation } from "react-i18next";
import "./rooms.scss";
import { useState, useContext } from "react";
import home_icon from "../../assets/home2.png";
import { useNavigate } from "react-router-dom";
import CardRoom from "../../components/cardRoom/CardRoom";
import { useFetch } from "../../hooks/useFetch";
import { Context } from "../../context/Context";

const Rooms = () => {
  const [t] = useTranslation("rooms");
  const [number, setNumber] = useState("");
  const [occupied, setOccupied] = useState("");
  const [roomOccupied, setRoomOccupied] = useState("occuped");
  const [free, setFree] = useState("");
  const navigate = useNavigate("");
  const context = useContext(Context);
  const { data: dataOccupeid, loading: loadingOccupied } = useFetch(
    "http://127.0.0.1:8000/core/client/rooms"
  );
  const { data: dataFree, loading: loadingFree } = useFetch(
    "http://127.0.0.1:8000/core/rooms/free"
  );

  console.log("Ocupado", dataOccupeid);
  console.log("Libre", dataFree);

  function sendData() {
    fetch("http://127.0.0.1:8000/core/admin", {
      method: "POST",
      headers: {
        Authorization: `${context.appState.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ disponible: occupied, numero: number }),
    }).then((res) => {
      setNumber("");
      setOccupied("");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendData();
  }

  return (
    <div className="Rooms">
      <div
        className="rooms_profile"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home_icon} alt="home" />
      </div>
      {/* <div className="settings_rooms">
        <Settings />
      </div> */}
      <Header title={t("rooms")} subtitle={t("description")} />
      <div className="register_room">
        <h1>{t("register")}</h1>
        <form onSubmit={handleSubmit}>
          <div className="data">
            <p>{t("number")}:</p>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <p>{t("available")}:</p>
            <input
              type="text"
              value={occupied}
              onChange={(e) => setOccupied(e.target.value)}
            />
            <button type="submit">{t("create")}</button>
          </div>
        </form>
      </div>
      <div className="menu">
        <button
          className={roomOccupied}
          onClick={() => {
            setRoomOccupied("occuped");
            setFree("");
          }}
        >
          {t("occupied")}
        </button>
        <button
          className={free}
          onClick={() => {
            setRoomOccupied("");
            setFree("free");
          }}
        >
          {t("free")}
        </button>
      </div>
      <div className="cards">
        {roomOccupied != "" &&
          dataOccupeid?.map((item) => {
            return (
              <CardRoom
                key={item.habitacion_id.id}
                number={item.habitacion_id.numero}
                available={item.habitacion_id.disponible}
                data={item}
              />
            );
          })}
        {free != "" &&
          dataFree?.map((item) => {
            return (
              <CardRoom
                key={item.id}
                number={item.numero}
                available={item.disponible}
                data={item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Rooms;
