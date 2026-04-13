import { useState } from "react";
import "./FeatureSelector.css";

const features = [
  {
    key: "perfil",
    label: "Perfil",
    description: "Ingeniero en Sistemas Computacionales. Enfoque en desarrollo de software y resolución de problemas técnicos."
  },
  {
    key: "frontend",
    label: "Frontend",
    description: "Desarrollo de interfaces con React, JavaScript, TypeScript, HTML y CSS."
  },
  {
    key: "backend",
    label: "Backend",
    description: "Construcción de APIs y lógica de servidor utilizando Node.js. Manejo de bases de datos SQL y NoSQL."
  },
  {
    key: "python",
    label: "Python & Datos",
    description: "Creación de scripts de auditoría y sistemas de clasificación de imágenes (uso de dlib, CUDA y scikit-learn para clustering con DBSCAN)."
  },
  {
    key: "cloud",
    label: "Nube & Deploy",
    description: "Despliegue y administración de infraestructura en la nube utilizando Vercel, Cloudflare y AWS."
  },
  {
    key: "proyectos",
    label: "Proyectos",
    description: "Desarrollo de Plynte y herramientas de gestión de almacenamiento."
  }
];

export default function FeatureSelector() {
  const [selected, setSelected] = useState(features[0]);

  return (
    <div className="FeatureSelector">
      <nav className="FeatureSelector__tabs">
        {features.map((feature) => (
          <button
            key={feature.key}
            className={selected.key === feature.key ? "active" : ""}
            onClick={() => setSelected(feature)}
          >
            {feature.label}
          </button>
        ))}
      </nav>

      <div className="FeatureSelector__content">
        <h2>{selected.label}</h2>
        <p>{selected.description}</p>
      </div>
    </div>
  );
}