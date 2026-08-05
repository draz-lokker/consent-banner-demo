// A fake tracker for training. It creates observable browser artifacts but
// does not intentionally transmit information to a real analytics vendor.
(function () {
  const loadedSources = new Set();

  function log(message, details = {}) {
    window.dispatchEvent(
      new CustomEvent("demo-log", {
        detail: {
          time: new Date().toISOString(),
          message,
          ...details
        }
      })
    );
    console.log("[Demo tracker]", message, details);
  }

  function makeCollectionRequest(source) {
    // This intentionally requests a nonexistent local image. GitHub Pages will
    // normally return 404, but the request remains visible in DevTools Network.
    const pixel = new Image();
    pixel.alt = "";
    pixel.src =
      "./demo-collect.gif?source=" +
      encodeURIComponent(source) +
      "&cacheBust=" +
      Date.now();
  }

  function load(source) {
    if (loadedSources.has(source)) {
      log("Tracker was already loaded", { source });
      return;
    }

    loadedSources.add(source);

    document.cookie =
      "demo_marketing_id=training-" +
      Math.random().toString(36).slice(2) +
      "; path=/; SameSite=Lax";

    localStorage.setItem(
      "demo_marketing_profile",
      JSON.stringify({
        source,
        createdAt: new Date().toISOString(),
        trainingOnly: true
      })
    );

    makeCollectionRequest(source);
    log("Demo tracker executed", { source });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "demo_tracker_executed",
      demo_tracker_source: source
    });
  }

  window.demoTracker = { load };
})();
