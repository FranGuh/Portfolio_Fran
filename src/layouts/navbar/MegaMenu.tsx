import { NAV_ITEMS } from "./navbar.config";
import "./MegaMenu.css";
import { NavbarLogo } from "../../components/UI/Navbar/NavbarLogo";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../../components/UI/LanguageSwitcher/LanguageSwitcher";

export const MegaMenu = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className={`mega-menu-overlay ${isOpen ? "open" : ""}`}>
      <div className="mega-menu-header">
        <NavbarLogo isOpen={isOpen} toggleMenu={onClose} dark={true} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <LanguageSwitcher />
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="mega-menu-content">
        <div className="menu-columns">
          {NAV_ITEMS.map((section, idx) => (
            <div className="menu-section" key={idx}>
              <h4>{section.label.toUpperCase()}</h4>
              <div className="menu-links">
                {section.children?.map((item, i) => (
                  //<a href={item.link} key={i}>{item.label}</a>
                  <Link to={item.link ?? "/"} key={i}>{item.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="menu-image">
          <img src="/pictures/Aqua.webp" alt="Featured" loading="lazy" />
        </div>
      </div>
    </div>
  );
};
