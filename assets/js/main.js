/* Pro Installers SA: small helpers, no dependencies */
(function () {
  var WA = "27839853567";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Conversion tracking hook. Works once the Google Ads / GA4 tag is added (see README).
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (!link) return;
    var label = link.getAttribute("data-track");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_click", contact_type: label });
    if (typeof window.gtag === "function") {
      window.gtag("event", "contact_click", { contact_type: label });
    }
  });

  var form = document.getElementById("quote-form");
  if (!form) return;

  // Send the thank you redirect to whatever domain the site is live on.
  var next = document.getElementById("form-next");
  if (next) next.value = window.location.origin + "/thank-you";

  var err = document.getElementById("form-error");
  function showError(msg) { err.textContent = msg; err.classList.remove("hidden"); }

  form.addEventListener("submit", function () { err.classList.add("hidden"); });

  document.getElementById("form-wa").addEventListener("click", function () {
    if (!form.reportValidity()) return;
    var d = new FormData(form);
    var text = "Hi Pro Installers SA, I would like a quote.\n" +
      "Name: " + d.get("name") + "\n" +
      "Phone: " + d.get("phone") + "\n" +
      "Service: " + d.get("service") +
      (d.get("suburb") ? "\nSuburb: " + d.get("suburb") : "");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_click", contact_type: "whatsapp_form" });
    if (typeof window.gtag === "function") window.gtag("event", "contact_click", { contact_type: "whatsapp_form" });
    var w = window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank");
    if (!w) showError("WhatsApp did not open. Please message us on 083 985 3567.");
  });
})();
