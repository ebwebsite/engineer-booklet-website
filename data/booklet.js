/* ==========================================================================
   Engineer Booklet — site content: channel info + the six sections.
   --------------------------------------------------------------------------
   This file defines the TAXONOMY (the tabs down the left side).
   Individual video pages live in data/pages/*.js and register themselves
   with BOOKLET.addPage(). See README.md → "Adding a new page".
   ========================================================================== */

window.BOOKLET = {
  channel: {
    name: 'Engineer Booklet',
    tagline: 'A reference manual for working engineers',
    /* One concept per video. Each video is one page of the booklet. */
    blurb:
      'One engineering concept per video, at the depth the job actually needs. ' +
      'Every page follows the same five steps and is built to still be right in five years.',
    handle: '@engineerbooklet',
    youtube: 'https://www.youtube.com/@engineerbooklet',
    /* Fill these in when they exist. Empty string = link is hidden. */
    email: '',
    instagram: '',
    linkedin: '',
  },

  /* The five fixed steps of every page — mirrors video-engine/src/theme.ts.
     The page body is laid out in these steps, and the right-hand rail is a
     web version of the progress bar that runs across the bottom of every video. */
  steps: [
    { id: 1, key: 'problem', label: 'Problem',
      desc: 'Something that went wrong on a real part. A crack, a reject, a line stopped.' },
    { id: 2, key: 'quick-answer', label: 'Quick Answer',
      desc: 'The fast pass. Enough to hold your own in a meeting in five minutes.' },
    { id: 3, key: 'deep-dive', label: 'Deep Dive',
      desc: 'Where most of the runtime lives. The mechanism, the rule that holds, the failure modes.' },
    { id: 4, key: 'recap', label: 'Recap',
      desc: 'The whole page tied back together in a few lines.' },
    { id: 5, key: 'booklet-page', label: 'Booklet Page',
      desc: 'One frame with everything on it. Pause it, screenshot it, keep it.' },
  ],

  /* ---------------------------------------------------------------------
     SECTIONS = the tabs. Order here is the order in the sidebar.
     `kind: 'feed'` marks the two pseudo-tabs (NEW, START HERE) that hold no
     pillar of their own. `letter` is the pillar id from the channel plan.
     `upcoming` teases exactly ONE coming topic per section (greyed under the
     tab) — we deliberately don't publish the full roadmap or how many are planned.
     --------------------------------------------------------------------- */
  sections: [
    {
      id: 'new',
      kind: 'feed',
      short: 'New',
      title: 'Newest page',
      icon: 'i-new',
      blurb: 'The page published most recently. Start here if you already know the channel.',
    },
    {
      id: 'start-here',
      kind: 'feed',
      short: 'Start here',
      title: 'Start here',
      icon: 'i-book',
      blurb: 'What this channel is, how a page is built, and how to use it as a reference.',
    },
    {
      id: 'manufacturing',
      letter: 'A',
      short: 'Manufacturing',
      title: 'Manufacturing Processes',
      icon: 'i-bracket',
      blurb:
        'How parts are actually made. Metal 3D printing, CNC, injection molding, casting — the tolerances you can really hold and the defects that show up in production.',
      /* One teaser only — we don't publish the roadmap or its size. This
         must match the title of whichever page is actually next, not just
         any topic in the bank — page 01 is fully drafted and next in line,
         so it's this, not CNC (which hasn't been started). Swap it for the
         following page's title once 01 actually publishes. */
      upcoming: ['Powder Bed Fusion (Metal 3D Printing) Explained'],
    },
    {
      id: 'reliability',
      letter: 'B',
      short: 'Reliability',
      title: 'Reliability & Failure',
      icon: 'i-crack',
      blurb:
        'Why things break and how to catch it on paper first. FMEA, root cause, fatigue, Weibull, SPC, inspection.',
      upcoming: ['FMEA Explained: The Method Most Engineers Fill In Wrong'],
    },
    {
      id: 'product-development',
      letter: 'C',
      short: 'Product Dev',
      title: 'Product Development',
      icon: 'i-sheet',
      blurb:
        'How a design gets from sketch to production line in one piece. DFM, GD&T, tolerance stack-up, design reviews, industrialization.',
      upcoming: ['Design for Manufacturing (DFM): The Rule Every New Engineer Breaks'],
    },
    {
      id: 'automation',
      letter: 'D',
      short: 'Automation',
      title: 'Automation & Controls',
      icon: 'i-sensor',
      blurb:
        'How a factory knows what is happening on its own floor. Sensors, PLCs, SCADA, machine vision, predictive maintenance.',
      upcoming: ['Industrial IoT Sensors 101: How Factories Actually Monitor Equipment'],
    },
    {
      id: 'fundamentals',
      letter: 'E',
      short: 'Fundamentals',
      title: 'Core Fundamentals',
      icon: 'i-caliper',
      blurb:
        "The things that don't change. Stress and strain, material selection, process capability, bearings, bolted joints.",
      upcoming: ['Stress vs Strain: The Difference Your Textbook Skipped'],
    },
    {
      id: 'tools',
      letter: 'F',
      short: 'Tools',
      title: 'Tools & Software',
      icon: 'i-monitor',
      blurb:
        "What is happening under the hood when you hit simulate. CAD, FEA, PLM, CAM, and where the model stops matching the part.",
      upcoming: ["CAD Parametric Modeling: What's Actually Happening Under the Hood"],
    },
  ],

  pages: [],
  addPage(page) {
    this.pages.push(page);
  },
};
