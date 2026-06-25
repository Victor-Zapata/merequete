/* ============================================================================
   MEREQUETÉ · Datos editables del sitio
   ----------------------------------------------------------------------------
   Este es el archivo que podés abrir con el Bloc de notas para cambiar:
   teléfono / WhatsApp, dirección, Instagram, talleres, equipo, reseñas, fotos.

   Reglas simples para no romper nada:
   - Cambiá SOLO el texto que está entre comillas "asi".
   - No borres las comillas ni las comas del final de cada línea.
   - Después de guardar, abrí la web y apretá Ctrl+F5 para ver los cambios.

   El número de WhatsApp se escribe con código de país, sin signos:
   Argentina + Córdoba = 549351XXXXXXX  (54 país, 9 móvil, 351 Córdoba).
   ============================================================================ */
(function () {
  "use strict";

  window.__MEREQUETE__ = {

    /* ---------- Marca y contacto ---------- */
    brand: {
      name: "Merequeté",
      tagline: "Un lugar para jugar.",
      kicker: "Ludoteca infantil · Juego libre y talleres",
      city: "Córdoba",
      ages: "Infancias de 1 a 9 años",

      // ⬇️ TELÉFONO / WHATSAPP — reemplazá por el número real de la ludoteca.
      //    Formato internacional sin "+", sin espacios y sin guiones.
      //    Ejemplo Córdoba: "5493510000000"
      whatsapp: "5493510000000",
      // Cómo se muestra el teléfono en pantalla (este sí puede llevar espacios):
      phoneDisplay: "+54 9 351 000 0000",

      instagram: "merequeteludoteca",
      instagramUrl: "https://www.instagram.com/merequeteludoteca/",

      address: "Av. Bernardo O'Higgins 5920",
      addressArea: "Zona sur · Córdoba capital, Argentina",
      // Pin del mapa (abrí Google Maps, buscá la dirección y pegá la consulta):
      mapsQuery: "Merequeté ludoteca, Av. O'Higgins 5920, Córdoba, Argentina"
    },

    /* ---------- Propuesta lúdica · 10 talleres ----------
       serie: "Esencial" o "Temporada"
       sticker: nombre de la figura (no cambiar salvo que sepas)
       edad: "1-3", "4-6", "7-9" o "todas"  (controla el filtro por edad)        */
    proposals: [
      {
        name: "Juego Libre", serie: "Esencial", sticker: "bloques_apilados",
        subtitle: "El corazón de Merequeté", edad: "todas", edadLabel: "Todas las edades",
        fill: "#FF8C7A", accent: "#8E7CC3",
        includes: ["Espacio habilitado", "Acompañamiento profesional", "Materiales variados"],
        desc: "El tiempo y el espacio para que cada chico elija qué jugar, cómo y con quién. Acompañados, nunca dirigidos."
      },
      {
        name: "Arte y Manualidades", serie: "Esencial", sticker: "pincel_paleta",
        subtitle: "Manos en la masa, literalmente", edad: "1-6", edadLabel: "1 a 6 años",
        fill: "#8E7CC3", accent: "#FF8C7A",
        includes: ["Materiales de arte", "Delantales", "Producciones para llevar a casa"],
        desc: "Pintura, plastilina, collage. Un taller para ensuciarse las manos y descubrir formas nuevas de crear."
      },
      {
        name: "Cuentos y Lectura", serie: "Esencial", sticker: "libro_abierto",
        subtitle: "La hora del cuento, todos los días", edad: "todas", edadLabel: "Todas las edades",
        fill: "#7FB8E0", accent: "#8E7CC3",
        includes: ["Biblioteca infantil", "Narración oral", "Rincón de lectura"],
        desc: "Cuentos narrados por las seños, con tiempo para preguntar, imaginar y volver a pedir el mismo cuento mil veces."
      },
      {
        name: "Juego Heurístico", serie: "Esencial", sticker: "cesta_objetos",
        subtitle: "Explorar con todos los sentidos", edad: "1-3", edadLabel: "1 a 3 años",
        fill: "#FFB385", accent: "#7FB8E0",
        includes: ["Materiales no estructurados", "Cestas temáticas", "Espacio seguro"],
        desc: "Objetos de la vida cotidiana para tocar, combinar y explorar sin un fin predeterminado. Pensado para los más pequeños."
      },
      {
        name: "Cocina para Chicos", serie: "Temporada", sticker: "gorro_chef",
        subtitle: "Cocineritos en acción", edad: "4-9", edadLabel: "4 a 9 años",
        fill: "#FFB385", accent: "#FF8C7A",
        includes: ["Ingredientes", "Delantales y gorros", "Recetas simples y seguras"],
        desc: "Amasar, decorar, mezclar. Un taller pensado para que cocinar también sea jugar, con recetas simples y seguras para cada edad."
      },
      {
        name: "Ciencia Divertida", serie: "Temporada", sticker: "matraz_burbujas",
        subtitle: "Experimentos que sorprenden", edad: "6-9", edadLabel: "6 a 9 años",
        fill: "#8E7CC3", accent: "#7FB8E0",
        includes: ["Experimentos seguros", "Materiales incluidos", "Guía profesional"],
        desc: "Volcanes de bicarbonato, slime casero y pequeños experimentos que enseñan jugando, con toda la seguridad necesaria."
      },
      {
        name: "Música y Movimiento", serie: "Temporada", sticker: "nota_musical",
        subtitle: "Bailar, cantar, sonar", edad: "1-6", edadLabel: "1 a 6 años",
        fill: "#FF8C7A", accent: "#8E7CC3",
        includes: ["Instrumentos infantiles", "Canciones", "Juegos rítmicos"],
        desc: "Un taller para moverse libremente, descubrir el cuerpo y la música como otra forma de jugar."
      },
      {
        name: "Huerta y Naturaleza", serie: "Temporada", sticker: "maceta_planta",
        subtitle: "Aprender de la tierra", edad: "4-9", edadLabel: "4 a 9 años",
        fill: "#9BC59D", accent: "#FFB385",
        includes: ["Materiales de huerta", "Plantines", "Actividad al aire libre"],
        desc: "Plantar, regar y observar crecer. Un taller que conecta a los chicos con los tiempos de la naturaleza."
      },
      {
        name: "Juegos de Mesa y Lógica", serie: "Temporada", sticker: "dado_ficha",
        subtitle: "Pensar jugando", edad: "6-9", edadLabel: "6 a 9 años",
        fill: "#7FB8E0", accent: "#8E7CC3",
        includes: ["Juegos de mesa variados", "Acompañamiento profesional", "Juego por turnos"],
        desc: "Memoria, estrategia y reglas compartidas. Juegos pensados para cada etapa, que estimulan sin presionar."
      },
      {
        name: "Talleres para Familias", serie: "Temporada", sticker: "manos_unidas",
        subtitle: "Jugar en casa también se aprende", edad: "todas", edadLabel: "Todas las edades",
        fill: "#FF8C7A", accent: "#7FB8E0",
        includes: ["Encuentro con familias", "Material para compartir en casa", "Espacio de intercambio"],
        desc: "Un encuentro pensado para que las familias se lleven ideas y herramientas para seguir jugando en casa."
      }
    ],

    /* ---------- Equipo · pilares ---------- */
    team: [
      { name: "Naty", role: "Profesora de Nivel Inicial y Lic. en Gestión Educativa", note: "La mirada pedagógica detrás de cada propuesta.", icon: "estrella_corazon" },
      { name: "Acompañamiento profesional", role: "Equipo de seños", note: "Presentes en cada juego, sin imponerse nunca.", icon: "manos_abiertas" },
      { name: "Espacio seguro", role: "Infraestructura cuidada", note: "Pensado y revisado para que las familias estén tranquilas.", icon: "escudo_suave" },
      { name: "Comunidad", role: "Familias de Córdoba", note: "El primer y único espacio de este tipo en la ciudad.", icon: "casa_corazon" }
    ],

    /* ---------- Galería · fotos (en assets/img/) ---------- */
    gallery: [
      { src: "assets/img/g-blocks.webp", alt: "Chicos jugando con bloques de colores" },
      { src: "assets/img/g-reading.webp", alt: "Rincón de lectura con cuentos" },
      { src: "assets/img/g-art.webp", alt: "Mesa de arte con témperas" },
      { src: "assets/img/g-heuristic.webp", alt: "Juego heurístico con cestas de objetos" },
      { src: "assets/img/g-cooking.webp", alt: "Taller de cocina infantil" },
      { src: "assets/img/g-music.webp", alt: "Instrumentos musicales de juguete" },
      { src: "assets/img/g-garden.webp", alt: "Huerta pequeña con macetas" },
      { src: "assets/img/g-boardgames.webp", alt: "Juegos de mesa sobre la alfombra" },
      { src: "assets/img/g-freeplay.webp", alt: "Espacio de juego libre" },
      { src: "assets/img/g-teachers.webp", alt: "Seños acompañando el juego" },
      { src: "assets/img/g-crafts.webp", alt: "Manualidades terminadas" },
      { src: "assets/img/g-plasticine.webp", alt: "Plastilina de colores" },
      { src: "assets/img/g-books.webp", alt: "Libros infantiles en biblioteca baja" },
      { src: "assets/img/g-sensory.webp", alt: "Rincón sensorial" },
      { src: "assets/img/g-crayons.webp", alt: "Crayones y dibujos de los chicos" },
      { src: "assets/img/espacio-1.webp", alt: "El espacio de Merequeté" }
    ],

    /* ---------- Reseñas de familias (Google Maps) ---------- */
    testimonials: [
      { quote: "Excelente ludoteca, ideal para dejar a los niños mientras se divierten y aprenden a través del juego. El ambiente muy lindo y las actividades están muy bien pensadas para estimular la creatividad y el aprendizaje. Súper recomendable.", author: "Marcos Bonetto", meta: "Local Guide · 201 opiniones", photo: "assets/img/g-freeplay.webp" },
      { quote: "Lo mejor para los niños. Las seños, una genialidad. Hermoso lugar. La seño Naty transmite una paz y tranquilidad. Súper recomendable.", author: "Martín Horacio Valdés", meta: "Local Guide · 43 opiniones", photo: "assets/img/g-teachers.webp" },
      { quote: "Un lugar espectacular para los más chicos, atendido por profesionales.", author: "Belén Pfeiffer", meta: "Local Guide · 10 opiniones", photo: "assets/img/espacio-2.webp" },
      { quote: "Excelente lugar para niños. Actividades y talleres muy bien pensados para los chicos. Atendido por profesionales.", author: "Agus García", meta: "Local Guide · 76 opiniones", photo: "assets/img/g-art.webp" },
      { quote: "Excelente espacio para las infancias. El primero y único en Córdoba capital. ¡Sigamos apoyando estos emprendimientos!", author: "Ana Laura Varas", meta: "Reseña en Google", photo: "assets/img/espacio-3.webp" },
      { quote: "El lugar es hermoso, todo cuidado y pensado para los niños, y el profesionalismo y calidad humana de las seños, un mil. Súper recomendable.", author: "Lihuen Mansilla", meta: "Local Guide · 30 opiniones", photo: "assets/img/g-books.webp" }
    ]
  };
})();
