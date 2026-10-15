/* Instafix: small helpers, no dependencies */
(function () {
  var WA = "27839853567";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function track(label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_click", contact_type: label });
    if (typeof window.gtag === "function") window.gtag("event", "contact_click", { contact_type: label });
  }

  // Conversion tracking hook. Works once the Google Ads / GA4 tag is added (see README).
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (link) track(link.getAttribute("data-track"));
  });

  // Fade sections in as they scroll into view
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Photo viewer
  var lb = document.getElementById("lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = document.getElementById("lb-img");
    var lbCap = document.getElementById("lb-cap");
    document.querySelectorAll(".tile").forEach(function (tile) {
      tile.addEventListener("click", function () {
        var img = tile.querySelector("img");
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = tile.getAttribute("data-caption") || "";
        lb.showModal();
      });
    });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  // Quote builder
  var form = document.getElementById("quote-form");
  if (!form) return;

  // Send the thank you redirect to whatever domain the site is live on.
  var next = document.getElementById("form-next");
  if (next) next.value = window.location.origin + "/thank-you";

  var steps = form.querySelectorAll(".qb-step");
  var stepNum = document.getElementById("qb-step");
  var bar = document.getElementById("qb-bar");
  var btnNext = document.getElementById("qb-next");
  var btnBack = document.getElementById("qb-back");
  var urgent = document.getElementById("qb-urgent");
  var err = document.getElementById("form-error");
  var current = 0;

  function showError(msg) { err.textContent = msg; err.classList.remove("hidden"); }
  function clearError() { err.classList.add("hidden"); }

  function go(i) {
    steps[current].classList.remove("is-active");
    current = i;
    steps[current].classList.add("is-active");
    stepNum.textContent = current + 1;
    bar.style.width = ((current + 1) / steps.length * 100) + "%";
    btnBack.hidden = current === 0;
    form.classList.toggle("on-last", current === steps.length - 1);
    clearError();
  }

  // A step is valid when every required radio group has a pick and every required field is filled
  function stepValid(step) {
    var fields = step.querySelectorAll("input[required]");
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.type === "radio") {
        if (!form.querySelector('input[name="' + f.name + '"]:checked')) {
          showError("Please choose an option to continue.");
          return false;
        }
      } else if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  }

  btnNext.addEventListener("click", function () {
    if (stepValid(steps[current]) && current < steps.length - 1) go(current + 1);
  });
  btnBack.addEventListener("click", function () { if (current > 0) go(current - 1); });

  // Picking an option on the first two steps moves on by itself once the step is complete
  form.addEventListener("change", function (e) {
    if (e.target.name === "service") urgent.classList.toggle("hidden", e.target.value !== "Emergency breakdown");
    if (e.target.type !== "radio") return;
    clearError();
    var step = steps[current];
    var groups = {};
    step.querySelectorAll('input[type="radio"]').forEach(function (r) { groups[r.name] = true; });
    var done = Object.keys(groups).every(function (n) { return form.querySelector('input[name="' + n + '"]:checked'); });
    if (done && current < steps.length - 1 && e.target.value !== "Emergency breakdown") {
      setTimeout(function () { go(current + 1); }, 220);
    }
  });

  form.addEventListener("submit", function (e) {
    for (var i = 0; i < steps.length; i++) {
      if (!stepValid(steps[i])) { e.preventDefault(); go(i); stepValid(steps[i]); return; }
    }
    track("form_callback");
  });

  document.getElementById("form-wa").addEventListener("click", function () {
    for (var i = 0; i < steps.length; i++) {
      if (!stepValid(steps[i])) { go(i); stepValid(steps[i]); return; }
    }
    var d = new FormData(form);
    var lines = [
      "Hi Instafix, I would like a quote.",
      "Service: " + d.get("service"),
      "Property: " + d.get("property"),
      "Units: " + d.get("units"),
      "Name: " + d.get("name"),
      "Phone: " + d.get("phone"),
      "Suburb: " + d.get("suburb")
    ];
    if (d.get("note")) lines.push("Notes: " + d.get("note"));
    track("whatsapp_form");
    var w = window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
    if (!w) showError("WhatsApp did not open. Please message us on 083 985 3567.");
  });
})();
