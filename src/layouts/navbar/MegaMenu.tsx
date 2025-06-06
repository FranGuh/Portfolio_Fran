import { NAV_ITEMS } from "./navbar.config";
import "./MegaMenu.css";
import { NavbarLogo } from "../../components/UI/Navbar/NavbarLogo";

export const MegaMenu = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className="mega-menu-overlay">
      <div className="mega-menu-header">
        <NavbarLogo isOpen={isOpen} toggleMenu={onClose} dark={true} />
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
