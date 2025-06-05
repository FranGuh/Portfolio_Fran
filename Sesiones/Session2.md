 Etapa 1: Estructura base
 Crea carpeta /components/navbar

 Crea archivo Navbar.tsx

 Crea navbar.config.ts con tus NAV_ITEMS (con label, link, y children)

 Usá useState para manejar si el mega está abierto

 Usá useEffect para detectar scroll (activar .scrolled)

💅 Etapa 2: CSS básico
 .navbar con posición fixed, padding, fondo transparent

 .navbar.scrolled con fondo #111

 .navbar-logo con texto + flecha que rota

 Flecha (▴/▾) rotando según estado

 Transiciones suaves para color, fondo y rotación

🧩 Etapa 3: MegaMenu
 Crea MegaMenu.tsx

 Mostralo solo cuando isMegaOpen es true

 Dentro:

header: logo con flecha (cerrar)

columnas (NAV_ITEMS.map) y una imagen destacada

 Añadí una pequeña animación (@keyframes fadeIn)

🧪 Etapa 4: Detalles Pro
 Hover en logo cambia color y flecha

 Transiciones de color en links

 Imagen destacada con object-fit: cover

 Responsividad: el mega debe verse bien en móvil también

🧠 Bonus (para subir nivel):
 Convertí los NAV_ITEMS en un type

 Tipá bien los props (onClose, item)

 Pasá la imagen como prop (no hardcoded)

 En vez de a href, usá <Link to=""> si usás React Router

