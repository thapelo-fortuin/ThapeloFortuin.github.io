(() => {
  const mobile = matchMedia('(max-width:700px), (hover:none) and (pointer:coarse)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let pending = null;
  const links = [...document.querySelectorAll('.folder-files>a')];
  function clear() {
    clearTimeout(pending);
    pending = null;
    links.forEach(link => link.classList.remove('is-opening'));
  }
  links.forEach(link => {
    link.addEventListener('click', event => {
      // Preserve downloads, external links, modified clicks, and keyboard use.
      if (!mobile.matches || reduced.matches || document.body.classList.contains('motion-paused') || event.detail === 0 || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || !link.getAttribute('href').startsWith('#')) return;
      event.preventDefault();clear();
      link.classList.add('is-opening');
      pending = setTimeout(() => {
        location.hash = link.hash;
        clear();
      }, 220);
    });
  });
  window.addEventListener('hashchange', clear);
  window.addEventListener('pagehide', clear);
})();
