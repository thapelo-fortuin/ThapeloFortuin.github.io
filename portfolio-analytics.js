(() => {
  const config = window.portfolioAnalytics;
  if (!config || !/^[a-z0-9][a-z0-9-]*$/.test(config.siteCode || '')) return;
  // Only production visits count. Local previews and automated QA stay excluded.
  if (location.hostname !== 'thapelo-fortuin.github.io') return;
  const origin = `https://${config.siteCode}.goatcounter.com`;
  const path = '/ThapeloFortuin.github.io/';
  // Count the portfolio once per page load. Hash navigation is not a new visitor.
  window.goatcounter = {path, title: 'Thapelo Fortuin Portfolio', no_events: true};
  const tracker = document.createElement('script');
  tracker.async = true;
  tracker.src = 'https://gc.zgo.at/count.js';
  tracker.dataset.goatcounter = `${origin}/count`;
  if (config.showPublicCounter) {
    tracker.addEventListener('load', async () => {
      try {
        const response = await fetch(`${origin}/counter/${encodeURIComponent(path)}.json`, {credentials:'omit',signal:AbortSignal.timeout(8000)});
        if (!response.ok) return;
        const data = await response.json();
        const count = String(data.count ?? '');
        if (!/^\d[\d,.\s]*$/.test(count)) return;
        const footer = document.querySelector('footer');
        if (!footer) return;
        const summary = document.createElement('span');summary.className='visitor-summary';
        const number = document.createElement('strong');number.textContent=count;
        summary.append(number, document.createTextNode(' estimated visits'));
        summary.title='Session-based visits since analytics activation; not a lifetime count of distinct people. Updates may be delayed.';
        footer.append(summary);
      } catch { /* Analytics must never prevent access to the portfolio. */ }
    });
  }
  document.head.append(tracker);
})();
