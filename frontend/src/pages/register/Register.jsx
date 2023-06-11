import { useState } from "react";
import "./register.scss";
import logo from "../../assets/Logo_Vertical_Azul.png";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/flecha.png";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import AlertMessage from "../../components/alertMessage/AlertMessage";

function Register() {
  const [t, i18n] = useTranslation("register");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccionResidencia, setDireccionResidencia] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");

  const navigate = useNavigate();

  const consultaUsuarioBD = async (datos) => {
    const data = await fetch("http://127.0.0.1:8000/core/create", datos);
    return data.json();
  };

  const registro = async (e) => {
    e.preventDefault();
    let toSend = {
      tipo: "Client",
      nombre: nombre,
      apellido: apellidos,
      email: correo,
      direccion: direccionResidencia,
      fecha_nacimiento: fechaNacimiento,
      salario: "0",
      password: contrasena,
    };

    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toSend),
    };

    console.log("los Datos:", datos);

    const response = await consultaUsuarioBD(datos);
    console.log("response:", response);
    setMessage(t("success"));
    setTypeError("success");
    setAlert(true);
  };

  return (
    <>
      <div className="Register grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {alert ? <AlertMessage message={message} type={typeError} /> : null}
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
                  type=""
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("name")}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="flex justify-center mb-4">
                <input
                  type=""
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("last_name")}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
              <div className="flex justify-center mb-4">
                <input
                  type="email"
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("email")}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="flex justify-center mb-4">
                <input
                  type=""
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  placeholder={t("address")}
                  onChange={(e) => setDireccionResidencia(e.target.value)}
                />
              </div>
              <div className="flex justify-center mb-4">
                <input
                  type="date"
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  onChange={(e) => setFechaNacimiento(e.target.value)}
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
                  onClick={registro}
                >
                  {t("register")}
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
                  navigate("/login");
                }}
              >
                {t("login")}
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
}

export default Register;
