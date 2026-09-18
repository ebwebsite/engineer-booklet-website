/* Page 02 — FMEA Explained: The Method Most Engineers Fill In Wrong  (section: Reliability) */
BOOKLET.addPage({
  id: '02',
  pageNo: '02',
  slug: 'fmea',
  section: 'reliability',
  topicId: 'B1',
  title: 'FMEA Explained: The Method Most Engineers Fill In Wrong',
  summary:
    'FMEA finds how a design can fail before it does. Here is the one line the whole method repeats, why its famous risk number buries the failures that matter most, and the three habits that make most FMEAs catch nothing.',
  runtime: '9:46',
  published: '2026-09-18',
  status: 'published',
  youtubeId: 'CVyP-oAzOcw',
  bookletPageImage: 'assets/img/booklet-page-02.png',
  keywords: [
    'fmea', 'failure mode and effects analysis', 'dfmea', 'pfmea', 'design fmea',
    'process fmea', 'rpn', 'risk priority number', 'severity', 'occurrence', 'detection',
    'action priority', 'reliability', 'failure analysis', 'root cause', 'design review',
  ],

  /* Timestamps are the FINAL render's (2026-09-18), taken from the synced timing that
     also wrote the YouTube chapters and checked against captions-02.srt. Each step's
     chapter starts on its step divider, a few seconds before the voice. */
  chapters: [
    { t: 0, label: 'The form that catches nothing' },
    { t: 63, label: 'Quick answer — what FMEA actually is' },
    { t: 137, label: 'One line: function, failure mode, effect, cause, control' },
    { t: 236, label: 'Severity, occurrence, detection — and RPN' },
    { t: 302, label: 'Why the risk number lies (and why detection ≠ safety)' },
    { t: 394, label: "The three ways it's filled in wrong" },
    { t: 479, label: 'Recap' },
    { t: 531, label: 'The Booklet Page' },
  ],

  abbr: [
    { term: 'AP', full: 'Action Priority' },
    { term: 'FMEA', full: 'Failure Mode and Effects Analysis' },
    { term: 'RPN', full: 'Risk Priority Number' },
  ],

  /* The decisions that change the outcome — the web version of the CONTROL PARAMETERS
     rail on the video's recap and Booklet Page. FMEA is a method, not a process, so the
     groups are Scope, Risk rating, Timing, Team and Follow-through. Directional, never
     a company action threshold. */
  controls: {
    note: 'RPN = S × O × D · consider the AP method',
    items: [
      { family: 'Scope', symbol: '', name: 'Functions & failure modes', effect: 'You only ever catch what you actually listed' },
      { family: 'Risk rating', symbol: 'S', name: 'Severity', effect: 'How bad the effect is; only a design change lowers it' },
      { family: 'Risk rating', symbol: 'O', name: 'Occurrence', effect: 'How often the cause happens; robust design lowers it' },
      { family: 'Risk rating', symbol: 'D', name: 'Detection', effect: 'Chance controls catch it first; verification lowers it, never severity' },
      { family: 'Timing', symbol: '⏱', name: 'Run it early', effect: 'While a change is still a conversation, not a recall' },
      { family: 'Team', symbol: '⌂', name: 'Cross-functional', effect: 'The whole room, not one engineer alone' },
      { family: 'Follow-through', symbol: '✓', name: 'Actions & re-rating', effect: 'Close the loop, keep it a living document' },
    ],
  },

  /* Verbatim from the video's Booklet Page (02-fmea/booklet-page-02.png). */
  takeaways: [
    { k: 'One Line, Five Columns', v: 'An FMEA is a single line repeated for everything that can go wrong. Function, failure mode, effect, cause, control. Rate the effect on the user, not the failure itself, because one failure mode can lead to very different outcomes.' },
    { k: 'Severity, Occurrence, Detection', v: 'Score each line one to ten on how bad the effect is, how often the cause happens, and how likely your controls are to catch it. Detection runs backwards, so a low score means good catching.' },
    { k: 'RPN, and Why It Lies', v: 'Multiply the three into a risk priority number and sort by it. But the multiply can rank a rare, catchable, deadly failure below a common harmless one. Lead with severity, and use an action-priority view so high-severity items always escalate.' },
    { k: 'Detection Never Reduces Severity', v: 'A smoke alarm does not make the fire smaller. Inspection lowers your detection number, not the danger. The only way to reduce severity is a design change that stops the bad effect from happening at all.' },
    { k: 'A Verb, Not a Form', v: 'FMEA only works run early, run as a cross-functional team, and kept alive as the design changes, with its actions actually closed out. Done late, alone, and filed away, it predicts nothing.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'The method itself is one line, repeated. The video spends its time on the number that ranks those lines, where that number misleads, and the habits that decide whether any of it matters. The map:',
  digest: [
    { t: 137, title: 'One line, five columns', line: 'Function, failure mode, effect, cause and control, built on a phone charging cable. Rate the effect on the user, never the failure itself.' },
    { t: 236, title: 'Three numbers', line: 'Severity, occurrence and detection, each scored one to ten, and why detection trips people up: good catching earns a low score.' },
    { t: 302, title: 'Where the number lies', line: 'Multiplying the three buries severity, so a rare, catchable failure that could kill someone ranks below a common, harmless annoyance.' },
    { t: 323, title: 'Detection never reduces severity', line: 'A smoke alarm does not make the fire smaller. Only a design change lowers severity, which is why action priority reads severity first.' },
    { t: 394, title: 'Three habits', line: 'Done too late, done alone, and filed and forgotten. Each one has a fix, and together they decide whether the sheet catches anything.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'Most engineers meet FMEA as a spreadsheet somebody emails them the week before a design review. You fill in the boxes, work out the score and send it back, and the design ships exactly the way it was always going to ship. The form catches nothing, and the method is not the reason. By the time the spreadsheet arrived, each decision it was meant to shape had already been made. A signed sheet that says the risk was reviewed is then worse than no sheet at all.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'FMEA, failure mode and effects analysis, is a structured way to find how something can fail before it fails, so the worst problems get fixed while they are still cheap, on paper, instead of expensive, in the field. You break a design or a process into what each part is supposed to do, and for every function you ask how it could fail. Each answer is a failure mode, and each one gets three questions: what it does to the person downstream, how often its cause is likely to happen, and whether you would catch it before it leaves. Those answers tell you which failures to chase first. It only works run early, while a change still costs a conversation instead of a recall, and run as a group, because the person who designed the part is usually the last one to see how it breaks.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [{ page: '00', note: 'How every page on this site is structured.' }],
});
