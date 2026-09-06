/* Page 00 — What This Channel Actually Is  (section: Start here)
   Content synced to the 00B cut (2026-09-05) — see 00b-welcome-engineer-booklet/
   script.md for prose and booklet-page-00b.png for the takeaways/abbr card.
   Chapter/digest timestamps are read off captions-00b.srt (the final,
   post-audio-fix, delivery-anchored timeline) — NOT description.md's chapter
   list or voiceover.timeline.md, both of which predate the 2026-09-05 audio
   fixes and are measurably stale (several seconds off by the back half). */
BOOKLET.addPage({
  id: '00',
  pageNo: '00',
  slug: 'what-this-channel-is',
  section: 'start-here',
  title: 'What This Channel Actually Is',
  /* Shown under the title and in search results. One sentence, no wind-up. */
  summary:
    'Engineer Booklet is a reference manual built as a video channel. Six sections, one concept per page, the same five steps every time.',
  runtime: '9:06',
  published: '2026-09-05',
  /* Genuinely live (2026-09-06) — confirmed playable before this export,
     though YouTube currently has it set to Unlisted, not Public (worth
     checking whether that's intentional; it embeds fine either way). */
  status: 'published',
  youtubeId: 'SF1rz7GrY2s',
  /* The video's own final end-card, copied in verbatim so the site can offer
     the exact same frame as a download instead of relying on a screenshot. */
  bookletPageImage: 'assets/img/booklet-page-00.png',
  keywords: [
    'engineer booklet', 'reference', 'format', 'five steps', 'six sections',
    'how to use this channel', 'evergreen',
  ],

  chapters: [
    { t: 0, label: 'The note you never went back to' },
    { t: 89, label: 'What Engineer Booklet actually is' },
    { t: 134, label: 'Why a page is six to nine minutes' },
    { t: 170, label: 'Why it stays right in five years' },
    { t: 211, label: 'The six sections' },
    { t: 328, label: 'How every page is put together' },
    { t: 396, label: "What this channel won't do" },
    { t: 468, label: 'Recap' },
    { t: 496, label: 'The Booklet Page' },
    { t: 512, label: "What's next" },
  ],

  abbr: [
    { term: 'CAD', full: 'Computer-Aided Design' },
    { term: 'CAM', full: 'Computer-Aided Manufacturing' },
    { term: 'CNC', full: 'Computer Numerical Control' },
    { term: 'DFM', full: 'Design for Manufacturing' },
    { term: 'FEA', full: 'Finite Element Analysis' },
    { term: 'FMEA', full: 'Failure Mode and Effects Analysis' },
    { term: 'GD&T', full: 'Geometric Dimensioning & Tolerancing' },
    { term: 'PLC', full: 'Programmable Logic Controller' },
    { term: 'PLM', full: 'Product Lifecycle Management' },
    { term: 'SCADA', full: 'Supervisory Control and Data Acquisition' },
    { term: 'SPC', full: 'Statistical Process Control' },
  ],

  /* Verbatim from booklet-page-00b.png (the video's own final card) so the
     website card and the video end frame never drift apart. */
  takeaways: [
    { k: 'One page per video', v: 'A reference manual, not a course. Each video is one concept in six to nine minutes, long enough for the real mechanism and short enough to come back to.' },
    { k: 'Six sections', v: 'Manufacturing, reliability and failure, product development, automation and controls, core fundamentals, and tools. Manufacturing publishes about twice as often as the rest.' },
    { k: 'The five-step format', v: 'Every video runs Problem, Quick Answer, Deep Dive, Recap, and Booklet Page, in that order, without exception. A progress bar shows where you are.' },
    { k: 'Mechanism, not definition', v: 'A definition says what a term means, not why the part failed. Every page goes to the mechanism and the rules that hold, with the real failure modes, and stays evergreen.' },
    { k: 'No upsell, rules not numbers', v: 'Nothing is for sale, so no explanation bends around a pitch. And this teaches the rules that generalize, not case-by-case numbers that depend on your exact material and standard.' },
  ],

  /* Deep Dive as a resumed chapter list, same style as every topic page. */
  digestLead:
    'The rest of the intro walks what is in the booklet and how a page is built. The map:',
  digest: [
    { t: 134, title: 'Why a page is six to nine minutes', line: 'Long enough to carry a mechanism properly, short enough that you actually come back and watch it a second time.' },
    { t: 170, title: 'Why it stays right in five years', line: 'The mechanism does not change even when the tool on your screen does — a page tracks the flat line, not the software.' },
    { t: 211, title: 'The six sections', line: 'Manufacturing, reliability, product development, automation, fundamentals and tools. Manufacturing publishes about twice as often as the rest.' },
    { t: 328, title: 'How every page is put together', line: 'The same five steps in the same order, every time, including the one you are watching right now.' },
    { t: 396, title: 'What this channel will not do', line: 'No course, no upsell, and no single number handed to you as the answer — you bring the numbers for your own job.' },
  ],
  digestCta: {
    title: 'Watch the 9:06 intro',
    text: 'The full tour of the six sections and how a page works, in the video.',
  },

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'Somewhere on your desk, or in a folder you never open, there is a note you wrote to yourself once and swore you would remember. Everyone has three or four topics like that. You do not lose the whole thing, you lose the middle, and the reasoning underneath the words quietly goes — right up until somebody asks a fair question in a review and the room waits while you try to rebuild it live.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'Engineer Booklet is a reference manual for working engineers, built as a video channel instead of a book. Six sections. One concept per video. Six to nine minutes a page, the same five steps every time, and a final frame you can screenshot and keep. No course, nothing gated, nothing for sale.',
    },
    { type: 'h', text: 'The six sections' },
    {
      type: 'terms',
      items: [
        { term: 'Manufacturing Processes', def: 'How parts are actually made — metal 3D printing, CNC, molding, casting — with the real tolerances you can hold and the defects that show up in production.' },
        { term: 'Reliability & Failure', def: 'Why things break and how to catch it on paper first: FMEA, root cause, fatigue, Weibull, SPC and inspection.' },
        { term: 'Product Development', def: 'Getting a design from sketch to a production line in one piece: DFM, GD&T, tolerance stack-up, design reviews, industrialization.' },
        { term: 'Automation & Controls', def: 'How a plant watches its own floor: sensors, PLCs, SCADA, machine vision and predictive maintenance.' },
        { term: 'Core Fundamentals', def: "The things that don't change: stress and strain, material selection, process capability, bearings, bolted joints." },
        { term: 'Tools & Software', def: "What's under the hood when you hit simulate: CAD, FEA, PLM, CAM — and where the model stops matching the part." },
      ],
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [{ page: '01', note: 'The first real page — start of the Manufacturing section.' }],
});
