# Consent Remediation Demo Lab

This static site is designed for GitHub Pages and demonstrates:

1. A **broken implementation** where a hardcoded marketing tracker loads before consent.
2. A **remediated implementation** where trackers wait for the appropriate consent.
3. A simple custom consent banner.
4. `dataLayer` events that can be used in Google Tag Manager.
5. A fake local tracker so the demo does not intentionally send data to a real ad vendor.

## Pages

- `index.html` — landing page
- `broken.html` — intentionally noncompliant demo
- `fixed.html` — remediated demo

## Before publishing

Replace `GTM-XXXXXXX` in `assets/gtm-loader.js` with your GTM container ID.

You may also leave the placeholder in place and first test only the hardcoded-tracker portion.

## GitHub Pages

1. Create a public GitHub repository, such as `consent-demo-lab`.
2. Upload all files in this folder.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. Your URL will normally be:
   `https://YOUR-USERNAME.github.io/consent-demo-lab/`

## Suggested GTM demo tags

Create two Custom HTML tags.

### Marketing demo tag

```html
<script>
  window.demoTracker.load("gtm-marketing");
</script>
```

Trigger: Custom Event `consent_marketing_granted`

Consent settings:
- Require additional consent: `ad_storage`
- Optionally also require `ad_user_data` and `ad_personalization`

### Analytics demo tag

```html
<script>
  window.demoTracker.load("gtm-analytics");
</script>
```

Trigger: Custom Event `consent_analytics_granted`

Consent settings:
- Require additional consent: `analytics_storage`

Do not publish real production tags in this training container.
