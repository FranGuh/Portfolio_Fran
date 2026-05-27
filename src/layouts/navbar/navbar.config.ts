export interface NavigationItem {
  label: string;
  translationKey?: string;
  link?: string;
  children?: NavigationItem[];
}

export const NAV_ITEMS: NavigationItem[] = [
  { 
    label: "INICIO", 
    translationKey: "navbar.inicio",
    link: "/",
    children: [
      { label: "Inicio", translationKey: "navbar.inicioSub", link: "/" },
    ],
  },
  { 
    label: "SOBRE MÍ", 
    translationKey: "navbar.sobreMi",
    link: "/about",
    children: [
      { label: "Sobre mí", translationKey: "navbar.sobreMiSub", link: "/about" },
      { label: "Detalles", translationKey: "navbar.detallesSub", link: "/detail" },
    ],
  },
  {
    label: "PORTFOLIO", 
    translationKey: "navbar.portfolio",
    link: "/portfolio",
    children: [
      { label: "Portfolio", translationKey: "navbar.portfolioSub", link: "/Portfolio" },
    ],
  },
];
