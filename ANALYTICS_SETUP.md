# Portfolio visitor analytics

Tracking is prepared but disabled until a real GoatCounter site code is configured.
No analytics requests are sent while `siteCode` is empty. No count is fabricated.

## Activate the private dashboard

1. Register your own site at https://www.goatcounter.com/ and use the portfolio URL:
   `https://thapelo-fortuin.github.io/ThapeloFortuin.github.io/`.
2. Copy the public code from your assigned address. For example,
   `https://my-portfolio.goatcounter.com` uses `my-portfolio` as the code.
3. Set `siteCode` in `analytics-config.js`, then publish the change.
4. Visit the deployed portfolio and check the private GoatCounter dashboard.
   Keep session tracking enabled in Settings > Data collection > Sessions.
5. Use GoatCounter's own-visit exclusion setting to exclude your browsing.

Use only the public site code in this repository. API tokens and passwords must
never be committed. No API token is needed for this integration.

## What the count means

The dashboard provides session-based visitor estimates and pageviews. The same
person can count again after the session window or when changing browser/network.
It is not an exact all-time count of individual people. Measurement starts after
activation; past visits cannot be recovered by this integration.

The portfolio is recorded under one path. Opening sections or moving between
projects does not create additional pageviews. Local previews are excluded.
Blocked trackers and offline visitors will not be counted.

## Optional public count

The owner dashboard is private by default. If you also want a count in the footer:

1. Enable “Allow adding visitor counts on your website” in GoatCounter settings.
2. Set `showPublicCounter: true` in `analytics-config.js`.

The footer labels the number “estimated visits”. If the service is unavailable,
no count is displayed. GoatCounter caches public counts for up to four hours.

Documentation:
- https://www.goatcounter.com/help/start
- https://www.goatcounter.com/help/sessions
- https://www.goatcounter.com/help/visitor-counter
