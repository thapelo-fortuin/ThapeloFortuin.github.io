(() => {
  const home = document.querySelector('main > #home');
  const sections = [...document.querySelectorAll('main > section[id]')];
  if (!home || !sections.length) {document.documentElement.classList.remove('folder-routing');return;}
  const pages = [home, ...sections];
  for (const page of sections) {
    const back = document.createElement('a');back.href='#home';back.className='folder-page-back';back.textContent='Back to my folder';page.prepend(back);
  }
  function navigate(initial = false) {
    let id;
    try {id = decodeURIComponent(location.hash.slice(1)) || 'home';} catch {id='home';}
    const target = document.getElementById(id);
    const page = target === home ? home : sections.find(section => section === target || section.contains(target)) || home;
    pages.forEach(item => {item.classList.toggle('route-active',item === page);item.hidden=item !== page;});
    // Previously hidden reveal elements must be readable immediately on entry.
    page.querySelectorAll('.is-pending').forEach(el => el.classList.remove('is-pending'));
    page.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
      if(link.hash === `#${page.id}`) link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
    if(page === home && !initial) home.querySelector('.personal-folder').open=true;
    requestAnimationFrame(() => {
      const focus = page === home ? home.querySelector('summary') : target?.querySelector('h2,h3') || page.querySelector('h2,h3') || page;
      if (!initial) {focus.setAttribute('tabindex','-1');focus.focus({preventScroll:true});}
      if(id === 'experience' && target) target.scrollIntoView({block:'start',behavior:'instant'});
      else window.scrollTo({top:0,behavior:'instant'});
    });
  }
  window.addEventListener('hashchange',()=>navigate());
  navigate(true);
})();
