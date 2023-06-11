import "./navDrawer.scss";
import logo from "../../assets/Logo_Vertical.png";
import { useNavigate } from "react-router-dom";

const NavDrawer = ({ navLinks }) => {
  const navigate = useNavigate()

  return (
    <div className="NavDrawer">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="list">
        {navLinks.map((item) => {
          return (
            <div className="btn" key={item.title}>
              <img src={item.icon} alt={item.title} />
              <button data-testid="btnNavigate" key={item.title} onClick={() => {navigate(item.path)}}>{item.title}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavDrawer;
