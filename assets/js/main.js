(function(){
  "use strict";

  // ---- nav scrolled state ----
  var nav = document.querySelector('.nav');
  var onScroll = function(){
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- mobile nav toggle ----
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  // ---- scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---- contact form ----
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(){
      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Envoi du message…';
        status.classList.add('is-visible');
      }
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-item__q');
    var panel = item.querySelector('.faq-item__a');
    btn.addEventListener('click', function(){
      var isOpen = item.getAttribute('data-open') === 'true';
      // close siblings
      item.parentElement.querySelectorAll('.faq-item').forEach(function(other){
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-item__a').style.maxHeight = null;
        }
      });
      var next = !isOpen;
      item.setAttribute('data-open', next ? 'true' : 'false');
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      panel.style.maxHeight = next ? panel.scrollHeight + 'px' : null;
    });
  });

  // ---- animated counters ----
  var counters = document.querySelectorAll('.num[data-count-to]');
  if (counters.length) {
    var animateCount = function(el){
      var target = parseFloat(el.getAttribute('data-count-to'));
      var pad = el.getAttribute('data-pad');
      var duration = 1100;
      var start = null;
      var from = 0;
      function step(ts){
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(from + (target - from) * eased);
        el.textContent = pad ? String(current).padStart(parseInt(pad, 10), '0') : String(current);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = pad ? String(target).padStart(parseInt(pad, 10), '0') : String(target);
      }
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function(el){ cio.observe(el); });
    } else {
      counters.forEach(function(el){ el.textContent = el.getAttribute('data-count-to'); });
    }
  }

  // ---- carousel (vues aériennes) ----
  document.querySelectorAll('[data-carousel]').forEach(function(car){
    var track = car.querySelector('[data-carousel-track]');
    var slides = track.children;
    var dotsBox = car.querySelector('[data-carousel-dots]');
    var prevBtn = car.querySelector('[data-carousel-prev]');
    var nextBtn = car.querySelector('[data-carousel-next]');
    var idx = 0, n = slides.length;
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var autoTimer = null;
    if (n < 2) return;

    Array.prototype.forEach.call(slides, function(_, k){
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'carou__dot';
      d.setAttribute('aria-label', 'Photo ' + (k + 1));
      d.addEventListener('click', function(){ go(k); });
      dotsBox.appendChild(d);
    });

    var dots = dotsBox.children;

    function go(k){
      idx = (k + n) % n;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      Array.prototype.forEach.call(dots, function(d, j){ d.classList.toggle('is-active', j === idx); });
    }

    function startAutoPlay(){
      if (reducedMotion) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(function(){ go(idx + 1); }, 3800);
    }

    function stopAutoPlay(){
      clearInterval(autoTimer);
    }

    prevBtn.addEventListener('click', function(){ go(idx - 1); startAutoPlay(); });
    nextBtn.addEventListener('click', function(){ go(idx + 1); startAutoPlay(); });
    car.addEventListener('mouseenter', stopAutoPlay);
    car.addEventListener('mouseleave', startAutoPlay);
    car.addEventListener('focusin', stopAutoPlay);
    car.addEventListener('focusout', startAutoPlay);
    document.addEventListener('keydown', function(e){
      if (e.key === 'ArrowLeft') { go(idx - 1); startAutoPlay(); }
      else if (e.key === 'ArrowRight') { go(idx + 1); startAutoPlay(); }
    });
    go(0);
    startAutoPlay();
  });

  // ---- current year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
