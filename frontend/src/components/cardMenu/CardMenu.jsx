import "./cardMenu.scss";
import { useNavigate } from "react-router-dom";

const CardMenu = ({ title, description, image, number, color, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="CardMenu"
      data-testid="click"
      onClick={() => {
        navigate(path);
      }}
    >
      <div className="container__CardMenu">
        <div className="bg" style={{ backgroundImage: `url(${image})` }}></div>
        <div
          className={`color__bg ${color === "red" ? "red" : "purple"}`}
        ></div>
        <div className="number">{number}</div>
        <div className="text">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
