import { useEffect, useState } from "react";
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

  // This page is served from a single statically prerendered 404.html (built at
  // /404), but the visitor's real path varies. Rendering location.pathname on
  // the first pass would mismatch the baked "/404" and break hydration (React
  // #418), so only show the path after the component has mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const urlInfoParts = t("notFound.urlInfo").split("{path}");

  return (
    <div className="Page404">
      <SEOHead
        title={`404 - ${t("notFound.title")}`}
        description={t("notFound.description")}
        robots="noindex, nofollow"
      />
      <PageHeader
        eyebrow="404"
        title={t("notFound.title")}
        description={t("notFound.description")}
      />

      <div className="Page404__content">
        <p>
          {urlInfoParts[0]}{mounted && <code>{location.pathname}</code>}{urlInfoParts[1]}
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
