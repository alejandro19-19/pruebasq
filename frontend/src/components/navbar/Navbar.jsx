import "./navbar.scss";
import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import logo from "../../assets/Logo_Horizontal.png";
import logo2 from "../../assets/Logo_Vertical.png";
import video from "../../assets/Video2.mp4";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavDrawer from "../navDrawer/NavDrawer";
import loginImage from "../../assets/login.svg";
import registerImage from "../../assets/register.svg";
import menu from "../../assets/menu.svg";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [t, i18n] = useTranslation("homePage");
  const navigate = useNavigate();

  const navLinksPage = [
    { title: t("login"), path: "/login", icon: loginImage },
    { title: t("register"), path: "/register", icon: registerImage },
  ];

  return (
    <div className="Navbar">
      <div className="bg__video">
        <div className="overlay"></div>
        <div className="logo">
          <img
            src={logo2}
            alt="logo"
            style={{ width: `${isNonMobile ? "40%" : "60%"}` }}
          />
        </div>
        <video src={video} autoPlay loop muted />
      </div>
      <nav style={{ height: `${isNonMobile ? "90px" : "60px"}` }}>
        <img
          src={logo}
          alt="Logo"
          data-testid="clickImg"
          onClick={() => {
            navigate("/");
          }}
        />
        {isNonMobile ? (
          <Box display={"flex"} alignItems={"center"}>
            {navLinksPage.map((item) => {
              return (
                <button
                  key={item.title}
                  data-testid="click-btn"
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.title}
                </button>
              );
            })}
            <LanguageIcon
              style={{ color: "white", fontSize: 40, cursor: "pointer" }}
              data-testid="click-lng"
              onClick={() => {
                i18n.language === "es"
                  ? i18n.changeLanguage("en")
                  : i18n.changeLanguage("es");
              }}
            />
          </Box>
        ) : (
          <img
            className="menu"
            src={menu}
            alt="menu"
            data-testid="click-img2"
            onClick={() => setOpen(true)}
          />
        )}
      </nav>
      <div></div>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}

        // sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavDrawer navLinks={navLinksPage} />
      </Drawer>
    </div>
  );
};

export default Navbar;
