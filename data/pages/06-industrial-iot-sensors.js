/* Page 06 — Industrial IoT Sensors 101: How Factories Monitor Equipment  (section: Automation & Controls) */
BOOKLET.addPage({
  id: '06',
  pageNo: '06',
  slug: 'industrial-iot-sensors',
  section: 'automation',
  topicId: 'D1',
  title: 'Industrial IoT Sensors 101: How Factories Monitor Equipment',
  summary:
    'A cooling water pump runs for years, then its bearing seizes and the line stops, though the warning was there for weeks. What a factory actually measures on a machine, how each sensor works, where to mount it and how fast to read it, how the signal reaches a controller, and how to rank what the system raises: warning, alarm, trip.',
  runtime: '10:16',
  published: '2026-10-16',
  status: 'published',
  youtubeId: 'ZYbOcfnIo_4',
  bookletPageImage: 'assets/img/booklet-page-06.png',
  thumbnail: 'assets/img/thumb-06.jpg',
  keywords: [
    'industrial iot sensors', 'iiot', 'industrial internet of things', 'condition monitoring',
    'machine condition monitoring', 'predictive maintenance', 'vibration sensor', 'accelerometer',
    'strain gauge', 'current clamp', 'proximity sensor', 'temperature sensor', 'pressure sensor',
    'flow meter', 'five vital signs of a machine', 'bearing failure', 'vibration analysis',
    'sensor mounting', 'sampling rate', 'aliasing', '4-20 mA', 'current loop', 'live zero',
    'plc', 'programmable logic controller', 'gateway', 'alarm management', 'warning alarm trip',
    'alarm fatigue', 'detection control', 'automation and controls', 'how factories monitor equipment',
  ],

  /* Timestamps are the FINAL render's (2026-10-16, 10:16.2 finished), from the synced timing that
     also wrote the YouTube chapters (voice-engine/chapters.py). The video's last chapter ("Next
     page") is a teaser, so it is not listed here. */
  chapters: [
    { t: 0, label: 'The pump that stopped without warning' },
    { t: 56, label: 'Quick answer — how factories monitor machines' },
    { t: 120, label: 'What a sensor really does' },
    { t: 170, label: 'The five vital signs of a machine' },
    { t: 284, label: 'Start from the failure: what warns first' },
    { t: 327, label: 'Mounting and sampling (aliasing)' },
    { t: 391, label: 'Getting the signal out — 4–20 mA and the live zero' },
    { t: 449, label: 'PLC, industrial IoT, then warn before you alarm' },
    { t: 518, label: 'Recap' },
    { t: 557, label: 'The Booklet Page' },
  ],

  /* The abbreviations the narration spells out (VIDEO06_ABBRS). */
  abbr: [
    { term: 'IoT', full: 'Internet of Things' },
    { term: 'FMEA', full: 'Failure Mode and Effects Analysis' },
    { term: 'SPC', full: 'Statistical Process Control' },
    { term: 'PLC', full: 'Programmable Logic Controller' },
  ],

  /* The choices made when a sensor is fitted — the web version of the CONTROL PARAMETERS rail on
     the video's recap and Booklet Page (VIDEO06_CONTROLS). Directions only: this page quotes no
     vibration level, temperature limit, sample rate, frequency, battery life or price, on purpose. */
  controls: {
    note: 'START FROM THE FAILURE',
    items: [
      { family: 'What to watch', symbol: '⚠', name: 'Failure mode', effect: 'Sets which reading moves first' },
      { family: 'Mounting', symbol: '⊥', name: 'Mount', effect: 'A stud keeps the high notes' },
      { family: 'Mounting', symbol: '⌖', name: 'Location', effect: 'Closer to the bearing, cleaner' },
      { family: 'Sampling', symbol: '⋯', name: 'Sample rate', effect: 'Faster catches more, stores more' },
      { family: 'Signal', symbol: '⇄', name: 'Link', effect: 'Live zero or health flags a dead sensor' },
      { family: 'Signal', symbol: '≋', name: 'Cable route', effect: 'Clear of power cables, less noise' },
      { family: 'Alarms', symbol: '▲', name: 'Alarm basis', effect: 'Its own normal warns earlier' },
      { family: 'Alarms', symbol: '⏱', name: 'Alarm delay', effect: 'Fewer false trips, later warning' },
    ],
  },

  /* Verbatim from the video's Booklet Page (06-industrial-iot-sensors/booklet-page-06.png,
     source rows SENSOR_ROWS in video-engine/src/SensorPage06.tsx). */
  takeaways: [
    { k: 'A Sensor Turns Change into Signal', v: "A sensing element changes with the world, a circuit amplifies and filters that change, and a signal comes out. A strain gauge's wire stretches; an accelerometer's crystal is squeezed by its mass." },
    { k: 'Five Vital Signs', v: 'Vibration, temperature, motor current, pressure and flow, and speed. Each failure lights up only one or two of them, and a current that drops matters as much as one that climbs.' },
    { k: 'Start from the Failure', v: 'For each failure you fear, measure the symptom that moves first. Vibration warns long before heat or noise. In an FMEA, a sensor is a detection control.' },
    { k: 'Mount, Sample, Send', v: 'Screw it down close to the source. Read at least twice as fast as the quickest change, or aliasing fakes a slow one. Send it with a live zero, or a link that reports its health.' },
    { k: 'Warn Early, Alarm Few', v: "Warn early from each machine's own normal, in time to plan the repair. Alarm only where someone must act, with a delay, an owner and an action. Trip last." },
  ],

  /* The Deep Dive on the page is a short, resumed version of each chapter — the full
     reasoning lives in the video. Each row seeks the embed at its timestamp. */
  digestLead:
    'A sensor is not a gadget bolted on for show. It is a way to hear a machine change before it breaks, and every choice after it, where it sits, how fast it is read, how the signal travels and when it raises a flag, decides whether the warning arrives in time. The map:',
  digest: [
    { t: 120, title: 'What a sensor really does', line: 'A bathroom scale holds a strip of metal with a thin wire pattern glued to it. Stand on it and the metal bends, the wire stretches and its resistance rises. Every sensor follows that pattern: an element changes with the world, a circuit amplifies and cleans up the tiny change, and a signal comes out. An accelerometer does the same with a small mass on a crystal, screwed hard to the machine.' },
    { t: 170, title: 'The five vital signs of a machine', line: 'On the pump that stopped: vibration from an accelerometer on each bearing housing, temperature from probes on the housings and in the motor windings, motor current from a clamp around the supply cable, pressure and flow across the inlet strainer and at the outlet, and speed from a proximity sensor counting bolt heads. Each failure lights up only one or two of them.' },
    { t: 284, title: 'Start from the failure: what warns first', line: 'Ask which reading moves first as a bearing starts to fail. Vibration changes first, often weeks or months ahead, while heat and audible noise come late. The earlier the symptom you measure, the longer your warning. Listing each failure and how you will catch it is the work of an FMEA, where a sensor is a detection control.' },
    { t: 327, title: 'Mounting and sampling', line: 'Vibration travels through solid metal, and every joint or gap softens the high notes first, so the accelerometer goes close to the bearing, screwed down hard. Reading too slowly makes a fast shake look slow, the same trap that makes a car wheel seem to turn backwards on video. That is aliasing, and the rule is to read at least twice as fast as the quickest change that matters.' },
    { t: 391, title: 'Getting the signal out', line: 'The classic way past noisy motors is a current loop, where the sensor sets a current that is the same all the way around, so cable resistance does not change the reading. The scale starts above zero, a live zero, so a cut wire reads as zero and the controller knows it broke. A digital link also sends the sensor’s own health. Keep sensor cables away from motor power cables.' },
    { t: 449, title: 'PLC, industrial IoT, then warn before you alarm', line: 'The controller on the machine, usually a PLC, acts in milliseconds and trips the pump at a limit. A copy of the readings goes through a gateway to a server, where months of data show trends. A fixed trip limit warns late, so set a warning from each machine’s own normal. Then rank what the system raises: a warning plans the repair, an alarm needs a delay, an owner and an action, and a trip is the last resort.' },
  ],

  blocks: [
    { type: 'step', step: 1 },
    {
      type: 'p',
      text: 'A cooling water pump runs for years, and one night its bearing seizes and the whole line stops. The warning was there for weeks: the bearing was shaking harder long before it ran hot, and long before anyone could hear it. Your car lights a lamp when the oil pressure drops, but plenty of machines on a factory floor have no light like that. Bolting sensors onto every machine does not fix it on its own, because you get a flood of numbers nobody reads and alarms that go off so often people stop looking. The skill is knowing what a factory actually measures on a machine, and how to pick the few readings that warn you in time.',
    },

    { type: 'step', step: 2 },
    {
      type: 'callout',
      variant: 'quick',
      title: 'The short version',
      text: 'A sensor turns a physical change, like heat, shaking or pressure, into an electrical signal a computer can read. A factory watches a handful of vital signs on a machine: vibration, temperature, motor current, pressure and flow, and speed. The signal runs down a cable or radio link to a controller beside the machine, which can stop it within a fraction of a second, and copies of the readings go on to a server that keeps them for months. That networked part is what people mean by the industrial Internet of Things. The rule is to start from the failure you fear and work back to the sensor: each failure shows one symptom first, so measure that one. Mount the sensor where the symptom is strongest, read it fast enough to catch the change, then warn on a change from the machine’s own normal and alarm only where someone will act on it.',
    },

    { type: 'step', step: 3 },
    { type: 'digest' },

    { type: 'step', step: 5 },
    { type: 'booklet-page' },
  ],

  related: [
    { page: '02', note: 'In an FMEA, a sensor is a detection control that lowers the risk score.' },
  ],
});
