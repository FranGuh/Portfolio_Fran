import { useEffect, useRef } from "react";
import { NAV_ITEMS } from "./navbar.config";
import "./MegaMenu.css";
import { NavbarLogo } from "../../components/UI/Navbar/NavbarLogo";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../../components/UI/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

export const MegaMenu = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus first focusable element when menu opens
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }, [isOpen]);

  // Escape key closes menu and returns focus to logo button
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        const logoBtn = document.querySelector<HTMLElement>(".navbar-logo");
        logoBtn?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      id="mega-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t("navbar.menuLabel") as string}
      className={`mega-menu-overlay ${isOpen ? "open" : ""}`}
    >
      <div className="mega-menu-header">
        <NavbarLogo isOpen={isOpen} toggleMenu={onClose} dark={true} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <LanguageSwitcher />
          <button className="close-btn" onClick={onClose} aria-label={t("navbar.closeLabel") as string}>✕</button>
        </div>
      </div>

      <div className="mega-menu-content">
        <div className="menu-columns">
          {NAV_ITEMS.map((section, idx) => {
            const displaySectionLabel = section.translationKey ? t(section.translationKey) : section.label;

            return (
              <div className="menu-section" key={idx}>
                <h4>{(displaySectionLabel as string).toUpperCase()}</h4>
                <div className="menu-links">
                  {section.children?.map((item, i) => {
                    const displayItemLabel = item.translationKey ? t(item.translationKey) : item.label;

                    return (
                      <Link to={item.link ?? "/"} key={i} onClick={onClose}>
                        {displayItemLabel as string}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="menu-image">
          <img src="/pictures/Aqua.webp" alt="Featured" loading="lazy" />
        </div>
      </div>
    </div>
  );
};
