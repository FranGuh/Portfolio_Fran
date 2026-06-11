// components/Navbar/NavbarLogo.tsx
import React from "react";
import './NavbarLogo.css';

interface NavbarLogoProps {
    isOpen: boolean;
    toggleMenu: () => void;
    dark?: boolean;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ isOpen, toggleMenu, dark }) => {
  return (
    <button
      type="button"
      className={`navbar-logo ${dark ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-controls="mega-menu"
    >
      Franguh
      <span className="logo-arrow">▾</span>
    </button>
  );
};

