window.NINA_SITE_DATA = {
  menus: {
    nl: [
      { label: 'Muziek', href: '/nl/muziek/' },
      { label: 'Live', href: '/nl/live/' },
      { label: 'Lessen', href: '/nl/lessen/' },
      { label: 'Over', href: '/nl/over/' },
      { label: 'Shop', href: '/nl/shop/' },
      { label: 'Contact', href: '/nl/contact/' }
    ],
    en: [
      { label: 'Music', href: '/en/music/' },
      { label: 'Live', href: '/en/live/' },
      { label: 'Lessons', href: '/en/lessons/' },
      { label: 'About', href: '/en/about/' },
      { label: 'Shop', href: '/en/shop/' },
      { label: 'Contact', href: '/en/contact/' }
    ]
  },
  footers: {
    nl: [
      { label: 'Muziek', href: '/nl/muziek/' },
      { label: 'Live', href: '/nl/live/' },
      { label: 'Bruiloften', href: '/nl/live/bruiloften/' },
      { label: 'Lessen', href: '/nl/lessen/' },
      { label: 'Shop', href: '/nl/shop/' },
      { label: 'Contact', href: '/nl/contact/' }
    ],
    en: [
      { label: 'Music', href: '/en/music/' },
      { label: 'Live', href: '/en/live/' },
      { label: 'Weddings', href: '/en/live/weddings/' },
      { label: 'Lessons', href: '/en/lessons/' },
      { label: 'Shop', href: '/en/shop/' },
      { label: 'Contact', href: '/en/contact/' }
    ]
  },
  pages: {
    '/nl/': {
      lang: 'nl',
      switchHref: '/en/',
      switchLabel: 'EN',
      eyebrow: 'Artist branding first, conversion second',
      title: 'NinaLynn bouwt een botanisch archief van songs, shows en stille intensiteit.',
      intro: 'Deze home stuurt drie hoofdjourneys: luisteren en verdiepen, live boeken en lessen ontdekken. De content blijft artistiek van toon, maar iedere route heeft een duidelijke volgende stap.',
      primaryCtas: [
        { label: 'Luister muziek', href: '/nl/muziek/' },
        { label: 'Bekijk live', href: '/nl/live/' },
        { label: 'Boek NinaLynn', href: '/nl/live/boekingen/' }
      ],
      secondaryCtas: [
        { label: 'Bruiloften', href: '/nl/live/bruiloften/' },
        { label: 'Lessen', href: '/nl/lessen/' },
        { label: 'Shop', href: '/nl/shop/' }
      ],
      sections: [
        {
          heading: 'Kies je ingang',
          cards: [
            { title: 'Voor luisteraars', text: 'Ontdek albums, songteksten, reviews en live-opnames zonder de merkbeleving te verliezen.', href: '/nl/muziek/', cta: 'Naar muziek' },
            { title: 'Voor boekers en venues', text: 'Bekijk live-profiel, agenda, pers en een directe route naar beschikbaarheid en boekingen.', href: '/nl/live/boekingen/', cta: 'Naar boekingen' },
            { title: 'Voor lessen en workshops', text: 'Zangles en songwriting zitten onder een eigen cluster met proefles en aanvraag-CTA’s.', href: '/nl/lessen/', cta: 'Naar lessen' }
          ]
        },
        {
          heading: 'Waarom deze IA werkt',
          cards: [
            { title: 'Tweetalige basis', text: 'NL en EN lopen één-op-één parallel onder vaste taalprefixen, zodat navigatie en SEO consistent blijven.' },
            { title: 'Heldere hiërarchie', text: 'Muziek, Live, Lessen, Over, Shop en Contact vormen de vaste topnavigatie in beide talen.' },
            { title: 'Contextuele CTA’s', text: 'Iedere pagina stuurt door naar de meest logische vervolgstap voor de gebruiker op dat moment.' }
          ]
        }
      ]
    },
    '/en/': {
      lang: 'en',
      switchHref: '/nl/',
      switchLabel: 'NL',
      eyebrow: 'Artist branding first, conversion second',
      title: 'NinaLynn now moves through music, live, lessons and story without mixing those journeys.',
      intro: 'The homepage keeps the artistic atmosphere intact while giving fans, bookers and students a clear route within two clicks.',
      primaryCtas: [
        { label: 'Listen now', href: '/en/music/' },
        { label: 'Explore live', href: '/en/live/' },
        { label: 'Book NinaLynn', href: '/en/live/bookings/' }
      ],
      secondaryCtas: [
        { label: 'Weddings', href: '/en/live/weddings/' },
        { label: 'Lessons', href: '/en/lessons/' },
        { label: 'Shop', href: '/en/shop/' }
      ],
      sections: [
        {
          heading: 'Choose your path',
          cards: [
            { title: 'For listeners', text: 'Move from albums to lyrics, reviews and live sessions with a stronger narrative structure.', href: '/en/music/', cta: 'Go to music' },
            { title: 'For bookers and venues', text: 'See live positioning, proof, gigs and a direct path into bookings.', href: '/en/live/bookings/', cta: 'Go to bookings' },
            { title: 'For students', text: 'Lessons now live in their own cluster, with vocal coaching and songwriting clearly separated.', href: '/en/lessons/', cta: 'Go to lessons' }
          ]
        }
      ]
    },
    '/nl/muziek/': {
      lang: 'nl',
      switchHref: '/en/music/',
      switchLabel: 'EN',
      eyebrow: 'Muziek',
      title: 'Albums, live-opnames, lyrics en reviews hangen nu onder één semantisch cluster.',
      intro: 'Deze hub is gemaakt voor de fanjourney: ontdekken, verdiepen, luisteren, kopen en doorstromen naar shows of boekingen.',
      primaryCtas: [
        { label: 'Luister nu', href: '/nl/muziek/albums/a-taste-of-the-wild/' },
        { label: 'Bekijk shows', href: '/nl/live/agenda/' },
        { label: 'Koop album', href: '/nl/shop/' }
      ],
      sections: [
        {
          heading: 'Albums',
          cards: [
            { title: 'A Taste of the Wild', text: 'Het ankeralbum binnen de nieuwe structuur, met aparte child pages voor songteksten en reviews.', href: '/nl/muziek/albums/a-taste-of-the-wild/', cta: 'Bekijk album' },
            { title: 'Hummingbird', text: 'Niet langer verward met review-content; nu een eigen albumdetail met duidelijke vervolgstappen.', href: '/nl/muziek/albums/hummingbird/', cta: 'Bekijk album' },
            { title: 'Imaginations', text: 'Archiefalbum met een sobere detailpagina en een eigen route naar songteksten.', href: '/nl/muziek/albums/imaginations/', cta: 'Bekijk album' }
          ]
        },
        {
          heading: 'Vaste vervolgstappen',
          cards: [
            { title: 'Live-opnames', text: 'Bewijs voor zowel fans als boekers dat de live-kwaliteit direct doorvertaald wordt vanuit de muziek.', href: '/nl/muziek/live-opnames/', cta: 'Bekijk live-opnames' },
            { title: 'Agenda', text: 'Vanuit muziek moet de stap naar shows vanzelfsprekend zijn.', href: '/nl/live/agenda/', cta: 'Bekijk agenda' },
            { title: 'Boekingen', text: 'Muziekpagina’s linken ook altijd door naar commerciële live-intentie.', href: '/nl/live/boekingen/', cta: 'Bekijk boekingen' }
          ]
        }
      ]
    },
    '/en/music/': {
      lang: 'en',
      switchHref: '/nl/muziek/',
      switchLabel: 'NL',
      eyebrow: 'Music',
      title: 'Albums, live sessions, lyrics and reviews now sit in one coherent music structure.',
      intro: 'This hub supports the listener journey from discovery into context, depth, purchase and live intent.',
      primaryCtas: [
        { label: 'Listen now', href: '/en/music/albums/a-taste-of-the-wild/' },
        { label: 'See gigs', href: '/en/live/gigs/' },
        { label: 'Shop releases', href: '/en/shop/' }
      ],
      sections: [
        {
          heading: 'Albums',
          cards: [
            { title: 'A Taste of the Wild', text: 'Anchor album with separate child pages for lyrics and reviews.', href: '/en/music/albums/a-taste-of-the-wild/', cta: 'View album' },
            { title: 'Hummingbird', text: 'Now clearly positioned as an album page rather than a mixed review endpoint.', href: '/en/music/albums/hummingbird/', cta: 'View album' },
            { title: 'Imaginations', text: 'Archive album with its own detail page and lyric route.', href: '/en/music/albums/imaginations/', cta: 'View album' }
          ]
        }
      ]
    }
  }
};
