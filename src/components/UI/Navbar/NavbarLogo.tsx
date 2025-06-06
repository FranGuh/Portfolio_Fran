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
    <div
      className={`navbar-logo ${dark ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
    >
      Franguh
      <span className="logo-arrow">▾</span>
    </div>
  );
};

