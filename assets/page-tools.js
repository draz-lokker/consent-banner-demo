(function () {
  const logElement = document.querySelector("#event-log");
  const entries = [];

  function render() {
    if (!logElement) return;
    logElement.textContent = entries.length
      ? entries.map((entry) => JSON.stringify(entry, null, 2)).join("\n\n")
      : "Waiting for events…";
  }

  window.addEventListener("demo-log", function (event) {
    entries.unshift(event.detail);
    render();
  });

  document.querySelector("#reset-demo")?.addEventListener("click", function () {
    localStorage.removeItem("demo_consent_choice");
    localStorage.removeItem("demo_marketing_profile");
    document.cookie =
      "demo_marketing_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    location.reload();
  });

  document
    .querySelector("#open-preferences")
    ?.addEventListener("click", function () {
      window.openDemoPreferences();
    });
})();
