import { useEffect, useState, useContext } from "react";
import "./home.scss";
import Header from "../../components/header/Header";
import CardMenu from "../../components/cardMenu/CardMenu";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { generateLinks } from "./links";
import Loader from "../../components/loader/Loader";
import { Context } from "../../context/Context";
import { Settings } from "../../components/settings/Settings";

const Home = () => {
  const [t] = useTranslation("home");
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  let links = generateLinks(context.appState.typeUser, t);
  // console.log(context)
  // console.log(context.appState)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="Home">
      {loading && <Loader />}
      <div className="Menu">
        <div className="container__menu">
          <Settings />
        </div>
      </div>
      <div className="container__home">
        <div className="gradient"></div>
        <Header
          title={`${t("hi") + " " + context.appState.name}`}
          subtitle={t("welcome")}
        />
        <div
          className="menu"
          style={{ flexDirection: `${isNonMobile ? "row" : "column"}` }}
        >
          {links?.map((item) => {
            return (
              <CardMenu
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                number={item.number}
                color={item.color}
                path={item.path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
