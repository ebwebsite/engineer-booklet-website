/* ==========================================================================
   ENGINEER BOOKLET — renderer
   --------------------------------------------------------------------------
   Data in, HTML strings out. No DOM, no browser APIs, so the SAME code runs in
   two places:
     - the browser, where app.js mounts it (the local working copy renders
       every page this way);
     - Node, where export-site.js calls it once per URL and writes the result
       into a real HTML file in website-deploy/. That is what Google (and the
       AdSense review) reads: each page's text is in its own HTML.
   URLs are real paths, one folder per page:
       /                              the homepage
       /manufacturing/                a section index
       /manufacturing/<slug>/         a video page
   Old #/ links (#/manufacturing/03, #/new …) map to these via legacyHash().
   ========================================================================== */
(function (root) {
  'use strict';

  function createRenderer(B) {
    /* Only pages explicitly marked published are ever rendered, linked,
       searched or counted. A page can sit in data/pages/ fully written
       (status: 'draft') ahead of its video going live — it stays invisible
       until this flips to 'published'. */
    var pages = B.pages.filter(function (p) { return p.status === 'published'; });

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
    // Site-root path for a file in website/ — pages live in sub-folders, so a
    // relative "assets/…" would break one level down.
    var asset = function (path) { return /^(https?:)?\//.test(path) ? path : '/' + path; };

    /* ---- indexes ------------------------------------------------------- */
    var pagesById = {}, pagesBySection = {}, sectionById = {}, stepsById = {};
    B.sections.forEach(function (s) { pagesBySection[s.id] = []; sectionById[s.id] = s; });
    pages.forEach(function (p) {
      pagesById[p.id] = p;
      (pagesBySection[p.section] = pagesBySection[p.section] || []).push(p);
    });
    Object.keys(pagesBySection).forEach(function (k) {
      pagesBySection[k].sort(function (a, b) { return (a.pageNo > b.pageNo ? 1 : -1); });
    });
    B.steps.forEach(function (s) { stepsById[s.id] = s; });

    var byNewest = pages.slice().sort(function (a, b) {
      return (a.published < b.published ? 1 : a.published > b.published ? -1 : 0);
    });
    var newestPage = byNewest[0];

    /* ---- URLs ---------------------------------------------------------- */
    function pageUrl(p) { return '/' + p.section + '/' + p.slug + '/'; }
    function sectionUrl(s) { return '/' + s.id + '/'; }

    function resolve(path) {
      var parts = String(path || '/').split(/[?#]/)[0].split('/').filter(Boolean);
      if (parts[parts.length - 1] === 'index.html') parts.pop();
      if (!parts.length) return { view: 'home' };
      var s = sectionById[parts[0]];
      if (!s || s.id === 'new' || parts.length > 2) return { view: 'notfound' };
      if (parts.length === 1) return { view: 'section', section: s };
      var p = (pagesBySection[s.id] || []).filter(function (x) { return x.slug === parts[1]; })[0];
      return p ? { view: 'page', section: s, page: p } : { view: 'notfound' };
    }

    /* The site used hash routes until 2026-09-26 (#/manufacturing/03), and
       some of those links are out in YouTube descriptions. Returns the real
       URL an old hash points at, or null when the hash isn't an old route. */
    function legacyHash(hash) {
      if (!/^#\//.test(hash || '')) return null;
      var parts = hash.slice(2).split('/').filter(Boolean);
      if (!parts.length) return '/';
      if (parts[0] === 'new') return newestPage ? pageUrl(newestPage) : '/';
      var s = sectionById[parts[0]];
      if (!s || s.id === 'new') return '/';
      if (!parts[1]) return sectionUrl(s);
      var p = (pagesBySection[s.id] || []).filter(function (x) { return x.pageNo === parts[1]; })[0];
      return p ? pageUrl(p) : sectionUrl(s);
    }

    /* The section's ONE teaser: the first `upcoming` title not yet published.
       Every surface that shows a teaser goes through here, so none of them can
       show a second title. */
    function nextUpcoming(s) {
      var list = pagesBySection[s.id] || [];
      return (s.upcoming || []).filter(function (title) {
        return !list.some(function (p) { return p.title === title; });
      })[0];
    }

    function pageCountText() {
      var n = pages.length;
      return n + (n === 1 ? ' page published' : ' pages published');
    }

    /* ================================================================== *
     *  SIDEBAR — the binder tabs
     * ================================================================== */
    function sidebar(curSection, curPage) {
      var out = tabLink('home', '/', icon('i-home') + '<span class="tab-label">HOME</span>', curSection);
      var newSec = sectionById['new'];
      if (newSec && newestPage) {
        out += tabLink('new', pageUrl(newestPage), icon(newSec.icon) +
          '<span class="tab-label">NEW</span><span class="tab-badge">LATEST</span>', null);
      }
      B.sections.forEach(function (s) {
        if (s.id === 'new') return; // NEW is a shortcut in the top area, not a real drawer
        var open = s.id === curSection;
        out += '<div class="tab" data-section="' + s.id + '" data-open="' + open + '" data-current="' + open + '">' +
          '<button class="tab-head" type="button" aria-expanded="' + open + '">' + icon(s.icon) +
          '<span class="tab-label">' + esc(s.short.toUpperCase()) + '</span>' +
          (s.letter ? '<span class="tab-letter">' + esc(s.letter) + '</span>' : '') +
          icon('i-chevron', 'tab-chev') + '</button><div class="tab-pages">';
        var list = pagesBySection[s.id] || [];
        list.forEach(function (p) {
          out += '<a class="page-link" href="' + pageUrl(p) + '" data-page="' + esc(p.id) + '"' +
            (p === curPage ? ' aria-current="page"' : '') + '>' +
            '<span class="pl-no">' + esc(p.pageNo) + '</span><span>' + esc(p.title) + '</span>' +
            (p === newestPage ? '<span class="pl-tag is-new">New</span>' : '') + '</a>';
        });
        // One greyed teaser for what's coming next — no page number, no roadmap size.
        var next = s.kind !== 'feed' ? nextUpcoming(s) : null;
        if (next) {
          out += '<div class="page-link is-planned"><span class="pl-no pl-soon">·</span>' +
            '<span>' + esc(next) + '</span><span class="pl-tag">Soon</span></div>';
        }
        if (!list.length && s.kind === 'feed') out += '<div class="tab-more">Coming soon</div>';
        out += '</div></div>';
      });
      return out;
    }

    function tabLink(id, href, inner, curSection) {
      return '<div class="tab" data-section="' + id + '" data-current="' + (id === curSection) + '">' +
        '<a class="tab-head" href="' + href + '">' + inner + '</a></div>';
    }

    /* ================================================================== *
     *  SEARCH — a plain in-memory index over the published pages
     * ================================================================== */
    var searchIndex = pages.map(function (p) {
      var sec = sectionById[p.section];
      var hay = [p.title, p.summary, sec ? sec.title : '', (p.keywords || []).join(' '),
        (p.abbr || []).map(function (a) { return a.term + ' ' + a.full; }).join(' '),
        (p.chapters || []).map(function (c) { return c.label; }).join(' ')
      ].join(' ').toLowerCase();
      return { p: p, hay: hay, sec: sec };
    });

    function search(q) {
      q = String(q || '').trim().toLowerCase();
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

    /* ================================================================== *
     *  HOME — the front door: a full-width search, the newest page, then
     *  one card per pillar with its latest page and its YouTube playlist.
     * ================================================================== */
    function home() {
      var html = '<div class="page-body home">';

      /* hero: what the site is, and the big search */
      var start = (pagesBySection['start-here'] || [])[0];
      html += '<header class="home-hero" id="home-search-block">' +
        '<span class="eyebrow">' + esc(B.channel.name) + '</span>' +
        '<h1>' + esc(B.channel.tagline) + '</h1>' +
        '<p class="home-lede">' + esc(B.channel.blurb) + '</p>' +
        '<div class="home-search" role="search">' + icon('i-search', 'search-icon') +
        '<input id="home-search-input" type="search" autocomplete="off" spellcheck="false" ' +
        'placeholder="Search a process, a failure mode or an abbreviation" aria-label="Search the booklet" ' +
        'role="combobox" aria-expanded="false" aria-controls="home-search-results" aria-autocomplete="list">' +
        '<ul id="home-search-results" class="search-results" role="listbox" aria-label="Search results" hidden></ul>' +
        '</div>';
      var hints = (B.searchHints || []).filter(function (q) { return search(q).length; }).slice(0, 6);
      if (hints.length) {
        html += '<div class="home-hints"><span>Try</span>' + hints.map(function (q) {
          return '<button type="button" class="hint-chip" data-q="' + esc(q) + '">' + esc(q) + '</button>';
        }).join('') + '</div>';
      }
      html += '<p class="home-meta"><span>' + esc(pageCountText()) + '</span><span>New page every week</span>' +
        (start ? '<a href="' + pageUrl(start) + '">New here? Start with page ' + esc(start.pageNo) + '</a>' : '') +
        '</p></header>';

      /* the newest page */
      if (newestPage) {
        var p = newestPage, sec = sectionById[p.section];
        html += '<section class="home-block" id="home-latest" aria-labelledby="home-latest-h">' +
          '<h2 class="home-h" id="home-latest-h">Newest page</h2>' +
          '<div class="feature">' +
          '<a class="feature-media" href="' + pageUrl(p) + '" aria-label="Open page ' + esc(p.pageNo) + ': ' + esc(p.title) + '">' +
          thumbImg(p, 'eager') + '<span class="feature-play">' + icon('i-play') + '</span></a>' +
          '<div class="feature-body">' +
          '<div class="feature-kicker"><span class="pl-tag is-new">New</span><span>' +
          esc(sec ? sec.title : '') + ' · Page ' + esc(p.pageNo) + '</span></div>' +
          '<h3 class="feature-title"><a href="' + pageUrl(p) + '">' + esc(p.title) + '</a></h3>' +
          '<p class="feature-sum">' + esc(p.summary) + '</p>' +
          '<div class="page-meta">' +
          (p.runtime ? '<span class="meta-item">' + icon('i-clock') + esc(p.runtime) + '</span>' : '') +
          '<span class="meta-item">' + esc(fmtDate(p.published)) + '</span></div>' +
          '<div class="feature-actions">' +
          '<a class="btn is-primary" href="' + pageUrl(p) + '">Open the page' + icon('i-arrow-right') + '</a>' +
          '<a class="btn is-ghost" href="' + esc(ytWatch(p)) + '" target="_blank" rel="noopener">' + icon('i-youtube') + 'Watch on YouTube</a>' +
          '</div></div></div></section>';
      }

      /* one card per pillar */
      html += '<section class="home-block" id="home-pillars" aria-labelledby="home-pillars-h">' +
        '<h2 class="home-h" id="home-pillars-h">Browse by section</h2><div class="pillar-grid">';
      B.sections.forEach(function (s) { if (s.kind !== 'feed') html += pillarCard(s); });
      html += '</div></section></div>';
      return html;
    }

    /* A pillar with nothing published links nowhere but its playlist: its
       section page would only say "coming soon", and a reviewer should not
       land on an empty page from the front door. */
    function pillarCard(s) {
      var count = (pagesBySection[s.id] || []).length;
      var latest = byNewest.filter(function (p) { return p.section === s.id; })[0];
      var head = icon(s.icon) + '<span class="pillar-title">' + esc(s.title) + '</span>' +
        (s.letter ? '<span class="tab-letter">' + esc(s.letter) + '</span>' : '');
      var html = '<article class="pillar-card">' + (count
        ? '<a class="pillar-head" href="' + sectionUrl(s) + '">' + head + '</a>'
        : '<div class="pillar-head">' + head + '</div>');
      html += '<p class="pillar-blurb">' + esc(s.blurb) + '</p>';
      if (latest) {
        html += '<a class="pillar-latest" href="' + pageUrl(latest) + '">' +
          '<span class="pv-media">' + thumbImg(latest) + '</span>' +
          '<span class="pv-kicker">Latest · Page ' + esc(latest.pageNo) +
          (latest === newestPage ? '<span class="pl-tag is-new">New</span>' : '') + '</span>' +
          '<span class="pv-title">' + esc(latest.title) + '</span>' +
          (latest.runtime ? '<span class="pv-meta">' + icon('i-clock') + esc(latest.runtime) + '</span>' : '') +
          '</a>';
      } else {
        // same shape as a filled card, so the grid stays even: a blank 16:9
        // frame, then the section's one teaser in place of a title
        var next = nextUpcoming(s);
        html += '<div class="pillar-latest is-empty">' +
          '<span class="pv-media"><span class="thumb thumb-blank">' + icon(s.icon) + '<b>Coming soon</b></span></span>' +
          '<span class="pv-kicker">First page</span>' +
          (next ? '<span class="pv-title">' + esc(next) + '</span>' : '') + '</div>';
      }
      html += '<div class="pillar-foot">' +
        (count ? '<a href="' + sectionUrl(s) + '">' + count + (count === 1 ? ' page' : ' pages') +
          icon('i-arrow-right') + '</a>' : '<span></span>') +
        (s.playlist ? '<a class="is-playlist" href="' + esc(s.playlist) + '" target="_blank" rel="noopener">' +
          icon('i-playlist') + 'Playlist on YouTube' + icon('i-external') + '</a>' : '') +
        '</div></article>';
      return html;
    }

    /* The video's own YouTube thumbnail, served from this site (assets/img/
       thumb-NN.jpg) so the homepage makes no request to Google before anyone
       presses play. No `thumbnail` yet: a plain branded block instead. */
    function thumbImg(p, loading) {
      if (p.thumbnail) {
        return '<img class="thumb" src="' + esc(asset(p.thumbnail)) + '" alt="" width="1280" height="720" ' +
          'loading="' + (loading || 'lazy') + '">';
      }
      var sec = sectionById[p.section];
      return '<span class="thumb thumb-blank">' + icon(sec ? sec.icon : 'i-book') +
        '<b>' + esc(p.pageNo) + '</b></span>';
    }

    function homeRail() {
      var links = [['home-search-block', 'Search']];
      if (newestPage) links.push(['home-latest', 'Newest page']);
      links.push(['home-pillars', 'Browse by section']);
      return '<h2>On this page</h2><ol style="list-style:none">' + links.map(function (l) {
        return '<li style="padding:2px 0"><a class="rail-link" href="#' + l[0] + '">' + esc(l[1]) + '</a></li>';
      }).join('') + '</ol>' + subscribeCta('in-rail');
    }

    /* ================================================================== *
     *  SECTION INDEX
     * ================================================================== */
    function section(s) {
      var list = pagesBySection[s.id] || [];
      var html = '<div class="page-body">';
      html += '<header class="section-hero">' + icon(s.icon) +
        '<h1>' + esc(s.title) + '</h1><p>' + esc(s.blurb) + '</p>' +
        (s.playlist ? '<a class="meta-item meta-link section-playlist" href="' + esc(s.playlist) +
          '" target="_blank" rel="noopener">' + icon('i-playlist') + 'Playlist on YouTube ' + icon('i-external') + '</a>' : '') +
        '</header>';

      if (list.length) {
        html += '<div class="card-list">';
        list.forEach(function (p) {
          html += '<a class="page-card" href="' + pageUrl(p) + '">' +
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
      var next = nextUpcoming(s);
      if (next) {
        html += '<div class="planned-list"><h2>Coming next</h2><ul>' +
          '<li><span>' + esc(next) + '</span><span class="pl-tag">Soon</span></li></ul></div>';
      }
      return html + '</div>';
    }

    function sectionRail(s) {
      var list = pagesBySection[s.id] || [];
      var html = '<h2>In this section</h2><ol style="list-style:none">';
      if (list.length) {
        list.forEach(function (p) {
          html += '<li style="padding:6px 0"><a class="rail-link" href="' + pageUrl(p) +
            '"><b style="color:var(--accent-ink);font-family:var(--font-mono);font-size:12px">' +
            esc(p.pageNo) + '</b> &nbsp;' + esc(p.title) + '</a></li>';
        });
      } else {
        html += '<li style="color:var(--muted);font-size:13px;padding:6px 0">Nothing published yet.</li>';
      }
      return html + '</ol>';
    }

    /* ================================================================== *
     *  VIDEO PAGE
     * ================================================================== */
    function page(p) {
      var sec = sectionById[p.section];
      var html = '<article class="page-body">';

      /* head */
      html += '<header class="page-head">';
      html += '<div class="page-kicker"><span class="pk-section">' +
        esc(sec ? sec.title : '') + (p.topicId ? ' · ' + esc(p.topicId) : '') +
        '</span><span>Page ' + esc(p.pageNo) + '</span></div>';
      html += '<h1 class="page-title">' + esc(p.title) + '</h1>';
      if (p.summary) html += '<p class="page-summary">' + esc(p.summary) + '</p>';
      html += '<div class="page-meta">';
      if (p.runtime) html += '<span class="meta-item">' + icon('i-clock') + esc(p.runtime) + '</span>';
      html += '<span class="meta-item">' + esc(fmtDate(p.published)) + '</span>';
      html += '<a class="meta-item meta-link" href="' + esc(ytWatch(p)) + '" target="_blank" rel="noopener">' +
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

      /* body — the steps, then next / prev */
      html += blocks(p);
      html += pageNav(p);
      return html + '</article>';
    }

    function playerInner(p) {
      if (!p.youtubeId) {
        return '<div class="player-empty"><strong>Video not linked yet</strong>' +
          '<span>Add a <code>youtubeId</code> to show the embed here.</span></div>';
      }
      return '<iframe id="yt-frame" title="' + esc(p.title) + '" src="' + esc(embedUrl(p, '&enablejsapi=1')) +
        '" loading="lazy" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    }

    function embedUrl(p, extra) {
      return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.youtubeId) +
        '?rel=0&modestbranding=1' + (extra || '');
    }

    /* ---- block renderer ------------------------------------------------ */
    function blocks(p) {
      var out = '';
      var open = false; // are we inside a <section class="step-block">?
      var proseOpen = false;

      // Number steps by their position on the PAGE, not the video's step id, so a
      // condensed page (e.g. Problem · Quick Answer · Deep Dive · Booklet Page)
      // reads 1·2·3·4 with no gap where the Recap step was folded in.
      var stepPos = {};
      stepOrder(p).forEach(function (id, i) { stepPos[id] = i + 1; });

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

    function stepOrder(p) {
      return (p.blocks || []).filter(function (b) { return b.type === 'step'; })
        .map(function (b) { return b.step; });
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
      return '<a class="watch-cta" href="' + esc(ytWatch(p)) + '" target="_blank" rel="noopener">' +
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
      return out + '</dl>';
    }

    function stepsExplainer() {
      var out = '<div class="takeaways">';
      B.steps.forEach(function (s) {
        out += '<div class="takeaway"><span class="tk-no">' + s.id + '</span>' +
          '<span class="tk-k">' + esc(s.label) + '</span>' +
          '<span class="tk-v">' + esc(s.desc || '') + '</span></div>';
      });
      return out + '</div>';
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
        var src = esc(asset(p.bookletPageImage));
        html += '<div class="bc-image">' +
          '<a href="' + src + '" target="_blank" rel="noopener">' +
          '<img src="' + src + '" alt="Booklet Page for ' + esc(p.title) + ', the end-card from the video" loading="lazy"></a>' +
          '<a class="bc-download" href="' + src + '" download>' +
          icon('i-download') + 'Download this page (PNG)</a>' +
          '</div>';
      } else {
        html += '<p class="bc-empty">The downloadable page image is not added yet.</p>';
      }
      return html + '</div>';
    }

    function pageNav(p) {
      // order pages by pageNo for a stable reading sequence
      var ordered = pages.slice().sort(function (a, b) { return a.pageNo > b.pageNo ? 1 : -1; });
      var i = ordered.indexOf(p);
      var prev = ordered[i - 1], next = ordered[i + 1];
      if (!prev && !next) return '';
      var html = '<nav class="page-nav" aria-label="Page navigation">';
      html += prev
        ? '<a href="' + pageUrl(prev) + '"><span class="pn-dir">' + icon('i-arrow-left') +
          'Page ' + esc(prev.pageNo) + '</span><span class="pn-title">' + esc(prev.title) + '</span></a>'
        : '<span></span>';
      html += next
        ? '<a class="is-next" href="' + pageUrl(next) + '"><span class="pn-dir">Page ' +
          esc(next.pageNo) + icon('i-arrow-right') + '</span><span class="pn-title">' + esc(next.title) + '</span></a>'
        : '<span></span>';
      return html + '</nav>';
    }

    /* ---- right rail: the steps (app.js adds the scroll-spy) ------------- */
    function pageRail(p) {
      var html = '<h2>On this page</h2><ol>';
      stepOrder(p).forEach(function (id, i) {
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
      return html + '</ol>' + subscribeCta('in-rail') + railAside(p);
    }

    function collectHeadings(p, step) {
      var out = [], cur = null;
      (p.blocks || []).forEach(function (b) {
        if (b.type === 'step') cur = b.step;
        else if (b.type === 'h' && cur === step) out.push(b.text);
      });
      return out;
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
       styling never fights the button's own. */
    function subscribeCta(extraClass) {
      var url = subscribeUrl();
      if (!url) return '';
      return '<a class="sub-cta ' + extraClass + '" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        icon('i-youtube') + 'Subscribe on YouTube</a>';
    }

    function railAside(p) {
      var links = (p && p.related || []).map(function (r) {
        var rp = pagesById[r.page];
        if (!rp) return '';
        return '<a href="' + pageUrl(rp) + '">' + icon('i-book') +
          esc('Page ' + rp.pageNo + ' · ' + rp.title) + '</a>';
      }).join('');
      return links ? '<div class="rail-aside">' + links + '</div>' : '';
    }

    function notFound() {
      return '<div class="err-page">' +
        '<img class="err-mascot" src="/assets/img/mascot-404.png" alt="The Engineer Booklet mascot, scratching his head and looking a little lost">' +
        '<span class="err-kicker">404</span><h1>Page Not Found</h1>' +
        '<p>Sorry — this page isn\'t available. Even a good engineer gets lost sometimes.</p>' +
        '<div class="err-actions">' +
        '<a class="err-btn is-primary" href="/">' + icon('i-arrow-left') + 'Back to Engineer Booklet</a>' +
        '<a class="err-btn is-ghost" href="' + esc(B.channel.youtube || 'https://www.youtube.com/@engineerbooklet') + '" target="_blank" rel="noopener">' + icon('i-youtube') + 'Watch on YouTube</a>' +
        '<a class="err-btn is-ghost" href="mailto:info@engineer-booklet.com">' + icon('i-mail') + 'Send feedback</a>' +
        '</div></div>';
    }

    /* ================================================================== *
     *  ONE URL → everything that differs between pages: the three panes,
     *  plus the facts export-site.js needs for <head> (title, description,
     *  canonical path, share image, noindex, and the video's details).
     * ================================================================== */
    function render(route) {
      var v = { view: route.view, pageCount: pageCountText() };
      if (route.view === 'home') {
        v.path = '/';
        v.tabs = sidebar('home', null);
        v.page = home();
        v.rail = homeRail();
        v.meta = { title: B.channel.name + ' — ' + B.channel.tagline.toLowerCase(), home: true };
      } else if (route.view === 'section') {
        var s = route.section, has = (pagesBySection[s.id] || []).length > 0;
        v.path = sectionUrl(s);
        v.tabs = sidebar(s.id, null);
        v.page = section(s);
        v.rail = sectionRail(s);
        // an empty section is only a "coming soon" note: keep it out of search
        v.meta = { title: s.title + ' — ' + B.channel.name, description: s.blurb, noindex: !has };
      } else if (route.view === 'page') {
        var p = route.page;
        v.path = pageUrl(p);
        v.tabs = sidebar(p.section, p);
        v.page = page(p);
        v.rail = pageRail(p);
        v.meta = { title: p.title + ' — ' + B.channel.name, description: p.summary, type: 'article',
          image: p.thumbnail ? asset(p.thumbnail) : null, video: p.youtubeId ? videoFacts(p) : null };
      } else {
        v.path = null;
        v.tabs = sidebar(null, null);
        v.page = notFound();
        v.rail = '';
        v.meta = { title: 'Page Not Found — ' + B.channel.name, noindex: true };
      }
      return v;
    }

    function videoFacts(p) {
      var m = String(p.runtime || '').match(/^(\d+):(\d{2})$/);
      return {
        name: p.title, description: p.summary, uploadDate: p.published,
        thumbnail: p.thumbnail ? asset(p.thumbnail) : null,
        duration: m ? 'PT' + parseInt(m[1], 10) + 'M' + parseInt(m[2], 10) + 'S' : null,
        embedUrl: 'https://www.youtube.com/embed/' + encodeURIComponent(p.youtubeId),
        watchUrl: ytWatch(p),
      };
    }

    /* ---- helpers ------------------------------------------------------- */
    function pad(n) { return (n < 10 ? '0' : '') + n; }
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

    return {
      pages: pages, sections: B.sections, newestPage: newestPage,
      pagesBySection: pagesBySection, sectionById: sectionById,
      pageUrl: pageUrl, sectionUrl: sectionUrl, resolve: resolve, legacyHash: legacyHash,
      render: render, search: search, embedUrl: embedUrl, subscribeUrl: subscribeUrl, esc: esc,
    };
  }

  root.BookletRender = createRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
