/* Page 07 — Statistical Process Control (SPC) Explained: Signal or Noise?  (section: Core Fundamentals) */
BOOKLET.addPage({
  id: '07',
  pageNo: '07',
  slug: 'statistical-process-control',
  section: 'fundamentals',
  topicId: 'E4',
  title: 'Statistical Process Control (SPC) Explained: Signal or Noise?',
  summary:
    'An operator nudges the tool after each shaft that comes out big or small, and the shafts get worse. How to tell a real change in a process from its day-to-day wobble: common and special cause, the X bar and R chart, why control limits are not tolerances, how to read the signals, which chart fits which data, and why chasing a size widens the spread.',
  runtime: '10:09',
  published: '2026-10-23',
  status: 'published',
  youtubeId: '8w6WTYrB-DY',
  bookletPageImage: 'assets/img/booklet-page-07.png',
  thumbnail: 'assets/img/thumb-07.jpg',
  keywords: [
    'statistical process control', 'spc', 'control chart', 'shewhart chart', 'control limits',
    'specification limits', 'tolerance', 'common cause variation', 'special cause variation',
    'x bar and r chart', 'x bar r chart', 'subgroup', 'range chart', 'three sigma', 'standard deviation',
    'individuals chart', 'p chart', 'go no-go gauge', 'reaction plan', 'run rules', 'tool wear',
    'tampering', 'over-adjustment', 'voice of the process', 'voice of the customer',
    'stable is not capable', 'process capability', 'walter shewhart', 'quality engineering',
    'cnc turning', 'core fundamentals', 'signal or noise',
  ],

  /* Timestamps are the FINAL render's (2026-10-21, 10:09.6 finished), from the synced timing that
     also wrote the YouTube chapters (voice-engine/chapters.py). The video's last chapter ("Next
     page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'The careful operator who makes it worse' },
    { t: 53, label: 'Quick answer — what SPC is' },
    { t: 110, label: 'Common cause vs special cause variation' },
    { t: 175, label: 'The X bar and R chart' },
    { t: 249, label: 'Control limits vs specification limits' },
    { t: 329, label: 'How to read a control chart' },
    { t: 383, label: 'Which control chart to use' },
    { t: 435, label: 'Tampering — why chasing parts backfires' },
    { t: 511, label: 'Recap' },
    { t: 551, label: 'The Booklet Page' },
  ],

  /* The abbreviations the narration spells out (VIDEO07_ABBRS). */
  abbr: [
    { term: 'SPC', full: 'Statistical Process Control' },
  ],

  /* The choices made when a control chart is set up and read — the web version of the CONTROL
     PARAMETERS rail on the video's recap and Booklet Page (VIDEO07_CONTROLS). Directions only: this
     page quotes no group size, interval, rule count or limit value, on purpose. */
  controls: {
    note: 'ACT ON SIGNALS, NOT NOISE',
    items: [
      { family: 'Sampling', symbol: '▦', name: 'Group size', effect: 'Bigger sees smaller changes, costs more checks' },
      { family: 'Sampling', symbol: '⏱', name: 'Interval', effect: 'More often catches changes sooner' },
      { family: 'Sampling', symbol: '⇉', name: 'In a row', effect: 'Keeps the group to day-to-day wobble' },
      { family: 'Limits', symbol: '≡', name: 'Limit basis', effect: 'A calm stretch of its own data, never the drawing' },
      { family: 'Limits', symbol: '↔', name: 'Limit width', effect: 'Tighter rings more false alarms, wider misses more' },
      { family: 'Limits', symbol: '⟳', name: 'Recalculate', effect: 'Only after a deliberate change' },
      { family: 'Reading', symbol: '⚑', name: 'Pattern tests', effect: 'More tests catch sooner, ring more often' },
      { family: 'Reading', symbol: '▤', name: 'Chart type', effect: 'Fits the data: groups, one at a time, pass/fail' },
      { family: 'Reaction', symbol: '⇅', name: 'Adjust', effect: 'Only on a signal; chasing noise widens the spread' },
    ],
  },

  /* Verbatim from the video's Booklet Page (07-statistical-process-control/booklet-page-07.png,
     source rows SPC_ROWS in video-engine/src/SpcPage07.tsx). */
  takeaways: [
    { k: 'Common or Special Cause', v: 'Many small causes are always there and belong to the system. A special cause has a name; find it and remove it.' },
    { k: 'Limits from the Process', v: 'Plot in time order around a centre line. The limits sit three sigma out, from small groups taken in a row over a calm stretch. Read the ranges first.' },
    { k: 'Limits Are Not Tolerances', v: 'Control limits are the voice of the process; tolerances, the voice of the customer. Never draw tolerances on a chart of averages. Stable is not capable.' },
    { k: 'Read the Signals', v: 'A point outside, a long run on one side, a steady climb. Go and look, then write down what you found.' },
    { k: 'Leave the Noise Alone', v: 'Adjust only on a signal. Change the system to shrink the wobble. Recalculate only after a real change.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'Every process wobbles. The skill is telling that wobble from a real change, because the two need opposite reactions: a real change gets found and removed, and the wobble gets left alone. The map:',
  digest: [
    { t: 110, title: 'Common cause vs special cause', line: 'Your drive to work never takes the same time twice, because lights, traffic and weather each add a little. That is common cause. Road works closing a lane is a special cause, with a name. On a lathe, bar hardness, tool vibration, warmth and the gauge pile the sizes into a bell whose width is sigma. A special cause is found and removed at the machine; common cause only shrinks when someone changes the system.' },
    { t: 175, title: 'The X bar and R chart', line: 'Each hour the operator measures a few shafts made one after another, a subgroup. Its average goes on one chart and its range on a second chart under it. Read the ranges first, because the limits on the averages come from them. The limits sit three sigma from the centre line, from a calm stretch of the process’s own data. Draw them tighter and the chart rings like a car alarm; wider and a real change slips through.' },
    { t: 249, title: 'Control limits vs specification limits', line: 'The tolerance comes from the drawing, the voice of the customer. The control limits come from the data, the voice of the process. Averages huddle closer to the middle than single parts, so a tolerance drawn on a chart of averages can hide a shaft that is out. In control and in tolerance are two separate questions, and stable is not the same as capable.' },
    { t: 329, title: 'How to read a control chart', line: 'A single point outside a limit says go and look, and sometimes the cause is the gauge. A long run on one side of the centre line is quieter: a new insert went in and the centre moved. A steady climb is the insert wearing, and it shows before any shaft leaves the tolerance. Each chart comes with a reaction plan: who acts, what they check first, and a note of what they found.' },
    { t: 383, title: 'Which control chart to use', line: 'A size measured a few at a time, in a row, gets averages and ranges. One reading at a time gets an individuals chart; read it too fast from a slow process and the limits come out too tight. A pass or fail gauge gets a chart of the share that fails, with bigger samples. The rest is a handful of choices about group size, how often you check and which patterns you watch for.' },
    { t: 435, title: 'Tampering — why chasing parts backfires', line: 'A shaft comes out big partly by chance. Nudge the tool to correct it, and that chance is copied into the machine, so the chased shafts spread wider than ones left alone. To shrink the wobble itself, change the system: a stiffer setup, a better insert, steadier coolant. Then work the limits out again from the new data and freeze them. Never widen them to swallow an awkward point.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'An operator measures each shaft that comes off the machine. If it is a little big, the tool gets nudged in; a little small, and it is nudged back. It is careful work, and it makes the shafts worse. The opposite mistake costs just as much: a tool slowly wears down, the sizes creep up inside the day-to-day wobble, and nobody notices until a crate of shafts goes in the scrap bin. Both come from the same gap, not knowing a real change in a process from its ordinary variation.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'A control chart plots the measurements a process makes, in the order it makes them. A centre line marks the average, and two control limits sit either side at three times the natural spread, worked out from the process’s own data. Points that wobble between the limits with no pattern come from common cause, many small causes that are always there. A point outside the limits, or a long run on one side of the centre line, comes from a special cause, one thing that changed and has a name. A signal means go and find the cause; no signal means leave the machine alone. And the limits come from the process, never from the drawing: mix them up with the tolerance, and a chart can hide a bad part.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '03', note: 'Where a tolerance should come from, the voice of the customer.' },
    { page: '06', note: 'The pump’s motor current, one reading at a time, gets an individuals chart.' },
  ],
});
