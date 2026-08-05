// This runs before GTM on the remediated page.
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};

// Google Consent Mode v2-style defaults.
// For a basic consent demo, GTM tags should additionally be blocked from firing
// until the category-specific custom event occurs.
window.gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500
});

window.dataLayer.push({
  event: "consent_defaults_set",
  consent_analytics: "denied",
  consent_marketing: "denied"
});
