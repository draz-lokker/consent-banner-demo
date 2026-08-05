(function () {
  const STORAGE_KEY = "demo_consent_choice";
  const mode = document.body.dataset.pageMode || "fixed";

  const banner = document.createElement("section");
  banner.className = "consent-banner";
  banner.id = "consent-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "true");
  banner.setAttribute("aria-labelledby", "consent-title");

  banner.innerHTML = `
    <div class="consent-inner">
      <div>
        <p class="eyebrow">Privacy choices</p>
        <h2 id="consent-title">Choose how this demo uses trackers</h2>
        <p>
          Necessary storage is always active. Analytics and marketing are optional.
          This is a training banner, not legal advice or a production CMP.
        </p>
      </div>

      <div class="preference-grid" id="preference-grid" hidden>
        <label>
          <input type="checkbox" checked disabled>
          Necessary
        </label>
        <label>
          <input type="checkbox" id="analytics-choice">
          Analytics
        </label>
        <label>
          <input type="checkbox" id="marketing-choice">
          Marketing
        </label>
      </div>

      <div class="consent-actions">
        <button class="button secondary" data-action="preferences">Manage choices</button>
        <button class="button danger-button" data-action="reject">Reject all</button>
        <button class="button success-button" data-action="accept">Accept all</button>
        <button class="button primary" data-action="save" hidden>Save choices</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  const preferences = banner.querySelector("#preference-grid");
  const analyticsInput = banner.querySelector("#analytics-choice");
  const marketingInput = banner.querySelector("#marketing-choice");
  const saveButton = banner.querySelector('[data-action="save"]');

  function pushConsentEvents(choice) {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "consent_choice_saved",
      consent_analytics: choice.analytics ? "granted" : "denied",
      consent_marketing: choice.marketing ? "granted" : "denied"
    });

    if (choice.analytics) {
      window.dataLayer.push({ event: "consent_analytics_granted" });
    }

    if (choice.marketing) {
      window.dataLayer.push({ event: "consent_marketing_granted" });
    }
  }

  function updateGoogleConsent(choice) {
    if (typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: choice.analytics ? "granted" : "denied",
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied"
    });
  }

  function applyHardcodedTrackers(choice) {
    // This is the important remediation pattern:
    // optional code executes only after its category is granted.
    if (mode === "fixed" && choice.analytics) {
      window.demoTracker.load("hardcoded-analytics-after-consent");
    }

    if (mode === "fixed" && choice.marketing) {
      window.demoTracker.load("hardcoded-marketing-after-consent");
    }
  }

  function saveChoice(choice) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    updateGoogleConsent(choice);
    pushConsentEvents(choice);
    applyHardcodedTrackers(choice);
    banner.hidden = true;

    window.dispatchEvent(
      new CustomEvent("demo-log", {
        detail: {
          time: new Date().toISOString(),
          message: "Consent choice saved",
          analytics: choice.analytics,
          marketing: choice.marketing
        }
      })
    );
  }

  banner.addEventListener("click", function (event) {
    const action = event.target.dataset.action;
    if (!action) return;

    if (action === "preferences") {
      preferences.hidden = false;
      saveButton.hidden = false;
      return;
    }

    if (action === "reject") {
      saveChoice({ analytics: false, marketing: false });
      return;
    }

    if (action === "accept") {
      saveChoice({ analytics: true, marketing: true });
      return;
    }

    if (action === "save") {
      saveChoice({
        analytics: analyticsInput.checked,
        marketing: marketingInput.checked
      });
    }
  });

  window.openDemoPreferences = function () {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    analyticsInput.checked = Boolean(stored && stored.analytics);
    marketingInput.checked = Boolean(stored && stored.marketing);
    preferences.hidden = false;
    saveButton.hidden = false;
    banner.hidden = false;
  };

  // Reapply a prior choice on page load.
  const storedChoice = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (storedChoice) {
    updateGoogleConsent(storedChoice);
    pushConsentEvents(storedChoice);
    applyHardcodedTrackers(storedChoice);
    banner.hidden = true;
  }
})();
