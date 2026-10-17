(() => {
  const nav = document.querySelector('#navbar');
  if (!nav || typeof HTMLDialogElement === 'undefined') return;
  const items = [
    ['home', 'Home', 'The person behind the code'],
    ['projects', 'Projects', 'Software, data, and practical ideas'],
    ['services', 'Expertise', 'Development and data insights'],
    ['about', 'About', 'My story and approach'],
    ['skills', 'Skills', 'Technical and professional skills'],
    ['education', 'Education', 'My academic background'],
    ['experience', 'Experience', 'Teaching, teamwork, and learning'],
    ['contact', 'Contact', 'Let’s build the next connection']
  ].filter(([id]) => document.getElementById(id));
  const trigger = document.createElement('button');
  trigger.type = 'button';trigger.className = 'dial-trigger';trigger.textContent = 'Explore sections';
  trigger.setAttribute('aria-haspopup', 'dialog');trigger.setAttribute('aria-expanded', 'false');trigger.setAttribute('aria-controls', 'section-dial');
  const dialog = document.createElement('dialog');
  dialog.id = 'section-dial';dialog.className = 'dial-dialog';dialog.setAttribute('aria-labelledby', 'dial-heading');
  dialog.innerHTML = '<div class="dial-top"><span>THAPELO FORTUIN / INDEX</span><button class="dial-close" type="button">Close menu</button></div><h2 id="dial-heading">Where to next?</h2><p class="dial-intro">Choose a section. Explore at your own pace.</p><div class="section-wheel"><div class="dial-track" aria-hidden="true"></div><div class="dial-center"><span class="dial-number">01 / 08</span><span class="dial-name">Home</span><span class="dial-description"></span><a class="dial-go" href="#home">Go to Home</a></div><div class="dial-links"></div></div><p class="dial-hint">One portfolio. Eight ways to explore.</p>';
  document.body.append(dialog);
  nav.querySelector('.nav-contact').before(trigger);
  const track = dialog.querySelector('.dial-track');
  for (let i = 0; i < 64; i++) {
    const tick = document.createElement('i');tick.style.setProperty('--tick', `${i * 360 / 64}deg`);
    if (i % 8 === 0) tick.className = 'major';
    track.append(tick);
  }
  let active = 0, savedOverflow = '';
  const links = items.map(([id, label], i) => {
    const link = document.createElement('a');link.href = `#${id}`;link.className = 'dial-link';
    link.innerHTML = `<span class="dial-index">${String(i + 1).padStart(2, '0')}</span><span>${label}</span>`;
    const angle = (i / items.length * Math.PI * 2) - Math.PI / 2;
    link.style.left = `${50 + Math.cos(angle) * 40}%`;
    link.style.top = `${50 + Math.sin(angle) * 40}%`;
    link.addEventListener('focus', () => preview(i));
    link.addEventListener('pointerenter', () => preview(i));
    link.addEventListener('click', () => { active = i; dialog.close(); });
    dialog.querySelector('.dial-links').append(link);return link;
  });
  function preview(i) {
    const [id, label, description] = items[i];
    dialog.querySelector('.dial-number').textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    dialog.querySelector('.dial-name').textContent = label;
    dialog.querySelector('.dial-description').textContent = description;
    const go = dialog.querySelector('.dial-go');go.href = `#${id}`;go.textContent = `Go to ${label}`;
    track.style.transform = `rotate(${i * 360 / items.length}deg)`;
    links.forEach((link, index) => link.classList.toggle('is-selected', index === i));
  }
  trigger.addEventListener('click', () => {
    const visible = items.map(([id], index) => ({index, distance: Math.abs(document.getElementById(id).getBoundingClientRect().top - 100)})).sort((a,b) => a.distance - b.distance)[0];
    const routeIndex = items.findIndex(([id]) => `#${id}` === location.hash);
    active = routeIndex >= 0 ? routeIndex : visible.index;preview(active);savedOverflow = document.body.style.overflow;
    dialog.showModal();document.body.style.overflow = 'hidden';trigger.setAttribute('aria-expanded', 'true');
    dialog.querySelector('.dial-close').focus();
  });
  dialog.querySelector('.dial-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.dial-go').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = savedOverflow;trigger.setAttribute('aria-expanded', 'false');trigger.focus({preventScroll: true});
  });
  dialog.addEventListener('click', event => {if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }});
  dialog.querySelector('.dial-links').addEventListener('keydown', event => {
    const current = links.indexOf(document.activeElement);
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % links.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + links.length) % links.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = links.length - 1;
    if (next !== undefined) {event.preventDefault();links[next].focus();}
  });
  preview(0);
})();
