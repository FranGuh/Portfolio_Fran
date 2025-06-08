export interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

export const NAV_ITEMS: NavigationItem[] = [
  { label: "INICIO", link: "/",
    children: [
      { label: "Inicio", link: "/" },
      // ...
    ],
  },
  { label: "SOBRE MÍ", link: "/about",
    children: [
      { label: "Sobre mí", link: "/about" },
      // ...
    ],
  },
  {
    label: "PORTFOLIO", link: "/",
    children: [
      { label: "RedirectLink", link: "/RedirectLink" },
      { label: "Galeriq", link: "/Galeriq" },
      { label: "Cacao-Cocoa", link: "/Cacao-cocoa" },
      // ...
    ],
  },
];
