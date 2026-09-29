// Replace this placeholder with your training GTM container ID.
const GTM_ID = "GTM-W76F8RBR";

window.dataLayer = window.dataLayer || [];

if (GTM_ID !== "GTM-W76F8RBR") {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js"
    });

    const firstScript = d.getElementsByTagName(s)[0];
    const gtmScript = d.createElement(s);
    const dataLayerParam = l !== "dataLayer" ? "&l=" + l : "";

    gtmScript.async = true;
    gtmScript.src =
      "https://www.googletagmanager.com/gtm.js?id=" + i + dataLayerParam;

    firstScript.parentNode.insertBefore(gtmScript, firstScript);
  })(window, document, "script", "dataLayer", GTM_ID);
} else {
  console.info("[Consent demo] Add your GTM ID in assets/gtm-loader.js");
}
