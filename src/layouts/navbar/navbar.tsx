import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navbar.config";
import { MegaMenu } from "./MegaMenu";
import "./navbar.css";
import { NavbarLogo } from "../../components/UI/Navbar/NavbarLogo";
import { LanguageSwitcher } from "../../components/UI/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";


export function Navbar() {
  const [isMegaOpen, setMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMega = () => {
    setMegaOpen(prev => {
      if (prev) {
        // closing — return focus to the logo button
        const logoBtn = document.querySelector<HTMLElement>(".navbar-logo");
        logoBtn?.focus();
      }
      return !prev;
    });
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <NavbarLogo isOpen={isMegaOpen} toggleMenu={toggleMega} />
        </div>

        <div className="navbar-right">
          <ul className="navbar-menu">
            {NAV_ITEMS.map((item, index) => {
              const displayLabel = item.translationKey ? t(item.translationKey) : item.label;
              return (
                <li key={index} className="navbar-item">
                  <Link to={item.link ?? "/"}>{displayLabel}</Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher />
        </div>
      </nav>

      <MegaMenu onClose={toggleMega} isOpen={isMegaOpen} />
    </>
  );
}
