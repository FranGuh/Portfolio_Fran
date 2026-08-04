import React from "react";
import './NavbarLogo.css';
import { useLanguage } from "../../../contexts/LanguageContext";

interface NavbarLogoProps {
    isOpen: boolean;
    toggleMenu: () => void;
    dark?: boolean;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ isOpen, toggleMenu, dark }) => {
  const { t } = useLanguage();
  const labelText = isOpen ? (t("navbar.closeMenu") as string) : (t("navbar.openMenu") as string);

  return (
    <button
      type="button"
      className={`navbar-logo ${dark ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-controls="mega-menu"
      aria-label={labelText}
    >
      Franguh
      <span className="logo-arrow" aria-hidden="true">▾</span>
    </button>
  );
};

