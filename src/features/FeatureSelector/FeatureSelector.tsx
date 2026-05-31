import { useState } from "react";
import "./FeatureSelector.css";
import { useLanguage } from "../../contexts/LanguageContext";

export default function FeatureSelector() {
  const { t } = useLanguage();

  const features = [
    {
      key: "perfil",
      label: t("featureSelector.perfil.label"),
      description: t("featureSelector.perfil.desc")
    },
    {
      key: "frontend",
      label: t("featureSelector.frontend.label"),
      description: t("featureSelector.frontend.desc")
    },
    {
      key: "backend",
      label: t("featureSelector.backend.label"),
      description: t("featureSelector.backend.desc")
    },
    {
      key: "python",
      label: t("featureSelector.python.label"),
      description: t("featureSelector.python.desc")
    },
    {
      key: "cloud",
      label: t("featureSelector.cloud.label"),
      description: t("featureSelector.cloud.desc")
    },
    {
      key: "proyectos",
      label: t("featureSelector.proyectos.label"),
      description: t("featureSelector.proyectos.desc")
    }
  ];

  const [selectedKey, setSelectedKey] = useState("perfil");
  const selectedFeature = features.find(f => f.key === selectedKey) || features[0];

  return (
    <div className="FeatureSelector">
      <nav className="FeatureSelector__tabs">
        {features.map((feature) => (
          <button
            key={feature.key}
            className={selectedKey === feature.key ? "active" : ""}
            onClick={() => setSelectedKey(feature.key)}
          >
            {feature.label}
          </button>
        ))}
      </nav>

      <div className="FeatureSelector__content">
        <h2>{selectedFeature.label}</h2>
        <p>{selectedFeature.description}</p>
      </div>
    </div>
  );
}