/* Page 08 — Parametric CAD Modeling: Why One Edit Breaks the Whole Model  (section: Tools & Software) */
BOOKLET.addPage({
  id: '08',
  pageNo: '08',
  slug: 'parametric-cad-modeling',
  section: 'tools',
  topicId: 'F1',
  title: 'Parametric CAD Modeling: Why One Edit Breaks the Whole Model',
  summary:
    'You shorten a bracket’s base a little, rebuild, and features you never touched fill with errors. What a parametric CAD model really stores, how a sketch is solved, how design intent decides what one edit does, why errors cascade from a parent to its children, and how a face can be renamed with no error at all.',
  runtime: '9:58',
  published: '2026-10-30',
  status: 'published',
  youtubeId: 'MA8GbA3avv0',
  bookletPageImage: 'assets/img/booklet-page-08.png',
  thumbnail: 'assets/img/thumb-08.jpg',
  keywords: [
    'parametric cad modeling', 'parametric modeling', 'cad', 'feature tree', 'design intent',
    'sketch constraints', 'fully defined sketch', 'degrees of freedom', 'constraint solver',
    'rebuild errors', 'parent and child features', 'topological naming problem', 'persistent naming',
    'direct modeling', 'history-based modeling', 'step file', 'geometry kernel', 'over-defined sketch',
    'cad model breaks', 'tools and software', 'engineering design', 'cad rebuild error',
  ],

  /* Timestamps are the FINAL render's (2026-10-27, 9:57.8 finished), from the synced timing that
     also wrote the YouTube chapters (voice-engine/chapters.py). The video's last chapter ("Next
     page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'Why one edit breaks a CAD model' },
    { t: 50, label: 'What is parametric modeling' },
    { t: 117, label: 'The feature tree and the rebuild' },
    { t: 165, label: 'Sketch constraints and fully defined sketches' },
    { t: 236, label: 'Design intent in CAD' },
    { t: 309, label: 'Why rebuild errors cascade (parent and child)' },
    { t: 372, label: 'The topological naming problem' },
    { t: 431, label: 'Parametric vs direct modeling' },
    { t: 479, label: 'Where the model stops matching the part' },
    { t: 506, label: 'Recap' },
    { t: 544, label: 'The Booklet Page' },
  ],

  /* The abbreviations the narration spells out (VIDEO08_ABBRS). */
  abbr: [
    { term: 'CAD', full: 'Computer-Aided Design' },
    { term: 'PDF', full: 'Portable Document Format' },
    { term: 'STEP', full: 'Standard for the Exchange of Product Model Data' },
  ],

  /* The choices made when a model is set up and edited — the web version of the CONTROL PARAMETERS
     rail on the video's recap and Booklet Page (VIDEO08_CONTROLS, in the rail's short wording).
     Directions only: this page quotes no size, count or tolerance, on purpose. */
  controls: {
    note: 'THE RECIPE DECIDES WHAT ONE EDIT DOES',
    items: [
      { family: 'Sketch', symbol: '◇', name: 'Sketch definition', effect: 'Fully defined' },
      { family: 'Sketch', symbol: '=', name: 'Relations', effect: 'Hold intent' },
      { family: 'Dimensions', symbol: '⟷', name: 'Dimension origin', effect: 'From the function' },
      { family: 'Dimensions', symbol: '⛓', name: 'Linked sizes', effect: 'Move together' },
      { family: 'Dimensions', symbol: '＋', name: 'Extra dimensions', effect: 'One per freedom' },
      { family: 'References', symbol: '⚓︎', name: 'What features hang on', effect: 'Planes, axes' },
      { family: 'Tree', symbol: '↓', name: 'Feature order', effect: 'Rounded last' },
      { family: 'Tree', symbol: '①', name: 'First error', effect: 'Topmost first' },
      { family: 'Model', symbol: '⇄', name: 'History or direct', effect: 'Intent or speed' },
    ],
  },

  /* Verbatim from the video's Booklet Page (08-cad-parametric-modeling/booklet-page-08.png,
     source rows CAD_ROWS in video-engine/src/CadPage08.tsx). */
  takeaways: [
    { k: 'A Model Is a Recipe', v: 'An ordered list of features and their numbers. A rebuild re-runs it from the change down; each feature sees only what is above it. A STEP file keeps the shape, not the recipe.' },
    { k: 'Sketches Are Solved', v: 'Rules and dimensions take the freedoms away. Fully defined means nothing left to move; a free sketch can slide or flip; one rule per freedom.' },
    { k: 'Design Intent', v: 'Choose what each size measures from and what moves together. Two identical shapes can change differently; one recipe can make a family.' },
    { k: 'Parents and Children', v: 'Features hang on earlier faces and edges. Fix the topmost error first; round the edges last.' },
    { k: 'Stable References', v: 'A face can be renamed after an edit and carry a feature away with no error. Hang features on planes, axes and your own sketches.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'A CAD model is not a shape, it is a recipe, and an edit re-runs the recipe. Most of the surprises come from what the recipe does not say. The map:',
  digest: [
    { t: 50, title: 'What is parametric modeling', line: 'Think of flat-pack furniture, where each step fixes parts onto the ones before it. Put one panel on back to front at step three and you undo every later step, then redo them. A CAD model is built the same way: the file’s source of truth is a recipe, a list of features and the numbers that drive them, and the shape on screen is its latest result.' },
    { t: 117, title: 'The feature tree and the rebuild', line: 'A piece of the program called the geometry kernel turns each feature into faces and edges. After an edit the program works down the list, re-running the edited feature and each one built on it, and the rows above are not touched. A feature can only see what is above it, so rolling back to an earlier row switches the later ones off.' },
    { t: 165, title: 'Sketch constraints and fully defined sketches', line: 'A picture on one nail hangs tilted, because it is still free to turn about that nail; a second nail takes the last freedom away. A sketch is held by rules the same way. A freehand profile has degrees of freedom left, rules take them away, and named dimensions fix the sizes. Even then a fully defined sketch can have a mirror answer, which is the first break: the upright folds over.' },
    { t: 236, title: 'Design intent in CAD', line: 'Two identical brackets, widened by the same amount: the holes stay centred in one and drift in the other. One measures its holes from the near end, the other keeps them symmetric about the middle. Which is right depends on the job, and the model cannot know it, so you tell it. That choice is design intent, kept in the rules, dimensions, references and order.' },
    { t: 309, title: 'Why rebuild errors cascade (parent and child)', line: 'The tree is really a web of dependencies shown as a list. Shorten the base, and holes measured from the bend end up beyond it with no material to cut. The pattern built on them fails too, while the rounded edges survive because nothing they hang on changed. That is the second break: fix the topmost error first, and the rest often recover.' },
    { t: 372, title: 'The topological naming problem', line: 'Each face has a name the program gave it from how it was made, and the hole sketch hangs on that name. Add a lip and the names after it move along, so the holes follow a name onto another face, and the model shows no error. That is the third break, the silent one. The fix is a habit: hang the sketch on a plane you made.' },
    { t: 431, title: 'Parametric vs direct modeling', line: 'Direct modeling works another way: grab a face and push it, and the shape changes as it is now, with no recipe behind it. It is fast, but nothing remembers why. A STEP file carries the finished solid but not the feature tree, the way a PDF keeps where each piece sits on the page but not the paragraphs and styles behind it.' },
    { t: 479, title: 'Where the model stops matching the part', line: 'The Tools section keeps asking one question: where does the model stop matching the real thing? The model has exact sizes, and the real part has a tolerance. It has sharp inside corners, and the cutter leaves a radius. And a perfect bend is the last row, because a real bend opens a little once the tool lets go.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'You open a bracket you modelled last month and shorten its base a little. You rebuild, and features you never touched fill with errors. A second puzzle makes it worse: two identical brackets, both made wider, and the holes stay centred in one while they drift to one side in the other. The worst case comes with no error at all, so nothing warns you. All three come from the same gap, not knowing what a parametric model actually stores.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'A parametric model is a recipe, shown as the feature tree: an ordered list of features and the numbers that drive them. The shape on screen is the latest result. After an edit the program re-runs the edited feature and each one built on it, in order, and leaves the ones above alone. That is why one edit can break features you never touched. Sketches are held by rules until nothing is left free, design intent decides what moves together, features hang on earlier faces and edges, and a face can be renamed by an edit and carry a feature away with no error. Hang features on planes, axes and your own sketches.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '03', note: 'Where the hole spacing a model carries should come from, the voice of the customer.' },
    { page: '04', note: 'The model is exact on screen, and the object still has to be made.' },
  ],
});
