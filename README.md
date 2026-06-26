# Merequeté · Sitio web

Web de la ludoteca **Merequeté** (Córdoba). Es un sitio **estático**: son archivos sueltos
(HTML, CSS, imágenes) que funcionan solos, sin programas raros, sin servidor y sin pagar nada extra
de mantenimiento. Se sube arrastrando una carpeta.

---

## 1. Ver la web en tu compu

Hacé **doble clic en `index.html`**. Se abre en tu navegador (Chrome, Edge, etc.). Eso es todo.

> Si querés verla como se verá en internet "de verdad", también funciona igual. El doble clic alcanza.

---

## 2. Subirla a Hostinger (o cualquier hosting)

1. Entrá al panel de Hostinger → **Administrador de archivos** (File Manager).
2. Abrí la carpeta `public_html`.
3. **Arrastrá adentro TODO el contenido de esta carpeta** (no la carpeta, sino lo que tiene adentro):
   - `index.html`
   - `creditos.html`
   - `styles.css`
   - `main.js`
   - la carpeta `lib`
   - la carpeta `assets`
   - el archivo `.htaccess`
4. Esperá a que termine de subir. Listo: tu web ya está online en tu dominio.

> La carpeta `tools` y la carpeta `assets/photos/source` **no hace falta subirlas** (son auxiliares).
> Si las subís igual, no pasa nada malo.

---

## 3. Cambiar el teléfono / WhatsApp  ⭐ (lo más importante)

El número de WhatsApp viene como **ejemplo** y hay que poner el real **antes de publicar**.

1. Entrá a la carpeta `lib` y abrí **`manifest.js`** con el **Bloc de notas**.
2. Buscá estas líneas (están casi arriba):

   ```
   whatsapp: "5493510000000",
   phoneDisplay: "+54 9 351 000 0000",
   ```

3. Cambiá el número:
   - **`whatsapp`** → el número real **sin espacios, sin "+", sin guiones**.
     Para Córdoba se escribe así: `54` (país) + `9` (celular) + `351` (Córdoba) + el número.
     Ejemplo: `5493514567890`.
   - **`phoneDisplay`** → cómo querés que se **vea** en pantalla (este sí puede llevar espacios).
4. **Guardá** (Archivo → Guardar) y subí de nuevo `manifest.js` a Hostinger.

Cuando una familia complete el formulario y toque **"Enviar reserva"**, se le abre WhatsApp con
todos los datos ya escritos, listos para enviarte a vos. (Ver punto 7.)

---

## 4. Cambiar textos, talleres, equipo y reseñas

Casi todo lo editable está en **`lib/manifest.js`** (mismo archivo del punto 3). Abrilo con el Bloc de notas.

Reglas de oro para no romper nada:

- Cambiá **solo lo que está entre comillas** `"así"`.
- **No borres** las comillas, ni las comas `,` del final de cada línea, ni los corchetes `[ ]`.
- Guardá y subí el archivo.

Ahí podés tocar:

- **`brand`** → nombre, dirección, Instagram, edades, teléfono.
- **`proposals`** → los 10 talleres (nombre, subtítulo, qué incluye, descripción y edad).
- **`team`** → el equipo.
- **`gallery`** → la lista de fotos de la galería.
- **`testimonials`** → las reseñas de las familias.

> **Nota:** los textos de las secciones también están escritos directamente en `index.html`
> (para que la web cargue rapidísimo y nunca quede en blanco). Si querés cambiar un título o un
> párrafo puntual, podés abrir `index.html` con el Bloc de notas y editar el texto que ves entre
> las etiquetas. Si no te animás, escribime y lo cambio yo en un minuto.

---

## 5. Cambiar las fotos

Las fotos viven en la carpeta **`assets/img`**. Hoy son imágenes de referencia (de bancos libres).
Para poner las reales:

1. Preparate las fotos de la ludoteca.
2. **Renombralas igual** que las que están (por ejemplo `g-blocks.webp`, `hero.webp`, etc.) y
   reemplazalas dentro de `assets/img`.
   - Lo más simple: ponéles el mismo nombre y la misma extensión que la que querés reemplazar.
   - Si tus fotos son `.jpg`, también sirve: cambiá el nombre en `manifest.js`/`index.html` o pedímelo.
3. Subí la carpeta `assets/img` actualizada a Hostinger.

> Consejo: que no sean enormes (idealmente menos de 1 MB cada una) para que la web vuele.

### El logo de la web ⭐

El logo (letras de colores con la casita y el árbol) **ya está puesto** como **`assets/logo.svg`** (vectorial, fondo transparente). Aparece en tres lugares: la **barra de arriba (menú, a 48 px)**, la **pantalla de inicio (splash)** y el **hero**. El favicon (iconito de la pestaña) también sale del logo.

Si en el futuro querés cambiarlo:

1. Reemplazá **`assets/logo.svg`** por tu nuevo logo (mismo nombre). Si solo tenés PNG, guardalo como `assets/logo.png` (la web lo usa si no encuentra el SVG).
2. Subí el archivo a Hostinger.

> La web busca primero `assets/logo.svg`, luego `assets/logo.png`, y si no hay ninguno muestra una réplica dibujada. Nunca queda vacía.

### ⏰ Horarios — IMPORTANTE: revisá que sean los tuyos

La sección **Horarios** trae horarios de **ejemplo** (Lunes a viernes 10–12 y 16–21, etc.). **Cambialos por los reales antes de publicar.**

1. Abrí **`index.html`** con el Bloc de notas.
2. Buscá la palabra **`hours-list`**.
3. Vas a ver tres líneas con los días y horarios. Cambiá el texto entre las etiquetas (por ejemplo, donde dice `10:00–12:00 · 16:00–21:00`) por tus horarios. Podés agregar o quitar líneas `<li>…</li>` si necesitás.
4. Guardá y subí `index.html`.

### El menú de arriba

Las opciones del menú (Quiénes somos, Talleres, Juego libre, Familias, Horarios, Reservar) están en **`index.html`**, buscando `nav-links` (versión escritorio) y `nav-mobile` (versión celular). Si querés cambiar un nombre, edití el texto; si algo no te anda, escribime.

---

## 6. ¿Cómo funciona la reserva por WhatsApp? (importante)

Esta web es estática (sin servidor), así que **no manda mensajes sola**. El circuito es:

1. La familia completa el formulario en la web.
2. Al tocar **"Enviar reserva"**, se le abre **WhatsApp** con un mensaje ya redactado que tiene
   **todos los datos** (nombre del niño/a, edad, adulto, teléfono, taller, día/horario y nota),
   dirigido **a tu número**.
3. La familia toca enviar en su propio WhatsApp.
4. **Vos recibís el mensaje y le respondés confirmando el turno** por ese mismo chat.

Es decir: **la confirmación la das vos** (el equipo de Merequeté), no la web automáticamente.
El texto del formulario ya se lo explica a la familia, así nadie se queda esperando un mensaje
automático que no va a llegar.

> ¿Se puede automatizar la confirmación en el futuro? Sí, pero eso requiere contratar la
> *WhatsApp Business API* con un proveedor (Twilio, 360dialog, etc.) y un pequeño servidor.
> Queda fuera de esta web, pero se puede sumar más adelante si lo necesitás.

---

## 7. La web no se actualiza después de subir cambios

Casi siempre es **la memoria (caché) del navegador** mostrando la versión vieja. Soluciones:

1. En la web, apretá **Ctrl + F5** (en Mac: Cmd + Shift + R). Fuerza recargar todo.
2. Si seguís viendo lo viejo, abrí `index.html` (y `creditos.html`) con el Bloc de notas y buscá
   donde dice `?v=20260616`. Cambiá ese número por la fecha de hoy, por ejemplo `?v=20260720`,
   **en todos los lugares donde aparezca**. Guardá y volvé a subir. Eso obliga a todos los
   navegadores a bajar la versión nueva.

El archivo `.htaccess` ya ayuda a que esto pase lo menos posible.

---

## 8. Mapa del proyecto (qué es cada cosa)

```
index.html        → la página principal
creditos.html     → página de créditos de las fotos
styles.css        → los estilos (colores, tipografías, diseño)
main.js           → las animaciones y el formulario
.htaccess         → ayuda con la caché en Hostinger (no se toca)
lib/
  manifest.js     → ⭐ los datos editables (teléfono, talleres, equipo, reseñas)
  gsap.min.js     → librería de animación (no se toca)
  ScrollTrigger.min.js → librería de animación (no se toca)
  credits-render.js → arma la lista de créditos (no se toca)
assets/
  img/            → las fotos de la web
  favicon.svg     → el iconito de la pestaña
  credits.json    → datos de licencias de las fotos
  photos/source/  → originales (no hace falta subir)
tools/            → auxiliares de armado (no hace falta subir)
```

---

¿Dudas o algo que querés cambiar y no te animás? Escribime y lo resolvemos. 💛
