/* Page 03 — CNC Machining Tolerances: What's Actually Achievable  (section: Manufacturing) */
BOOKLET.addPage({
  id: '03',
  pageNo: '03',
  slug: 'cnc-machining-tolerances',
  section: 'manufacturing',
  topicId: 'A2',
  title: "CNC Machining Tolerances: What's Actually Achievable",
  summary:
    'A tight number on a drawing is a budget you spend. What really sets the tolerance a machine can hold — the machine, the tool, the heat, the clamping and the number of setups — why the cost curve goes vertical as you tighten it, and the measuring floor underneath all of it.',
  runtime: '9:25',
  published: '2026-09-25',
  status: 'published',
  youtubeId: 'IhlMk9RZ4WA',
  bookletPageImage: 'assets/img/booklet-page-03.png',
  keywords: [
    'cnc machining tolerances', 'cnc tolerances', 'machining tolerances', 'achievable tolerance',
    'tool deflection', 'cantilever', 'spindle runout', 'axis positioning', 'repeatability',
    'thermal expansion', 'workholding', 'fixturing', 'setups', 'tolerance budget',
    'cost of tight tolerances', 'cmm', 'inspection', 'gauge', 'general tolerance',
    'design for manufacturing', 'cnc milling', 'manufacturing engineering',
  ],

  /* Timestamps are the FINAL render's (2026-09-25), taken from the synced timing that also
     wrote the YouTube chapters and checked against captions-03.srt. The video's tenth
     chapter ("Next page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'The tolerance that triples your quote' },
    { t: 71, label: 'Quick answer — what sets an achievable tolerance' },
    { t: 134, label: 'The machine sets the floor' },
    { t: 201, label: 'The tool is a cantilever' },
    { t: 267, label: 'Heat moves the target' },
    { t: 327, label: 'Clamping and setups' },
    { t: 391, label: "The cost curve, and the floor you can't measure under" },
    { t: 457, label: 'Recap' },
    { t: 497, label: 'The Booklet Page' },
  ],

  abbr: [
    { term: 'CMM', full: 'Coordinate Measuring Machine' },
    { term: 'CNC', full: 'Computer Numerical Control' },
  ],

  /* The knobs an engineer actually turns — the web version of the CONTROL PARAMETERS rail
     on the video's recap and Booklet Page. Directions and relationships only: this page
     quotes no tolerance value, IT grade or standard clause, on purpose. */
  controls: {
    note: 'BEND ∝ REACH³ ÷ DIAMETER⁴',
    items: [
      { family: 'Machine', symbol: '⌖', name: 'Stiffness & spindle', effect: 'No flex, no oversize cuts' },
      { family: 'Machine', symbol: '↔', name: 'Axis positioning', effect: 'Repeatable, no reversal play' },
      { family: 'Tool', symbol: '↧', name: 'Reach & diameter', effect: 'Short and thick holds tight' },
      { family: 'Tool', symbol: '≈', name: 'Finishing pass', effect: 'Light skim, less bend, true size' },
      { family: 'Thermal', symbol: '°', name: 'Temperature & material', effect: 'Measure cold; aluminium ≈ 2× steel' },
      { family: 'Workholding', symbol: '⊓', name: 'Clamping', effect: 'Hold it, never distort it' },
      { family: 'Workholding', symbol: '⟳', name: 'Setups', effect: 'One setup for what must line up' },
      { family: 'Inspection', symbol: '✓', name: 'Gauge', effect: 'About 10× finer than the band' },
      { family: 'Drawing', symbol: '$', name: 'Tolerance budget', effect: 'Tight only where function needs it' },
    ],
  },

  /* Verbatim from the video's Booklet Page (03-cnc-machining-tolerances/booklet-page-03.png). */
  takeaways: [
    { k: 'The Machine Sets the Floor', v: "Stiffness, a true-running spindle, and axes that land exactly where they're told from either direction. A worn machine can't hold what a well-kept one can." },
    { k: 'The Tool Is a Cantilever', v: 'The bend grows with the cube of the reach and drops with the fourth power of the diameter. Keep tools short and thick, and finish with a light pass.' },
    { k: 'Heat Moves the Target', v: 'Warm metal is bigger metal, and aluminium grows about twice as much as steel. Control the room, warm the machine up, and measure at room temperature.' },
    { k: 'Setups Stack Error', v: 'Every re-clamp adds its own error. Cut features that must line up in one setup, and clamp hard enough to hold the part without bending it.' },
    { k: 'Tolerance Is a Budget', v: 'Cost runs away as the band tightens, and a gauge should be about ten times finer than the band. Spend tight numbers on function, leave the rest to the general tolerance.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'Five things decide the band a shop can hold, and they work together rather than in turn. The video walks each one, then puts them all on a cost curve. The map:',
  digest: [
    { t: 134, title: 'The machine sets the floor', line: 'Stiffness against the cutting force, a spindle that runs true instead of sweeping a bigger circle, and axes that land on the same spot from either direction.' },
    { t: 201, title: 'The tool is a cantilever', line: 'Like a ruler hanging off a table edge: the bend grows with the cube of the reach and drops with the fourth power of the diameter, which is why a light finishing pass cuts to the true size.' },
    { t: 267, title: 'Heat moves the target', line: 'Warm metal is bigger metal — the trick that frees a stuck jar lid. Measure a part warm and it is undersize by morning, and aluminium moves about twice as much as steel.' },
    { t: 327, title: 'Clamping and setups', line: 'Clamp too hard and the part is cut flat while it is bowed, then springs back curved. And every re-clamp is a short ruler picked up and put down again, so the second half never quite lines up.' },
    { t: 391, title: 'The cost curve, and the floor under it', line: 'Cost is flat while the band is open and goes near-vertical as it tightens. Underneath sits a hard floor: a tolerance tighter than you can measure means nothing.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'You finish a design and, to be safe, you put a tight tolerance on every dimension. Then the quote comes back at roughly triple what you expected, with a lead time nobody planned for. Nothing on that drawing was impossible. The trouble is that every tight number was asked for at once, on features that never needed one, and each of them multiplied the cost of the whole part — because a tight number changes how that part has to be cut, held and checked.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'A tolerance is how far a real dimension is allowed to wander from the number on the drawing and still pass. No machine makes the same size twice, so a good part is one whose size lands inside the band you drew. How tight a band you can hold comes from five things working together: the machine, the tool, the heat, the way the part is clamped, and how many setups it takes. Loosen the band and almost any shop hits it in one pass; tighten it and you pay for finish passes, better fixturing, a controlled room and slower inspection, each step costing more than the last. And there is one hard floor — a tolerance tighter than you can measure means nothing, because you cannot hold what you cannot check. So what is achievable comes down to two questions: how much are you willing to spend, and does this feature really need it?',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '01', note: 'The same question asked of metal 3D printing.' },
    { page: '00', note: 'How every page on this site is structured.' },
  ],
});
