/* Page 09 — Sheet Metal Springback: Why a Bend Opens When the Tool Lets Go  (section: Manufacturing) */
BOOKLET.addPage({
  id: '09',
  pageNo: '09',
  slug: 'sheet-metal-springback',
  section: 'manufacturing',
  topicId: 'A5',
  title: 'Sheet Metal Springback: Why a Bend Opens When the Tool Lets Go',
  summary:
    'A press brake bends a bracket to a right angle, then the punch rises and the bend opens, though nothing slipped and nothing cracked. Where the angle goes, what makes it open more, and how the shop lands it anyway: elastic and plastic deformation, the stress strain curve, the elastic core, radius over thickness, strength over stiffness, air bending, bottoming and coining, stretch forming, sidewall curl and die compensation.',
  runtime: '9:49',
  published: '2026-11-06',
  status: 'published',
  youtubeId: 'HgAAB0Nx2aU',
  bookletPageImage: 'assets/img/booklet-page-09.png',
  thumbnail: 'assets/img/thumb-09.jpg',
  keywords: [
    'sheet metal springback', 'springback in sheet metal', 'spring back', 'sheet metal bending', 'press brake',
    'bend angle', 'elastic and plastic deformation', 'stress strain curve', 'yield strength', 'youngs modulus',
    'neutral axis', 'k-factor', 'minimum bend radius', 'air bending', 'bottoming and coining', 'overbend',
    'stretch forming', 'sidewall curl', 'springback compensation', 'manufacturing processes', 'sheet metal forming',
  ],

  /* Timestamps are the FINAL render's (2026-11-06), from the synced timing that also wrote the YouTube
     chapters (voice-engine/chapters.py). The video's last chapter ("Next page") is a teaser, so it is
     not listed here. */
  chapters: [
    { t: 0, label: 'Why a sheet metal bend opens on the press brake' },
    { t: 52, label: 'What is springback in sheet metal' },
    { t: 118, label: 'Elastic and plastic deformation' },
    { t: 145, label: 'Springback on the stress strain curve' },
    { t: 186, label: 'Neutral axis, K-factor and the elastic core' },
    { t: 239, label: 'What makes springback bigger' },
    { t: 295, label: 'Bend radius and minimum bend radius' },
    { t: 327, label: 'Press brake air bending, bottoming and coining' },
    { t: 383, label: 'Stretch forming' },
    { t: 401, label: 'Sidewall curl and springback compensation' },
    { t: 447, label: 'Why a new coil changes the bend angle' },
    { t: 494, label: 'Recap' },
    { t: 534, label: 'The Booklet Page' },
  ],

  /* No abbreviation is spelled out in the narration. */
  abbr: [],

  /* The knobs of a bend: the web version of the CONTROL PARAMETERS rail on the video's recap and
     Booklet Page (VIDEO09_CONTROLS, in the rail's short wording). Directions only, no values. */
  controls: {
    note: 'SPRINGBACK GROWS WITH (RADIUS ÷ THICKNESS) × (STRENGTH ÷ STIFFNESS)',
    items: [
      { family: 'Material', symbol: '↑', name: 'Strength', effect: 'Stronger gives back more' },
      { family: 'Material', symbol: '↓', name: 'Stiffness', effect: 'Less stiff gives back more' },
      { family: 'Material', symbol: '≈', name: 'Coil to coil', effect: 'The angle moves' },
      { family: 'Geometry', symbol: '÷', name: 'Radius ÷ thickness', effect: 'Gentler gives back more' },
      { family: 'Geometry', symbol: '∠', name: 'Bend angle', effect: 'Bigger opens more' },
      { family: 'Tooling', symbol: 'V', name: 'V opening', effect: 'Wider, more springback' },
      { family: 'Tooling', symbol: '◇', name: 'Compensated die', effect: 'Cut off-shape on purpose' },
      { family: 'Method', symbol: '↘', name: 'Air bending + overbend', effect: 'Correct from a test bend' },
      { family: 'Method', symbol: '▣', name: 'Bottoming', effect: 'Less springback, more force' },
      { family: 'Method', symbol: '●', name: 'Coining', effect: 'Least springback, most force' },
      { family: 'Method', symbol: '⟷', name: 'Stretch, holder, beads', effect: 'Smaller elastic share' },
      { family: 'Control', symbol: '✓', name: 'First part of each coil', effect: 'Measure and correct' },
    ],
  },

  /* Verbatim from the video's Booklet Page (09-sheet-metal-springback/booklet-page-09.png,
     source rows FORM_ROWS in video-engine/src/FormPage09.tsx). */
  takeaways: [
    { k: 'What Springback Is', v: 'The elastic part of a bend comes back when the tool lets go. The part keeps the permanent part; the angle opens and the radius grows.' },
    { k: 'Through the Thickness', v: 'The outside stretches, the inside squeezes, both yield; an elastic core near the neutral axis gives its share back, and stress stays locked in.' },
    { k: 'What Makes It Bigger', v: '(Radius ÷ thickness) × (strength ÷ stiffness). Gentle bends, stronger grades and less stiff metals give back most; the minimum bend radius is the floor.' },
    { k: 'Landing the Angle', v: 'Bend past it; bottom or coin it; stretch it; cut the die off-shape on purpose. Each takes more force, more tooling or a test bend.' },
    { k: 'Why It Moves', v: 'A new coil can move the angle on the same program; walls can curl and long parts twist. Check the first part of each coil and correct.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter: the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'Springback is what is left of a bend after the tool lets go: the elastic part comes back, the permanent part stays. Everything on the shop floor comes from living with the first and getting the second right. The map:',
  digest: [
    { t: 52, title: 'What is springback in sheet metal', line: 'Bend a wire coat hanger into a corner and let go, and it opens a little. A bend is part spring and part putty. The spring part comes back and the putty part stays, and the part that comes back is the springback.' },
    { t: 118, title: 'Elastic and plastic deformation', line: 'A bend that stays elastic gives all of it back, like the thin plate that bowed in the vice on the machining tolerances page. Past the yield strength the metal stretches for good, and only that permanent stretch is kept.' },
    { t: 145, title: 'Springback on the stress strain curve', line: 'Load a strip and it climbs a straight slope, then stretches for good past yield. Let go and the point slides back down a line parallel to the first slope. The elastic stretch is recovered, and that recovered stretch is where the angle went.' },
    { t: 186, title: 'Neutral axis, K-factor and the elastic core', line: 'Through the thickness the outside stretches and the inside squeezes, and one layer between them keeps its length. Near it the metal stays elastic, so that core unloads like a spring, the angle opens, and stress stays locked in after the release.' },
    { t: 239, title: 'What makes springback bigger', line: 'Two ratios multiplied together: the bend radius over the thickness, and the strength over the stiffness. Steels share almost the same stiffness, so strength decides among them, and aluminium is far less stiff and gives back more. Sort metals by grade and temper, not by name.' },
    { t: 295, title: 'Bend radius and minimum bend radius', line: 'One wire bent round a broom handle and then round a pencil: the gentle bend springs back more, because it leaves a thick elastic core. Tighter gives back less, until the outside cracks. That floor is the minimum bend radius.' },
    { t: 327, title: 'Press brake air bending, bottoming and coining', line: 'Four bends on one bracket. Air bending sets the angle by how deep the punch goes, so a bend that opened is answered with a deeper stroke. Bottoming presses the sheet onto the die faces and gives back less for more force; coining presses the tip into the bend until very little is left to give back.' },
    { t: 383, title: 'Stretch forming', line: 'Pull the sheet while you form it and the whole thickness goes past yield, so much less of the bend is elastic. The price is a thinner sheet. Car roofs and door panels are pressed with their edges held back for this reason.' },
    { t: 401, title: 'Sidewall curl and springback compensation', line: 'Springback is more than an angle: the walls of a top hat channel curl because of the locked-in stress. Hold the edges harder or add a bead. For a stamping die, simulation predicts the recovery and the die is cut off-shape on purpose.' },
    { t: 447, title: 'Why a new coil changes the bend angle', line: 'Standards allow a band for strength and thickness, so two coils inside it can bend differently on the same program. The angle holds around its centre line, then steps when the coil changes. Some brakes measure under load, ease off and finish the stroke.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'The press brake bends a bracket to a right angle and holds it in the tool. Then the punch rises and the bend opens up, though nothing slipped and nothing cracked. The model on the screen holds a perfect right angle, and the bracket on the desk comes out open. A second puzzle comes from the shop floor: the same brake, program and drawing, and the brackets from a new coil of the same steel land at a new angle. Both come from one thing, what a bend gives back when the tool lets go.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'Springback is the elastic part of a bend coming back when the tool lets go. The bracket keeps only the permanent part, so the angle opens and the radius grows. Through the thickness both faces yield around an elastic core, and stress stays locked in. It grows with the metal’s strength over its stiffness and with the bend radius over the thickness. To land the angle anyway, the shop bends past it, bottoms or coins the bend, stretches the sheet, or cuts the die off-shape on purpose, and measures the first bracket of each new coil.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '03', note: 'The thin plate that bowed in the vice: the same elastic recovery, in machining.' },
    { page: '04', note: 'The minimum bend radius, the floor under every bend on the drawing.' },
    { page: '07', note: 'The angle part after part, plotted: a step in the chart has a cause you can name.' },
    { page: '08', note: 'The model holds the right angle; the real part opens a little once the tool lets go.' },
  ],
});
