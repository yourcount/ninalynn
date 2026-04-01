/* ====================================================
   Nina Lynn — IA prototype renderer
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.NINA_SITE_DATA || {};
  const path = normalizePath(window.location.pathname);
  const lang = path.startsWith('/en/') || path === '/en/' ? 'en' : 'nl';
  const page = data.pages[path] || buildFallbackPage(path, lang);
  const menu = data.menus[lang] || [];
  const footerLinks = data.footers[lang] || [];

  document.documentElement.lang = page.lang || lang;
  document.title = `${page.title} | NinaLynn`;

  renderChrome({ page, menu, footerLinks, path, lang });
  bindUi();
});

function normalizePath(pathname) {
  if (!pathname.endsWith('/')) {
    return `${pathname}/`;
  }
  return pathname;
}

function buildFallbackPage(path, lang) {
  const isNl = lang === 'nl';
  const labelMap = isNl
    ? {
        '/nl/live/': ['Live', 'Live wordt het overkoepelende cluster voor agenda, boekingen en bruiloften.'],
        '/nl/live/agenda/': ['Agenda', 'Deze pagina laat zien hoe muziek, live en boekingen onderling doorlinken.'],
        '/nl/live/boekingen/': ['Boekingen', 'Deze route is bedoeld voor venues, programmeurs en eventorganisatoren.'],
        '/nl/live/bruiloften/': ['Bruiloften', 'Deze pagina is een eigen commerciële route met sfeer, proof en kennismakings-CTA.'],
        '/nl/lessen/': ['Lessen', 'Zangles en songwriting staan samen in één educatiecluster.'],
        '/nl/lessen/zangles/': ['Zangles', 'De pagina combineert docentverhaal, tarieven en proefles in één intentieroute.'],
        '/nl/lessen/songwriting/': ['Songwriting', 'Deze route bedient workshop- en begeleiding-intentie zonder tijdgebonden rommel.'],
        '/nl/over/': ['Over', 'De merklaag linkt vanuit verhaal door naar muziek, live, pers en contact.'],
        '/nl/over/bio/': ['Bio', 'Artist story leeft onder Over als heldere subpagina.'],
        '/nl/over/band/': ['Band', 'De supporting cast krijgt een eigen plek binnen het merkverhaal.'],
        '/nl/over/pers/': ['Pers', 'Pers en geloofwaardigheid ondersteunen zowel branding als boekingen.'],
        '/nl/shop/': ['Shop', 'Shop is een zelfstandige bestemming en geen subpagina van muziek.'],
        '/nl/contact/': ['Contact', 'Contact segmenteert intenties voor live, weddings, lessons en algemene vragen.'],
        '/nl/muziek/albums/a-taste-of-the-wild/': ['A Taste of the Wild', 'Albumdetail met routes naar songteksten, reviews, shop en live.'],
        '/nl/muziek/albums/a-taste-of-the-wild/songteksten/': ['Songteksten', 'Lyrics hangen hiërarchisch onder het album in plaats van los in de site.'],
        '/nl/muziek/albums/a-taste-of-the-wild/reviews/': ['Reviews', 'Reviews leven als child page onder het album en sturen terug naar luisteren of live.'],
        '/nl/muziek/albums/hummingbird/': ['Hummingbird', 'Albumdetail als semantisch heldere bestemming.'],
        '/nl/muziek/albums/hummingbird/songteksten/': ['Hummingbird songteksten', 'Lyrics zijn nu inhoudelijk en technisch gekoppeld aan het album.'],
        '/nl/muziek/albums/hummingbird/reviews/': ['Hummingbird reviews', 'Reviewcontent ondersteunt geloofwaardigheid zonder het album te verdringen.'],
        '/nl/muziek/albums/imaginations/': ['Imaginations', 'Archiefalbum met een sobere, eigen detailstructuur.'],
        '/nl/muziek/albums/imaginations/songteksten/': ['Imaginations songteksten', 'Ook oudere muziek blijft logisch vindbaar in de nieuwe hiërarchie.'],
        '/nl/muziek/live-opnames/': ['Live-opnames', 'Deze pagina verbindt muziekbeleving aan boekingsproof.']
      }
    : {
        '/en/live/': ['Live', 'Live becomes the umbrella cluster for gigs, bookings and weddings.'],
        '/en/live/gigs/': ['Gigs', 'This page demonstrates how music, live and bookings interlink.'],
        '/en/live/bookings/': ['Bookings', 'Built for venues, promoters and event clients.'],
        '/en/live/weddings/': ['Weddings', 'A dedicated conversion path with proof, atmosphere and consultation CTA.'],
        '/en/lessons/': ['Lessons', 'Vocal coaching and songwriting now sit inside one education cluster.'],
        '/en/lessons/vocal-coaching/': ['Vocal coaching', 'This page combines teaching approach, pricing and trial lesson logic.'],
        '/en/lessons/songwriting/': ['Songwriting', 'Built for workshops and one-to-one guidance without stale event clutter.'],
        '/en/about/': ['About', 'The brand narrative routes onward into music, live, press and contact.'],
        '/en/about/bio/': ['Bio', 'Artist story lives as a clear subpage under About.'],
        '/en/about/band/': ['Band', 'Supporting cast gets its own role inside the brand architecture.'],
        '/en/about/press/': ['Press', 'Press and credibility support both branding and booking intent.'],
        '/en/shop/': ['Shop', 'Shop remains a standalone destination rather than a child of music.'],
        '/en/contact/': ['Contact', 'Contact should segment live, weddings, lessons and general inquiries.'],
        '/en/music/albums/a-taste-of-the-wild/': ['A Taste of the Wild', 'Album detail with routes into lyrics, reviews, shop and live.'],
        '/en/music/albums/a-taste-of-the-wild/lyrics/': ['Lyrics', 'Lyrics now live under the album rather than as a floating page.'],
        '/en/music/albums/a-taste-of-the-wild/reviews/': ['Reviews', 'Reviews support credibility and feed back into listening and live intent.'],
        '/en/music/albums/hummingbird/': ['Hummingbird', 'Album detail becomes a semantically clear destination.'],
        '/en/music/albums/hummingbird/lyrics/': ['Hummingbird lyrics', 'Lyrics are now structurally tied to the album.'],
        '/en/music/albums/hummingbird/reviews/': ['Hummingbird reviews', 'Review content sits beneath the album instead of competing with it.'],
        '/en/music/albums/imaginations/': ['Imaginations', 'Archive album with its own restrained detail structure.'],
        '/en/music/albums/imaginations/lyrics/': ['Imaginations lyrics', 'Older releases remain easy to find within the new hierarchy.'],
        '/en/music/live-sessions/': ['Live sessions', 'This page links music discovery to booking proof.']
      };

  const entry = labelMap[path];
  const title = entry ? entry[0] : (isNl ? 'Prototype route' : 'Prototype route');
  const intro = entry ? entry[1] : (isNl ? 'Deze route is aangemaakt als onderdeel van de nieuwe IA.' : 'This route exists as part of the new IA.');
  const switchHref = lang === 'nl' ? path.replace('/nl/', '/en/') : path.replace('/en/', '/nl/');
  const switchLabel = lang === 'nl' ? 'EN' : 'NL';
  const defaultCtas = lang === 'nl'
    ? [
        { label: 'Terug naar home', href: '/nl/' },
        { label: 'Bekijk muziek', href: '/nl/muziek/' },
        { label: 'Neem contact op', href: '/nl/contact/' }
      ]
    : [
        { label: 'Back to home', href: '/en/' },
        { label: 'Explore music', href: '/en/music/' },
        { label: 'Contact', href: '/en/contact/' }
      ];

  return {
    lang,
    switchHref,
    switchLabel,
    eyebrow: lang === 'nl' ? 'Prototypepagina' : 'Prototype page',
    title,
    intro,
    primaryCtas: defaultCtas,
    sections: [
      {
        heading: lang === 'nl' ? 'Wat hier landt' : 'What lands here',
        cards: [
          {
            title: lang === 'nl' ? 'URL-structuur toegepast' : 'URL structure applied',
            text: intro
          },
          {
            title: lang === 'nl' ? 'Interne linklogica' : 'Internal link logic',
            text: lang === 'nl'
              ? 'Deze pagina is onderdeel van een systeem waarin iedere route doorverwijst naar de meest logische vervolgstap.'
              : 'This page sits inside a system where each route pushes users toward the next most relevant action.'
          }
        ]
      }
    ]
  };
}

function renderChrome({ page, menu, footerLinks, path, lang }) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="page-shell">
      <header id="main-header" class="site-header sticky-nav">
        <div class="container header-row">
          <a class="brand-mark" href="/${lang}/">NinaLynn</a>
          <nav class="desktop-nav" aria-label="Primary">
            ${menu.map(item => `<a class="${path === item.href ? 'active' : ''}" href="${item.href}">${item.label}</a>`).join('')}
          </nav>
          <div class="header-tools">
            <div class="lang-switch">
              <a class="active" href="${path}">${lang.toUpperCase()}</a>
              <a href="${page.switchHref}">${page.switchLabel}</a>
            </div>
            <button id="menu-toggle" class="menu-button" aria-label="Open menu">Menu</button>
          </div>
        </div>
        <div id="mobile-overlay" class="mobile-overlay pointer-events-none">
          <div id="overlay-bg" class="overlay-bg pointer-events-none"></div>
          <aside id="mobile-menu" class="mobile-menu panel hand-drawn-border">
            <button id="menu-close" class="menu-close" aria-label="Close menu">Close</button>
            <nav class="mobile-nav">
              ${menu.map(item => `<a class="${path === item.href ? 'active' : ''}" href="${item.href}">${item.label}</a>`).join('')}
              <a href="${page.switchHref}">${page.switchLabel}</a>
            </nav>
          </aside>
        </div>
      </header>
      <main>
        ${renderHero(page)}
        ${renderSections(page)}
      </main>
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <p class="footer-kicker">${lang === 'nl' ? 'Taakgerichte footer' : 'Task-based footer'}</p>
            <p class="footer-copy">${lang === 'nl'
              ? 'Geen dubbele promo’s of losse widgets, maar een compacte set kernroutes per taal.'
              : 'No repeated promos or floating widgets, just a compact set of core routes per language.'}</p>
          </div>
          <nav class="footer-links" aria-label="Footer">
            ${footerLinks.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}
          </nav>
        </div>
      </footer>
    </div>
  `;
}

function renderHero(page) {
  return `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-copy reveal-up">
          <p class="eyebrow">${page.eyebrow || ''}</p>
          <h1>${page.title || ''}</h1>
          <p class="intro">${page.intro || ''}</p>
          <div class="cta-row">
            ${(page.primaryCtas || []).map(cta => `<a class="btn-pill" href="${cta.href}">${cta.label}</a>`).join('')}
          </div>
          ${(page.secondaryCtas || []).length ? `
            <div class="link-row">
              ${page.secondaryCtas.map(cta => `<a class="btn-ghost" href="${cta.href}">${cta.label}</a>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="hero-panel hand-drawn-border reveal-up">
          <p class="panel-label">${page.lang === 'nl' ? 'IA-focus' : 'IA focus'}</p>
          <ul class="signal-list">
            <li>${page.lang === 'nl' ? 'Heldere NL/EN taalstructuur' : 'Clear NL/EN language structure'}</li>
            <li>${page.lang === 'nl' ? 'Muziek, Live en Lessen als hoofdroutes' : 'Music, Live and Lessons as primary routes'}</li>
            <li>${page.lang === 'nl' ? 'Artist branding blijft de dominante laag' : 'Artist branding remains the dominant layer'}</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderSections(page) {
  return (page.sections || []).map(section => `
    <section class="content-section">
      <div class="container">
        <div class="section-head reveal-up">
          <h2>${section.heading || ''}</h2>
        </div>
        <div class="card-grid">
          ${(section.cards || []).map(card => `
            <article class="info-card hand-drawn-border reveal-up">
              <h3>${card.title || ''}</h3>
              <p>${card.text || ''}</p>
              ${card.href && card.cta ? `<a class="text-link" href="${card.href}">${card.cta}</a>` : ''}
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `).join('');
}

function bindUi() {
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
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
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}
