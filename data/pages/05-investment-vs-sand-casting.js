/* Page 05 — Investment Casting vs Sand Casting: When to Use Which  (section: Manufacturing) */
BOOKLET.addPage({
  id: '05',
  pageNo: '05',
  slug: 'investment-vs-sand-casting',
  section: 'manufacturing',
  topicId: 'A3',
  title: 'Investment Casting vs Sand Casting: When to Use Which',
  summary:
    'A cast iron pan comes out rough and a golf club head comes out smooth, though both were cast. The one rule that separates sand casting from investment (lost wax) casting, each process step by step, the shrinkage both have to feed, and four questions that pick the right one for your part.',
  runtime: '9:09',
  published: '2026-10-09',
  status: 'published',
  youtubeId: 'e7yug6nBsu8',
  bookletPageImage: 'assets/img/booklet-page-05.png',
  thumbnail: 'assets/img/thumb-05.jpg',
  keywords: [
    'investment casting', 'sand casting', 'investment casting vs sand casting', 'lost wax casting',
    'casting process', 'metal casting', 'foundry', 'cope and drag', 'parting line', 'core',
    'sprue', 'runner', 'riser', 'sand mould', 'sand mold', 'pattern', 'pattern allowance',
    'shrinkage allowance', 'draft', 'machining stock', 'wax pattern', 'wax die', 'wax tree',
    'ceramic shell', 'near net shape', 'shrinkage porosity', 'even sections', 'casting design',
    'how to choose a casting process', 'manufacturing processes', 'mechanical engineering',
  ],

  /* Timestamps are the FINAL render's (2026-10-03, 9:09.5), from the synced timing that also
     wrote the YouTube chapters (voice-engine/chapters.py). The video's tenth chapter
     ("Next page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'Same pour, two very different parts' },
    { t: 56, label: 'Quick answer — sand vs investment casting' },
    { t: 124, label: 'The one difference: how the pattern gets out' },
    { t: 162, label: 'Sand casting, step by step' },
    { t: 264, label: 'Investment casting (lost wax), step by step' },
    { t: 342, label: 'Shrinkage — the defect both share' },
    { t: 389, label: 'How to choose — four questions' },
    { t: 455, label: 'Recap' },
    { t: 491, label: 'The Booklet Page' },
  ],

  /* No abbreviation is spoken in this video, so there is no glossary. */
  abbr: [],

  /* The knobs a foundry turns — the web version of the CONTROL PARAMETERS rail on the
     video's recap and Booklet Page (VIDEO05_CONTROLS). Directions only: this page quotes no
     tolerance grade, roughness value, shrink percentage, pour temperature or price, on purpose. */
  controls: {
    note: 'THE PATTERN DECIDES',
    items: [
      { family: 'Process choice', symbol: '⌖', name: 'Sand or investment', effect: 'Size, detail, quantity' },
      { family: 'Pattern', symbol: '⇲', name: 'Allowances', effect: 'Shrink, draft, machining stock' },
      { family: 'Mould', symbol: '▦', name: 'Sand grain', effect: 'Finer is smoother, vents less' },
      { family: 'Mould', symbol: '◎', name: 'Shell coats', effect: 'More is stronger, adds days' },
      { family: 'Pouring', symbol: '♨', name: 'Metal + mould heat', effect: 'Hotter fills thin walls' },
      { family: 'Feeding', symbol: '⇡', name: 'Risers', effect: 'Feed shrinkage, more to cut off' },
      { family: 'Design', symbol: '≡', name: 'Even sections', effect: 'Fewer hot spots and holes' },
      { family: 'Finishing', symbol: '✂', name: 'Machining', effect: 'Only the faces that matter' },
    ],
  },

  /* Verbatim from the video's Booklet Page (05-investment-vs-sand-casting/booklet-page-05.png,
     source rows CAST_ROWS in video-engine/src/CastPage05.tsx). */
  takeaways: [
    { k: 'The Pattern Decides', v: 'In sand the pattern has to come out of the mould, so it needs draft, a parting line and cores. In investment the wax pattern melts out, so the shell can wrap almost any shape.' },
    { k: 'Sand: Big, Cheap, Rough', v: 'A cheap, reusable pattern and almost no size limit. The sand leaves a rough skin and looser sizes, so the faces that matter get machining stock.' },
    { k: 'Investment: Small, Fine, Near Net', v: 'Thin walls, fine detail and a smooth skin close to finished size. Each casting costs a wax pattern and a shell, coats take days, and size is limited.' },
    { k: 'Feed the Shrinkage', v: 'Metal shrinks as it freezes and thick sections freeze last. Keep sections even and let a riser freeze last, so the holes end up in the riser.' },
    { k: 'Choose on the Finished Part', v: 'Ask about size, detail, finished-part cost and quantity. Big, simple or few goes to sand; small, detailed and barely machined goes to investment.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'Both processes pour metal into a mould and break the mould to free the casting. What differs is how the mould gets made, and that one difference decides the rest. The map:',
  digest: [
    { t: 124, title: 'The one difference: how the pattern gets out', line: 'Press a toy starfish into wet sand and lift it out, and the hollow is a mould. That only works if the shape can come out without tearing the sand: tapered sides, nothing hooking underneath. Investment casting makes the pattern of wax and melts it out, so the mould can wrap almost any shape.' },
    { t: 162, title: 'Sand casting, step by step', line: 'A two-part box, the drag below and the cope above, meets at the parting line around the pattern. Sand is packed, the pattern comes out, a sand core forms any hollow, and the metal runs down a sprue and along a runner into the cavity, with a riser holding a reserve. The pattern is made larger for shrinkage, with draft and machining stock, and the sand leaves a rough skin and sizes that drift.' },
    { t: 264, title: 'Investment casting (lost wax), step by step', line: 'A metal die moulds a wax copy for each casting. The copies go onto a wax tree, which is dipped in ceramic slurry coat after coat; the wax is melted out and the shell fired. Metal poured into the hot shell fills thin walls before it freezes, and the castings come out smooth and close to finished size. The bill: a wax pattern and a shell each time, days of coating, a die paid up front, and a size limit.' },
    { t: 342, title: 'Shrinkage, the defect both share', line: 'A homemade candle sinks in the middle as it cools. Metal does the same: a thick section freezes last, cut off from fresh liquid by the thinner walls already set, and leaves holes inside, shrinkage porosity. A riser made to freeze last keeps feeding it, so the holes end up in the riser. The design fix is even sections.' },
    { t: 389, title: 'How to choose: four questions', line: 'How big is it: sand has almost no size limit, investment suits small and medium parts. How much detail: thin walls and a smooth finish point to investment. What does the finished part cost: a cheap casting machined on most faces can cost more than one needing a light cut. How many: a sand pattern suits one-offs, a wax die needs enough castings to pay for itself.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'A cast iron frying pan and a golf club head were made the same basic way. Liquid metal was poured into a mould, left to freeze, and the mould was broken away. Yet the pan comes out rough and grainy, and the club head comes out smooth, with thin walls and crisp edges, straight from the mould. The pan was sand cast and the club head was investment cast, and piece for piece investment is usually the more expensive of the two. Pick the wrong one for your drawing, and you either pay for detail nobody needed, or machine each face of a part that could have come out finished.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'Sand casting packs sand around a copy of the part, called a pattern, draws the pattern out and pours metal into the hollow, and the same pattern goes back in for the next mould. It is cheap to set up and takes castings from hand-sized to heavier than a car, but the sand leaves a rough surface and loose sizes, so the key faces get machined. Investment casting makes the pattern from wax, coats it in ceramic and melts the wax out; with nothing to pull free, the shell copies fine detail, thin walls and a smooth surface. The price is a new wax pattern and a new shell for each casting, days of coating, and a limit on size. So choose sand when the casting is big, the numbers are low, or you will machine it anyway, and investment when it is small and detailed and the shell costs less than the machining it saves.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '03', note: 'How tightly the machined faces of a casting can be held.' },
    { page: '04', note: 'Even sections, the design fix for shrinkage porosity.' },
  ],
});
