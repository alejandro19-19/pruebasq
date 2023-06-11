import "./cardRoom.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const CardRoom = ({ number, available, data }) => {
  const [t] = useTranslation("cardRoom");
  const navigate = useNavigate("");
  const context = useContext(Context);
  return (
    <div className="CardRoom">
      <div className="bg_img"></div>
      <div className="text">
        <p>{t("room")}</p>
        <p>{number}</p>
        <p>{available ? t("free") : t("occupied")}</p>
      </div>
      <button
        onClick={() => {
          context.setAppState({ ...context.appState, temporalData: data });
          if (available) {
            navigate("/roomFree");
          } else {
            navigate("/roomOccupied");
          }
        }}
      >
        Ver
      </button>
    </div>
  );
};

export default CardRoom;
