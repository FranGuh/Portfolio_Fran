import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./NotFoundPage.css";
import { SEOHead } from "../../components/SEOHead";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pathname = location.pathname;
  const urlInfoParts = t("notFound.urlInfo").split("{path}");

  return (
    <div className="Page404">
      <SEOHead title={`404 - ${t("notFound.title")}`} description={t("notFound.description")} />
      <PageHeader
        eyebrow="404"
        title={t("notFound.title")}
        description={t("notFound.description")}
      />

      <div className="Page404__content">
        <p>
          {urlInfoParts[0]}<code>{pathname}</code>{urlInfoParts[1]}
        </p>
        <p>
          {t("notFound.subInfo")}
        </p>

        <div className="Page404__buttons">
          <Button variant="primary" onClick={() => navigate('/')}>
            {t("notFound.btnHome")}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/about')}>
            {t("notFound.btnAbout")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
