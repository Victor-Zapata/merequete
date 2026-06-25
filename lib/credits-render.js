/* Render de créditos fotográficos desde assets/credits.json */
(function () {
  "use strict";
  var list = document.querySelector("[data-credits]");
  if (!list) return;

  function row(c) {
    var creator = c.creator_url
      ? '<a href="' + c.creator_url + '" target="_blank" rel="noopener">' + (c.creator || "Autor") + "</a>"
      : (c.creator || "Autor desconocido");
    var lic = (c.license || "").toUpperCase() + " " + (c.license_version || "");
    var licLink = c.license_url
      ? '<a href="' + c.license_url + '" target="_blank" rel="noopener">' + lic + "</a>" : lic;
    var orig = c.foreign_landing_url
      ? ' · <a href="' + c.foreign_landing_url + '" target="_blank" rel="noopener">Ver original ↗</a>' : "";
    return "<li><strong>" + (c.title || "Imagen") + "</strong> — " + creator +
      (c.source ? " (" + c.source + ")" : "") + " · " + licLink + orig + "</li>";
  }

  fetch("assets/credits.json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = Array.isArray(data) ? data : Object.keys(data).map(function (k) { return data[k]; });
      list.innerHTML = items.map(row).join("");
    })
    .catch(function () {
      list.innerHTML = "<li>Las imágenes provienen de Openverse, bajo licencias Creative Commons. " +
        "Si no se carga el detalle, abrí el archivo <code>assets/credits.json</code>.</li>";
    });
})();
