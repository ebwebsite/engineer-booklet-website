/* ==========================================================================
   ENGINEER BOOKLET — client app
   --------------------------------------------------------------------------
   No framework, no build step. Content comes from window.BOOKLET (data/*.js);
   the HTML for every view comes from render.js. Each page is a real URL
   (/manufacturing/<slug>/) and a link is a normal page load, so there is no
   client-side router.

   Two ways a page arrives here:
     - PRE-RENDERED (the public site): export-site.js already wrote this URL's
       sidebar, page and rail into the HTML and stamped #page[data-route].
       Nothing is re-rendered; this file only wires up behaviour.
     - NOT pre-rendered (the local working copy, served by website/serve.js,
       which answers every page URL with the one index.html): the three panes
       are rendered here, from the URL.
   ========================================================================== */
(function () {
  'use strict';

  var B = window.BOOKLET;
  if (!B || !window.BookletRender) { console.error('BOOKLET data or renderer missing'); return; }
  var R = window.BookletRender(B);

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = R.esc;

  /* Old #/ links (the site's routes before 2026-09-26, some still out in
     YouTube descriptions) go to their real URL. */
  var legacy = R.legacyHash(location.hash);
  if (legacy) { location.replace(legacy); return; }

  /* ---- mount this URL ---------------------------------------------------- */
  var route = R.resolve(location.pathname);
  var view = R.render(route);
  var pageEl = $('#page');
  if (pageEl.dataset.route !== String(view.path)) {
    $('#tabs').innerHTML = view.tabs;
    pageEl.innerHTML = view.page;
    $('#rail').innerHTML = view.rail;
    $('#page-count').textContent = view.pageCount;
    document.title = view.meta.title;
  }
  document.body.dataset.view = view.view;

  /* ==================================================================== *
   *  SIDEBAR — the binder tabs open and close in place
   * ==================================================================== */
  function initSidebar() {
    $('#tabs').addEventListener('click', function (e) {
      var head = e.target.closest('button.tab-head');
      if (!head) return;
      var tab = head.parentNode;
      var open = tab.dataset.open !== 'true';
      tab.dataset.open = String(open);
      head.setAttribute('aria-expanded', String(open));
    });
  }

  /* ==================================================================== *
   *  VIDEO PAGE — seek buttons and the "on this page" scroll-spy
   * ==================================================================== */
  function initPlayer(p) {
    var frame = $('#yt-frame');
    // Any element with data-seek (chapter rows, digest rows, the watch CTA) reloads
    // the embed at that start time and brings the player into view.
    document.querySelectorAll('[data-seek]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = parseInt(btn.dataset.seek, 10) || 0;
        if (!frame || !p.youtubeId) return;
        frame.src = R.embedUrl(p, '&autoplay=1&start=' + t);
        var pl = $('#player');
        if (pl) pl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // Scroll-spy for the "On this page" rail. The active section is the LAST one
  // whose top has passed a reading line near the top of the viewport — and when
  // the window is scrolled to the very bottom we force the last section active,
  // so a short final section (the Booklet Page) always lights up even though its
  // top never reaches the line.
  function initSpy() {
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

    var spy = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    update();
  }

  /* ==================================================================== *
   *  SEARCH
   * ==================================================================== */
  /* One search box = one input + its results list: the top bar's, and on the
     homepage the big one too. */
  function bindSearch(input, box) {
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
        return '<li class="sr-item" role="option" id="' + box.id + '-' + i + '" data-i="' + i + '"' +
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
      location.href = R.pageUrl(row.p);
    }

    input.addEventListener('input', function () { results = R.search(input.value); sel = -1; render(); });
    input.addEventListener('focus', function () { if (input.value.trim()) { results = R.search(input.value); render(); } });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
      else if (e.key === 'Enter') { if (sel >= 0) open(sel); else if (results.length) open(0); }
      else if (e.key === 'Escape') { input.value = ''; results = []; box.hidden = true; input.blur(); input.setAttribute('aria-expanded', 'false'); }
    });
    box.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.sr-item'); if (item) { e.preventDefault(); open(parseInt(item.dataset.i, 10)); }
    });
  }

  function initSearch() {
    bindSearch($('#search-input'), $('#search-results'));
    // a click outside a search box closes its results
    document.addEventListener('click', function (e) {
      document.querySelectorAll('[role="search"]').forEach(function (wrap) {
        if (wrap.contains(e.target)) return;
        var box = $('.search-results', wrap), input = $('input', wrap);
        if (box) box.hidden = true;
        if (input) input.setAttribute('aria-expanded', 'false');
      });
    });
    // "/" focuses search: the homepage's big box while it is on screen, else the top bar's
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
      e.preventDefault();
      var hero = $('#home-search-input');
      (hero && document.body.dataset.heroSearch !== 'out' ? hero : $('#search-input')).focus();
    });
  }

  /* The homepage's big search, its "Try" chips, and the top-bar handoff:
     while the big box is on screen, the small one in the top bar hides (CSS
     keys off body[data-hero-search]), so two search boxes are never in view.
     It comes back once the hero scrolls under the top bar. */
  function initHomeSearch() {
    var input = $('#home-search-input');
    if (!input) return;
    if (window.matchMedia('(max-width: 560px)').matches) input.placeholder = 'Search the booklet';
    bindSearch(input, $('#home-search-results'));
    document.querySelectorAll('.hint-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        input.value = b.dataset.q;
        input.dispatchEvent(new Event('input'));
        input.focus();
      });
    });
    if (!('IntersectionObserver' in window)) return;
    document.body.dataset.heroSearch = 'in';
    new IntersectionObserver(function (entries) {
      document.body.dataset.heroSearch = entries[0].isIntersecting ? 'in' : 'out';
    }, { rootMargin: '-' + $('.topbar').offsetHeight + 'px 0px 0px 0px' }).observe($('.home-search'));
  }

  /* ==================================================================== *
   *  CHROME: theme, mobile nav, misc
   * ==================================================================== */
  /* The saved theme is applied by an inline script in <head> before the
     first paint (every link is a full page load, so doing it here would
     flash the light theme on each click). This only runs the toggle. */
  function initTheme() {
    var KEY = 'eb-theme';
    var btn = $('#theme-toggle');
    label();
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
    function label() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
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
    yt.href = B.channel.youtube || '#';
    var subUrl = R.subscribeUrl();
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

  /* "Cookie settings" reopens Google's consent message (AdSense → Privacy &
     messaging), which loads through the AdSense tag. Where no message applies
     to the visitor, or an ad blocker stopped the tag, the privacy page
     explains the choices instead. */
  function initCookieSettings() {
    var link = $('#cookie-settings');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (!window.googlefc || typeof window.googlefc.showRevocationMessage !== 'function') return;
      e.preventDefault();
      window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
      window.googlefc.callbackQueue.push(function () { window.googlefc.showRevocationMessage(); });
    });
  }

  /* ---- boot ------------------------------------------------------------ */
  initSidebar();
  initSearch();
  initHomeSearch();
  initTheme();
  initNav();
  initChannelLinks();
  initFooter();
  initCookieSettings();
  if (route.view === 'page') { initPlayer(route.page); initSpy(); }
})();
