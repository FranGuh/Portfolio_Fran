import { useLocation } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./Page404.css";
import HomeSection from "../../components/UI/HomeSection/HomeSection";

const Page404 = () => {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <div className="Page404">
      <HomeSection text1="😕 ¡Ups!" text2="Esta página no existe" />

      <div className="Page404__content">
        <p>
          La URL <code>{pathname}</code> no corresponde a ningún recurso válido.
        </p>
        <p>
          Es posible que escribiste mal la dirección o que la página fue
          eliminada.
        </p>

        <div className="Page404__buttons">
          <Button redirection="/" text="Volver al inicio" variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default Page404;
