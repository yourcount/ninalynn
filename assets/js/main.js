/* ====================================================
   Nina Lynn — content-driven renderer
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
      <nav class="max-w-[1600px] mx-auto px-6 md:px-16 py-6 flex items-center justify-between">
        <div class="hidden md:flex gap-10 items-center flex-1">
          ${menu.slice(0, 3).map(item => navLink(item, path)).join('')}
        </div>
        <div class="flex-none flex justify-center items-center gap-4">
          <a href="/${lang}/" class="font-headline text-xl md:text-2xl tracking-[0.18em] uppercase text-on-surface hover:text-lavender transition-colors">Nina Lynn</a>
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
          &copy; Nina Lynn. Hand-annotated in the Botanical Archive.
        </div>
      </div>
    </footer>
  `;
}

function renderHome(page, lang) {
  return `
    ${renderHero(page)}
    <div class="w-48 mx-auto divider-motif my-0"></div>
    <section class="py-24 md:py-32 px-6 max-w-5xl mx-auto relative">
      <div class="absolute -left-10 top-0 opacity-15 hidden lg:block botanical-float pointer-events-none">
        <span class="material-symbols-outlined text-8xl text-sage">local_florist</span>
      </div>
      <div class="reveal-up">
        <div class="mb-16 md:mb-20 text-center relative">
          <span class="font-handwriting text-lavender block text-lg md:text-xl mb-2">${page.tour.kicker}</span>
          <h2 class="font-headline text-3xl md:text-4xl text-on-surface">${page.tour.heading}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-0 border-y border-sage/20">
          <div class="hidden md:contents font-handwriting text-sage text-xs">
            <div class="md:col-span-3 py-4 border-r border-sage/15 px-6">${lang === 'nl' ? 'Datum' : 'Date'}</div>
            <div class="md:col-span-5 py-4 border-r border-sage/15 px-6">${lang === 'nl' ? 'Locatie' : 'Venue'}</div>
            <div class="md:col-span-4 py-4 px-6 text-right">${lang === 'nl' ? 'Toegang' : 'Access'}</div>
          </div>
          ${page.tour.rows.map(row => `
            <div class="md:col-span-12 group hover:bg-sage/5 transition-colors grid grid-cols-1 md:grid-cols-12 items-center border-t border-sage/15">
              <div class="md:col-span-3 pt-8 md:py-8 px-6 md:border-r border-sage/15">
                <span class="font-body text-xs text-sage block tracking-widest">${row.date}</span>
              </div>
              <div class="md:col-span-5 px-6 py-2 md:py-8 md:border-r border-sage/15">
                <h3 class="font-headline text-2xl">${row.venue}</h3>
                <p class="font-handwriting text-sm text-on-surface-variant">${row.location}</p>
              </div>
              <div class="md:col-span-4 pb-8 md:py-8 px-6 flex md:justify-end">
                <a class="btn-ghost font-body" href="${row.href}">${row.cta}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="w-48 mx-auto divider-motif mt-24"></div>
    </section>
    <section class="py-24 md:py-40 relative overflow-hidden">
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
    <section class="py-24 md:py-32 px-6 bg-surface-container-low/50">
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

function navLink(item, path) {
  const active = path === item.href;
  return `<a class="font-body text-sm ${active ? 'text-lavender' : 'text-on-surface'} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
}

function mobileNavLink(item, path) {
  const active = path === item.href;
  return `<a class="font-body text-xl ${active ? 'text-lavender' : ''} hover:text-lavender transition-colors" href="${item.href}">${item.label}</a>`;
}

function renderHero(page) {
  return `
    <section class="relative min-h-screen px-6 pt-28">
      <div class="absolute inset-x-0 top-28 bottom-0 z-0 flex items-start justify-center">
        <div class="w-[82%] max-w-[1150px] h-full arch-frame overflow-hidden opacity-60">
          <video class="block w-full h-full object-cover" autoplay muted loop playsinline preload="auto">
            <source src="https://ninalynn.nl/wp-content/uploads/2021/01/Slider_short.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div class="relative z-10 text-center max-w-2xl mx-auto pt-[18vh]">
        ${page.eyebrow ? `<span class="font-handwriting text-xl md:text-2xl text-sage/80 block mb-5">${page.eyebrow}</span>` : ''}
        <h1 class="font-headline text-5xl md:text-7xl mb-5"><span class="typewriter-anim">${page.title || ''}</span></h1>
        <p class="font-body italic text-on-surface-variant mb-8 text-xs md:text-sm bg-parchment/75 backdrop-blur-sm px-5 py-3 rounded-sm inline-block max-w-[36rem]">
          ${page.intro || ''}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          ${(page.primaryCtas || []).map(cta => `<a class="btn-pill font-body text-[10px] uppercase tracking-[0.25em] px-7 py-3" href="${cta.href}">${cta.label}</a>`).join('')}
        </div>
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
