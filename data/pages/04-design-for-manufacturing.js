/* Page 04 — Design for Manufacturing (DFM): The Rule New Engineers Break  (section: Product Development) */
BOOKLET.addPage({
  id: '04',
  pageNo: '04',
  slug: 'design-for-manufacturing',
  section: 'product-development',
  topicId: 'C1',
  title: 'Design for Manufacturing (DFM): The Rule New Engineers Break',
  summary:
    "A part can do its job perfectly and still be a nightmare to make. Where a part's cost really gets decided, the rules each process brings (inside corners, draft, even walls, a bend radius), four moves that make almost any part cheaper to build, and why DFM only works as a conversation held early.",
  runtime: '9:22',
  published: '2026-10-02',
  status: 'published',
  youtubeId: 'oaNh2mjmkqM',
  bookletPageImage: 'assets/img/booklet-page-04.png',
  thumbnail: 'assets/img/thumb-04.jpg',
  keywords: [
    'design for manufacturing', 'dfm', 'design for manufacturability', 'dfm explained',
    'design for assembly', 'dfa', 'design for x', 'dfx', 'manufacturability',
    'committed cost', 'cost of design changes', 'inside corner radius', 'draft', 'draft angle',
    'sink marks', 'even wall thickness', 'bend radius', 'part count reduction', 'snap fit',
    'standard features', 'tight tolerances', 'secondary operations', 'concurrent engineering',
    'product development', 'mechanical design', 'new engineer mistakes',
  ],

  /* Timestamps are the FINAL render's (2026-09-29, 9:22.6), from the synced timing that also
     wrote the YouTube chapters (voice-engine/chapters.py). The video's tenth chapter
     ("Next page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'The perfect part nobody can make' },
    { t: 59, label: 'Quick answer — what design for manufacturing means' },
    { t: 114, label: 'Cost is decided on the drawing' },
    { t: 164, label: 'Design with the grain of the process' },
    { t: 264, label: 'Four moves that pay off on any part' },
    { t: 365, label: 'A conversation, held early' },
    { t: 420, label: "Don't over-optimise — the DFX balance" },
    { t: 455, label: 'Recap' },
    { t: 496, label: 'The Booklet Page' },
  ],

  abbr: [
    { term: 'CAD', full: 'Computer-Aided Design' },
    { term: 'DFA', full: 'Design for Assembly' },
    { term: 'DFM', full: 'Design for Manufacturing' },
    { term: 'DFX', full: 'Design for X' },
  ],

  /* The knobs an engineer actually turns — the web version of the CONTROL PARAMETERS rail
     on the video's recap and Booklet Page (VIDEO04_CONTROLS). Directions only: this page
     quotes no draft angle, corner radius, wall ratio or cost percentage, on purpose. */
  controls: {
    note: 'COST IS COMMITTED ON THE DRAWING',
    items: [
      { family: 'Process choice', symbol: '⌖', name: 'Process + material', effect: 'Choose it first' },
      { family: 'Process fit', symbol: '⌒', name: 'Inside corners', effect: 'A radius a cutter can make' },
      { family: 'Process fit', symbol: '≈', name: 'Draft + even walls', effect: 'Clean release, no sink' },
      { family: 'Part count', symbol: '⊓', name: 'Fewer parts', effect: 'Combine, snap instead of screw' },
      { family: 'Standard parts', symbol: '✓', name: 'Standard features', effect: 'Stock drills and threads' },
      { family: 'Tolerances', symbol: '±', name: 'Tight tolerances', effect: 'Only where it counts' },
      { family: 'Secondary ops', symbol: '↧', name: 'Extra steps', effect: 'Design out deburr + finishing' },
      { family: 'Timing & team', symbol: '↔', name: 'Early involvement', effect: 'Manufacturing in the room' },
    ],
  },

  /* Verbatim from the video's Booklet Page (04-design-for-manufacturing/booklet-page-04.png,
     source rows DFM_ROWS in video-engine/src/DfmPage04.tsx). */
  takeaways: [
    { k: 'Cost Is Decided at Design', v: "Most of a part's cost is committed on the drawing, long before anyone makes one. Moving a wall on the plan costs an eraser, moving it after the pour costs a demolition." },
    { k: 'Design with the Process Grain', v: 'Pick the process first and design inside its rules. Inside corners a round cutter can make, draft and even walls for a mould, a bend radius for sheet metal.' },
    { k: 'Four Moves for Any Part', v: 'Fewer parts, standard features, tight tolerances only where the function needs them, and no extra steps after the main operation.' },
    { k: 'Talk Early, with Manufacturing', v: "Design with the people who make the part while the design is still soft. That's concurrent engineering, and a change there is still cheap." },
    { k: 'Function First, then Balance', v: "DFM sits in a family called design for X. Balance assembly, cost, service and reliability, and never trade away the part's job to make it cheaper." },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'Most of a part\'s cost is set before anyone cuts metal. The video shows where it gets decided, the rules each process brings, four moves for any part, and why it only works as an early conversation. The map:',
  digest: [
    { t: 114, title: 'Cost is decided on the drawing', line: "Draw two lines across a project. The money spent barely moves through design, while the cost you've committed climbs early and is mostly set by the time the design is frozen. Moving a wall on the plan costs an eraser; after the pour it costs a demolition." },
    { t: 164, title: 'Design with the grain of the process', line: 'Each process has its own rulebook. A round cutter leaves round inside corners, so give them a radius it can reach. A moulded part needs draft to slide out and even walls to cool without sink marks. Sheet metal wants a bend radius and holes clear of the bend.' },
    { t: 264, title: 'Four moves that pay off on any part', line: 'Fewer parts, the heart of design for assembly. Standard features a stock drill or thread can make. Tight tolerances only where the function needs them. And no extra steps after the main operation, because each one costs again on every unit.' },
    { t: 365, title: 'A conversation, held early', line: 'Thrown over the wall at the end, each fix means new drawings, new tooling, sometimes a whole new mould. Bring the people who make the part in while the design is still soft, and what they know shapes it instead of correcting it. That is concurrent engineering.' },
    { t: 420, title: 'The DFX balance', line: "Push a design too hard toward the cheapest build and you weaken what it's for, like a lid hinge that splits the third time you open it. DFM is one member of the design for X family; the skill is balancing them, function first." },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: "You design a bracket that does exactly what it should. It's strong enough, it fits the assembly, and on screen it looks perfect. Then the drawing reaches the people who have to make it, and it needs a cutter nobody stocks, five separate setups to reach all its faces, and an inside corner no tool can cut. Nothing about the design is wrong. It was drawn with no idea of how it would be made. And you don't pay for that once: a part that's hard to make costs extra on the first unit and on each one after it, for as long as you build it.",
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: "Design for manufacturing (DFM) means designing each part with its making in mind, from the very first sketch. It matters because most of what a part will cost over its life is decided on the drawing, long before anyone makes one; by the time the shop gets it, the expensive choices are already made. So you pick the process first and design inside its rules: rounded inside corners for a cutter, tapered walls for a mould, a minimum bend radius for sheet metal. Then four moves pay off on almost any part: fewer parts, standard features, tight tolerances only where they count, and no extra steps after the main operation. And you do it early, with the people who make the part in the room, while a change still costs a conversation instead of new tooling.",
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '03', note: 'The tolerance budget behind the third move.' },
    { page: '02', note: 'The same lesson: do the thinking while a change is still cheap.' },
  ],
});
