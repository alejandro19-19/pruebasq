import { Settings } from "../../components/settings/Settings";
import Header from "../../components/header/Header";
import { useTranslation } from "react-i18next";
import "./rooms.scss";
import { useState } from "react";
import home_icon from "../../assets/home2.png";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const [t] = useTranslation("rooms");
  const [number, setNumber] = useState("");
  const [occupied, setOccupied] = useState("");
  const navigate = useNavigate()

  function sendData() {
    fetch("http://127.0.0.1:8000/core/admin", {
      method: "POST",
      headers: {
        Authorization: `Token 3e80d96045c1eface698dcb2a0e028fa8d356974`,
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
      <div className="settings_rooms">
        <Settings />
      </div>
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
    </div>
  );
};

export default Rooms;
