import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the pathname changes, instantly scroll the window to top.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
