(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('.motion-toggle');
  let paused = preference.matches;
  const cards = [...document.querySelectorAll('.project-card')];
  function reset(card) {
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }
  function update() {
    document.body.classList.toggle('motion-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.innerHTML = paused ? 'Play motion <span class="mobile-hide-symbol" aria-hidden="true">▷</span>' : 'Pause motion <span class="mobile-hide-symbol" aria-hidden="true">Ⅱ</span>';
    if (paused) {
      cards.forEach(reset);
      document.querySelectorAll('.is-pending').forEach(el => el.classList.remove('is-pending'));
    }
  }
  button.addEventListener('click', () => { paused = !paused; update(); });
  preference.addEventListener('change', event => { paused = event.matches; update(); });
  update();
  if ('IntersectionObserver' in window && !paused) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    }, {threshold: 0.06});
    document.querySelectorAll('.project-card, .expertise article, .cv-skills .skill-category, .section-title').forEach(el => {
      el.classList.add('motion-reveal', 'is-pending');
      observer.observe(el);
    });
  }
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  cards.forEach(card => {
    let frame = 0;
    card.addEventListener('pointermove', event => {
      if (paused || preference.matches || !pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 3}deg`);
        card.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 3}deg`);
      });
    });
    card.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); reset(card); });
  });
})();
