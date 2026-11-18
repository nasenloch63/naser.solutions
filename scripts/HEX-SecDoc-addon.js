/*
 * Small guard for the forms that have data-guard on them.
 *
 * Add data-guard to a form, then drop this into your page's JS.
 * It adds a hidden spare field and stops very quick repeat submits.
 *
 * Just a heads-up: this only runs in the browser. It won't stop someone
 * from sending requests straight to your server, so keep the real rate
 * limits and validation on the server too.
 */
(() => {
  "use strict";

  const COOLDOWN_MS = 2500;
  const lastSubmit = new WeakMap();

  // Leave forms alone unless they've opted in with data-guard.
  document.querySelectorAll("form[data-guard]").forEach((form) => {
    // Most people won't see or fill this field. Basic bots sometimes do.
    // It's only a small extra check, not a reliable way to identify every bot.
    if (!form.querySelector('input[name="company_website"]')) {
      const trap = document.createElement("input");
      trap.type = "text";
      trap.name = "company_website";
      trap.tabIndex = -1;
      trap.autocomplete = "off";
      trap.setAttribute("aria-hidden", "true");
      trap.style.cssText =
        "position:absolute;left:-10000px;width:1px;height:1px;opacity:0";
      form.appendChild(trap);
    }

    form.addEventListener(
      "submit",
      (event) => {
        const trap = form.querySelector('input[name="company_website"]');

        // If this field has a value, don't send the form.
        if (trap && trap.value.trim() !== "") {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        

        // Ignore a second submit if it happens almost straight away.
        const now = Date.now();
        const previous = lastSubmit.get(form) || 0;

        if (now - previous < COOLDOWN_MS) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        lastSubmit.set(form, now);
      },
      true
    );
  });
})();
