import "./buttonIcon.scss";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/Context";
import { useContext } from "react";

export const ButtonIcon = ({ text, icon, link }) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const context = useContext(Context);

  return (
    <div
      className="ButtonIcon"
      onClick={() => {
        link == "language"
          ? i18n.language === "es"
            ? i18n.changeLanguage("en")
            : i18n.changeLanguage("es")
          : navigate(link);
        link === "/" &&
          context.setAppState({
            loggedIn: false,
            typeUser: "",
            name: "",
            token: "",
          });
      }}
    >
      <p>{text}</p>
      <img src={icon} alt="icon" />
    </div>
  );
};
