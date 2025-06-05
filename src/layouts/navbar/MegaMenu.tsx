import { NAV_ITEMS } from "./navbar.config";
import "./MegaMenu.css";

export const MegaMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="mega-menu-overlay">
      <div className="mega-menu-header">
        <div className="mega-menu-logo" onClick={onClose}>
          Franguh
          <span className="mega-logo-arrow">▴</span>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="mega-menu-content">
        <div className="menu-columns">
          {NAV_ITEMS.map((section, idx) => (
            <div className="menu-section" key={idx}>
              <h4>{section.label.toUpperCase()}</h4>
              <div className="menu-links">
                {section.children?.map((item, i) => (
                  <a href={item.link} key={i}>{item.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="menu-image">
          <img src="/pictures/Aqua.png" alt="Featured" />
        </div>
      </div>
    </div>
  );
};
