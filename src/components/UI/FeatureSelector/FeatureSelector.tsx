import { useState } from "react";
import "./FeatureSelector.css";

const features = [
  { key: "web", label: "Web", description: "Desarrollo general de sitios y aplicaciones web." },
  { key: "frontend", label: "Frontend", description: "Experiencia en React, TypeScript, HTML y CSS." },
  { key: "backend", label: "Backend", description: "APIs, manejo de servidores, Node.js y bases de datos." },
  { key: "cloud", label: "Nube", description: "Uso de servicios como AWS, Vercel y MongoDB Atlas." },
  { key: "languages", label: "Lenguajes", description: "HTML, CSS, JavaScript, TypeScript y más." },
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

      <div className="FeatureSelector__dialog-container">
        <img
          src="/pictures/ImgProyects/Character.webp"
          alt="Personaje"
          className="FeatureSelector__character"
        />
        <div className="FeatureSelector__dialog-content">
            <h2>{selected.label}</h2>
            <div className="FeatureSelector__dialog-box">
                <p>{selected.description}</p>
            </div>
        </div>

        
      </div>
    </div>
  );
}
