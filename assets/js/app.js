/* ==========================================================================
   ENGINEER BOOKLET — client app
   --------------------------------------------------------------------------
   No framework, no build step. Content comes from window.BOOKLET (data/*.js).
   Routing is hash-based so it works from a file:// path or any static host:
       #/manufacturing            → a section index
       #/manufacturing/01         → a video page
       #/new                      → newest page (redirects to its page route)
   ========================================================================== */
(function () {
  'use strict';

  var B = window.BOOKLET;
  if (!B) { console.error('BOOKLET data missing'); return; }

  /* Only pages explicitly marked published are ever rendered, routed to,
     searched, or counted. A page can sit in data/pages/ fully written
     (status: 'draft') ahead of its video going live — it simply stays
     invisible on the deployed site until this flips to 'published'. */
  B.pages = B.pages.filter(function (p) { return p.status === 'published'; });

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  var icon = function (id, cls) {
    // viewBox is required: the sprite art is drawn in a 0..24 box, so without it a
    // 20px <svg> would show only the top-left 20 units and clip the rest.
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  };

  /* ---- indexes --------------------------------------------------------- */
  var pagesById = {};
  var pagesBySection = {};
  B.sections.forEach(function (s) { pagesBySection[s.id] = []; });
  B.pages.forEach(function (p) {
    pagesById[p.id] = p;
    (pagesBySection[p.section] = pagesBySection[p.section] || []).push(p);
  });
  Object.keys(pagesBySection).forEach(function (k) {
    pagesBySection[k].sort(function (a, b) { return (a.pageNo > b.pageNo ? 1 : -1); });
  });
  var stepsById = {};
  B.steps.forEach(function (s) { stepsById[s.id] = s; });

  var publishedPages = B.pages.slice().sort(function (a, b) {
    return (a.published < b.published ? 1 : a.published > b.published ? -1 : 0);
  });
  var newestPage = publishedPages[0];
  var sectionById = {};
  B.sections.forEach(function (s) { sectionById[s.id] = s; });

  /* ==================================================================== *
   *  SIDEBAR — the binder tabs
   * ==================================================================== */
  function buildSidebar() {
    var tabs = $('#tabs');
    tabs.innerHTML = '';
    B.sections.forEach(function (s) {
      if (s.id === 'new') return; // NEW is a shortcut in the top area, not a real drawer
      tabs.appendChild(tabEl(s));
    });

    // "NEW" pinned at the very top as its own quick tab
    var newSec = sectionById['new'];
    if (newSec) tabs.insertBefore(newTabEl(newSec), tabs.firstChild);

    var count = B.pages.length;
    $('#page-count').textContent = count + (count === 1 ? ' page published' : ' pages published');
  }

  function newTabEl(s) {
    var tab = el('div', 'tab');
    tab.dataset.section = 'new';
    var head = el('button', 'tab-head');
    head.type = 'button';
    head.innerHTML = icon(s.icon) +
      '<span class="tab-label">NEW</span>' +
      '<span class="tab-badge">LATEST</span>';
    head.addEventListener('click', function () { go('#/new'); });
    tab.appendChild(head);
    return tab;
  }

  function tabEl(s) {
    var tab = el('div', 'tab');
    tab.dataset.section = s.id;

    var head = el('button', 'tab-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    var letter = s.letter ? '<span class="tab-letter">' + esc(s.letter) + '</span>' : '';
    head.innerHTML = icon(s.icon) +
      '<span class="tab-label">' + esc(s.short.toUpperCase()) + '</span>' +
      letter + icon('i-chevron', 'tab-chev');
    head.addEventListener('click', function () { toggleTab(s.id); });
    tab.appendChild(head);

    var list = el('div', 'tab-pages');
    var pages = pagesBySection[s.id] || [];
    pages.forEach(function (p) { list.appendChild(pageLinkEl(p)); });

    // One greyed teaser for what's coming next — no page number, no roadmap size.
    if (s.kind !== 'feed' && s.upcoming) {
      var next = s.upcoming.filter(function (title) {
        return !pages.some(function (p) { return p.title === title; });
      })[0];
      if (next) {
        var a = el('div', 'page-link is-planned');
        a.innerHTML = '<span class="pl-no pl-soon">·</span>' +
          '<span>' + esc(next) + '</span><span class="pl-tag">Soon</span>';
        list.appendChild(a);
      }
    }
    if (!pages.length && s.kind === 'feed') {
      list.appendChild(el('div', 'tab-more', 'Coming soon'));
    }
    tab.appendChild(list);
    return tab;
  }

  function pageLinkEl(p) {
    var a = el('a', 'page-link');
    a.href = '#/' + p.section + '/' + p.pageNo;
    a.dataset.page = p.id;
    a.innerHTML = '<span class="pl-no">' + esc(p.pageNo) + '</span>' +
      '<span>' + esc(p.title) + '</span>' +
      (p === newestPage ? '<span class="pl-tag is-new">New</span>' : '');
    return a;
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function toggleTab(id, forceOpen) {
    var tab = $('.tab[data-section="' + id + '"]');
    if (!tab) return;
    var open = forceOpen != null ? forceOpen : tab.dataset.open !== 'true';
    tab.dataset.open = open ? 'true' : 'false';
    var head = $('.tab-head', tab);
    if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function markSidebar(sectionId, pageId) {
    document.querySelectorAll('.tab').forEach(function (t) {
      t.dataset.current = (t.dataset.section === sectionId) ? 'true' : 'false';
    });
    document.querySelectorAll('.page-link').forEach(function (a) {
      if (a.dataset.page && a.dataset.page === pageId) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (sectionId && sectionId !== 'new') toggleTab(sectionId, true);
  }

  /* ==================================================================== *
   *  ROUTING
   * ==================================================================== */
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    return { section: parts[0] || '', page: parts[1] || '' };
  }

  function route() {
    var r = parseHash();

    if (!r.section || r.section === 'new') {
      if (newestPage) return go('#/' + newestPage.section + '/' + newestPage.pageNo);
      renderEmptyFeed();
      return;
    }
    var section = sectionById[r.section];
    if (!section) { renderNotFound(); return; }

    if (r.page) {
      var page = (pagesBySection[r.section] || []).filter(function (p) { return p.pageNo === r.page; })[0];
      if (!page) { renderNotFound(); return; }
      renderPage(page);
    } else {
      renderSection(section);
    }
    closeNav();
    $('#page').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  /* ==================================================================== *
   *  SECTION INDEX
   * ==================================================================== */
  function renderSection(s) {
    markSidebar(s.id, null);
    var pages = pagesBySection[s.id] || [];
    var html = '<div class="page-body">';
    html += '<header class="section-hero">' + icon(s.icon) +
      '<h1>' + esc(s.title) + '</h1><p>' + esc(s.blurb) + '</p></header>';

    if (pages.length) {
      html += '<div class="card-list">';
      pages.forEach(function (p) {
        html += '<a class="page-card" href="#/' + p.section + '/' + p.pageNo + '">' +
          '<span class="pc-no">' + esc(p.pageNo) + '</span>' +
          '<span><span class="pc-title">' + esc(p.title) +
          (p === newestPage ? ' <span class="pl-tag is-new">New</span>' : '') + '</span>' +
          '<span class="pc-sum">' + esc(p.summary) + '</span>' +
          '<span class="pc-meta">' + icon('i-clock') + esc(p.runtime || '') +
          '<span>' + esc(fmtDate(p.published)) + '</span></span></span></a>';
      });
      html += '</div>';
    } else {
      html += '<p class="pc-sum" style="margin-top:24px">No page published in this section yet — the first one is on the way.</p>';
    }

    // Tease only the next topic — never the whole roadmap or its size.
    var next = (s.upcoming || []).filter(function (t) {
      return !pages.some(function (p) { return p.title === t; });
    })[0];
    if (next) {
      html += '<div class="planned-list"><h2>Coming next</h2><ul>' +
        '<li><span>' + esc(next) + '</span><span class="pl-tag">Soon</span></li></ul></div>';
    }
    html += '</div>';
    $('#page').innerHTML = html;
    renderSectionRail(s);
    document.title = s.title + ' — Engineer Booklet';
  }

  function renderSectionRail(s) {
    var pages = pagesBySection[s.id] || [];
    var html = '<h2>In this section</h2><ol style="list-style:none">';
    if (pages.length) {
      pages.forEach(function (p) {
        html += '<li style="padding:6px 0"><a class="rail-link" href="#/' + p.section + '/' + p.pageNo +
          '"><b style="color:var(--accent-ink);font-family:var(--font-mono);font-size:12px">' +
          esc(p.pageNo) + '</b> &nbsp;' + esc(p.title) + '</a></li>';
      });
    } else {
      html += '<li style="color:var(--muted);font-size:13px;padding:6px 0">Nothing published yet.</li>';
    }
    html += '</ol>';
    html += railAside();
    $('#rail').innerHTML = html;
  }

  /* ==================================================================== *
   *  VIDEO PAGE
   * ==================================================================== */
  function renderPage(p) {
    markSidebar(p.section, p.id);
    var section = sectionById[p.section];

    var html = '<article class="page-body">';

    /* head */
    html += '<header class="page-head">';
    html += '<div class="page-kicker"><span class="pk-section">' +
      esc(section ? section.title : '') + (p.topicId ? ' · ' + esc(p.topicId) : '') +
      '</span><span>Page ' + esc(p.pageNo) + '</span></div>';
    html += '<h1 class="page-title">' + esc(p.title) + '</h1>';
    if (p.summary) html += '<p class="page-summary">' + esc(p.summary) + '</p>';
    html += '<div class="page-meta">';
    if (p.runtime) html += '<span class="meta-item">' + icon('i-clock') + esc(p.runtime) + '</span>';
    html += '<span class="meta-item">' + esc(fmtDate(p.published)) + '</span>';
    html += '<a class="meta-item meta-link" href="' + ytWatch(p) + '" target="_blank" rel="noopener">' +
      icon('i-youtube') + 'Watch on YouTube ' + icon('i-external') + '</a>';
    html += '</div></header>';

    /* player */
    html += '<div class="player-wrap"><div class="player" id="player">' + playerInner(p) + '</div>';
    if (p.youtubePlaceholder) {
      html += '<p class="player-note">' + icon('i-play') +
        '<span><b>Placeholder video.</b> Swap <code>youtubeId</code> in ' +
        'data/pages/' + esc(p.pageNo) + '-…js for the real one once the video is live.</span></p>';
    }
    html += '</div>';

    /* chapters — only when the page has no digest (the digest replaces them) */
    if (p.chapters && p.chapters.length && !p.digest) {
      html += '<section class="chapters" aria-label="Chapters"><h2>Chapters</h2>';
      p.chapters.forEach(function (c) {
        html += '<button class="chapter" type="button" data-seek="' + c.t + '">' +
          '<time>' + fmtTime(c.t) + '</time><span>' + esc(c.label) + '</span></button>';
      });
      html += '</section>';
    }

    /* body — the five steps */
    html += renderBlocks(p);

    /* ad — one in-content slot, after the reader has gotten the value, before nav */
    html += adSlot('content', 'Advertisement');

    /* next / prev */
    html += pageNav(p);

    html += '</article>';
    $('#page').innerHTML = html;

    wirePlayer(p);
    renderPageRail(p);
    document.title = p.title + ' — Engineer Booklet';
  }

  function playerInner(p) {
    if (!p.youtubeId) {
      return '<div class="player-empty"><strong>Video not linked yet</strong>' +
        '<span>Add a <code>youtubeId</code> to show the embed here.</span></div>';
    }
    return '<iframe id="yt-frame" title="' + esc(p.title) +
      '" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.youtubeId) +
      '?rel=0&modestbranding=1&enablejsapi=1" loading="lazy" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
  }

  function wirePlayer(p) {
    var frame = $('#yt-frame');
    // Any element with data-seek (chapter rows, digest rows, the watch CTA) reloads
    // the embed at that start time and brings the player into view.
    document.querySelectorAll('[data-seek]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = parseInt(btn.dataset.seek, 10) || 0;
        if (!frame || !p.youtubeId) return;
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.youtubeId) +
          '?rel=0&modestbranding=1&autoplay=1&start=' + t;
        var pl = $('#player');
        if (pl) pl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  /* ---- block renderer -------------------------------------------------- */
  function renderBlocks(p) {
    var out = '';
    var open = false; // are we inside a <section class="step-block">?
    var proseOpen = false;

    // Number steps by their position on the PAGE, not the video's step id, so a
    // condensed page (e.g. Problem · Quick Answer · Deep Dive · Booklet Page)
    // reads 1·2·3·4 with no gap where the Recap step was folded in.
    var stepOrder = (p.blocks || []).filter(function (b) { return b.type === 'step'; })
      .map(function (b) { return b.step; });
    var stepPos = {};
    stepOrder.forEach(function (id, i) { stepPos[id] = i + 1; });

    function closeProse() { if (proseOpen) { out += '</div>'; proseOpen = false; } }
    function openProse() { if (!proseOpen) { out += '<div class="prose">'; proseOpen = true; } }
    function closeStep() { closeProse(); if (open) { out += '</section>'; open = false; } }

    (p.blocks || []).forEach(function (bk) {
      switch (bk.type) {
        case 'step': {
          closeStep();
          var st = stepsById[bk.step];
          out += '<section class="step-block" id="step-' + bk.step + '" data-step="' + bk.step + '">';
          out += '<div class="step-head"><span class="step-no">' + (stepPos[bk.step] || bk.step) + '</span>' +
            '<h2>' + esc(st ? st.label : ('Step ' + bk.step)) + '</h2></div>';
          open = true;
          break;
        }
        case 'h':
          closeProse();
          out += '<h3 id="' + slug(bk.text) + '">' + esc(bk.text) + '</h3>';
          break;
        case 'p':
          openProse();
          out += '<p>' + esc(bk.text) + '</p>';
          break;
        case 'list':
          closeProse();
          out += '<ul class="prose">';
          bk.items.forEach(function (i) { out += '<li>' + esc(i) + '</li>'; });
          out += '</ul>';
          break;
        case 'callout':
          closeProse();
          out += '<div class="callout is-' + (bk.variant || 'note') + '">' +
            (bk.title ? '<h4>' + esc(bk.title) + '</h4>' : '') +
            '<p>' + esc(bk.text) + '</p></div>';
          break;
        case 'compare':
          closeProse();
          out += '<div class="compare">' + compareCard(bk.left) + compareCard(bk.right) + '</div>';
          break;
        case 'terms':
          closeProse();
          out += '<dl class="terms">';
          bk.items.forEach(function (t) {
            out += '<div><dt>' + esc(t.term) + '</dt><dd>' + esc(t.def) + '</dd></div>';
          });
          out += '</dl>';
          break;
        case 'controls':
          closeProse();
          out += controlsTable(p.controls);
          break;
        case 'digest':
          closeProse();
          out += digestBlock(p);
          break;
        case 'watch-cta':
          closeProse();
          out += watchCta(p, bk);
          break;
        case 'sections':
          closeProse();
          out += sectionsGrid();
          break;
        case 'steps':
          closeProse();
          out += stepsExplainer();
          break;
        case 'takeaways':
          closeProse();
          out += takeawaysBlock(p.takeaways);
          break;
        case 'booklet-page':
          closeProse();
          out += bookletCard(p);
          break;
      }
    });
    closeStep();
    return out;
  }

  /* The condensed Deep Dive: one line per chapter, each seeking the embed, with
     a hook to watch the full detail. Keeps the page a companion, not a spoiler. */
  function digestBlock(p) {
    if (!p.digest || !p.digest.length) return '';
    var lead = p.digestLead ? '<p class="digest-lead">' + esc(p.digestLead) + '</p>' : '';
    var rows = p.digest.map(function (d) {
      var seek = (d.t != null && p.youtubeId) ? ' data-seek="' + d.t + '"' : '';
      var tag = d.t != null ? '<span class="dg-t">' + fmtTime(d.t) + '</span>' : '<span class="dg-t"></span>';
      return '<button class="dg-item" type="button"' + seek + '>' + tag +
        '<span class="dg-body"><b>' + esc(d.title) + '</b><span>' + esc(d.line) + '</span></span>' +
        icon('i-play', 'dg-play') + '</button>';
    }).join('');
    return '<div class="digest">' + lead + '<div class="digest-list">' + rows + '</div>' +
      watchCta(p, p.digestCta || {}) + '</div>';
  }

  function watchCta(p, bk) {
    bk = bk || {};
    var title = bk.title || ('Watch the full ' + (p.runtime || '') + ' breakdown');
    var sub = bk.text || 'The mechanism in full, with the animations, is in the video.';
    // With an embed present, the button seeks/plays it in place; otherwise link out.
    if (p.youtubeId) {
      return '<button class="watch-cta" type="button" data-seek="0">' +
        '<span class="wc-icon">' + icon('i-play') + '</span>' +
        '<span class="wc-text"><b>' + esc(title) + '</b><span>' + esc(sub) + '</span></span>' +
        icon('i-arrow-right', 'wc-arrow') + '</button>';
    }
    return '<a class="watch-cta" href="' + ytWatch(p) + '" target="_blank" rel="noopener">' +
      '<span class="wc-icon">' + icon('i-play') + '</span>' +
      '<span class="wc-text"><b>' + esc(title) + '</b><span>' + esc(sub) + '</span></span>' +
      icon('i-external', 'wc-arrow') + '</a>';
  }

  function compareCard(c) {
    var pts = (c.points || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    return '<div class="compare-card"><span class="compare-tag">' + esc(c.tag) + '</span>' +
      '<h4>' + esc(c.title) + '</h4><ul>' + pts + '</ul></div>';
  }

  function controlsTable(c) {
    if (!c) return '';
    var rows = c.items.map(function (i) {
      return '<tr><td class="c-family">' + esc(i.family) + '</td>' +
        '<td class="c-symbol">' + esc(i.symbol || '') + '</td>' +
        '<td class="c-name">' + esc(i.name) + '</td>' +
        '<td class="c-effect">' + esc(i.effect) + '</td></tr>';
    }).join('');
    return '<div class="controls"><div class="controls-head">' +
      '<h4>Control parameters</h4>' +
      (c.note ? '<span class="controls-note">' + esc(c.note) + '</span>' : '') +
      '</div><div class="controls-scroll"><table><thead><tr>' +
      '<th>Family</th><th></th><th>Knob</th><th>What it trades</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }

  function takeawaysBlock(items) {
    if (!items) return '';
    var rows = items.map(function (t, i) {
      return '<div class="takeaway"><span class="tk-no">' + pad(i + 1) + '</span>' +
        '<span class="tk-k">' + esc(t.k) + '</span>' +
        '<span class="tk-v">' + esc(t.v) + '</span></div>';
    }).join('');
    return '<div class="takeaways">' + rows + '</div>';
  }

  function sectionsGrid() {
    var out = '<dl class="terms">';
    B.sections.filter(function (s) { return s.kind !== 'feed'; }).forEach(function (s) {
      out += '<div><dt>' + esc(s.title) + '</dt><dd>' + esc(s.blurb) + '</dd></div>';
    });
    out += '</dl>';
    return out;
  }

  function stepsExplainer() {
    var out = '<div class="takeaways">';
    B.steps.forEach(function (s) {
      out += '<div class="takeaway"><span class="tk-no">' + s.id + '</span>' +
        '<span class="tk-k">' + esc(s.label) + '</span>' +
        '<span class="tk-v">' + esc(s.desc || '') + '</span></div>';
    });
    out += '</div>';
    return out;
  }

  /* The Booklet Page step shows the video's own real end-card, not a second,
     hand-maintained HTML recreation of it — one fewer place for the two to
     drift apart. `bookletPageImage` is the only input; takeaways/abbr/controls
     stay in the page data (still useful elsewhere) but are not rendered here. */
  function bookletCard(p) {
    var html = '<div class="booklet-card">';
    html += '<div class="bc-head"><span class="eyebrow">Booklet page — screenshot this</span>' +
      '<h3>' + esc(p.title) + '</h3></div>';
    if (p.bookletPageImage) {
      html += '<div class="bc-image">' +
        '<a href="' + esc(p.bookletPageImage) + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(p.bookletPageImage) + '" alt="Booklet Page for ' + esc(p.title) + ', the end-card from the video" loading="lazy"></a>' +
        '<a class="bc-download" href="' + esc(p.bookletPageImage) + '" download>' +
        icon('i-download') + 'Download this page (PNG)</a>' +
        '</div>';
    } else {
      html += '<p class="bc-empty">The downloadable page image is not added yet.</p>';
    }
    html += '</div>';
    return html;
  }

  function pageNav(p) {
    var idx = publishedPages.indexOf(p);
    // order pages by pageNo for a stable reading sequence
    var ordered = B.pages.slice().sort(function (a, b) { return a.pageNo > b.pageNo ? 1 : -1; });
    var i = ordered.indexOf(p);
    var prev = ordered[i - 1], next = ordered[i + 1];
    if (!prev && !next) return '';
    var html = '<nav class="page-nav" aria-label="Page navigation">';
    html += prev
      ? '<a href="#/' + prev.section + '/' + prev.pageNo + '"><span class="pn-dir">' + icon('i-arrow-left') +
        'Page ' + esc(prev.pageNo) + '</span><span class="pn-title">' + esc(prev.title) + '</span></a>'
      : '<span></span>';
    html += next
      ? '<a class="is-next" href="#/' + next.section + '/' + next.pageNo + '"><span class="pn-dir">Page ' +
        esc(next.pageNo) + icon('i-arrow-right') + '</span><span class="pn-title">' + esc(next.title) + '</span></a>'
      : '<span></span>';
    html += '</nav>';
    return html;
  }

  /* ---- right rail: steps + scroll spy ---------------------------------- */
  var spy = null;
  function renderPageRail(p) {
    var stepOrder = (p.blocks || []).filter(function (b) { return b.type === 'step'; })
      .map(function (b) { return b.step; });

    var html = '<h2>On this page</h2><ol>';
    stepOrder.forEach(function (id, i) {
      var st = stepsById[id];
      if (!st) return;
      html += '<li class="rail-step" data-step="' + id + '">' +
        '<span class="rail-num">' + (i + 1) + '</span>' +
        '<a class="rail-link" href="#step-' + id + '">' + esc(st.label) + '</a>';
      // sub-headings inside the deep dive (only when the page uses prose headings there)
      if (id === 3) {
        var subs = collectHeadings(p, 3);
        if (subs.length) {
          html += '<div class="rail-sub">';
          subs.forEach(function (h) {
            html += '<a href="#' + slug(h) + '" data-h="' + slug(h) + '">' + esc(h) + '</a>';
          });
          html += '</div>';
        }
      }
      html += '</li>';
    });
    html += '</ol>' + subscribeCta('in-rail') + railAside(p) + adSlot('rail', 'Advertisement');
    $('#rail').innerHTML = html;

    // smooth-scroll for in-page links
    $('#rail').querySelectorAll('a[href^="#step-"], a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    setupSpy(p);
  }

  function collectHeadings(p, step) {
    var out = [], cur = null;
    (p.blocks || []).forEach(function (b) {
      if (b.type === 'step') cur = b.step;
      else if (b.type === 'h' && cur === step) out.push(b.text);
    });
    return out;
  }

  /* Ad slot placeholder — fixed footprint so nothing shifts (CLS) once a real
     <ins class="adsbygoogle" data-ad-slot="…"> replaces the placeholder div
     for that position. See README.md → "AdSense" for what's still needed
     (publisher ID, per-slot ad unit IDs, consent-mode wiring) before this
     placeholder can be swapped for a live unit. */
  function adSlot(position, label) {
    return '<div class="ad-slot ad-slot-' + position + '" role="complementary" ' +
      'aria-label="Advertisement" data-ad-position="' + position + '">' + esc(label) + '</div>';
  }

  /* Appends YouTube's own confirmation-dialog param — logged-in visitors get
     the inline "Subscribe" popup instead of just landing on the channel. */
  function subscribeUrl() {
    if (!B.channel.youtube) return '';
    return B.channel.youtube + (B.channel.youtube.indexOf('?') === -1 ? '?' : '&') + 'sub_confirmation=1';
  }
  /* One button, rendered wherever it's needed (rail/sidebar/topbar all show
     exactly one instance at a time — see the .sub-cta CSS breakpoints). Kept
     as its own sibling rather than nested in .rail-aside, so `.rail-aside a`
     styling never fights the button's own (a class+element selector there
     would otherwise out-specificity a bare .sub-cta). */
  function subscribeCta(extraClass) {
    var url = subscribeUrl();
    if (!url) return '';
    return '<a class="sub-cta ' + extraClass + '" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      icon('i-youtube') + 'Subscribe on YouTube</a>';
  }

  function railAside(p) {
    var links = '';
    if (p && p.related && p.related.length) {
      links += p.related.map(function (r) {
        var rp = pagesById[r.page];
        if (!rp) return '';
        return '<a href="#/' + rp.section + '/' + rp.pageNo + '">' + icon('i-book') +
          esc('Page ' + rp.pageNo + ' · ' + rp.title) + '</a>';
      }).join('');
    }
    return links ? '<div class="rail-aside">' + links + '</div>' : '';
  }

  // Scroll-spy for the "On this page" rail. The active section is the LAST one
  // whose top has passed a reading line near the top of the viewport — and when
  // the window is scrolled to the very bottom we force the last section active,
  // so a short final section (the Booklet Page) always lights up even though its
  // top never reaches the line. (The old top-most-visible rule stalled on Deep
  // Dive because its bottom stayed on screen at the page end.)
  function setupSpy() {
    if (spy) { window.removeEventListener('scroll', spy); window.removeEventListener('resize', spy); }
    var ticking = false;

    function update() {
      ticking = false;
      var line = window.innerHeight * 0.3;
      var atBottom = (window.innerHeight + Math.ceil(window.scrollY || window.pageYOffset)) >=
        (document.documentElement.scrollHeight - 2);

      var steps = [].slice.call(document.querySelectorAll('.step-block'));
      if (steps.length) {
        var cur = steps[0].dataset.step;
        steps.forEach(function (s) { if (s.getBoundingClientRect().top <= line) cur = s.dataset.step; });
        if (atBottom) cur = steps[steps.length - 1].dataset.step;
        document.querySelectorAll('.rail-step').forEach(function (rs) {
          rs.dataset.active = (rs.dataset.step === cur) ? 'true' : 'false';
        });
      }

      var hs = [].slice.call(document.querySelectorAll('.prose h3'));
      if (hs.length) {
        var curH = null;
        hs.forEach(function (h) { if (h.getBoundingClientRect().top <= line) curH = h.id; });
        if (atBottom) curH = hs[hs.length - 1].id;
        document.querySelectorAll('.rail-sub a').forEach(function (a) {
          a.dataset.active = (a.dataset.h === curH) ? 'true' : 'false';
        });
      }
    }

    spy = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    update();
  }

  /* ==================================================================== *
   *  SEARCH
   * ==================================================================== */
  var searchIndex = B.pages.map(function (p) {
    var sec = sectionById[p.section];
    var hay = [p.title, p.summary, sec ? sec.title : '', (p.keywords || []).join(' '),
      (p.abbr || []).map(function (a) { return a.term + ' ' + a.full; }).join(' '),
      (p.chapters || []).map(function (c) { return c.label; }).join(' ')
    ].join(' ').toLowerCase();
    return { p: p, hay: hay, sec: sec };
  });

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/);
    return searchIndex
      .map(function (row) {
        var score = 0;
        terms.forEach(function (t) {
          if (row.p.title.toLowerCase().indexOf(t) !== -1) score += 5;
          if (row.hay.indexOf(t) !== -1) score += 1;
        });
        return { row: row, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 8)
      .map(function (r) { return r.row; });
  }

  function initSearch() {
    var input = $('#search-input');
    var box = $('#search-results');
    var sel = -1, results = [];

    function render() {
      if (!results.length) {
        box.innerHTML = input.value.trim()
          ? '<li class="sr-empty">No page matches “' + esc(input.value) + '”. Try a term like porosity, FMEA, or CAD.</li>'
          : '';
        box.hidden = !input.value.trim();
        input.setAttribute('aria-expanded', String(!box.hidden));
        return;
      }
      box.innerHTML = results.map(function (row, i) {
        return '<li class="sr-item" role="option" id="sr-' + i + '" data-i="' + i + '"' +
          (i === sel ? ' aria-selected="true"' : '') + '>' +
          '<div class="sr-kicker">' + esc(row.sec ? row.sec.short : '') + ' · Page ' + esc(row.p.pageNo) + '</div>' +
          '<div class="sr-title">' + esc(row.p.title) + '</div>' +
          '<div class="sr-sum">' + esc(row.p.summary) + '</div></li>';
      }).join('');
      box.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function open(i) {
      var row = results[i]; if (!row) return;
      go('#/' + row.p.section + '/' + row.p.pageNo);
      input.value = ''; results = []; sel = -1; box.hidden = true;
      input.setAttribute('aria-expanded', 'false'); input.blur();
    }

    input.addEventListener('input', function () { results = runSearch(input.value); sel = -1; render(); });
    input.addEventListener('focus', function () { if (input.value.trim()) { results = runSearch(input.value); render(); } });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
      else if (e.key === 'Enter') { if (sel >= 0) open(sel); else if (results.length) open(0); }
      else if (e.key === 'Escape') { input.value = ''; results = []; box.hidden = true; input.blur(); input.setAttribute('aria-expanded', 'false'); }
    });
    box.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.sr-item'); if (item) { e.preventDefault(); open(parseInt(item.dataset.i, 10)); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search')) { box.hidden = true; input.setAttribute('aria-expanded', 'false'); }
    });
    // "/" focuses search
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); input.focus();
      }
    });
  }

  /* ==================================================================== *
   *  CHROME: theme, mobile nav, misc
   * ==================================================================== */
  function initTheme() {
    var KEY = 'eb-theme';
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    apply(saved);
    $('#theme-toggle').addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
    function apply(t) {
      document.documentElement.setAttribute('data-theme', t);
      var btn = $('#theme-toggle');
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initNav() {
    $('#nav-toggle').addEventListener('click', openNav);
    $('#nav-close').addEventListener('click', closeNav);
    $('#scrim').addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  }
  function openNav() {
    document.body.dataset.nav = 'open';
    $('#nav-toggle').setAttribute('aria-expanded', 'true');
    $('#scrim').hidden = false;
  }
  function closeNav() {
    if (document.body.dataset.nav !== 'open') return;
    document.body.dataset.nav = '';
    $('#nav-toggle').setAttribute('aria-expanded', 'false');
    $('#scrim').hidden = true;
  }

  function initChannelLinks() {
    var yt = $('#yt-link');
    if (B.channel.youtube) { yt.href = B.channel.youtube; }
    else { yt.href = '#'; }

    var subUrl = subscribeUrl();
    ['sub-cta-sidebar', 'sub-cta-topbar'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (subUrl) { el.href = subUrl; } else { el.remove(); }
    });
  }

  function initFooter() {
    var y = $('#foot-year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* Cookie consent — a saved choice is applied silently on every later visit;
     first visit shows the bar. One choice covers every Consent Mode signal
     (ads and analytics alike) since this site has no separate essential vs.
     non-essential analytics split yet. Swap for Google's Funding Choices CMP
     once the AdSense account exists; this is the minimum Consent Mode v2
     wiring, not a substitute for it long-term. */
  function initConsent() {
    var KEY = 'eb-consent';
    var bar = $('#consent-bar');
    if (!bar) return;
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'granted' || saved === 'denied') { apply(saved); return; }
    /* Global Privacy Control — a browser/extension-sent opt-out signal
       (globalprivacycontrol.org). Treat it as the visitor having already
       answered "reject": apply it, remember it, skip the banner. Referenced
       directly in privacy.html's "Do Not Track & GPC" section — keep that
       claim true if this logic ever changes. */
    if (navigator.globalPrivacyControl === true) {
      try { localStorage.setItem(KEY, 'denied'); } catch (e) {}
      apply('denied');
      return;
    }
    bar.hidden = false;
    $('#consent-accept').addEventListener('click', function () { choose('granted'); });
    $('#consent-reject').addEventListener('click', function () { choose('denied'); });
    function choose(v) {
      try { localStorage.setItem(KEY, v); } catch (e) {}
      apply(v);
      bar.hidden = true;
    }
    function apply(v) {
      if (typeof gtag !== 'function') return;
      gtag('consent', 'update', {
        ad_storage: v,
        ad_user_data: v,
        ad_personalization: v,
        analytics_storage: v,
      });
    }
  }

  function renderNotFound() {
    $('#page').innerHTML = '<div class="err-page">' +
      '<img class="err-mascot" src="assets/img/mascot-404.png" alt="The Engineer Booklet mascot, scratching his head and looking a little lost">' +
      '<span class="err-kicker">404</span><h1>Page Not Found</h1>' +
      '<p>Sorry — this page isn\'t available. Even a good engineer gets lost sometimes.</p>' +
      '<div class="err-actions">' +
      '<a class="err-btn is-primary" href="#/new">' + icon('i-arrow-left') + 'Back to Engineer Booklet</a>' +
      '<a class="err-btn is-ghost" href="' + esc(B.channel.youtube || 'https://www.youtube.com/@engineerbooklet') + '" target="_blank" rel="noopener">' + icon('i-youtube') + 'Watch on YouTube</a>' +
      '<a class="err-btn is-ghost" href="mailto:info@engineer-booklet.com">' + icon('i-mail') + 'Send feedback</a>' +
      '</div></div>';
    $('#rail').innerHTML = '';
    document.title = 'Page Not Found — Engineer Booklet';
  }
  function renderEmptyFeed() {
    $('#page').innerHTML = '<div class="page-body"><header class="section-hero"><h1>Engineer Booklet</h1>' +
      '<p>No pages published yet. Check back soon.</p></header></div>';
    $('#rail').innerHTML = '';
  }

  /* ---- helpers --------------------------------------------------------- */
  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function fmtDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  function ytWatch(p) {
    return p.youtubeId ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(p.youtubeId)
      : (B.channel.youtube || '#');
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* ---- boot ------------------------------------------------------------ */
  buildSidebar();
  initSearch();
  initTheme();
  initNav();
  initChannelLinks();
  initFooter();
  initConsent();
  window.addEventListener('hashchange', route);
  route();
})();
