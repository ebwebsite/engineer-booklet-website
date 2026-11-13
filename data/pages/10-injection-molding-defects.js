/* Page 10 — Injection Molding Defects: Which One Do You Fix First?  (section: Manufacturing) */
BOOKLET.addPage({
  id: '10',
  pageNo: '10',
  slug: 'injection-molding-defects',
  section: 'manufacturing',
  topicId: 'A4',
  title: 'Injection Molding Defects: Which One Do You Fix First?',
  summary:
    'A new mould makes its first shot and it is short at the far end, with flash along the seam, a sink mark over the boss and a weld line under the hole. Where a defect sits says which part of the flow went wrong, and when it formed says which stage of the cycle. Along the way: fill, pack, cool and eject, short shot and burn marks, flash and the parting line, weld lines, flow lines and jetting, hold pressure and the gate freeze study, sink marks and voids, warpage, ejector pin marks and draft, splay from wet pellets, scientific moulding, and the defect that no setting can fix.',
  runtime: '9:57',
  published: '2026-11-13',
  status: 'published',
  youtubeId: 'MoMp8SbGBf4',
  bookletPageImage: 'assets/img/booklet-page-10.png',
  thumbnail: 'assets/img/thumb-10.jpg',
  keywords: [
    'injection molding defects', 'injection moulding defects', 'injection molding troubleshooting',
    'injection molding defects and solutions', 'short shot', 'flash defect', 'parting line', 'weld line',
    'flow lines', 'jetting', 'sink marks', 'voids', 'warpage', 'hold pressure', 'gate freeze study', 'splay',
    'ejector pin marks', 'draft', 'scientific molding', 'injection molding cycle', 'manufacturing processes',
    'engineering',
  ],

  /* Timestamps are the FINAL render's (2026-11-13), from the synced timing that also wrote the YouTube
     chapters (voice-engine/chapters.py --check: description.md is current). The video's last chapter
     ("Next page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'Injection molding defects: which one first?' },
    { t: 55, label: 'The injection molding cycle' },
    { t: 110, label: 'How injection molding works' },
    { t: 174, label: 'Short shot and burn marks in injection molding' },
    { t: 215, label: 'Flash defect and the parting line' },
    { t: 248, label: 'Weld lines, flow lines and jetting' },
    { t: 274, label: 'Hold pressure and the gate freeze study' },
    { t: 305, label: 'Sink marks and voids in injection molding' },
    { t: 328, label: 'Distortion in injection molding' },
    { t: 381, label: 'Ejector pin marks and draft' },
    { t: 390, label: 'Splay: silver streaks from wet plastic' },
    { t: 426, label: 'Scientific molding: one change at a time' },
    { t: 444, label: 'Injection molding design guidelines' },
    { t: 491, label: 'Recap' },
    { t: 538, label: 'The Booklet Page' },
  ],

  /* No abbreviation is spelled out in the narration. */
  abbr: [],

  /* The knobs of a moulding cycle: the web version of the CONTROL PARAMETERS rail on the video's recap and
     Booklet Page (VIDEO10_CONTROLS, in the rail's short wording). Directions only, no values. */
  controls: {
    note: 'A SETTING HAS A DEFECT AT EACH END; GOOD PARTS LIVE IN THE WINDOW BETWEEN',
    items: [
      { family: 'Material', symbol: '◌', name: 'Drying', effect: 'Wet resin gives splay' },
      { family: 'Fill', symbol: '♨', name: 'Melt temperature', effect: '↓ short, weak welds; ↑ flash' },
      { family: 'Fill', symbol: '▣', name: 'Shot size', effect: '↓ short; ↑ flash' },
      { family: 'Fill', symbol: '»', name: 'Injection speed', effect: '↓ flow lines; ↑ burns' },
      { family: 'Pack', symbol: 'P', name: 'Hold pressure', effect: '↓ sink, voids; ↑ flash' },
      { family: 'Pack', symbol: '⏱', name: 'Hold time', effect: 'Until the gate freezes' },
      { family: 'Cool', symbol: '♨', name: 'Mould temperature', effect: 'Uneven gives distortion' },
      { family: 'Cool', symbol: '⏱', name: 'Cooling time', effect: '↓ distortion, pin marks' },
      { family: 'Tool', symbol: '≡', name: 'Vents', effect: 'Blocked gives burns' },
      { family: 'Tool', symbol: '‖', name: 'Clamp and seam', effect: 'Low or worn gives flash' },
      { family: 'Tool', symbol: '●', name: 'Gate', effect: 'Put it by the thickest part' },
      { family: 'Design', symbol: '▭', name: 'Walls', effect: 'Thick gives sink; keep even' },
      { family: 'Design', symbol: '⊥', name: 'Ribs', effect: 'Thinner than the wall' },
      { family: 'Design', symbol: '◿', name: 'Draft', effect: 'None gives drag' },
    ],
  },

  /* Verbatim from the video's Booklet Page (10-injection-molding-defects/booklet-page-10.png,
     source rows MOULD_ROWS in video-engine/src/MouldPage10.tsx). */
  takeaways: [
    { k: 'Read the Defect', v: 'Where it sits on the part, and when in the cycle it formed, point to its cause. Fix in the order fill, pack, cool, eject.' },
    { k: 'Fill', v: 'The melt runs from the gate and freezes from the walls in: short fills at the far end, weld lines where fronts meet, burns where air is trapped, flash where the seam lets go.' },
    { k: 'Pack', v: 'Plastic shrinks; hold pressure feeds it until the gate freezes. Thick sections far from the gate sink or form voids; too much packing flashes and sticks.' },
    { k: 'Cool and Eject', v: 'Uneven heat means uneven shrinkage, which means distortion, and it keeps shrinking on the bench. It needs draft to slide off.' },
    { k: 'One Setting, One Way', v: 'Change one thing at a time, then read the parts. If nothing changed, find what did; if a setting has no window, fix the drawing or the tool.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter: the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'A defect is a reading: where it sits and when in the cycle it formed point to its cause. Fix them in the order the part is made, fill, then pack, then cool and eject. The map:',
  digest: [
    { t: 55, title: 'The injection molding cycle', line: 'The cycle has four moves, fill, pack, cool and eject, and each defect is born in one of them. Most settings have a defect at each end, and good parts come out in the window between. Fix in the order the bracket is made, since a bracket that is not full has nothing to pack.' },
    { t: 110, title: 'How injection molding works', line: 'A glue gun is the small version: a heated chamber melts the stick and a nozzle pushes it out. A moulding press does the same with pellets, a screw and a clamped mould. The plastic freezes into a skin on the cold steel while the core keeps flowing, so a defect has an address.' },
    { t: 174, title: 'Short shot and burn marks in injection molding', line: 'Plastic enters at the gate and fills toward the far corners, where the vents are. If it freezes or runs out first, the far end is left short. If the air cannot leave ahead of it, the trapped air scorches the plastic and leaves a burn.' },
    { t: 215, title: 'Flash defect and the parting line', line: 'The seam on a plastic toy is the parting line, where the two halves of the mould met. Where they do not seal, a thin film squeezes out as flash. The clamp has to beat the push of the plastic, so pressure has a defect at each end, short at one and flash at the other.' },
    { t: 248, title: 'Weld lines, flow lines and jetting', line: 'Where two fronts meet below the hole, their skins have cooled and never blend fully, so the weld line is weaker than the rest. Speed has two ends too: too slow leaves ripples called flow lines, and too fast through a small gate sends the plastic in as a snake, called jetting.' },
    { t: 274, title: 'Hold pressure and the gate freeze study', line: 'Plastic shrinks as it cools, so the screw keeps pushing more in. That push is the hold pressure. Weigh parts held a little longer each time until the reading stops rising: the gate, the narrowest point, has frozen shut.' },
    { t: 305, title: 'Sink marks and voids in injection molding', line: 'A thick boss far from the gate keeps shrinking after the rest has set. It pulls the surface in as a sink mark, or tears open inside as a void if the skin is stiff. More hold pressure helps, up to the point where it flashes or sticks.' },
    { t: 328, title: 'Distortion in injection molding', line: 'Out of the tool the part keeps shrinking, and where it stays hot longer it shrinks more. A wall that cools faster on one face bends toward the hotter face, and the corner inside the L runs hotter and pulls the upright in. Cool the hot side harder and keep both halves of the tool at one temperature.' },
    { t: 381, title: 'Ejector pin marks and draft', line: 'Then the part has to come off. A wall with no draft drags along the steel, and pins pushing on a bracket that is hot or packed too hard leave their marks.' },
    { t: 390, title: 'Splay: silver streaks from wet plastic', line: 'Monday’s parts were fine, Tuesday’s show silver streaks fanning out from the gate, and nobody touched a setting. The pellets soaked up water overnight and the steam left the streaks. Drying fixes it, not a setting, and the cause has a name on the statistical process control page.' },
    { t: 426, title: 'Scientific molding: one change at a time', line: 'When a setting really is the fix, change one, one way, let a few shots settle and read the next parts. Set the fill first, then the pack, then the cooling, each on its own, so one fix never hides inside another.' },
    { t: 444, title: 'Injection molding design guidelines', line: 'Some defects have no window. Pushing the hold pressure until the seam flashes does not remove the sink over the boss, because the walls between it and the gate froze first. The fix is in the tool or on the drawing, and the press tunes the rest.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'The first shot from a brand new mould is in trouble. It is short at the far end, with flash along the seam, a sink mark over the boss and a weld line under the hole. Which one do you fix first? And a fifth waits on the bench, because as the bracket cools, its upright bows in. Push the pressure up to fill the far end and the next one has more flash. Turn it down and it is short again. Nothing on the press is wrong, so why does each fix make a new defect?',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'A defect is a reading. Where it sits on the part, and when in the cycle it formed, point to its cause. The cycle has four moves, fill, pack, cool and eject, and each defect is born in one of them. Most settings have a defect at each end, and good parts come out in the window between, so fix in the order the part is made. Change one setting, one way, and read the next parts. If the same settings made good parts yesterday, find out what changed first. And some defects sit on the drawing, out of reach of any setting.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '04', note: 'Even walls, thin ribs and draft: the drawing rules for the defect no setting can fix.' },
    { page: '07', note: 'When good parts go bad on the same settings, a special cause with a name, like the Tuesday pellets.' },
    { page: '09', note: 'Last week’s bend opened when the tool let go; the corner of this bracket closes.' },
  ],
});
