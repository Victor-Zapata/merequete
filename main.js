/* ============================================================================
   MEREQUETÉ · main.js  (IIFE, sin módulos, sin dependencias externas)
   El contenido crítico ya está en el HTML; este archivo solo enriquece.
   ============================================================================ */
(function () {
  "use strict";

  var data = window.__MEREQUETE__ || {};
  var brand = data.brand || {};

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- WhatsApp / teléfono ---------- */
  function waNumber() { return String(brand.whatsapp || "").replace(/[^\d]/g, ""); }
  function waLink(msg) {
    var n = waNumber();
    var base = n ? ("https://wa.me/" + n) : "https://wa.me/";
    return base + (msg ? ("?text=" + encodeURIComponent(msg)) : "");
  }
  function initContacts() {
    var consulta = "Hola " + (brand.name || "Merequeté") + " 👋 Quisiera hacer una consulta sobre la ludoteca.";
    $$("[data-wa-link]").forEach(function (a) {
      a.setAttribute("href", waLink(consulta));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    var n = waNumber();
    $$("[data-phone-link]").forEach(function (a) {
      if (brand.phoneDisplay) a.textContent = brand.phoneDisplay;
      a.setAttribute("href", n ? ("tel:+" + n) : "#");
    });
  }

  /* ---------- Form select desde el manifest (idempotente) ---------- */
  function initPropSelect() {
    var sel = $("[data-prop-select]");
    if (!sel || sel.dataset.enriched || !data.proposals) return;
    sel.dataset.enriched = "1";
    var first = sel.querySelector("option");
    sel.innerHTML = "";
    if (first) sel.appendChild(first);
    data.proposals.forEach(function (p) {
      var o = document.createElement("option");
      o.textContent = p.name; sel.appendChild(o);
    });
  }

  /* ---------- Splash ---------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    // El texto de entrada se queda un rato en pantalla antes de irse.
    if (document.readyState === "complete") setTimeout(hide, 3000);
    else window.addEventListener("load", function () { setTimeout(hide, 2800); });
    setTimeout(hide, 5200); // red de seguridad JS (la CSS dispara a 5.8s)
  }

  /* ---------- Título del hero (letras del logo) ---------- */
  function initHeroTitle() {
    var h = $("[data-hero-logo]");
    if (!h) return;
    if (!(window.gsap && !reduced)) return;
    var img = $(".brand-logo", h);
    var letters = $$(".logo-lockup .ll-row > *", h);
    if (img) {
      gsap.set(img, { opacity: 0, scale: .72, y: 18 });
      gsap.to(img, { opacity: 1, scale: 1, y: 0, duration: .85, ease: "back.out(1.6)", delay: .15 });
    }
    if (letters.length) {
      gsap.set(letters, { yPercent: 60, opacity: 0, scale: .6 });
      gsap.to(letters, { yPercent: 0, opacity: 1, scale: 1, duration: .7, ease: "back.out(1.7)", stagger: .05, delay: .15 });
    }
  }

  /* ---------- Nav (auto-hide + burger + mobile) ---------- */
  function initNav() {
    var nav = $("[data-nav]");
    var burger = $("[data-burger]");
    var mobile = $("[data-nav-mobile]");
    var last = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (nav) {
        if (y > last && y > 240 && !(mobile && mobile.classList.contains("is-open"))) nav.classList.add("is-hidden");
        else nav.classList.remove("is-hidden");
      }
      last = y;
    }, { passive: true });

    if (burger && mobile) {
      var toggle = function (open) {
        burger.classList.toggle("is-open", open);
        mobile.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        mobile.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", function () { toggle(!mobile.classList.contains("is-open")); });
      $$("a", mobile).forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    }
  }

  /* ---------- Smooth scroll con offset ---------- */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Split words ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    var label = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", label);
    var wrap = function (txt) {
      return txt.split(/(\s+)/).map(function (w) {
        return /^\s+$/.test(w) ? w : '<span class="split-word">' + w + "</span>";
      }).join("");
    };
    var html = Array.prototype.map.call(el.childNodes, function (node) {
      if (node.nodeType === 3) return wrap(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        var cls = node.getAttribute("class");
        return "<" + tag + (cls ? ' class="' + cls + '"' : "") + ' aria-hidden="true">' + wrap(node.textContent) + "</" + tag + ">";
      }
      return "";
    }).join("");
    el.innerHTML = html;
    return el.querySelectorAll(".split-word");
  }

  /* ---------- Reveals (IO + GSAP enrich) ---------- */
  function initReveals() {
    var hasGsap = window.gsap && window.ScrollTrigger;
    if (hasGsap) { try { gsap.registerPlugin(ScrollTrigger); } catch (e) {} }

    // split headings
    $$('[data-split="words"]').forEach(function (el) {
      var words = splitWords(el);
      if (!words || !words.length) return;
      if (hasGsap && !reduced) {
        gsap.set(words, { yPercent: 110, opacity: 0 });
        gsap.to(words, {
          yPercent: 0, opacity: 1, duration: .9, ease: "expo.out", stagger: .045,
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      }
    });

    // generic reveals
    var els = $$(".reveal:not([data-split])");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.04, rootMargin: "0px 0px -4% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // safety net: reveal anything still hidden after 6s
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Stickers bob when visible ---------- */
  function initStickers() {
    var stickers = $$(".sticker");
    if (!stickers.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) en.target.classList.add("is-bobbing");
        });
      }, { threshold: 0.05 });
      stickers.forEach(function (s) { io.observe(s); });
      setTimeout(function () { stickers.forEach(function (s) { s.classList.add("is-bobbing"); }); }, 6000);
    } else {
      stickers.forEach(function (s) { s.classList.add("is-bobbing"); });
    }
  }

  /* ---------- Tilt 3D ---------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (el) {
      var max = 7;
      function onMove(e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = "perspective(900px) rotateY(" + (px * max) + "deg) rotateX(" + (-py * max) + "deg)";
      }
      function reset() { el.style.transform = ""; el.style.transition = "transform .5s var(--ease-out)"; }
      el.addEventListener("mousemove", function (e) { el.style.transition = "transform .08s linear"; onMove(e); });
      el.addEventListener("mouseleave", reset);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var s = 0.22;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * s;
        var y = (e.clientY - r.top - r.height / 2) * s;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (!fineHover) return;
    var cur = $("[data-cursor]");
    if (!cur) return;
    var ring = $(".cursor-ring", cur), label = $(".cursor-label", cur);
    var x = 0, y = 0, rx = 0, ry = 0, first = false;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!first) { first = true; rx = x; ry = y; cur.classList.add("is-ready"); }
    });
    (function loop() {
      rx += (x - rx) * .2; ry += (y - ry) * .2;
      cur.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();
    var HOVER = "a, button, [data-cursor-label], .prop-card, .team-card, .gframe";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest(HOVER);
      if (t) {
        cur.classList.add("is-hover");
        var l = t.getAttribute("data-cursor-label") || "ver";
        if (label) label.textContent = l;
      }
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest(HOVER);
      if (t && !t.contains(e.relatedTarget)) cur.classList.remove("is-hover");
    });
  }

  /* ---------- Marquee (rAF, sin depender de GSAP) ---------- */
  function initMarquees() {
    $$("[data-marquee]").forEach(function (track) {
      var row = track.closest("[data-gal-row]");
      var speed = 0.4; // px/frame
      if (track.classList.contains("footer-marquee")) speed = 0.3;
      var dir = -1;
      var x = 0;
      var half = 0;
      function measure() { half = track.scrollWidth / 2; }
      measure(); window.addEventListener("resize", measure);
      (function loop() {
        x += speed * dir;
        if (half && Math.abs(x) >= half) x = 0;
        track.style.transform = "translateX(" + x + "px)";
        requestAnimationFrame(loop);
      })();
    });
  }

  /* ---------- Gallery rows scroll ---------- */
  function initGallery() {
    $$("[data-gal-row]").forEach(function (row) {
      var track = $(".gal-track", row);
      if (!track) return;
      // duplicate content for seamless loop
      if (!track.dataset.dup) { track.dataset.dup = "1"; track.innerHTML += track.innerHTML; }
      var mode = row.getAttribute("data-gal-row");
      var speed = mode === "fast" ? 0.7 : mode === "reverse" ? 0.45 : 0.32;
      var dir = mode === "reverse" ? 1 : -1;
      var x = mode === "reverse" ? -(track.scrollWidth / 2) : 0;
      var half = track.scrollWidth / 2;
      window.addEventListener("resize", function () { half = track.scrollWidth / 2; });
      (function loop() {
        x += speed * dir;
        if (dir < 0 && Math.abs(x) >= half) x = 0;
        if (dir > 0 && x >= 0) x = -half;
        track.style.transform = "translateX(" + x + "px)";
        requestAnimationFrame(loop);
      })();
    });
  }

  /* ---------- Filtros de propuestas ---------- */
  function initFilters() {
    var box = $("[data-filters]");
    var grid = $("[data-prop-grid]");
    var empty = $("[data-prop-empty]");
    if (!box || !grid) return;
    var cards = $$(".prop-card", grid);
    box.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      $$(".chip", box).forEach(function (c) { c.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      var shown = 0;
      cards.forEach(function (card) {
        var ed = (card.getAttribute("data-edades") || "").split(" ");
        var ok = (f === "todas") || ed.indexOf(f) !== -1;
        card.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (window.ScrollTrigger) { try { ScrollTrigger.refresh(); } catch (e2) {} }
    });
  }

  /* ---------- Testimonios ---------- */
  function initTestimonials() {
    var box = $("[data-tst]");
    if (!box) return;
    var slides = $$(".tst-slide", box);
    var dotsWrap = $("[data-tst-dots]", box);
    if (slides.length < 2) return;
    var i = 0, timer;
    slides.forEach(function (s, idx) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Reseña " + (idx + 1));
      if (idx === 0) b.classList.add("is-active");
      b.addEventListener("click", function () { go(idx); rest(); });
      if (dotsWrap) dotsWrap.appendChild(b);
    });
    var dots = dotsWrap ? $$("button", dotsWrap) : [];
    function go(n) {
      slides[i].classList.remove("is-active");
      if (dots[i]) dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      if (dots[i]) dots[i].classList.add("is-active");
    }
    function start() { timer = setInterval(function () { go(i + 1); }, 5500); }
    function rest() { clearInterval(timer); start(); }
    start();
    box.addEventListener("mouseenter", function () { clearInterval(timer); });
    box.addEventListener("mouseleave", start);
  }

  /* ---------- Reserva -> WhatsApp ---------- */
  function initReserva() {
    var form = $("[data-reserva]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var v = function (n) { return (f[n] && f[n].value || "").trim(); };
      var L = [
        "*Nueva reserva · " + (brand.name || "Merequeté") + "* 🧸",
        "",
        "👦 Niño/a: " + (v("nino") || "—") + " (" + (v("edad") || "edad sin especificar") + ")",
        "🙋 Adulto responsable: " + (v("adulto") || "—"),
        "📞 Teléfono: " + (v("tel") || "—"),
        "🎨 Propuesta de interés: " + (v("propuesta") || "A definir"),
        "🗓️ Día y horario preferido: " + (v("horario") || "A coordinar")
      ];
      var nota = v("nota");
      if (nota) L.push("📝 Nota: " + nota);
      L.push("", "Quedo a la espera de la confirmación del turno. ¡Gracias!");
      window.open(waLink(L.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Año ---------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(initContacts, "initContacts");
    safe(initPropSelect, "initPropSelect");
    safe(initSplash, "initSplash");
    safe(initHeroTitle, "initHeroTitle");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initReveals, "initReveals");
    safe(initStickers, "initStickers");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");
    safe(initCursor, "initCursor");
    safe(initGallery, "initGallery");
    safe(initMarquees, "initMarquees");
    safe(initFilters, "initFilters");
    safe(initTestimonials, "initTestimonials");
    safe(initReserva, "initReserva");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
