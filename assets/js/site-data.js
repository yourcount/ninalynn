window.NINA_SITE_DATA = {
  bandsintown: {
    artist: 'NinaLynn',
    appId: '0771e1a17bf250a1117c0f015a3150c8'
  },
  socialLinks: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/musicbyninalynn/',
      icon: 'photo_camera'
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/musicbyninalynn',
      icon: 'thumb_up'
    },
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/artist/7wnvfXHe1D6Hw2wBNJeiSO?si=_t79oTI9SvK9hVtjMYtJSA',
      icon: 'album'
    }
  ],
  menus: {
    nl: [
      {
        label: 'Muziek',
        href: '/nl/muziek/',
        children: [
          { label: 'Albums', href: '/nl/muziek/albums/a-taste-of-the-wild/' },
          { label: 'Live-opnames', href: '/nl/muziek/live-opnames/' },
          { label: 'Songteksten', href: '/nl/muziek/albums/a-taste-of-the-wild/songteksten/' }
        ]
      },
      {
        label: 'Live',
        href: '/nl/live/',
        children: [
          { label: 'Agenda', href: '/nl/live/agenda/' },
          { label: 'Boekingen', href: '/nl/live/boekingen/' },
          { label: 'Bruiloften', href: '/nl/live/bruiloften/' }
        ]
      },
      {
        label: 'Lessen',
        href: '/nl/lessen/',
        children: [
          { label: 'Zangles', href: '/nl/lessen/zangles/' },
          { label: 'Songwriting', href: '/nl/lessen/songwriting/' }
        ]
      },
      {
        label: 'Over',
        href: '/nl/over/',
        children: [
          { label: 'Bio', href: '/nl/over/bio/' },
          { label: 'Band', href: '/nl/over/band/' },
          { label: 'Pers', href: '/nl/over/pers/' }
        ]
      },
      { label: 'Shop', href: '/nl/shop/' },
      { label: 'Contact', href: '/nl/contact/' }
    ],
    en: [
      {
        label: 'Music',
        href: '/en/music/',
        children: [
          { label: 'Albums', href: '/en/music/albums/a-taste-of-the-wild/' },
          { label: 'Live sessions', href: '/en/music/live-sessions/' },
          { label: 'Lyrics', href: '/en/music/albums/a-taste-of-the-wild/lyrics/' }
        ]
      },
      {
        label: 'Live',
        href: '/en/live/',
        children: [
          { label: 'Gigs', href: '/en/live/gigs/' },
          { label: 'Bookings', href: '/en/live/bookings/' },
          { label: 'Weddings', href: '/en/live/weddings/' }
        ]
      },
      {
        label: 'Lessons',
        href: '/en/lessons/',
        children: [
          { label: 'Vocal coaching', href: '/en/lessons/vocal-coaching/' },
          { label: 'Songwriting', href: '/en/lessons/songwriting/' }
        ]
      },
      {
        label: 'About',
        href: '/en/about/',
        children: [
          { label: 'Bio', href: '/en/about/bio/' },
          { label: 'Band', href: '/en/about/band/' },
          { label: 'Press', href: '/en/about/press/' }
        ]
      },
      { label: 'Shop', href: '/en/shop/' },
      { label: 'Contact', href: '/en/contact/' }
    ]
  },
  footers: {
    nl: [
      { label: 'Nieuwsbrief', href: '#newsletter-signup' },
      { label: 'Contact', href: '/nl/contact/' },
      { label: 'Privacy', href: '/nl/privacy/' },
      { label: 'Voorwaarden', href: '/nl/voorwaarden/' }
    ],
    en: [
      { label: 'Newsletter', href: '#newsletter-signup' },
      { label: 'Contact', href: '/en/contact/' },
      { label: 'Privacy', href: '/en/privacy/' },
      { label: 'Terms', href: '/en/terms/' }
    ]
  },
  pages: {
    '/nl/': {
      lang: 'nl',
      switchHref: '/en/',
      switchLabel: 'EN',
      homeLayout: true,
      eyebrow: '',
      title: 'To Flower',
      intro: '/tə ˈflou-ər/ (verb) 1. Opbloeien; je ontpoppen tot je beste zelf.',
      primaryCtas: [
        { label: 'Luister het Album', href: '/nl/muziek/albums/a-taste-of-the-wild/' }
      ],
      tour: {
        kicker: 'De Agenda',
        heading: 'Live Optredens',
        rows: [
          { date: '12 MEI 2024', venue: 'Paradiso', location: 'Amsterdam, NL', cta: 'Tickets', href: '/nl/live/agenda/' },
          { date: '15 MEI 2024', venue: 'TivoliVredenburg', location: 'Utrecht, NL', cta: 'Tickets', href: '/nl/live/agenda/' },
          { date: '18 MEI 2024', venue: 'Doornroosje', location: 'Nijmegen, NL', cta: 'Tickets', href: '/nl/live/agenda/' }
        ]
      },
      albumFeature: {
        kicker: 'Nieuw Album',
        heading: 'Uitgelicht: To Flower',
        text: 'Dit album vertelt het verhaal van een stille knop die de moed vindt om zich te openen voor het zonlicht. Elke track is een hand-geannoteerde herinnering aan de seizoenen van het leven, gevangen in akoestische klanken en zachte poëzie.',
        tracks: [
          { title: '1. Ontwaken', time: '04:12' },
          { title: '2. Wilde Hyacint', time: '03:45' },
          { title: '3. Gouden Uur', time: '05:02' }
        ],
        cta: { label: 'Bestel op Vinyl', href: '/nl/shop/' }
      },
      shopFeature: {
        heading: 'De Curio Shop',
        kicker: 'Verzamelstukken uit de botanische tuin.',
        items: [
          {
            title: 'A Taste of the Wild',
            subtitle: 'LP • €30.00',
            text: 'Het album op vinyl, om de songs warm en tastbaar mee naar huis te nemen.',
            href: '/nl/shop/',
            cta: 'Bekijk in shop',
            image: '/assets/img/shop/a-taste-of-the-wild.jpg',
            alt: 'A Taste of the Wild albumcover'
          },
          {
            title: 'Hummingbird',
            subtitle: 'LP • €30.00',
            text: 'Een lichte, bloemrijke hoes met dezelfde zachte spanning als de plaat zelf.',
            href: '/nl/shop/',
            cta: 'Bekijk in shop',
            image: '/assets/img/shop/hummingbird.jpg',
            alt: 'Hummingbird albumcover'
          },
          {
            title: 'Linnen Tas',
            subtitle: 'Merch • €20.00',
            text: 'De tote met kolibrie-illustratie als klein draagbaar stukje NinaLynn-archief.',
            href: '/nl/shop/',
            cta: 'Bekijk in shop',
            image: '/assets/img/shop/linen-tote.jpg',
            alt: 'NinaLynn linnen tas met hummingbird illustratie'
          }
        ]
      }
    },
    '/en/': {
      lang: 'en',
      switchHref: '/nl/',
      switchLabel: 'NL',
      homeLayout: true,
      eyebrow: '',
      title: 'To Flower',
      intro: '/tə ˈflou-ər/ (verb) 1. To bloom; to unfold into your truest form.',
      primaryCtas: [
        { label: 'Listen to the Album', href: '/en/music/albums/a-taste-of-the-wild/' }
      ],
      tour: {
        kicker: 'The Diary',
        heading: 'Live Performances',
        rows: [
          { date: '12 MAY 2024', venue: 'Paradiso', location: 'Amsterdam, NL', cta: 'Tickets', href: '/en/live/gigs/' },
          { date: '15 MAY 2024', venue: 'TivoliVredenburg', location: 'Utrecht, NL', cta: 'Tickets', href: '/en/live/gigs/' },
          { date: '18 MAY 2024', venue: 'Doornroosje', location: 'Nijmegen, NL', cta: 'Tickets', href: '/en/live/gigs/' }
        ]
      },
      albumFeature: {
        kicker: 'New Album',
        heading: 'Featured: To Flower',
        text: 'This record tells the story of a quiet bud finding the courage to open toward sunlight. Each song is a hand-annotated memory of changing seasons, held in acoustic textures and soft poetry.',
        tracks: [
          { title: '1. Awakening', time: '04:12' },
          { title: '2. Wild Hyacinth', time: '03:45' },
          { title: '3. Golden Hour', time: '05:02' }
        ],
        cta: { label: 'Order on Vinyl', href: '/en/shop/' }
      },
      shopFeature: {
        heading: 'The Curio Shop',
        kicker: 'Collected pieces from the botanical archive.',
        items: [
          {
            title: 'A Taste of the Wild',
            subtitle: 'LP • €30.00',
            text: 'The vinyl edition for taking the songs home in their warmest physical form.',
            href: '/en/shop/',
            cta: 'View in shop',
            image: '/assets/img/shop/a-taste-of-the-wild.jpg',
            alt: 'A Taste of the Wild album cover'
          },
          {
            title: 'Hummingbird',
            subtitle: 'LP • €30.00',
            text: 'A floral sleeve that carries the same soft tension and glow as the record itself.',
            href: '/en/shop/',
            cta: 'View in shop',
            image: '/assets/img/shop/hummingbird.jpg',
            alt: 'Hummingbird album cover'
          },
          {
            title: 'Linen Tote',
            subtitle: 'Merch • €20.00',
            text: 'A hummingbird tote: a small portable fragment of the NinaLynn archive.',
            href: '/en/shop/',
            cta: 'View in shop',
            image: '/assets/img/shop/linen-tote.jpg',
            alt: 'NinaLynn linen tote with hummingbird illustration'
          }
        ]
      }
    },
    '/nl/muziek/': {
      lang: 'nl',
      switchHref: '/en/music/',
      switchLabel: 'EN',
      eyebrow: 'Muziek',
      title: 'Luister tussen schemerlicht, papier en zachte snaren.',
      intro: 'Hier leven albums, live-opnames, songteksten en pers samen als één muzikale wereld. Begin bij een plaat, dwaal via de teksten verder en eindig desnoods in de shop of vooraan bij een show.',
      primaryCtas: [
        { label: 'A Taste of the Wild', href: '/nl/muziek/albums/a-taste-of-the-wild/' },
        { label: 'Bekijk live-opnames', href: '/nl/muziek/live-opnames/' },
        { label: 'Koop muziek', href: '/nl/shop/' }
      ],
      sections: [
        {
          kicker: 'Albums',
          heading: 'Platen om in te verdwijnen',
          cards: [
            { title: 'A Taste of the Wild', text: 'Een open veld vol beweging, instinct en rafelranden. De songs zoeken steeds het spanningsveld tussen nabijheid en vrijheid.', href: '/nl/muziek/albums/a-taste-of-the-wild/', cta: 'Open album' },
            { title: 'Hummingbird', text: 'Lichter van kleur, maar rusteloos van hart. Een verzameling songs over verlangen, snelheid en het moment vlak voor stilte.', href: '/nl/muziek/albums/hummingbird/', cta: 'Bekijk Hummingbird' },
            { title: 'Imaginations', text: 'Vroege schetsen, droombeelden en melodieën die nog steeds hun eigen schaduw meedragen.', href: '/nl/muziek/albums/imaginations/', cta: 'Ga naar Imaginations' }
          ]
        },
        {
          kicker: 'Verder luisteren',
          heading: 'Van plaat naar podium',
          cards: [
            { title: 'Live-opnames', text: 'Luister hoe de songs ademen wanneer ze loskomen van de studio en hun weg vinden naar zaal en publiek.', href: '/nl/muziek/live-opnames/', cta: 'Bekijk live-opnames' },
            { title: 'Agenda', text: 'Vind de eerstvolgende avond waarop de muziek uit papier en hout de ruimte in beweegt.', href: '/nl/live/agenda/', cta: 'Bekijk agenda' },
            { title: 'Shop', text: 'Vinyl, cd’s en kleine voorwerpen om een stukje van het archief mee naar huis te nemen.', href: '/nl/shop/', cta: 'Naar de shop' }
          ]
        }
      ]
    },
    '/en/music/': {
      lang: 'en',
      switchHref: '/nl/muziek/',
      switchLabel: 'NL',
      eyebrow: 'Music',
      title: 'Listen among dusk, paper and softly ringing strings.',
      intro: 'Albums, live sessions, lyrics and press live together here as one musical world. Begin with a record, wander into the words, and end in the shop or at the front of a room.',
      primaryCtas: [
        { label: 'A Taste of the Wild', href: '/en/music/albums/a-taste-of-the-wild/' },
        { label: 'Live sessions', href: '/en/music/live-sessions/' },
        { label: 'Shop music', href: '/en/shop/' }
      ],
      sections: [
        {
          kicker: 'Albums',
          heading: 'Records to disappear into',
          cards: [
            { title: 'A Taste of the Wild', text: 'An open field of movement, instinct and rough edges. These songs live in the tension between nearness and freedom.', href: '/en/music/albums/a-taste-of-the-wild/', cta: 'Open album' },
            { title: 'Hummingbird', text: 'Lighter in color, restless at heart. A collection about desire, velocity and the instant before stillness.', href: '/en/music/albums/hummingbird/', cta: 'View Hummingbird' },
            { title: 'Imaginations', text: 'Early sketches, dream fragments and melodies that still carry their own shadow.', href: '/en/music/albums/imaginations/', cta: 'Go to Imaginations' }
          ]
        },
        {
          kicker: 'Keep listening',
          heading: 'From record to room',
          cards: [
            { title: 'Live sessions', text: 'Hear how the songs breathe once they leave the studio and settle into a room.', href: '/en/music/live-sessions/', cta: 'Watch sessions' },
            { title: 'Gigs', text: 'Find the next evening when these songs step out into air and audience.', href: '/en/live/gigs/', cta: 'See gigs' },
            { title: 'Shop', text: 'Vinyl, cds and small pieces from the archive to carry home.', href: '/en/shop/', cta: 'Enter shop' }
          ]
        }
      ]
    },
    '/nl/live/': {
      lang: 'nl',
      switchHref: '/en/live/',
      switchLabel: 'EN',
      eyebrow: 'Live',
      title: 'Muziek die groeit zodra er publiek in de ruimte komt.',
      intro: 'Voor podia, kleine zalen, luisteravonden en gasten die niet alleen iets willen horen, maar iets willen voelen. Vanuit hier kun je de agenda bekijken, een optreden boeken of verder naar bruiloften.',
      primaryCtas: [
        { label: 'Bekijk agenda', href: '/nl/live/agenda/' },
        { label: 'Boek een optreden', href: '/nl/live/boekingen/' },
        { label: 'Bruiloften', href: '/nl/live/bruiloften/' }
      ],
      sections: [
        {
          kicker: 'Op het podium',
          heading: 'Klein, intiem of ruim ademend',
          cards: [
            { title: 'Luistershows', text: 'Voor plekken waar tekst en stilte net zo belangrijk zijn als het applaus dat daarna komt.', href: '/nl/live/agenda/', cta: 'Bekijk shows' },
            { title: 'Culturele programmering', text: 'Een set die moeiteloos tussen singer-songwriter, indie folk en verhalende avondprogrammering beweegt.', href: '/nl/live/boekingen/', cta: 'Boekingen' },
            { title: 'Private events', text: 'Ook voor huiskamers, diners en andere kleine settings waar sfeer het tempo bepaalt.', href: '/nl/live/bruiloften/', cta: 'Bekijk mogelijkheden' }
          ]
        }
      ]
    },
    '/en/live/': {
      lang: 'en',
      switchHref: '/nl/live/',
      switchLabel: 'NL',
      eyebrow: 'Live',
      title: 'Songs that widen the moment once an audience enters the room.',
      intro: 'For listening rooms, small venues, cultural programs and gatherings that ask for atmosphere rather than noise. Start here with gigs, bookings or weddings.',
      primaryCtas: [
        { label: 'See gigs', href: '/en/live/gigs/' },
        { label: 'Book a performance', href: '/en/live/bookings/' },
        { label: 'Weddings', href: '/en/live/weddings/' }
      ],
      sections: [
        {
          kicker: 'On stage',
          heading: 'Intimate, spacious and close to the skin',
          cards: [
            { title: 'Listening shows', text: 'For rooms where words and silence matter just as much as the applause afterward.', href: '/en/live/gigs/', cta: 'See shows' },
            { title: 'Cultural programming', text: 'A set moving easily between singer-songwriter, indie folk and story-led evenings.', href: '/en/live/bookings/', cta: 'Bookings' },
            { title: 'Private events', text: 'Also suited to dinners, homes and smaller settings where atmosphere sets the pace.', href: '/en/live/weddings/', cta: 'View options' }
          ]
        }
      ]
    },
    '/nl/lessen/': {
      lang: 'nl',
      switchHref: '/en/lessons/',
      switchLabel: 'EN',
      eyebrow: 'Lessen',
      title: 'Stem, tekst en vertrouwen mogen hier langzaam openvouwen.',
      intro: 'Voor wie dichter bij de eigen stem wil komen, een lied wil leren schrijven of meer vrijheid zoekt in klank en presentatie. Kies hieronder de vorm die het beste past.',
      primaryCtas: [
        { label: 'Zangles', href: '/nl/lessen/zangles/' },
        { label: 'Songwriting', href: '/nl/lessen/songwriting/' },
        { label: 'Neem contact op', href: '/nl/contact/' }
      ],
      sections: [
        {
          kicker: 'Twee routes',
          heading: 'Leren via stem of via verhaal',
          cards: [
            { title: 'Zangles', text: 'Werk aan adem, klank, bereik en gemak, zonder dat techniek ooit losraakt van expressie.', href: '/nl/lessen/zangles/', cta: 'Ga naar zangles' },
            { title: 'Songwriting', text: 'Van eerste regels tot refrein: ruimte voor tekst, melodie, vorm en het vinden van een eigen toon.', href: '/nl/lessen/songwriting/', cta: 'Ga naar songwriting' },
            { title: 'Persoonlijke aanpak', text: 'Geen haastige methode, maar aandacht, luisteren en een route die bij de leerling past.', href: '/nl/contact/', cta: 'Stel een vraag' }
          ]
        }
      ]
    },
    '/en/lessons/': {
      lang: 'en',
      switchHref: '/nl/lessen/',
      switchLabel: 'NL',
      eyebrow: 'Lessons',
      title: 'Voice, language and confidence are allowed to unfold slowly here.',
      intro: 'For anyone wanting to move closer to their own voice, write songs or find more freedom in sound and presence. Choose the path that fits best.',
      primaryCtas: [
        { label: 'Vocal coaching', href: '/en/lessons/vocal-coaching/' },
        { label: 'Songwriting', href: '/en/lessons/songwriting/' },
        { label: 'Get in touch', href: '/en/contact/' }
      ],
      sections: [
        {
          kicker: 'Two paths',
          heading: 'Learning through voice or through story',
          cards: [
            { title: 'Vocal coaching', text: 'Work on breath, tone, range and ease without separating technique from expression.', href: '/en/lessons/vocal-coaching/', cta: 'Go to vocal coaching' },
            { title: 'Songwriting', text: 'From first lines to a chorus: space for text, melody, structure and a more personal voice.', href: '/en/lessons/songwriting/', cta: 'Go to songwriting' },
            { title: 'Personal approach', text: 'Not a rushed method, but attention, listening and a route shaped around the student.', href: '/en/contact/', cta: 'Ask a question' }
          ]
        }
      ]
    },
    '/nl/over/': {
      lang: 'nl',
      switchHref: '/en/about/',
      switchLabel: 'EN',
      eyebrow: 'Over Nina',
      title: 'Een artiestenwereld gebouwd uit notities, bloemenranden en aandacht voor detail.',
      intro: 'Lees meer over NinaLynn, de mensen om haar heen en het persbeeld dat om de muziek heen groeit. Dit is de plek waar de songs hun gezicht krijgen.',
      primaryCtas: [
        { label: 'Lees de bio', href: '/nl/over/bio/' },
        { label: 'Bekijk de band', href: '/nl/over/band/' },
        { label: 'Pers', href: '/nl/over/pers/' }
      ],
      sections: [
        {
          kicker: 'Achter de muziek',
          heading: 'Verhaal, gezelschap en context',
          cards: [
            { title: 'Bio', text: 'Een achtergrond in verhalen, stem en observatie vormt de kern van het werk van NinaLynn.', href: '/nl/over/bio/', cta: 'Open bio' },
            { title: 'Band', text: 'De livewereld wordt gedragen door spelers die ruimte laten voor nuance en textuur.', href: '/nl/over/band/', cta: 'Ontmoet de band' },
            { title: 'Pers', text: 'Voor persquotes, korte introducties en materiaal dat helpt om de muziek helder te positioneren.', href: '/nl/over/pers/', cta: 'Bekijk pers' }
          ]
        }
      ]
    },
    '/en/about/': {
      lang: 'en',
      switchHref: '/nl/over/',
      switchLabel: 'NL',
      eyebrow: 'About Nina',
      title: 'An artist world built from notes in the margin, petals and patient detail.',
      intro: 'Read more about NinaLynn, the people around her and the press image growing around the songs. This is where the music gets a face.',
      primaryCtas: [
        { label: 'Read the bio', href: '/en/about/bio/' },
        { label: 'Meet the band', href: '/en/about/band/' },
        { label: 'Press', href: '/en/about/press/' }
      ],
      sections: [
        {
          kicker: 'Behind the songs',
          heading: 'Story, company and context',
          cards: [
            { title: 'Bio', text: 'A background in stories, voice and observation sits at the center of NinaLynn’s work.', href: '/en/about/bio/', cta: 'Open bio' },
            { title: 'Band', text: 'The live world is carried by players who leave room for nuance and texture.', href: '/en/about/band/', cta: 'Meet the band' },
            { title: 'Press', text: 'For press quotes, introductions and materials that help frame the music clearly.', href: '/en/about/press/', cta: 'View press' }
          ]
        }
      ]
    },
    '/nl/shop/': {
      lang: 'nl',
      switchHref: '/en/shop/',
      switchLabel: 'EN',
      eyebrow: 'Shop',
      title: 'Neem iets tastbaars mee uit het archief.',
      intro: 'Voor wie muziek niet alleen wil streamen, maar ook wil vasthouden. Vinyl, cd’s en kleine voorwerpen leven hier als stille verlenging van de songs.',
      primaryCtas: [
        { label: 'Bestel vinyl', href: '/nl/shop/' },
        { label: 'Bekijk albums', href: '/nl/muziek/' },
        { label: 'Contact bij vragen', href: '/nl/contact/' }
      ],
      sections: [
        {
          kicker: 'Verzamelstukken',
          heading: 'Voor plank, draaitafel en tas',
          cards: [
            { title: 'Vinyl', text: 'Een warmere manier om de songs te laten landen, met ruimte voor hoes, object en ritueel.', href: '/nl/shop/', cta: 'Vinyl bekijken' },
            { title: 'CD', text: 'Compact, licht en nog steeds een mooi thuis voor een volledige plaat.', href: '/nl/shop/', cta: 'CD bekijken' },
            { title: 'Merch', text: 'Kleine stukken om iets van de sfeer van NinaLynn mee te dragen.', href: '/nl/shop/', cta: 'Merch bekijken' }
          ]
        }
      ]
    },
    '/en/shop/': {
      lang: 'en',
      switchHref: '/nl/shop/',
      switchLabel: 'NL',
      eyebrow: 'Shop',
      title: 'Take something tangible home from the archive.',
      intro: 'For listeners who want more than a stream. Vinyl, cds and small objects live here as quiet extensions of the songs.',
      primaryCtas: [
        { label: 'Order vinyl', href: '/en/shop/' },
        { label: 'View albums', href: '/en/music/' },
        { label: 'Questions?', href: '/en/contact/' }
      ],
      sections: [
        {
          kicker: 'Collected pieces',
          heading: 'For shelves, turntables and travel',
          cards: [
            { title: 'Vinyl', text: 'A warmer way to let the songs settle, with room for sleeve, object and ritual.', href: '/en/shop/', cta: 'View vinyl' },
            { title: 'CD', text: 'Compact, light and still a beautiful home for a full record.', href: '/en/shop/', cta: 'View cd' },
            { title: 'Merch', text: 'Small pieces carrying a fragment of the NinaLynn atmosphere outward.', href: '/en/shop/', cta: 'View merch' }
          ]
        }
      ]
    },
    '/nl/contact/': {
      lang: 'nl',
      switchHref: '/en/contact/',
      switchLabel: 'EN',
      eyebrow: 'Contact',
      title: 'Voor boekingen, lessen en rustige vragen die niet gehaast hoeven te worden.',
      intro: 'Of het nu gaat om een optreden, een bruiloft, zangles of gewoon een bericht over de muziek: hier begint het gesprek het liefst helder en persoonlijk.',
      primaryCtas: [
        { label: 'Live boeken', href: '/nl/live/boekingen/' },
        { label: 'Bruiloften', href: '/nl/live/bruiloften/' },
        { label: 'Lessen', href: '/nl/lessen/' }
      ],
      sections: [
        {
          kicker: 'Schrijf gerust',
          heading: 'Waar gaat je vraag over?',
          cards: [
            { title: 'Optredens', text: 'Voor podia, venues en events die een live set willen boeken of beschikbaarheid willen checken.', href: '/nl/live/boekingen/', cta: 'Naar boekingen' },
            { title: 'Bruiloften', text: 'Voor ceremonie, diner of borrel waarbij sfeer, timing en repertoire zorgvuldig mogen landen.', href: '/nl/live/bruiloften/', cta: 'Bekijk bruiloften' },
            { title: 'Lessen', text: 'Voor proeflessen, trajecten en vragen over zangles of songwriting.', href: '/nl/lessen/', cta: 'Bekijk lessen' }
          ]
        },
        {
          kicker: 'Volg mee',
          heading: 'Luister en kijk verder',
          cards: [
            { title: 'Instagram', text: 'Voor studiofragmenten, live beelden en kleine momenten uit het archief.', href: 'https://www.instagram.com/musicbyninalynn/', cta: 'Open Instagram' },
            { title: 'Facebook', text: 'Voor updates, events en nieuws dat wat langer mag blijven hangen.', href: 'https://www.facebook.com/musicbyninalynn', cta: 'Open Facebook' },
            { title: 'Spotify', text: 'Voor de platen zelf, direct tussen je andere luisterroutes.', href: 'https://open.spotify.com/artist/7wnvfXHe1D6Hw2wBNJeiSO?si=_t79oTI9SvK9hVtjMYtJSA', cta: 'Luister op Spotify' }
          ]
        }
      ]
    },
    '/en/contact/': {
      lang: 'en',
      switchHref: '/nl/contact/',
      switchLabel: 'NL',
      eyebrow: 'Contact',
      title: 'For bookings, lessons and slower questions that deserve attention.',
      intro: 'Whether it is about a performance, a wedding, vocal coaching or simply a note about the music, this is where the conversation begins.',
      primaryCtas: [
        { label: 'Book live', href: '/en/live/bookings/' },
        { label: 'Weddings', href: '/en/live/weddings/' },
        { label: 'Lessons', href: '/en/lessons/' }
      ],
      sections: [
        {
          kicker: 'Write anytime',
          heading: 'What is your message about?',
          cards: [
            { title: 'Performances', text: 'For venues, programmers and events wanting to book a set or check availability.', href: '/en/live/bookings/', cta: 'Go to bookings' },
            { title: 'Weddings', text: 'For ceremonies, dinners or receptions where atmosphere, timing and repertoire matter.', href: '/en/live/weddings/', cta: 'View weddings' },
            { title: 'Lessons', text: 'For trial lessons, coaching and questions about vocal work or songwriting.', href: '/en/lessons/', cta: 'View lessons' }
          ]
        },
        {
          kicker: 'Keep listening',
          heading: 'Follow along elsewhere',
          cards: [
            { title: 'Instagram', text: 'For studio fragments, live moments and small pieces from the archive.', href: 'https://www.instagram.com/musicbyninalynn/', cta: 'Open Instagram' },
            { title: 'Facebook', text: 'For updates, events and longer-form news.', href: 'https://www.facebook.com/musicbyninalynn', cta: 'Open Facebook' },
            { title: 'Spotify', text: 'For the records themselves, right inside your listening flow.', href: 'https://open.spotify.com/artist/7wnvfXHe1D6Hw2wBNJeiSO?si=_t79oTI9SvK9hVtjMYtJSA', cta: 'Listen on Spotify' }
          ]
        }
      ]
    }
  }
};
