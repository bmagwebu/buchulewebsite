/* Buchule Group — site interactions */
(function () {
  'use strict';

  /* sticky header state */
  var header = document.querySelector('.site-header');
  function onHeader() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onHeader, { passive: true });
  onHeader();

  /* mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    });
  }

  /* ---- scroll reveal (rect-based, robust across environments) ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function checkReveals() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals);
  // initial passes — cover late layout/font shifts
  checkReveals();
  requestAnimationFrame(checkReveals);
  setTimeout(checkReveals, 200);
  window.addEventListener('load', checkReveals);
  // absolute failsafe: never leave content hidden
  setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('in'); });
    reveals.length = 0;
  }, 2500);

  /* ---- animated stat counters ---- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dec = (target % 1 !== 0) ? 1 : 0;
    var start = null, dur = 1500;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function checkCounters() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = counters.length - 1; i >= 0; i--) {
      var el = counters[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) {
        runCounter(el);
        counters.splice(i, 1);
      }
    }
  }
  window.addEventListener('scroll', checkCounters, { passive: true });
  checkCounters();
  setTimeout(checkCounters, 300);

  /* contact form */
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('sent');
    });
  }

  /* footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
