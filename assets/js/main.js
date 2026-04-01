/* ====================================================
   Nina Lynn — IA prototype renderer in original visual language
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.NINA_SITE_DATA || {};
  const path = normalizePath(window.location.pathname);
  const lang = path.startsWith('/en/') || path === '/en/' ? 'en' : 'nl';
  const page = data.pages[path] || buildFallbackPage(path, lang);
  const menu = data.menus[lang] || [];
  const footerLinks = data.footers[lang] || [];

  document.documentElement.lang = page.lang || lang;
  document.title = `${stripHtml(page.title || 'NinaLynn')} | NinaLynn`;

  renderPage({ page, menu, footerLinks, path, lang });
  bindUi();
});

function normalizePath(pathname) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '');
}

function buildFallbackPage(path, lang) {
  const isNl = lang === 'nl';
  const copy = {
    eyebrow: isNl ? 'Nieuwe route' : 'New route',
    title: isNl ? 'Deze pagina hoort nu zichtbaar thuis in dezelfde botanische wereld.' : 'This page now belongs inside the same botanical world.',
    intro: isNl
      ? 'De IA blijft leidend, maar elke route erft opnieuw het oorspronkelijke design van de eerste landing page: handgeschreven navigatie, organische vlakken en zachte archive-achtige typografie.'
      : 'The information architecture stays intact, while every route now inherits the original landing-page design language: handwritten navigation, organic surfaces and soft archival typography.',
    primaryCtas: isNl
      ? [
          { label: 'Terug naar home', href: '/nl/' },
          { label: 'Bekijk muziek', href: '/nl/muziek/' },
          { label: 'Contact', href: '/nl/contact/' }
        ]
      : [
          { label: 'Back home', href: '/en/' },
          { label: 'Explore music', href: '/en/music/' },
          { label: 'Contact', href: '/en/contact/' }
        ],
    sections: [
      {
        heading: isNl ? 'Wat hier gebeurt' : 'What happens here',
        kicker: isNl ? 'Context en doorstroom' : 'Context and next step',
        cards: [
          {
            title: isNl ? 'Heldere plek in de structuur' : 'Clear place in the structure',
            text: isNl
              ? 'Deze URL is onderdeel van de tweetalige IA met vaste ouders, child pages en logische interne links.'
              : 'This URL belongs to the bilingual IA with fixed parents, child pages and logical internal links.'
          },
          {
            title: isNl ? 'Vervolgstap blijft zichtbaar' : 'The next step stays visible',
            text: isNl
              ? 'Elke route houdt luisteraars, boekers en leads in beweging naar de juiste vervolgactie.'
              : 'Each route keeps listeners, bookers and leads moving toward the right next action.'
          }
        ]
      }
    ]
  };

  return {
    lang,
    switchHref: lang === 'nl' ? path.replace('/nl/', '/en/') : path.replace('/en/', '/nl/'),
    switchLabel: lang === 'nl' ? 'EN' : 'NL',
    ...copy
  };
}

function renderPage({ page, menu, footerLinks, path, lang }) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <svg class="absolute" height="0" width="0" aria-hidden="true">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id="organic-shape">
          <path d="M0.1,0.15 C0.2,0.05,0.4,0,0.6,0.05 C0.8,0.1,0.95,0.3,0.98,0.5 C1,0.7,0.9,0.9,0.7,0.95 C0.5,1,0.2,0.95,0.05,0.8 C0,0.65,0,0.3,0.1,0.15"></path>
        </clipPath>
      </defs>
    </svg>

    <header class="fixed top-0 w-full z-50 sticky-nav" id="main-header">
      <nav class="max-w-[1600px] mx-auto px-6 md:px-16 py-6 flex items-center justify-between">
        <div class="hidden md:flex gap-10 items-center flex-1">
          ${menu.slice(0, 3).map(item => navLink(item, path)).join('')}
        </div>
        <div class="flex-none flex justify-center items-center gap-4">
          <a href="/${lang}/" class="font-headline text-xl md:text-2xl tracking-[0.18em] uppercase text-on-surface hover:text-lavender transition-colors">Nina Lynn</a>
          <div class="hidden md:flex gap-2 items-center text-[11px] uppercase tracking-[0.25em] text-on-surface-variant">
            <a class="${path === normalizePath(window.location.pathname) ? 'text-on-surface' : ''}" href="${path}">${lang.toUpperCase()}</a>
            <span>/</span>
            <a class="hover:text-lavender transition-colors" href="${page.switchHref}">${page.switchLabel}</a>
          </div>
        </div>
        <div class="hidden md:flex gap-10 items-center flex-1 justify-end">
          ${menu.slice(3).map(item => navLink(item, path)).join('')}
          <div class="flex gap-4 ml-4">
            <span class="material-symbols-outlined text-lavender text-xl">filter_vintage</span>
            <span class="material-symbols-outlined text-sage text-xl">eco</span>
          </div>
        </div>
        <button class="md:hidden flex flex-col gap-1.5 p-2" id="menu-toggle" aria-label="Menu openen">
          <span class="block w-6 h-px bg-on-surface transition-all"></span>
          <span class="block w-6 h-px bg-on-surface transition-all"></span>
          <span class="block w-4 h-px bg-on-surface transition-all"></span>
        </button>
      </nav>
    </header>

    <div class="fixed inset-0 z-[60] pointer-events-none" id="mobile-overlay">
      <div class="absolute inset-0 bg-on-surface/20 opacity-0 transition-opacity duration-300 pointer-events-none" id="overlay-bg"></div>
      <div class="mobile-menu absolute right-0 top-0 h-full w-72 bg-parchment/95 backdrop-blur-xl p-12 flex flex-col gap-8 pointer-events-auto shadow-2xl" id="mobile-menu">
        <button class="self-end mb-8" id="menu-close" aria-label="Menu sluiten">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
        ${menu.map(item => mobileNavLink(item, path)).join('')}
        <a class="font-handwriting text-xl hover:text-lavender transition-colors" href="${page.switchHref}">${page.switchLabel}</a>
        <div class="flex gap-6 mt-auto">
          <span class="material-symbols-outlined text-lavender">filter_vintage</span>
          <span class="material-symbols-outlined text-sage">eco</span>
        </div>
      </div>
    </div>

    <main class="selection:bg-lavender/30">
      ${renderHero(page, lang)}
      ${renderPrimarySection(page, lang)}
      ${renderSecondarySection(page, lang)}
    </main>

    <footer class="py-20 md:py-24 px-6 md:px-8 border-t border-sage/10 bg-parchment relative">
      <div class="absolute bottom-0 right-0 p-8 opacity-15 pointer-events-none">
        <span class="material-symbols-outlined text-6xl text-lavender">spa</span>
      </div>
      <div class="max-w-4xl mx-auto flex flex-col items-center gap-12 md:gap-16 reveal-up">
        <div class="text-center">
          <p class="font-handwriting text-2xl md:text-3xl italic">${lang === 'nl' ? 'Word lid van de bloementuin' : 'Join the garden archive'}</p>
        </div>
        <div class="w-full max-w-xl text-center space-y-8 p-10 md:p-12 hand-drawn-border bg-white/30 backdrop-blur-sm">
          <p class="font-body text-sm md:text-base leading-relaxed text-on-surface-variant">
            ${lang === 'nl'
              ? 'De footer blijft compact en taakgericht, maar leeft weer in dezelfde visuele taal als de oorspronkelijke landing page.'
              : 'The footer stays compact and task-driven while returning to the same visual language as the original landing page.'}
          </p>
          <div class="flex flex-wrap justify-center gap-4 md:gap-6">
            ${footerLinks.map(item => `<a class="btn-ghost font-body" href="${item.href}">${item.label}</a>`).join('')}
          </div>
        </div>
        <div class="flex gap-10 text-sage/60">
          <span class="material-symbols-outlined">share</span>
          <span class="material-symbols-outlined">music_note</span>
          <span class="material-symbols-outlined">mail</span>
        </div>
        <div class="text-[10px] font-body uppercase tracking-[0.2em] opacity-40 text-center">
          &copy; Nina Lynn. Hand-annotated in the Botanical Archive.
        </div>
      </div>
    </footer>
  `;
}

function navLink(item, path) {
  const active = path === item.href;
  return `<a class="font-handwriting text-sm ${active ? 'text-lavender' : 'text-on-surface'} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
}

function mobileNavLink(item, path) {
  const active = path === item.href;
  return `<a class="font-handwriting text-xl ${active ? 'text-lavender' : ''} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
}

function renderHero(page, lang) {
  return `
    <section class="relative min-h-screen flex items-center justify-center pt-20">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img class="w-full h-full object-cover opacity-40 scale-105" alt="Dreamy flower field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJT_cDqe7_w_msSikUjE1pbfPucN15Et2DzA6MdRQ0pNpu4LZt9sVM8BsYzR42PPQvjejfIAmmqVOvp8NDngagUiyONhQXM-tEYmQ_UlPZ-fpg4c17JCWm-vHTaFaqDPOSRh-a_S3H7egihvivfn4NYFiuVQ2T8jf2TzlTMm4ZPNP0Cgmn2geIuWsZ7UlCZkQsCkFT6TASf_ml9lkx5oVMfU9f5hLBg4F6ovJp4VBV_rwJM992EJE3eRLDejQ6qmizlhuja2Caiw"/>
        <div class="absolute inset-0 bg-gradient-to-b from-parchment/20 via-transparent to-parchment"></div>
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div class="relative inline-block py-16 px-8 md:py-20 md:px-24">
          <div class="absolute inset-0 bg-white/40 backdrop-blur-md organic-window border border-white/30 -z-10 shadow-2xl"></div>
          <p class="font-handwriting text-lavender text-lg md:text-xl mb-4">${page.eyebrow || ''}</p>
          <h1 class="font-headline text-4xl md:text-7xl text-on-surface leading-tight max-w-4xl">${page.title || ''}</h1>
          <p class="font-body text-base md:text-lg italic text-on-surface-variant max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">${page.intro || ''}</p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            ${(page.primaryCtas || []).map(cta => `<a class="btn-pill font-body tracking-wider text-sm" href="${cta.href}">${cta.label}</a>`).join('')}
          </div>
          ${(page.secondaryCtas || []).length ? `
            <div class="flex flex-wrap items-center justify-center gap-4 mt-6">
              ${page.secondaryCtas.map(cta => `<a class="btn-ghost font-body" href="${cta.href}">${cta.label}</a>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span class="material-symbols-outlined text-sage text-lg">expand_more</span>
      </div>
    </section>
  `;
}

function renderPrimarySection(page, lang) {
  const first = (page.sections || [])[0];
  if (!first) return '';
  return `
    <div class="w-48 mx-auto divider-motif my-0"></div>
    <section class="py-24 md:py-32 px-6 max-w-6xl mx-auto relative">
      <div class="absolute -left-10 top-0 opacity-15 hidden lg:block botanical-float pointer-events-none">
        <span class="material-symbols-outlined text-8xl text-sage">local_florist</span>
      </div>
      <div class="reveal-up">
        <div class="mb-16 md:mb-20 text-center relative">
          <span class="font-handwriting text-lavender block text-lg md:text-xl mb-2">${first.kicker || (lang === 'nl' ? 'Hoofdroutes' : 'Primary routes')}</span>
          <h2 class="font-headline text-3xl md:text-4xl text-on-surface">${first.heading || ''}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          ${(first.cards || []).map((card, index) => `
            <article class="reveal-up flex flex-col gap-6 ${index === 1 ? 'md:mt-10' : index === 2 ? 'md:-mt-4' : ''}" style="transition-delay:${index * 0.1}s">
              <div class="p-8 md:p-10 hand-drawn-border bg-white/35 backdrop-blur-sm h-full">
                <h3 class="font-headline text-2xl md:text-3xl mb-4">${card.title || ''}</h3>
                <p class="font-body text-sm md:text-base leading-relaxed text-on-surface-variant">${card.text || ''}</p>
                ${card.href && card.cta ? `<a class="btn-ghost font-body inline-block mt-8" href="${card.href}">${card.cta}</a>` : ''}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
      <div class="w-48 mx-auto divider-motif mt-24"></div>
    </section>
  `;
}

function renderSecondarySection(page, lang) {
  const second = (page.sections || [])[1];
  if (!second) return '';
  return `
    <section class="py-24 md:py-32 px-6 bg-surface-container-low/50 relative overflow-hidden">
      <div class="absolute top-10 right-10 opacity-10 pointer-events-none botanical-float">
        <span class="material-symbols-outlined text-[200px] text-lavender">wb_iridescent</span>
      </div>
      <div class="absolute bottom-10 left-10 opacity-10 pointer-events-none botanical-float-delayed">
        <span class="material-symbols-outlined text-[180px] text-sage">nest_eco_leaf</span>
      </div>
      <div class="max-w-7xl mx-auto">
        <div class="mb-16 md:mb-24 text-center reveal-up">
          <span class="font-handwriting text-sage block text-lg md:text-xl mb-2">${second.kicker || (lang === 'nl' ? 'Verdieping' : 'Depth')}</span>
          <h2 class="font-headline text-4xl md:text-5xl mb-4">${second.heading || ''}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          ${(second.cards || []).map((card, index) => `
            <div class="flex flex-col gap-8 ${index === 0 ? 'md:mt-16' : index === 2 ? 'md:-mt-8' : ''} group reveal-up" style="transition-delay:${index * 0.1}s">
              <div class="relative overflow-hidden aspect-[4/5] watercolor-edge bg-white/50 flex items-center justify-center">
                <span class="material-symbols-outlined text-[96px] ${index % 2 === 0 ? 'text-lavender/60' : 'text-sage/60'}">
                  ${index === 0 ? 'album' : index === 1 ? 'radio' : 'call_made'}
                </span>
              </div>
              <div class="text-center">
                <h3 class="font-headline text-2xl mb-3">${card.title || ''}</h3>
                <p class="font-body text-sm md:text-base leading-relaxed text-on-surface-variant">${card.text || ''}</p>
                ${card.href && card.cta ? `<div class="mt-6"><a class="btn-pill font-body tracking-wider text-sm" href="${card.href}">${card.cta}</a></div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function bindUi() {
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlayBg = document.getElementById('overlay-bg');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMenu() {
    if (!mobileMenu || !overlayBg || !mobileOverlay) return;
    mobileMenu.classList.add('open');
    overlayBg.style.opacity = '1';
    overlayBg.classList.remove('pointer-events-none');
    mobileOverlay.classList.remove('pointer-events-none');
  }

  function closeMenu() {
    if (!mobileMenu || !overlayBg || !mobileOverlay) return;
    mobileMenu.classList.remove('open');
    overlayBg.style.opacity = '0';
    overlayBg.classList.add('pointer-events-none');
    mobileOverlay.classList.add('pointer-events-none');
  }

  if (menuToggle && menuClose && mobileMenu && overlayBg) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlayBg.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  setTimeout(() => {
    revealElements.forEach(el => el.classList.add('revealed'));
  }, 2000);

  function checkReveal() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();
}
