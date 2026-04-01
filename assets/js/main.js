/* ====================================================
   NinaLynn — content-driven renderer
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
  const switchHref = lang === 'nl' ? path.replace('/nl/', '/en/') : path.replace('/en/', '/nl/');
  const switchLabel = lang === 'nl' ? 'EN' : 'NL';
  const homeHref = isNl ? '/nl/' : '/en/';
  const musicHref = isNl ? '/nl/muziek/' : '/en/music/';
  const liveHref = isNl ? '/nl/live/' : '/en/live/';
  const lessonsHref = isNl ? '/nl/lessen/' : '/en/lessons/';
  const shopHref = isNl ? '/nl/shop/' : '/en/shop/';
  const contactHref = isNl ? '/nl/contact/' : '/en/contact/';
  const albumMap = {
    'a-taste-of-the-wild': 'A Taste of the Wild',
    'hummingbird': 'Hummingbird',
    'imaginations': 'Imaginations'
  };
  const albumSlug = Object.keys(albumMap).find(slug => path.includes(`/${slug}/`));
  const albumName = albumSlug ? albumMap[albumSlug] : (isNl ? 'deze plaat' : 'this record');

  if (path.includes('/songteksten/') || path.includes('/lyrics/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Songteksten' : 'Lyrics',
      title: isNl ? `${albumName} in losse regels en beelden.` : `${albumName} in lines, fragments and breath.`,
      intro: isNl
        ? 'Lees de woorden alsof je door de randen van het album bladert. Zonder arrangement krijgen beelden, stiltes en herhalingen een ander gewicht.'
        : 'Read the words as if you were turning through the edges of the record. Without arrangement, images, silences and repetitions carry different weight.',
      primaryCtas: [
        { label: isNl ? 'Terug naar album' : 'Back to album', href: path.replace(/(songteksten|lyrics)\/$/, '') },
        { label: isNl ? 'Luister muziek' : 'Listen to music', href: musicHref },
        { label: isNl ? 'Bekijk live' : 'Explore live', href: liveHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Tekstblad' : 'Lyric sheet',
          heading: isNl ? 'Drie momenten uit de plaat' : 'Three moments from the record',
          cards: [
            { title: isNl ? 'Open begin' : 'Open beginning', text: isNl ? 'Een eerste zin die voorzichtig licht binnenlaat.' : 'A first line that lets the light in carefully.' },
            { title: isNl ? 'Beweging' : 'Motion', text: isNl ? 'Taal die schuift tussen natuurbeeld en gevoel.' : 'Language moving between natural image and emotion.' },
            { title: isNl ? 'Nablijven' : 'Afterglow', text: isNl ? 'De laatste regels blijven langer hangen dan de melodie.' : 'The final lines linger a little longer than the melody.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/reviews/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Pers & reacties' : 'Press & reactions',
      title: isNl ? `${albumName} blijft zacht, maar niet onopgemerkt.` : `${albumName} stays gentle, but not unnoticed.`,
      intro: isNl
        ? 'Een kleine verzameling indrukken rond de plaat: woorden over sfeer, tekst, stem en de manier waarop de songs zich langzaam openen.'
        : 'A small gathering of impressions around the record: words about atmosphere, text, voice and the way the songs slowly unfold.',
      primaryCtas: [
        { label: isNl ? 'Beluister album' : 'Listen to album', href: path.replace(/reviews\/$/, '') },
        { label: isNl ? 'Bekijk live' : 'Explore live', href: liveHref },
        { label: isNl ? 'Naar de shop' : 'Visit shop', href: shopHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Wat terugkomt' : 'What returns',
          heading: isNl ? 'Sfeer, detail en nabijheid' : 'Atmosphere, detail and closeness',
          cards: [
            { title: isNl ? 'Filmisch' : 'Cinematic', text: isNl ? 'Veel reacties spreken over beelden die bijna tastbaar worden.' : 'Many responses describe images that feel almost tactile.' },
            { title: isNl ? 'Intiem' : 'Intimate', text: isNl ? 'De stem blijft dichtbij zonder ooit te dwingen.' : 'The voice stays close without ever forcing itself forward.' },
            { title: isNl ? 'Gelaagd' : 'Layered', text: isNl ? 'Hoe stiller de songs lijken, hoe meer detail hoorbaar wordt.' : 'The quieter the songs seem, the more detail they reveal.' }
          ]
        }
      ]
    };
  }

  if (albumSlug) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: 'Album',
      title: albumName,
      intro: isNl
        ? 'Een verzameling songs die elkaar niet willen overschreeuwen. Luister de plaat in volgorde, lees de teksten of zie hoe het werk verder leeft op het podium.'
        : 'A set of songs that never try to outshout one another. Listen front to back, read the lyrics, or see how the work continues on stage.',
      primaryCtas: [
        { label: isNl ? 'Songteksten' : 'Lyrics', href: `${path}${isNl ? 'songteksten/' : 'lyrics/'}` },
        { label: isNl ? 'Reviews' : 'Reviews', href: `${path}reviews/` },
        { label: isNl ? 'Koop muziek' : 'Buy music', href: shopHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Verder in de plaat' : 'Inside the record',
          heading: isNl ? 'Luisteren, lezen, meenemen' : 'Listen, read, take it home',
          cards: [
            { title: isNl ? 'Teksten' : 'Words', text: isNl ? 'Lees de nummers zonder instrumentatie, alleen op ritme van zin en beeld.' : 'Read the songs without instrumentation, guided only by image and phrasing.', href: `${path}${isNl ? 'songteksten/' : 'lyrics/'}`, cta: isNl ? 'Open teksten' : 'Open lyrics' },
            { title: isNl ? 'Reacties' : 'Responses', text: isNl ? 'Zie hoe luisteraars en pers de plaat ontvangen.' : 'See how listeners and press receive the record.', href: `${path}reviews/`, cta: isNl ? 'Lees reacties' : 'Read responses' },
            { title: isNl ? 'Live' : 'Live', text: isNl ? 'Vind de avonden waarop deze songs de kamer in bewegen.' : 'Find the evenings when these songs step into the room.', href: liveHref, cta: isNl ? 'Bekijk live' : 'Explore live' }
          ]
        }
      ]
    };
  }

  if (path.includes('/agenda/') || path.includes('/gigs/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Agenda' : 'Gigs',
      title: isNl ? 'Avonden om de songs in het echt te horen ademen.' : 'Evenings to hear the songs breathe in person.',
      intro: isNl
        ? 'Hier verzamelen zich luistershows, kleine zalen en avonden waar de muziek dichtbij genoeg blijft om haar details mee te geven.'
        : 'This is where listening shows, small rooms and evenings gather, the kind of places where the music can keep its detail intact.',
      primaryCtas: [
        { label: isNl ? 'Boek een optreden' : 'Book a performance', href: `${liveHref}${isNl ? 'boekingen/' : 'bookings/'}` },
        { label: isNl ? 'Beluister muziek' : 'Listen to music', href: musicHref },
        { label: isNl ? 'Contact' : 'Contact', href: contactHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Komende avonden' : 'Upcoming evenings',
          heading: isNl ? 'Dichtbij, open en aandachtig' : 'Close, open and attentive',
          cards: [
            { title: isNl ? 'Paradiso' : 'Paradiso', text: isNl ? 'Amsterdam, een intieme set tussen nieuw werk en vertrouwde songs.' : 'Amsterdam, an intimate set moving between new work and familiar songs.' },
            { title: isNl ? 'TivoliVredenburg' : 'TivoliVredenburg', text: isNl ? 'Utrecht, met meer ruimte voor banddynamiek en lange lijnen.' : 'Utrecht, with more room for band dynamics and long arcs.' },
            { title: isNl ? 'Doornroosje' : 'Doornroosje', text: isNl ? 'Nijmegen, ergens tussen fluistering en open veld.' : 'Nijmegen, somewhere between whisper and open field.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/boekingen/') || path.includes('/bookings/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Boekingen' : 'Bookings',
      title: isNl ? 'Voor podia, luisteravonden en events die sfeer durven toe te vertrouwen aan nuance.' : 'For venues, listening nights and events willing to trust atmosphere to nuance.',
      intro: isNl
        ? 'NinaLynn speelt voor programma’s waar tekst, stem en subtiliteit de ruimte krijgen. Van culturele avonden tot kleinschalige live settings.'
        : 'NinaLynn performs for programs where text, voice and subtlety are allowed room to work. From cultural evenings to intimate live settings.',
      primaryCtas: [
        { label: isNl ? 'Vraag beschikbaarheid aan' : 'Request availability', href: contactHref },
        { label: isNl ? 'Bekijk live-opnames' : 'View live sessions', href: isNl ? '/nl/muziek/live-opnames/' : '/en/music/live-sessions/' },
        { label: isNl ? 'Beluister muziek' : 'Listen to music', href: musicHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Geschikt voor' : 'Works well for',
          heading: isNl ? 'Van luisterruimte tot cultureel programma' : 'From listening rooms to cultural programs',
          cards: [
            { title: isNl ? 'Luisterconcerten' : 'Listening concerts', text: isNl ? 'Voor avonden waar lied en tekst centraal mogen staan.' : 'For evenings where song and language can remain central.' },
            { title: isNl ? 'Programmeurs' : 'Programmers', text: isNl ? 'Voor contexten rond singer-songwriter, folk en verhalende pop.' : 'For contexts around singer-songwriter, folk and narrative pop.' },
            { title: isNl ? 'Private events' : 'Private events', text: isNl ? 'Voor settings waarin muziek sfeer moet dragen zonder te overheersen.' : 'For settings where music should carry atmosphere without overpowering it.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/bruiloften/') || path.includes('/weddings/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Bruiloften' : 'Weddings',
      title: isNl ? 'Voor ceremonies en dagen die licht, warm en persoonlijk moeten aanvoelen.' : 'For ceremonies and days that should feel light, warm and personal.',
      intro: isNl
        ? 'Van binnenkomst tot diner of borrel: de muziek wordt afgestemd op het tempo van de dag en de intimiteit van het moment.'
        : 'From arrival to dinner or reception, the music is shaped around the pace of the day and the intimacy of the moment.',
      primaryCtas: [
        { label: isNl ? 'Plan een kennismaking' : 'Plan an introduction', href: contactHref },
        { label: isNl ? 'Beluister muziek' : 'Listen to music', href: musicHref },
        { label: isNl ? 'Bekijk live' : 'Explore live', href: liveHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Momenten van de dag' : 'Moments in the day',
          heading: isNl ? 'Ceremonie, diner of borrel' : 'Ceremony, dinner or reception',
          cards: [
            { title: isNl ? 'Ceremonie' : 'Ceremony', text: isNl ? 'Liedjes die binnenkomst, geloften of afsluiting ondersteunen.' : 'Songs that support arrivals, vows or the closing of the ceremony.' },
            { title: isNl ? 'Diner' : 'Dinner', text: isNl ? 'Muziek die aanwezig is zonder de tafelgesprekken te verstoren.' : 'Music with presence that never interrupts conversation.' },
            { title: isNl ? 'Borrel' : 'Reception', text: isNl ? 'Een set die de ruimte opent en alles net iets zachter laat landen.' : 'A set that opens the room and lets everything settle more softly.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/zangles/') || path.includes('/vocal-coaching/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Zangles' : 'Vocal coaching',
      title: isNl ? 'Techniek, adem en vertrouwen zonder de eigen stem glad te maken.' : 'Technique, breath and confidence without smoothing away the voice itself.',
      intro: isNl
        ? 'De lessen zijn bedoeld voor mensen die vrijer willen zingen, hun bereik willen onderzoeken of meer rust zoeken in klank en presentatie.'
        : 'These sessions are for anyone wanting to sing more freely, explore range, or find more ease in tone and presence.',
      primaryCtas: [
        { label: isNl ? 'Plan een proefles' : 'Book a trial lesson', href: contactHref },
        { label: isNl ? 'Bekijk songwriting' : 'View songwriting', href: isNl ? '/nl/lessen/songwriting/' : '/en/lessons/songwriting/' },
        { label: isNl ? 'Neem contact op' : 'Get in touch', href: contactHref }
      ],
      sections: [
        {
          kicker: isNl ? 'In de les' : 'Inside the lesson',
          heading: isNl ? 'Adem, klank en aanwezigheid' : 'Breath, tone and presence',
          cards: [
            { title: isNl ? 'Beginners' : 'Beginners', text: isNl ? 'Voor wie de eigen stem beter wil leren kennen.' : 'For people getting closer to their own voice.' },
            { title: isNl ? 'Makers' : 'Songwriters', text: isNl ? 'Voor zingende makers die hun eigen liedjes vrijer willen dragen.' : 'For writers who want to carry their own songs more freely.' },
            { title: isNl ? 'Podiumrust' : 'Presence', text: isNl ? 'Voor wie niet alleen beter wil zingen, maar ook rustiger wil staan.' : 'For anyone wanting not only to sing better, but to stand more calmly.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/songwriting/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: 'Songwriting',
      title: isNl ? 'Van een losse zin naar een lied met richting, ruimte en geheugen.' : 'From a single line to a song with direction, room and memory.',
      intro: isNl
        ? 'Voor wie al schrijft of net begint. Samen kijken we naar tekst, melodie, vorm en het detail dat een lied geloofwaardig maakt.'
        : 'For writers already working and for those just starting out. Together we look at text, melody, form and the detail that makes a song believable.',
      primaryCtas: [
        { label: isNl ? 'Vraag begeleiding aan' : 'Request coaching', href: contactHref },
        { label: isNl ? 'Bekijk zangles' : 'View vocal coaching', href: isNl ? '/nl/lessen/zangles/' : '/en/lessons/vocal-coaching/' },
        { label: isNl ? 'Neem contact op' : 'Get in touch', href: contactHref }
      ],
      sections: [
        {
          kicker: isNl ? 'In het schrijven' : 'Inside the writing',
          heading: isNl ? 'Tekst, melodie en vorm' : 'Text, melody and form',
          cards: [
            { title: isNl ? 'Eerste ideeën' : 'First ideas', text: isNl ? 'Van notitieboekflarden naar een duidelijke richting.' : 'From notebook fragments to a clear direction.' },
            { title: isNl ? 'Uitwerken' : 'Development', text: isNl ? 'Couplet, refrein en spanningsboog krijgen samenhang.' : 'Verse, chorus and arc begin to cohere.' },
            { title: isNl ? 'Eigen stem' : 'Own voice', text: isNl ? 'Meer jezelf klinken, minder als een voorbeeld.' : 'Sounding more like yourself and less like an example.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/bio/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: 'Bio',
      title: isNl ? 'NinaLynn schrijft vanuit observatie, adem en de traagheid van aandacht.' : 'NinaLynn writes from observation, breath and the slowness of attention.',
      intro: isNl
        ? 'Het werk beweegt tussen indie folk, verhalende pop en een liefde voor kleine details die pas laat hun volle betekenis tonen.'
        : 'The work moves between indie folk, narrative pop and a love of small details that reveal their full meaning only slowly.',
      primaryCtas: [
        { label: isNl ? 'Beluister muziek' : 'Listen to music', href: musicHref },
        { label: isNl ? 'Bekijk live' : 'Explore live', href: liveHref },
        { label: isNl ? 'Persmateriaal' : 'Press materials', href: path.replace(/bio\/$/, isNl ? 'pers/' : 'press/') }
      ],
      sections: [
        {
          kicker: isNl ? 'Achtergrond' : 'Background',
          heading: isNl ? 'Schrijven, zingen, observeren' : 'Writing, singing, observing',
          cards: [
            { title: isNl ? 'Tekst' : 'Language', text: isNl ? 'Veel songs beginnen met een enkele zin die om muziek heen groeit.' : 'Many songs begin with a single line that gathers music around it.' },
            { title: isNl ? 'Klank' : 'Sound', text: isNl ? 'Akoestische warmte en open ruimte blijven steeds terugkomen.' : 'Acoustic warmth and open space keep returning.' },
            { title: isNl ? 'Live' : 'Live', text: isNl ? 'Op het podium worden de songs directer en nog ademender.' : 'On stage the songs become more immediate and more alive.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/band/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Band' : 'Band',
      title: isNl ? 'Een livebezetting die de songs helpt dragen, niet duwen.' : 'A live ensemble that helps carry the songs rather than push them.',
      intro: isNl
        ? 'De muzikanten rond NinaLynn spelen met aandacht voor nuance, timing en ruimte, zodat iedere song haar eigen adem kan houden.'
        : 'The musicians around NinaLynn play with attention to nuance, timing and space, so every song can keep its own breath.',
      primaryCtas: [
        { label: isNl ? 'Bekijk live' : 'Explore live', href: liveHref },
        { label: isNl ? 'Lees de bio' : 'Read the bio', href: path.replace(/band\/$/, 'bio/') },
        { label: isNl ? 'Contact' : 'Contact', href: contactHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Samenspel' : 'Ensemble',
          heading: isNl ? 'Textuur boven volume' : 'Texture over volume',
          cards: [
            { title: isNl ? 'Gitaar' : 'Guitar', text: isNl ? 'Opent vaak het landschap waarin de songs kunnen bewegen.' : 'Often opens the landscape in which the songs can move.' },
            { title: isNl ? 'Stemmen' : 'Voices', text: isNl ? 'Meerlagigheid zonder het midden uit het oog te verliezen.' : 'Layering without losing the center.' },
            { title: isNl ? 'Ritme' : 'Rhythm', text: isNl ? 'Ondersteunt en ademt mee, eerder dragend dan sturend.' : 'Supports and breathes with the song, carrying rather than driving.' }
          ]
        }
      ]
    };
  }

  if (path.includes('/pers/') || path.includes('/press/')) {
    return {
      lang,
      switchHref,
      switchLabel,
      eyebrow: isNl ? 'Pers' : 'Press',
      title: isNl ? 'Context, korte introducties en materiaal rond de muziek.' : 'Context, short introductions and material around the music.',
      intro: isNl
        ? 'Voor programmeurs, schrijvers en redacties die in korte vorm willen begrijpen waar NinaLynn artistiek voor staat.'
        : 'For programmers, writers and editors wanting a clear short-form understanding of NinaLynn’s artistic position.',
      primaryCtas: [
        { label: isNl ? 'Bekijk bio' : 'View bio', href: path.replace(/(pers|press)\/$/, 'bio/') },
        { label: isNl ? 'Beluister muziek' : 'Listen to music', href: musicHref },
        { label: isNl ? 'Contact' : 'Contact', href: contactHref }
      ],
      sections: [
        {
          kicker: isNl ? 'Kort samengevat' : 'In brief',
          heading: isNl ? 'Wat snel duidelijk moet worden' : 'What should become clear quickly',
          cards: [
            { title: isNl ? 'Genre' : 'Genre', text: isNl ? 'Indie folk, singer-songwriter en verhalende pop liggen het dichtst bij de kern.' : 'Indie folk, singer-songwriter and narrative pop sit closest to the core.' },
            { title: isNl ? 'Thema' : 'Themes', text: isNl ? 'Groei, natuur, herinnering en subtiele verschuivingen in relaties.' : 'Growth, nature, memory and subtle shifts in relationships.' },
            { title: isNl ? 'Podium' : 'Stage', text: isNl ? 'Live krijgt het werk meer spanning, adem en directheid.' : 'Live, the work gains more tension, breath and immediacy.' }
          ]
        }
      ]
    };
  }

  return {
    lang,
    switchHref,
    switchLabel,
    eyebrow: isNl ? 'Pagina' : 'Page',
    title: isNl ? 'Een rustige plek binnen de wereld van NinaLynn.' : 'A quiet place inside the world of NinaLynn.',
    intro: isNl ? 'Neem de tijd, kijk rond en volg de route die het beste past bij waar je naar zoekt.' : 'Take your time, look around and follow the route that best matches what you are seeking.',
    primaryCtas: [
      { label: isNl ? 'Home' : 'Home', href: homeHref },
      { label: isNl ? 'Muziek' : 'Music', href: musicHref },
      { label: isNl ? 'Contact' : 'Contact', href: contactHref }
    ],
    sections: [
      {
        kicker: isNl ? 'Verder kijken' : 'Keep looking',
        heading: isNl ? 'Kies je volgende stap' : 'Choose your next step',
        cards: [
          { title: isNl ? 'Muziek' : 'Music', text: isNl ? 'Albums, teksten en live-opnames vormen de kern van het archief.' : 'Albums, lyrics and live sessions form the heart of the archive.', href: musicHref, cta: isNl ? 'Naar muziek' : 'Go to music' },
          { title: isNl ? 'Live' : 'Live', text: isNl ? 'Bekijk shows, boekingen en andere manieren waarop de songs een ruimte in gaan.' : 'See gigs, bookings and the ways these songs move into a room.', href: liveHref, cta: isNl ? 'Naar live' : 'Go to live' },
          { title: isNl ? 'Lessen' : 'Lessons', text: isNl ? 'Voor stemwerk, songwriting en persoonlijke begeleiding.' : 'For voice work, songwriting and one-to-one guidance.', href: lessonsHref, cta: isNl ? 'Naar lessen' : 'Go to lessons' }
        ]
      }
    ]
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
      <nav class="max-w-[1600px] mx-auto px-4 md:px-16 py-4 md:py-6 flex items-center justify-between">
        <div class="hidden md:flex gap-10 items-center flex-1">
          ${menu.slice(0, 3).map(item => navLink(item, path)).join('')}
        </div>
        <div class="flex-none flex justify-center items-center gap-2 md:gap-4">
          <a href="/${lang}/" class="font-headline text-xl md:text-2xl tracking-[0.18em] uppercase text-on-surface hover:text-lavender transition-colors">NinaLynn</a>
          <div class="hidden md:flex gap-2 items-center text-[11px] uppercase tracking-[0.25em] text-on-surface-variant">
            <a class="text-on-surface" href="${path}">${lang.toUpperCase()}</a>
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
        <div class="md:hidden flex items-center gap-3">
          <a class="font-body text-[11px] uppercase tracking-[0.22em] text-on-surface-variant hover:text-lavender transition-colors" href="${page.switchHref}">${page.switchLabel}</a>
          <button class="flex flex-col gap-1.5 p-2 -mr-2" id="menu-toggle" aria-label="Menu openen" aria-expanded="false" aria-controls="mobile-menu">
            <span class="block w-6 h-px bg-on-surface transition-all"></span>
            <span class="block w-6 h-px bg-on-surface transition-all"></span>
            <span class="block w-4 h-px bg-on-surface transition-all"></span>
          </button>
        </div>
      </nav>
    </header>

    <div class="fixed inset-0 z-[60] pointer-events-none" id="mobile-overlay">
      <div class="absolute inset-0 bg-on-surface/20 opacity-0 transition-opacity duration-300 pointer-events-none" id="overlay-bg"></div>
      <div class="mobile-menu absolute right-0 top-0 h-full w-full max-w-[22rem] bg-parchment/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-8 pointer-events-auto shadow-2xl overflow-y-auto" id="mobile-menu">
        <div class="flex items-center justify-between mb-2">
          <a href="/${lang}/" class="font-headline text-lg tracking-[0.18em] uppercase text-on-surface hover:text-lavender transition-colors">NinaLynn</a>
          <button id="menu-close" aria-label="Menu sluiten">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <div class="flex flex-col gap-6">
          ${menu.map(item => mobileNavLink(item, path)).join('')}
        </div>
        <div class="pt-2 border-t border-sage/10">
          <a class="font-body text-sm uppercase tracking-[0.2em] text-on-surface-variant hover:text-lavender transition-colors" href="${page.switchHref}">${lang.toUpperCase()} / ${page.switchLabel}</a>
        </div>
        <div class="flex gap-6 mt-auto">
          <span class="material-symbols-outlined text-lavender">filter_vintage</span>
          <span class="material-symbols-outlined text-sage">eco</span>
        </div>
      </div>
    </div>

    <main class="selection:bg-lavender/30">
      ${page.homeLayout ? renderHome(page, lang) : `${renderHero(page)}${renderPrimarySection(page, lang)}${renderSecondarySection(page, lang)}`}
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
              ? 'Nieuws, nieuwe muziek, optredens en kleine notities uit het archief verschijnen hier als eerste.'
              : 'News, new music, performances and small notes from the archive tend to appear here first.'}
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
          &copy; NinaLynn. Hand-annotated in the Botanical Archive.
        </div>
      </div>
    </footer>
  `;
}

function renderHome(page, lang) {
  return `
    ${renderHero(page)}
    <div class="w-48 mx-auto divider-motif my-0"></div>
    <section class="py-20 md:py-32 px-4 md:px-6 max-w-5xl mx-auto relative editorial-divider">
      <div class="absolute -left-10 top-0 opacity-15 hidden lg:block botanical-float pointer-events-none">
        <span class="material-symbols-outlined text-8xl text-sage">local_florist</span>
      </div>
      <div class="reveal-up">
        <div class="mb-12 md:mb-20 text-center relative">
          <span class="font-handwriting text-lavender block text-lg md:text-xl mb-2">${page.tour.kicker}</span>
          <h2 class="font-headline text-3xl md:text-4xl text-on-surface">${page.tour.heading}</h2>
        </div>
        <div class="tour-ledger grid grid-cols-1 md:grid-cols-12 gap-0">
          <div class="hidden md:contents font-handwriting text-sage text-xs">
            <div class="md:col-span-3 py-4 border-r border-sage/15 px-6">${lang === 'nl' ? 'Datum' : 'Date'}</div>
            <div class="md:col-span-5 py-4 border-r border-sage/15 px-6">${lang === 'nl' ? 'Locatie' : 'Venue'}</div>
            <div class="md:col-span-4 py-4 px-6 text-right">${lang === 'nl' ? 'Toegang' : 'Access'}</div>
          </div>
          ${page.tour.rows.map(row => `
            <div class="tour-row md:col-span-12 group hover:bg-sage/5 transition-colors grid grid-cols-1 md:grid-cols-12 items-center">
              <div class="md:col-span-3 pt-8 md:py-8 px-6 md:border-r border-sage/15">
                <span class="md:hidden font-handwriting text-sage text-xs block mb-2">${lang === 'nl' ? 'Datum' : 'Date'}</span>
                <span class="font-body text-xs text-sage block tracking-widest">${row.date}</span>
              </div>
              <div class="md:col-span-5 px-6 py-2 md:py-8 md:border-r border-sage/15">
                <span class="md:hidden font-handwriting text-sage text-xs block mb-2">${lang === 'nl' ? 'Locatie' : 'Venue'}</span>
                <h3 class="font-headline text-2xl">${row.venue}</h3>
                <p class="font-handwriting text-sm text-on-surface-variant">${row.location}</p>
              </div>
              <div class="md:col-span-4 pb-8 md:py-8 px-6 flex md:justify-end">
                <span class="md:hidden font-handwriting text-sage text-xs block mb-2 w-full">${lang === 'nl' ? 'Toegang' : 'Access'}</span>
                <a class="btn-ghost font-body" href="${row.href}">${row.cta}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="w-48 mx-auto divider-motif mt-24"></div>
    </section>
    <section class="py-24 md:py-40 relative overflow-hidden editorial-divider flower-press-corners">
      <div class="absolute top-10 right-10 opacity-10 pointer-events-none botanical-float">
        <span class="material-symbols-outlined text-[200px] text-lavender">wb_iridescent</span>
      </div>
      <div class="absolute bottom-10 left-10 opacity-10 pointer-events-none botanical-float-delayed">
        <span class="material-symbols-outlined text-[180px] text-sage">nest_eco_leaf</span>
      </div>
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="relative group reveal-up order-2 lg:order-1">
          <div class="relative z-10 watercolor-edge overflow-hidden bg-white/35 aspect-[4/5] flex items-center justify-center">
            <span class="font-headline text-4xl md:text-6xl text-on-surface/80">${page.title}</span>
          </div>
          <div class="absolute -inset-10 border border-lavender/10 rounded-[40%] -z-10 group-hover:rotate-12 transition-transform duration-[3s]"></div>
        </div>
        <div class="space-y-10 md:space-y-12 relative order-1 lg:order-2 reveal-up" style="transition-delay: 0.15s">
          <div class="space-y-4">
            <span class="font-handwriting text-sage text-lg md:text-xl block">${page.albumFeature.kicker}</span>
            <h2 class="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight">${page.albumFeature.heading}</h2>
          </div>
          <p class="font-body text-base md:text-lg leading-relaxed text-on-surface-variant italic border-l-4 border-lavender/20 pl-8">${page.albumFeature.text}</p>
          <div class="space-y-5 font-body">
            ${page.albumFeature.tracks.map(track => `
              <div class="flex justify-between items-center group/track cursor-pointer border-b border-sage/10 pb-4">
                <span class="group-hover/track:translate-x-2 group-hover/track:text-lavender transition-all">${track.title}</span>
                <span class="text-sm text-sage">${track.time}</span>
              </div>
            `).join('')}
          </div>
          <a class="btn-pill font-body tracking-wider" href="${page.albumFeature.cta.href}">${page.albumFeature.cta.label}</a>
        </div>
      </div>
    </section>
    <div class="divider-gradient max-w-4xl mx-auto"></div>
    <section class="py-24 md:py-32 px-6 bg-surface-container-low/50 editorial-divider">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16 md:mb-24 text-center reveal-up">
          <h2 class="font-headline text-4xl md:text-5xl mb-4">${page.shopFeature.heading}</h2>
          <p class="font-handwriting text-lg md:text-xl text-sage">${page.shopFeature.kicker}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          ${page.shopFeature.items.map((item, index) => `
            <div class="flex flex-col gap-8 ${index === 0 ? 'md:mt-16' : index === 2 ? 'md:-mt-8' : ''} group reveal-up" style="transition-delay:${index * 0.1}s">
              <div class="relative overflow-hidden aspect-[4/5] watercolor-edge bg-white/35 flex items-center justify-center">
                <span class="material-symbols-outlined text-[110px] text-lavender/50">${index === 0 ? 'album' : index === 1 ? 'radio' : 'shopping_bag'}</span>
              </div>
              <div class="text-center">
                <h4 class="font-headline text-2xl mb-1">${item.title}</h4>
                <p class="font-handwriting text-lavender">${item.subtitle}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function isItemActive(item, path) {
  if (path === item.href || path.startsWith(item.href)) return true;
  return (item.children || []).some(child => path === child.href || path.startsWith(child.href));
}

function navLink(item, path) {
  const active = isItemActive(item, path);
  const hasChildren = Array.isArray(item.children) && item.children.length;
  if (!hasChildren) {
    return `<a class="font-body text-sm ${active ? 'text-lavender' : 'text-on-surface'} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
  }

  const menuPositionClass = item.label === 'Muziek' || item.label === 'Music'
    ? 'left-0 translate-x-0'
    : 'left-1/2 -translate-x-1/2';

  return `
    <div class="relative group">
      <a class="font-body text-sm inline-flex items-center gap-2 ${active ? 'text-lavender' : 'text-on-surface'} hover:text-lavender transition-colors" href="${item.href}">
        <span>${item.label}</span>
        <span class="material-symbols-outlined text-base leading-none submenu-caret">expand_more</span>
      </a>
      <div class="absolute ${menuPositionClass} top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-300">
        <div class="min-w-[220px] rounded-[28px] border border-sage/15 bg-parchment/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(58,50,45,0.12)] px-5 py-5">
          <div class="flex flex-col gap-3">
            ${item.children.map(child => {
              const childActive = path === child.href || path.startsWith(child.href);
              return `<a class="font-body text-[13px] leading-relaxed ${childActive ? 'text-lavender' : 'text-on-surface-variant'} hover:text-lavender transition-colors" href="${child.href}">${child.label}</a>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function mobileNavLink(item, path) {
  const active = isItemActive(item, path);
  const hasChildren = Array.isArray(item.children) && item.children.length;
  if (!hasChildren) {
    return `<a class="font-body text-xl ${active ? 'text-lavender' : ''} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
  }

  return `
    <div class="mobile-subnav border-b border-sage/10 pb-5">
      <button class="mobile-subnav-toggle w-full flex items-center justify-between gap-4 text-left" type="button" aria-expanded="${active ? 'true' : 'false'}">
        <span class="font-body text-xl ${active ? 'text-lavender' : ''}">${item.label}</span>
        <span class="material-symbols-outlined text-xl text-on-surface-variant transition-transform duration-300 ${active ? 'rotate-180' : ''}">expand_more</span>
      </button>
      <div class="mobile-subnav-panel ${active ? '' : 'hidden'} pt-4 pl-4">
        <div class="flex flex-col gap-4">
          <a class="font-body text-sm uppercase tracking-[0.18em] ${path === item.href ? 'text-lavender' : 'text-on-surface-variant'} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>
          ${item.children.map(child => {
            const childActive = path === child.href || path.startsWith(child.href);
            return `<a class="font-body text-base ${childActive ? 'text-lavender' : 'text-on-surface-variant'} hover:text-lavender transition-colors" href="${child.href}">${child.label}</a>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderHero(page) {
  return `
    <section class="relative min-h-[80vh] sm:min-h-[40rem] md:min-h-screen px-4 md:px-6 pt-24 md:pt-28">
      <div class="absolute inset-x-0 top-24 md:top-28 bottom-0 z-0 flex items-start justify-center">
        <div class="w-[90%] sm:w-[88%] md:w-[82%] max-w-[1150px] h-[80vh] sm:h-[28rem] md:h-full arch-frame overflow-hidden opacity-60">
          <video class="block w-full h-full object-cover" autoplay muted loop playsinline preload="auto">
            <source src="https://ninalynn.nl/wp-content/uploads/2021/01/Slider_short.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div class="absolute inset-x-0 top-24 md:top-28 bottom-0 z-10 pointer-events-none flex justify-center">
        <div class="w-[90%] sm:w-[88%] md:w-[82%] max-w-[1150px] h-[80vh] sm:h-[28rem] md:h-full relative">
          ${renderHeroBloom('left')}
          ${renderHeroBloom('right')}
        </div>
      </div>
      <div class="relative z-10 text-center max-w-2xl mx-auto pt-24 sm:pt-28 md:pt-[18vh] px-4">
        ${page.eyebrow ? `<span class="font-handwriting text-lg md:text-2xl text-sage/80 block mb-4 md:mb-5">${page.eyebrow}</span>` : ''}
        <h1 class="font-headline text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-5"><span class="typewriter-anim typewriter-target" data-text="${escapeHtml(page.title || '')}"></span></h1>
        <p class="font-body italic text-on-surface-variant mb-6 md:mb-8 text-[11px] md:text-sm bg-parchment/75 backdrop-blur-sm px-4 md:px-5 py-3 rounded-sm inline-block max-w-[36rem]">
          ${page.intro || ''}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          ${(page.primaryCtas || []).map(cta => `<a class="btn-pill btn-pill-hero font-body text-[10px] uppercase tracking-[0.25em] px-7 py-3" href="${cta.href}">${cta.label}</a>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHeroBloom(side) {
  const sideClass = side === 'right'
    ? 'right-0 translate-x-[85%] md:translate-x-[92%]'
    : 'left-0 -translate-x-[85%] md:-translate-x-[92%]';
  const mirrored = side === 'right' ? '-scale-x-100' : '';
  return `
    <div class="hero-bloom-wrap absolute -bottom-[6px] ${sideClass} ${mirrored} origin-bottom pointer-events-none" data-side="${side}">
      <div class="relative w-[170px] md:w-[220px] h-[300px] md:h-[390px] overflow-visible">
        <svg class="hero-soil-svg absolute inset-x-0 -bottom-[6px] z-[14] w-full h-[5.1rem] md:h-[5.7rem] overflow-visible" viewBox="0 0 185 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g class="soil-bed">
            <path class="soil-fill" d="M2 50C18 47 31 45 46 43C63 41 80 42 97 39C118 35 138 28 183 18V56H2V50Z" fill="#83705D" fill-opacity="0.96"/>
            <path class="soil-fill-secondary" d="M3 54C22 50 37 48 55 47C72 46 88 48 105 45C128 41 148 34 181 26V56H3V54Z" fill="#685647" fill-opacity="0.84"/>
            <path class="soil-ridge" d="M2 50C18 47 31 45 46 43C63 41 80 42 97 39C118 35 138 28 183 18" stroke="#655345" stroke-opacity="0.9" stroke-width="1.9" stroke-linecap="round"/>
            <path class="soil-ridge" d="M13 47C29 45 42 43 56 43C72 43 87 45 102 43C123 39 143 34 171 25" stroke="#A7917A" stroke-opacity="0.34" stroke-width="0.95" stroke-linecap="round"/>
            <circle class="soil-speck" cx="24" cy="48" r="1.4" fill="#5D4A3C" fill-opacity="0.55"/>
            <circle class="soil-speck" cx="58" cy="46" r="1.2" fill="#5D4A3C" fill-opacity="0.46"/>
            <circle class="soil-speck" cx="86" cy="45" r="1.3" fill="#5D4A3C" fill-opacity="0.5"/>
            <circle class="soil-speck" cx="114" cy="41" r="1.15" fill="#5D4A3C" fill-opacity="0.44"/>
            <circle class="soil-speck" cx="143" cy="34" r="1.35" fill="#5D4A3C" fill-opacity="0.54"/>
          </g>
        </svg>
        <svg class="hero-bloom-svg absolute inset-x-0 bottom-[6px] z-10 w-full h-full overflow-visible" viewBox="0 0 185 330" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g class="grass-cluster" stroke="#8BA88E" stroke-linecap="round" opacity="0.75">
            <path class="grass-blade" d="M8 326C12 298 12 274 10 248C8 220 10 194 16 164" stroke-width="0.9"/>
            <path class="grass-blade" d="M16 326C22 286 26 246 34 198" stroke-width="1.1"/>
            <path class="grass-blade" d="M24 326C30 292 38 258 50 214" stroke-width="0.95"/>
            <path class="grass-blade" d="M34 326C36 270 46 224 54 174" stroke-width="1.1"/>
            <path class="grass-blade" d="M42 326C40 294 42 264 48 230C54 198 60 176 72 150" stroke-width="0.85"/>
            <path class="grass-blade" d="M52 326C58 286 64 248 74 206" stroke-width="1.05"/>
            <path class="grass-blade" d="M56 326C62 274 68 226 80 178" stroke-width="1.5"/>
            <path class="grass-blade" d="M66 326C74 296 82 264 94 228" stroke-width="0.9"/>
            <path class="grass-blade" d="M76 326C82 288 90 254 102 216" stroke-width="1"/>
            <path class="grass-blade" d="M82 326C90 278 104 232 118 186" stroke-width="1.2"/>
            <path class="grass-blade" d="M92 326C98 298 110 270 124 238" stroke-width="0.85"/>
            <path class="grass-blade" d="M102 326C112 286 126 246 142 210" stroke-width="1"/>
            <path class="grass-blade" d="M110 326C118 276 132 236 146 192" stroke-width="1.5"/>
            <path class="grass-blade" d="M122 326C134 292 146 260 158 226" stroke-width="0.95"/>
            <path class="grass-blade" d="M132 326C142 296 152 270 164 242" stroke-width="0.85"/>
            <path class="grass-blade" d="M136 326C144 280 156 246 170 208" stroke-width="1.1"/>
            <path class="grass-blade" d="M146 326C152 300 160 278 170 252" stroke-width="0.9"/>
            <path class="grass-blade" d="M156 326C164 294 172 266 180 238" stroke-width="0.8"/>
          </g>
          <g class="blooms" stroke-linecap="round" stroke-linejoin="round">
            <g class="bloom" transform="translate(22 326)">
              <path class="bloom-stem" d="M0 0C-1-42 4-84 15-122" stroke="#6E8C70" stroke-width="1.9"/>
              <path class="leaf" d="M9-58C18-55 22-49 21-41C13-43 9-49 9-58Z" fill="#B5C9B2" opacity="0.76"/>
              <g class="flower-head" transform="translate(15 -122)">
                <circle r="2.8" fill="#FFF8F0" stroke="#D8B65F" stroke-width="0.8"/>
                <circle cx="0" cy="-6" r="2.4" fill="#F2D57E"/>
                <circle cx="5.4" cy="-2.2" r="2.2" fill="#F5E6A0"/>
                <circle cx="3.5" cy="4.2" r="2.2" fill="#F2D57E"/>
                <circle cx="-3.5" cy="4.2" r="2.2" fill="#F5E6A0"/>
                <circle cx="-5.4" cy="-2.2" r="2.2" fill="#F2D57E"/>
              </g>
            </g>
            <g class="bloom" transform="translate(34 326)">
              <path class="bloom-stem" d="M0 0C0-52 5-103 16-148" stroke="#6E8C70" stroke-width="1.9"/>
              <path class="leaf" d="M7-74C16-70 20-63 19-54C11-56 7-63 7-74Z" fill="#AFC7AF" opacity="0.72"/>
              <g class="flower-head" transform="translate(16 -148)">
                <ellipse cx="0" cy="-9" rx="2.4" ry="7.2" fill="#B78CC5"/>
                <ellipse cx="0" cy="-5" rx="4" ry="6.5" fill="#A478B8"/>
                <path d="M-5 -13L-8 -5L-2 -7Z" fill="#8D6BA7"/>
                <path d="M5 -13L8 -5L2 -7Z" fill="#8D6BA7"/>
                <path d="M-6 -6L-9 1L-3 -1Z" fill="#9C79B2"/>
                <path d="M6 -6L9 1L3 -1Z" fill="#9C79B2"/>
                <path d="M0-16L2-10L-2-10Z" fill="#8D6BA7"/>
              </g>
            </g>
            <g class="bloom" transform="translate(44 326)">
              <path class="bloom-stem" d="M0 0C2-58 10-116 28-170" stroke="#6E8C70" stroke-width="2.2"/>
              <path class="leaf" d="M14-82C26-78 32-68 30-58C20-60 13-69 14-82Z" fill="#A8C0A8" opacity="0.8"/>
              <path class="leaf" d="M10-112C-2-108-8-98-6-88C4-90 10-99 10-112Z" fill="#A8C0A8" opacity="0.75"/>
              <g class="flower-head" transform="translate(28 -170)">
                <circle r="4.2" fill="#F8F2F7" stroke="#C9AED8" stroke-width="1"/>
                <path d="M0-14C5-10 6-4 0-1C-5-4-4-10 0-14Z" fill="#C5A3D1"/>
                <path d="M13-3C8 2 3 4 0-1C3-6 9-7 13-3Z" fill="#D7B8E2"/>
                <path d="M8 11C2 7 0 2 4-2C10 1 11 7 8 11Z" fill="#C5A3D1"/>
                <path d="M-8 11C-11 7 -10 1 -4-2C0 2 -2 7 -8 11Z" fill="#D7B8E2"/>
                <path d="M-13-3C-9-7 -3-6 0-1C-3 4 -8 2 -13-3Z" fill="#C5A3D1"/>
              </g>
            </g>
            <g class="bloom" transform="translate(66 326)">
              <path class="bloom-stem" d="M0 0C4-48 14-96 28-138" stroke="#6E8C70" stroke-width="2.1"/>
              <path class="leaf" d="M11-64C22-60 28-52 26-42C16-44 10-53 11-64Z" fill="#A8C0A8" opacity="0.78"/>
              <path class="leaf" d="M16-98C8-95 4-88 5-80C14-82 17-89 16-98Z" fill="#B8CDB4" opacity="0.72"/>
              <g class="flower-head" transform="translate(28 -138)">
                <circle r="3" fill="#FFF9FC" stroke="#D8BCD9" stroke-width="0.9"/>
                <ellipse cx="0" cy="-8" rx="2.4" ry="5.2" fill="#E9D8F3"/>
                <ellipse cx="6.4" cy="-2" rx="2.2" ry="4.8" transform="rotate(58 6.4 -2)" fill="#D3B2E5"/>
                <ellipse cx="4.5" cy="5.6" rx="2.1" ry="4.5" transform="rotate(120 4.5 5.6)" fill="#E9D8F3"/>
                <ellipse cx="-4.5" cy="5.6" rx="2.1" ry="4.5" transform="rotate(-120 -4.5 5.6)" fill="#D3B2E5"/>
                <ellipse cx="-6.4" cy="-2" rx="2.2" ry="4.8" transform="rotate(-58 -6.4 -2)" fill="#E9D8F3"/>
              </g>
            </g>
            <g class="bloom" transform="translate(74 326)">
              <path class="bloom-stem" d="M0 0C3-40 10-82 18-118" stroke="#6E8C70" stroke-width="1.8"/>
              <path class="leaf" d="M8-52C16-49 21-43 20-36C12-38 8-44 8-52Z" fill="#B8CDB4" opacity="0.74"/>
              <g class="flower-head" transform="translate(18 -118)">
                <circle r="2.1" fill="#FFF7FC" stroke="#CBA8D9" stroke-width="0.6"/>
                <circle cx="0" cy="-5.5" r="1.8" fill="#E6D2EE"/>
                <circle cx="4.8" cy="-1.5" r="1.6" fill="#D6B7E2"/>
                <circle cx="3.1" cy="4.1" r="1.6" fill="#E6D2EE"/>
                <circle cx="-3.1" cy="4.1" r="1.6" fill="#D6B7E2"/>
                <circle cx="-4.8" cy="-1.5" r="1.6" fill="#E6D2EE"/>
              </g>
            </g>
            <g class="bloom" transform="translate(86 326)">
              <path class="bloom-stem" d="M0 0C6-74 20-142 46-212" stroke="#6E8C70" stroke-width="2.8"/>
              <path class="leaf" d="M19-104C34-100 42-88 39-76C26-80 18-91 19-104Z" fill="#A8C0A8" opacity="0.82"/>
              <path class="leaf" d="M26-150C12-146 6-132 8-120C21-124 27-136 26-150Z" fill="#A8C0A8" opacity="0.76"/>
              <path class="leaf" d="M31-182C44-177 49-165 45-153C33-157 29-169 31-182Z" fill="#B8CDB4" opacity="0.7"/>
              <g class="flower-head" transform="translate(46 -212)">
                <circle r="5.4" fill="#F8F2F7" stroke="#C9AED8" stroke-width="1"/>
                <path d="M0-18C6-12 8-5 0-1C-6-5-5-12 0-18Z" fill="#C5A3D1"/>
                <path d="M16-5C11 2 4 4 0-1C5-8 12-9 16-5Z" fill="#DFC3EA"/>
                <path d="M12 13C4 10 1 4 5-1C13 1 15 8 12 13Z" fill="#C5A3D1"/>
                <path d="M0 19C5 12 5 5 0 1C-5 5-5 12 0 19Z" fill="#E8D2F0"/>
                <path d="M-12 13C-15 8 -13 1 -5-1C-1 4 -4 10 -12 13Z" fill="#C5A3D1"/>
                <path d="M-16-5C-12-9 -5-8 0-1C-4 4 -11 2 -16-5Z" fill="#DFC3EA"/>
              </g>
            </g>
            <g class="bloom" transform="translate(96 326)">
              <path class="bloom-stem" d="M0 0C2-62 7-122 12-176" stroke="#6E8C70" stroke-width="1.8"/>
              <path class="leaf" d="M5-82C15-78 21-70 20-61C11-63 6-71 5-82Z" fill="#AFC7AF" opacity="0.7"/>
              <g class="flower-head" transform="translate(12 -176)">
                <path d="M0 -3C7 -15 17 -14 19 -5C15 1 9 5 5 7C0 6 -4 1 -7 -5C-5 -12 3 -13 0 -3Z" fill="#C9828C"/>
                <path d="M0 -3C4 -17 -5 -20 -12 -10C-12 -1 -7 4 -2 8C2 7 5 2 6 -1Z" fill="#D99CA5"/>
                <path d="M2 1C9 -5 17 1 14 10C7 14 0 14 -5 10C-3 5 -1 3 2 1Z" fill="#C46F7E"/>
                <path d="M-1 2C-8 -4 -16 0 -14 9C-8 14 -1 14 4 10C3 6 2 4 -1 2Z" fill="#D6A5AE"/>
                <circle cx="0" cy="0" r="2.2" fill="#4C3C37"/>
              </g>
            </g>
            <g class="bloom" transform="translate(108 326)">
              <path class="bloom-stem" d="M0 0C2-54 10-102 24-148" stroke="#6E8C70" stroke-width="2"/>
              <path class="leaf" d="M10-70C19-66 25-59 24-50C15-52 10-59 10-70Z" fill="#AFC7AF" opacity="0.78"/>
              <g class="flower-head" transform="translate(24 -148)">
                <circle r="2.4" fill="#FFF7FB" stroke="#CBA8D9" stroke-width="0.7"/>
                <ellipse cx="0" cy="-7" rx="1.8" ry="5.1" fill="#DDB7E6"/>
                <ellipse cx="5.2" cy="-3.5" rx="1.8" ry="4.6" transform="rotate(38 5.2 -3.5)" fill="#EAD2F0"/>
                <ellipse cx="6.1" cy="2.3" rx="1.8" ry="4.3" transform="rotate(78 6.1 2.3)" fill="#DDB7E6"/>
                <ellipse cx="2.7" cy="7" rx="1.7" ry="4" transform="rotate(138 2.7 7)" fill="#EAD2F0"/>
                <ellipse cx="-2.7" cy="7" rx="1.7" ry="4" transform="rotate(-138 -2.7 7)" fill="#DDB7E6"/>
                <ellipse cx="-6.1" cy="2.3" rx="1.8" ry="4.3" transform="rotate(-78 -6.1 2.3)" fill="#EAD2F0"/>
                <ellipse cx="-5.2" cy="-3.5" rx="1.8" ry="4.6" transform="rotate(-38 -5.2 -3.5)" fill="#DDB7E6"/>
              </g>
            </g>
            <g class="bloom" transform="translate(120 326)">
              <path class="bloom-stem" d="M0 0C4-44 14-88 30-132" stroke="#6E8C70" stroke-width="1.95"/>
              <path class="leaf" d="M14-60C23-58 30-51 29-42C20-43 14-50 14-60Z" fill="#B7CCB4" opacity="0.74"/>
              <g class="flower-head" transform="translate(30 -132)">
                <path d="M0-12L3-6L9-8L6-2L12 1L6 3L8 9L2 6L-1 12L-4 6L-10 8L-7 2L-13-1L-7-3L-9-9L-3-6Z" fill="#8E69A8"/>
                <circle r="3.1" fill="#B793C8"/>
                <circle r="1.5" fill="#EEE3F1"/>
              </g>
            </g>
            <g class="bloom" transform="translate(132 326)">
              <path class="bloom-stem" d="M0 0C4-58 16-108 34-152" stroke="#6E8C70" stroke-width="2.2"/>
              <path class="leaf" d="M16-78C28-76 34-67 33-57C22-58 15-67 16-78Z" fill="#A8C0A8" opacity="0.8"/>
              <path class="leaf" d="M22-116C11-112 6-102 8-92C19-95 23-104 22-116Z" fill="#B9CFB6" opacity="0.72"/>
              <g class="flower-head" transform="translate(34 -152)">
                <circle r="3.8" fill="#F8F2F7" stroke="#C9AED8" stroke-width="0.9"/>
                <path d="M0-11C4-8 4-3 0-1C-4-3-3-8 0-11Z" fill="#D7B8E2"/>
                <path d="M10 0C6 3 3 3 1 0C3-3 6-3 10 0Z" fill="#C5A3D1"/>
                <path d="M0 11C4 8 4 3 0 1C-4 3-4 8 0 11Z" fill="#E8D2F0"/>
                <path d="M-10 0C-6 3 -3 3 -1 0C-3-3 -6-3 -10 0Z" fill="#C5A3D1"/>
              </g>
            </g>
            <g class="bloom" transform="translate(154 326)">
              <path class="bloom-stem" d="M0 0C3-46 12-88 24-126" stroke="#6E8C70" stroke-width="1.9"/>
              <path class="leaf" d="M9-60C18-57 23-50 22-42C14-43 9-50 9-60Z" fill="#AFC7AF" opacity="0.76"/>
              <g class="flower-head" transform="translate(24 -126)">
                <circle r="2.6" fill="#FFF7F0" stroke="#D9C094" stroke-width="0.8"/>
                <circle cx="0" cy="-7" r="2.3" fill="#F7E2A4"/>
                <circle cx="6" cy="-1.5" r="2.1" fill="#F1D07A"/>
                <circle cx="3.6" cy="5.2" r="2.1" fill="#F7E2A4"/>
                <circle cx="-3.6" cy="5.2" r="2.1" fill="#F1D07A"/>
                <circle cx="-6" cy="-1.5" r="2.1" fill="#F7E2A4"/>
              </g>
            </g>
            <g class="bloom" transform="translate(166 326)">
              <path class="bloom-stem" d="M0 0C2-38 8-74 14-108" stroke="#6E8C70" stroke-width="1.7"/>
              <path class="leaf" d="M5-48C12-45 16-40 15-33C8-35 5-40 5-48Z" fill="#B8CDB4" opacity="0.7"/>
              <g class="flower-head" transform="translate(14 -108)">
                <circle r="1.9" fill="#FFF7FA" stroke="#D7B6D8" stroke-width="0.6"/>
                <circle cx="0" cy="-4.8" r="1.5" fill="#E8D6EE"/>
                <circle cx="4.2" cy="-1.2" r="1.4" fill="#D6B9E2"/>
                <circle cx="2.6" cy="3.6" r="1.4" fill="#E8D6EE"/>
                <circle cx="-2.6" cy="3.6" r="1.4" fill="#D6B9E2"/>
                <circle cx="-4.2" cy="-1.2" r="1.4" fill="#E8D6EE"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
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
          <span class="font-handwriting text-lavender block text-lg md:text-xl mb-2">${first.kicker || (lang === 'nl' ? 'Hoofdstuk' : 'Chapter')}</span>
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
          <span class="font-handwriting text-sage block text-lg md:text-xl mb-2">${second.kicker || (lang === 'nl' ? 'Verder' : 'Further')}</span>
          <h2 class="font-headline text-4xl md:text-5xl mb-4">${second.heading || ''}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          ${(second.cards || []).map((card, index) => `
            <div class="flex flex-col gap-8 ${index === 0 ? 'md:mt-16' : index === 2 ? 'md:-mt-8' : ''} group reveal-up" style="transition-delay:${index * 0.1}s">
              <div class="relative overflow-hidden aspect-[4/5] watercolor-edge bg-white/50 flex items-center justify-center">
                <span class="material-symbols-outlined text-[96px] ${index % 2 === 0 ? 'text-lavender/60' : 'text-sage/60'}">${index === 0 ? 'album' : index === 1 ? 'radio' : 'call_made'}</span>
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
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu || !overlayBg || !mobileOverlay) return;
    mobileMenu.classList.remove('open');
    overlayBg.style.opacity = '0';
    overlayBg.classList.add('pointer-events-none');
    mobileOverlay.classList.add('pointer-events-none');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && menuClose && mobileMenu && overlayBg) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlayBg.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  mobileMenu?.querySelectorAll('.mobile-subnav-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const wrapper = toggle.closest('.mobile-subnav');
      const panel = wrapper?.querySelector('.mobile-subnav-panel');
      const icon = toggle.querySelector('.material-symbols-outlined');
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      panel?.classList.toggle('hidden', isOpen);
      icon?.classList.toggle('rotate-180', !isOpen);
    });
  });

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

  initTypewriters();
  initHeroBlooms();
}

function initTypewriters() {
  const targets = document.querySelectorAll('.typewriter-target');
  targets.forEach((el, index) => {
    const text = el.dataset.text || '';
    el.textContent = '';
    let cursor = 0;

    const typeNext = () => {
      if (cursor <= text.length) {
        el.textContent = text.slice(0, cursor);
        cursor += 1;
        const currentChar = text.charAt(cursor - 1);
        let delay = 110 + Math.floor(Math.random() * 70);
        if (cursor === 1) delay = 280;
        if (currentChar === ' ') delay += 130;
        if (/[.,!?]/.test(currentChar)) delay += 90;
        window.setTimeout(typeNext, delay);
      }
    };

    window.setTimeout(typeNext, index * 120);
  });
}

function initHeroBlooms() {
  ensureGsap().then((gsapInstance) => {
    if (!gsapInstance) return;

    const soilLayers = document.querySelectorAll('.hero-soil-svg');
    if (soilLayers.length) {
      gsapInstance.set(soilLayers, {
        y: 18,
        opacity: 0
      });
      gsapInstance.to(soilLayers, {
        y: 0,
        opacity: 1,
        duration: 1.15,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }

    document.querySelectorAll('.hero-bloom-svg').forEach((svg, index) => {
      const tl = gsapInstance.timeline({ delay: 0.75 + index * 0.18 });
      const grasses = svg.querySelectorAll('.grass-blade');
      const blooms = svg.querySelectorAll('.bloom');
      const stems = svg.querySelectorAll('.bloom-stem');
      const leaves = svg.querySelectorAll('.leaf');
      const flowerHeads = svg.querySelectorAll('.flower-head');

      grasses.forEach(preparePathGrowth);
      stems.forEach(preparePathGrowth);
      gsapInstance.set(leaves, {
        transformOrigin: 'bottom center',
        scale: 0.15,
        opacity: 0
      });
      gsapInstance.set(flowerHeads, {
        transformOrigin: 'center center',
        scale: 0.15,
        opacity: 0
      });

      tl.to(grasses, {
        strokeDashoffset: 0,
        opacity: 0.9,
        duration: 1.55,
        stagger: 0.06,
        ease: 'power1.inOut'
      }).to(stems, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.25,
        stagger: 0.12,
        ease: 'power1.inOut'
      }, '-=0.72').to(leaves, {
        scale: 1,
        opacity: 0.82,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power1.out'
      }, '-=0.92').to(flowerHeads, {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'back.out(1.5)'
      }, '-=0.18').add(() => {
        grasses.forEach((blade, bladeIndex) => {
          gsapInstance.to(blade, {
            rotation: bladeIndex % 3 === 0 ? 2.2 : bladeIndex % 2 === 0 ? 1.4 : -1.8,
            duration: 3.2 + bladeIndex * 0.07,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center'
          });
        });

        blooms.forEach((bloom, bloomIndex) => {
          gsapInstance.to(bloom, {
            rotation: bloomIndex % 2 === 0 ? 1.4 : -1.2,
            duration: 3.8 + bloomIndex * 0.16,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center'
          });
        });

        leaves.forEach((leaf, leafIndex) => {
          gsapInstance.to(leaf, {
            rotation: leafIndex % 2 === 0 ? 3.2 : -2.8,
            duration: 2.9 + leafIndex * 0.08,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center'
          });
        });
      });
    });
  });
}

function preparePathGrowth(path) {
  if (!path || typeof path.getTotalLength !== 'function') return;
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.style.opacity = '1';
}

function ensureGsap() {
  if (window.gsap) return Promise.resolve(window.gsap);
  if (window.__ninaGsapPromise) return window.__ninaGsapPromise;

  window.__ninaGsapPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    script.onload = () => resolve(window.gsap);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return window.__ninaGsapPromise;
}
