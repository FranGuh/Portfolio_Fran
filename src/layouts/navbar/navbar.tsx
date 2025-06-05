import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navbar.config";
import { MegaMenu } from "./MegaMenu";
import "./navbar.css";

export function Navbar() {
  const [isMegaOpen, setMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => setMegaOpen(!isMegaOpen)}>
            Franguh
            <span className={`logo-arrow ${isMegaOpen ? "up" : "down"}`}>
              {isMegaOpen ? "▴" : "▾"}
            </span>
          </div>

        </div>

        <ul className="navbar-menu">
          {NAV_ITEMS.map((item, index) => (
            <li key={index} className="navbar-item">
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* <div className="navbar-right">
          <input className="search" placeholder="Search" />
          <button className="sign-in">SIGN IN</button>
        </div> */}
      </nav>

      {isMegaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
    </>
  );
}
