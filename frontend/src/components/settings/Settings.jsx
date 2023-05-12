import { useState, useContext } from "react";
import "./settings.scss";
import { ButtonIcon } from "../buttonIcon/ButtonIcon";
import colombia from "../../assets/flag-colombia.svg";
import us from "../../assets/flag-us.svg";
import profile from "../../assets/profile.svg";
import logout from "../../assets/logout.svg";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/Context";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const [t, i18n] = useTranslation("settings");
  const context = useContext(Context);
  const NAME = context.appState.name;

  return (
    <div className="Settings">
      <div
        className={`${open ? "menuToggle active" : "menuToggle"}`}
        onClick={() => {
          setOpen(!open);
        }}
      ></div>
      <div className={`${open ? "menu activeMenu" : "menu"}`}>
        <ul>
          <li>
            <p>{NAME}</p>
          </li>
          <li>
            <ButtonIcon text={t("profile")} icon={profile} link={"/profile"} />
          </li>
          <li>
            <ButtonIcon
              text={t("language")}
              icon={i18n.language === "es" ? colombia : us}
              link={"language"}
            />
          </li>
          <li>
            <ButtonIcon text={t("sign_out")} icon={logout} link={"/"} />
          </li>
        </ul>
      </div>
    </div>
  );
};
