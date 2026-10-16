(() => {
  const section = document.querySelector('#projects');
  const grid = section?.querySelector('.projects-grid');
  const cards = grid ? [...grid.children].filter(el => el.classList.contains('project-card')) : [];
  if (cards.length < 2) return;
  let active = 0, timer = null, touchX = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const shell = document.createElement('div');
  shell.className = 'project-showcase';
  shell.setAttribute('role', 'region');
  shell.setAttribute('aria-roledescription', 'carousel');
  shell.setAttribute('aria-label', 'Selected projects');
  shell.innerHTML = '<div class="showcase-heading"><span>THE PROJECT COLLECTION</span><span>SOFTWARE / DATA / SYSTEMS</span></div><div class="showcase-stage" aria-label="Project posters"></div><div class="showcase-controls"><button type="button" class="showcase-prev" aria-label="Previous project">←</button><div class="showcase-dots" aria-label="Choose a project"></div><button type="button" class="showcase-next" aria-label="Next project">→</button></div><div class="showcase-bottom"><span class="showcase-status" aria-live="polite" aria-atomic="true"></span><button type="button" class="showcase-play" aria-pressed="false">Play slideshow ▷</button></div>';
  const stage = shell.querySelector('.showcase-stage');
  const dots = shell.querySelector('.showcase-dots');
  const status = shell.querySelector('.showcase-status');
  const play = shell.querySelector('.showcase-play');
  const posters = [], selectors = [];
  cards.forEach((card, index) => {
    const name = card.querySelector('h3').textContent;
    card.id = `project-detail-${index + 1}`;
    const poster = document.createElement('button');
    poster.type = 'button'; poster.className = 'showcase-poster';
    poster.setAttribute('aria-label', `Show ${name}`);
    poster.setAttribute('aria-controls', card.id);
    const source = card.querySelector('.project-art');
    const art = document.createElement('div');
    art.className = source.className;
    art.innerHTML = source.innerHTML;
    art.setAttribute('aria-hidden', 'true');
    art.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    poster.append(art);
    const caption = document.createElement('span');caption.className='showcase-caption';caption.textContent=name;poster.append(caption);
    poster.addEventListener('click', () => { stop(); select(index); });
    stage.append(poster);posters.push(poster);
    const dot = document.createElement('button');
    dot.type='button';dot.setAttribute('aria-label',`Project ${index + 1}: ${name}`);dot.setAttribute('aria-controls',card.id);
    dot.addEventListener('click', () => { stop(); select(index); });
    dots.append(dot);selectors.push(dot);
  });
  function select(index) {
    active=(index+cards.length)%cards.length;
    cards.forEach((card,i) => {
      card.hidden=i!==active;
      card.classList.remove('is-pending');
      const offset=(i-active+cards.length+Math.floor(cards.length/2))%cards.length-Math.floor(cards.length/2);
      posters[i].style.setProperty('--position', offset);
      posters[i].style.setProperty('--distance', Math.abs(offset));
      posters[i].style.zIndex=String(10-Math.abs(offset));
      posters[i].classList.toggle('is-active',i===active);
      posters[i].tabIndex=Math.abs(offset)<=1?0:-1;
      posters[i].setAttribute('aria-pressed',String(i===active));
      selectors[i].setAttribute('aria-current',String(i===active));
    });
    status.textContent=`${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')} — ${cards[active].querySelector('h3').textContent}`;
  }
  function stop() { clearInterval(timer);timer=null;play.textContent='Play slideshow ▷';play.setAttribute('aria-pressed','false'); }
  shell.querySelector('.showcase-prev').addEventListener('click',()=>{stop();select(active-1);});
  shell.querySelector('.showcase-next').addEventListener('click',()=>{stop();select(active+1);});
  play.addEventListener('click',()=>{
    if(timer){stop();return;}
    timer=setInterval(()=>select(active+1),5000);
    play.textContent='Pause slideshow Ⅱ';play.setAttribute('aria-pressed','true');
  });
  shell.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'||event.key==='ArrowLeft') {event.preventDefault();stop();select(active+(event.key==='ArrowRight'?1:-1));}
  });
  stage.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;},{passive:true});
  stage.addEventListener('touchend',event=>{
    if(touchX===null)return;
    const change=event.changedTouches[0].clientX-touchX;touchX=null;
    if(Math.abs(change)>45){stop();select(active+(change<0?1:-1));}
  },{passive:true});
  shell.addEventListener('mouseenter',stop);
  shell.addEventListener('focusin',event=>{if(event.target!==play)stop();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
  document.querySelector('.motion-toggle')?.addEventListener('click',stop);
  grid.before(shell);
  section.classList.add('has-carousel');
  select(0);
})();
