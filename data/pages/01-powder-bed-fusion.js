/* Page 01 — Powder Bed Fusion (Metal 3D Printing) Explained  (section: Manufacturing) */
BOOKLET.addPage({
  id: '01',
  pageNo: '01',
  slug: 'powder-bed-fusion',
  section: 'manufacturing',
  topicId: 'A1',
  title: 'Powder Bed Fusion (Metal 3D Printing) Explained',
  summary:
    'A laser melts metal powder layer by layer into a fully dense part. Here is the mechanism, the two ways the melting goes wrong, and why a part that looks perfect can crack weeks later.',
  runtime: '9:25',
  published: '2026-09-11',
  status: 'published',
  youtubeId: 'ioIbXXw9Pio',
  bookletPageImage: 'assets/img/booklet-page-01.png',
  keywords: [
    'powder bed fusion', 'PBF', 'LPBF', 'SLM', 'DMLS', 'metal 3d printing',
    'additive manufacturing', 'porosity', 'lack of fusion', 'keyhole',
    'residual stress', 'supports', 'anisotropy', 'HIP', 'build orientation',
  ],

  chapters: [
    { t: 0, label: 'A part that cracks weeks later' },
    { t: 63, label: 'Quick answer — what powder bed fusion is' },
    { t: 131, label: 'Inside the machine: recoater, scanner, melt pool' },
    { t: 180, label: 'Two ways it goes wrong: porosity' },
    { t: 255, label: 'Residual stress & support structures' },
    { t: 345, label: 'Anisotropy — why build direction matters' },
    { t: 408, label: 'Hot isostatic pressing (HIP)' },
    { t: 463, label: 'Recap' },
    { t: 514, label: 'The Booklet Page' },
  ],

  abbr: [
    { term: 'CAD', full: 'Computer-Aided Design' },
    { term: 'HIP', full: 'Hot Isostatic Pressing' },
    { term: 'PBF', full: 'Powder Bed Fusion' },
  ],

  /* The knobs an engineer actually tunes on this process — the web version of
     the CONTROL PARAMETERS rail on the video's recap and Booklet Page.
     Effects are directional, never setpoints. */
  controls: {
    note: 'Energy density E = P / (v · h · t)',
    items: [
      { family: 'Powder', symbol: '', name: 'Powder: PSD + reuse', effect: 'Spreadability, packing, property drift' },
      { family: 'Energy', symbol: 'P', name: 'Laser power', effect: '↑ keyholing, ↓ lack of fusion' },
      { family: 'Energy', symbol: 'v', name: 'Scan speed', effect: 'Sets the energy dose with power' },
      { family: 'Energy', symbol: 'h', name: 'Hatch spacing', effect: 'Pass overlap — too wide leaves gaps' },
      { family: 'Energy', symbol: 't', name: 'Layer thickness', effect: 'Remelt depth vs build speed' },
      { family: 'Scan strategy', symbol: '↻', name: 'Scan pattern + rotation', effect: 'Steers residual stress and grain direction' },
      { family: 'Build setup', symbol: 'θ', name: 'Orientation + supports', effect: 'Anisotropy, warping, surface, cost' },
      { family: 'Atmosphere', symbol: '≈', name: 'Inert gas + preheat', effect: 'Limits oxidation; preheat lowers stress' },
      { family: 'Post-processing', symbol: '✓', name: 'Stress relief + HIP', effect: 'Release locked-in stress, then close pores' },
    ],
  },

  takeaways: [
    { k: 'The Process', v: 'A laser scans and melts thin layers of metal powder, one cross-section at a time, fusing each new layer to the one below until a fully dense part has grown from the plate up.' },
    { k: 'Lack-of-Fusion vs. Keyhole', v: 'Too little energy leaves irregular unmelted gaps between layers; too much punches a vapour cavity that collapses into a trapped round pore. The right settings sit in the window between the two.' },
    { k: 'Residual Stress & Supports', v: 'Repeated heating and cooling locks stress into the part as it builds, pulling it to warp or crack. Supports anchor it and carry heat away; stress relief on the plate releases it safely.' },
    { k: 'Anisotropic Grain Structure', v: 'Grains grow in long columns along the build direction instead of the random structure of cast or forged metal, so properties can differ with how the part was oriented on the plate.' },
    { k: 'Stress Relief & HIP', v: 'Heat treatment on the plate releases locked-in stress before cut-off. Hot isostatic pressing then uses heat and pressure to close remaining porosity, closing the gap to wrought fatigue life.' },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the
     full mechanism lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'The build is the easy part. All that repeated heating and cooling is what changes the metal, and it is where the video spends its time. The map:',
  digest: [
    { t: 131, title: 'Inside the machine', line: 'Powder supply, recoater, galvo scanner and the melt pool that fuses each new layer into the one below.' },
    { t: 180, title: 'Two ways it goes wrong', line: 'Too little energy leaves lack-of-fusion gaps; too much punches a keyhole that collapses into a trapped void.' },
    { t: 255, title: 'Residual stress and supports', line: 'Each melt fights the cold metal around it and locks in stress, which is why supports and a stress-relief step are not optional.' },
    { t: 345, title: 'Why build direction matters', line: 'Grains grow toward the escaping heat, so strength and ductility differ along the build versus across it.' },
    { t: 408, title: 'Hot isostatic pressing', line: 'A sealed vessel squeezes the part hot from every side, closing the fine internal pores for real fatigue life.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'You send a bracket out to be printed in titanium. It comes back looking perfect, smooth and dense, exactly the shape you modelled. Three weeks later it is in the field and it cracks along a line nobody predicted. Nothing about the geometry was wrong. The problem was baked in while the part was still being built, layer by layer.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'Powder bed fusion is a metal 3D printing process. A thin layer of fine metal powder is spread across a build plate, thinner than a sheet of paper. A laser, or in some machines an electron beam, melts the powder exactly where the part needs solid metal. The plate drops one layer, fresh powder is spread on top, and the laser fuses the new layer to the one underneath. Repeat that tens of thousands of times and a fully dense metal part has grown out of the powder, with no mould and no cutting tool.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [{ page: '00', note: 'How every page on this site is structured.' }],
});
