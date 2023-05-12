import "./homePage.scss";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import CardInformation from "../../components/cardInformation/CardInformation";
import imgMision from "../../assets/mision.png";
import imgVision from "../../assets/vision.png";
import ImageSlider from "../../components/imageSlider/ImageSlider";

const HomePage = () => {
  const [t] = useTranslation("homePage");
  const mision = {
    title: t("mission"),
    text: t("mission_text"),
  }
  const vision = {
    title: t("vision"),
    text: t("vision_text"),
  }

  return (
    <div className="HomePage">
      <Navbar />
      <Grid container>
        <CardInformation
          title={mision.title}
          text={mision.text}
          img={imgMision}
        />
        <CardInformation
          title={vision.title}
          text={vision.text}
          img={imgVision}
        />
        <ImageSlider />
      </Grid>
      <footer>
        <div className="bg"></div>
        <div className="footer_content">
          <h3>Hotel Nexus</h3>
          <p>
            {t("information")}
          </p>
          <ul className="socials">
            <li>
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-google-plus"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
