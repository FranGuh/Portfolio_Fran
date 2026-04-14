import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./NotFoundPage.css";
import HomeSection from "../../features/HomeSection/HomeSection";
import { SEOHead } from "../../components/SEOHead";

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  return (
    <div className="Page404">
      <SEOHead title="404 No Encontrado" description="Esta página no existe o ha sido movida." />
      <HomeSection text1="😕 ¡Ups!" text2="Esta página no existe" />

      <div className="Page404__content">
        <p>
          La URL <code>{pathname}</code> no corresponde a ningún recurso válido.
        </p>
        <p>
          Es posible que escribiste mal la dirección o que la página fue eliminada.
        </p>

        <div className="Page404__buttons">
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver al Inicio
          </Button>
          <Button variant="secondary" onClick={() => navigate('/about')}>
            Ir a Sobre Mí
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
