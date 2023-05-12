import { useContext } from "react";
import { useTranslation } from "react-i18next";
//import { useFetch } from "../../fetch/useFetch";
import { useState } from "react";
import logo from "../../assets/Logo_Vertical_Azul.png";
import "./login.scss";
import icon from "../../assets/flecha.png";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { Context } from "../../context/Context";

const Login = () => {
  const [t, i18n] = useTranslation("login");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  //const [data, setData] = useState(null);
  const navigate = useNavigate();
  const context = useContext(Context);
  // console.log(context);

  const consultaUsuarioBD = async (datos) => {
    const data = await fetch("http://127.0.0.1:8000/core/login", datos);
    return data.json();
  };

  const login = async (e) => {
    e.preventDefault();
    let toSend = {
      username: correo,
      password: contrasena,
    };

    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toSend),
    };

    // console.log("los Datos:", datos);

    const response = await consultaUsuarioBD(datos);
    console.log("response:", response);

    let typeUser = null;
    if (response.is_admin === true) {
      typeUser = "admin";
    } else if (response.is_client === true) {
      typeUser = "client";
    } else if (response.is_recepcionista === true) {
      typeUser = "receptionist";
    }

    console.log(typeUser)

    let newData = {
      loggedIn: true,
      typeUser: typeUser,
      name: response.name + " " + response.apellido,
      token: `Token ${response.token}`,
    };
    context.setAppState(newData);
    // console.log(context)
    navigate("/home");
  };

  return (
    <>
      <div className="Login grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="idioma">
          <LanguageIcon
            style={{ color: "black", fontSize: 40, cursor: "pointer" }}
            onClick={() => {
              i18n.language === "es"
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("es");
            }}
          />
        </div>
        <div
          className="inicio"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={icon} alt="regresar" />
          <p>{t("home")}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-blue-950 p-4">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold text-gray-50">{t("welcome")}</h1>
          </div>
          <div className="my-14">
            <p className="text-center relative text-gray-50 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
              {t("sub_text")}
            </p>
          </div>
          <div className="w-full mb-8">
            <form>
              <div className="flex justify-center mb-4">
                <input
                  type="email"
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("email")}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="flex justify-center mb-6">
                <input
                  type="password"
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("password")}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
              <div className="w-full max-w-md mx-auto flex items-center justify-between text-gray-500 mb-8"></div>
              <div className="w-full max-w-md mx-auto">
                <button
                  type="submit"
                  className="w-full bg-gray-200 py-2 px-4 rounded-lg text-gray-900 hover:bg-gray-300 transition-colors"
                  onClick={login}
                >
                  {t("login")}
                </button>
              </div>
            </form>
          </div>
          <div className="cuenta">
            <span className="text-gray-50">
              {t("question")}{" "}
              <p
                className="registrarme"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {t("register")}
              </p>
            </span>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center border-t border-r border-b">
          <img src={logo} />
        </div>
      </div>
    </>
  );
};

export default Login;
