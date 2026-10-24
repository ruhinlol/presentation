/**
 * animations.js — GSAP animasiyalar: hər slayd üçün fərdi IN/OUT keçidlər
 * Sürətli, bloklamayan, yüksək cavabdehlikli animasiya sistemi
 * 15 Slayd versiyası
 */

const Animations = (() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = reducedMotion ? 0.01 : 0.6;

  /* ── Utility: Mətni söz-söz bölmə ── */
  function splitIntoWords(el) {
    if (!el || el.dataset.split) return el ? el.querySelectorAll('.word') : [];
    el.dataset.split = 'true';
    const text = el.textContent;
    const lines = text.split('\n');
    el.innerHTML = '';

    lines.forEach((line, li) => {
      const lineWrap = document.createElement('span');
      lineWrap.className = 'line-wrap';

      const words = line.split(/\s+/).filter(w => w.length > 0);
      words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        lineWrap.appendChild(span);
      });

      el.appendChild(lineWrap);
      if (li < lines.length - 1) {
        el.appendChild(document.createElement('br'));
      }
    });

    return el.querySelectorAll('.word');
  }

  /* ── Utility: Sayğac animasiyası ── */
  function animateCounter(el, target, suffix, duration = 1.6) {
    if (!el) return;
    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const isFloat = target % 1 !== 0;
    const obj = { val: 0 };
    let lastSound = 0;

    gsap.to(obj, {
      val: target,
      duration: duration,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
      }
    });
  }

  /* ── Ken Burns fon şəkli (müstəqil işləyir, timeline-ı bloklamır) ── */
  function startBgZoom(slide) {
    const img = slide.querySelector('.slide-image');
    if (!img || reducedMotion) return;
    // Bütün 17 slayd video ilə qüsursuz, sıçrayışsız birləşdiyi üçün zoom tətbiq olunmur
    if (parseInt(slide.dataset.index) <= 16) {
      gsap.set(img, { scale: 1, transform: 'none' });
      return;
    }
    gsap.killTweensOf(img);
    gsap.fromTo(img, { scale: 1.15 }, { scale: 1.03, duration: 15, ease: 'sine.out' });
  }

  /* ── Hər slaydın IN animasiyası ── */
  const slideIn = {
    // Slayd 1 (index 0): Zoom-in + fade, title word-by-word
    1(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));

      tl.fromTo(slide, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(words, { y: 40, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.35);

      return tl;
    },

    // Slayd 2 (index 1): YENİ 1A — Güzgü: Fade + words + keywords
    2(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(words, { y: 35, opacity: 0, rotateX: 15 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.45);

      return tl;
    },

    // Slayd 3 (index 2): Köhnə Slayd 2 — Slide-right + stagger reveal
    3(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');
      const content = slide.querySelector('.slide-content');

      gsap.set(slide, { opacity: 1, x: 0 });
      tl.fromTo(content, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .fromTo(words, { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.3)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.45);

      return tl;
    },

    // Slayd 4 (index 3): YENİ 2A — Göz Səviyyəsi: Slide-right
    4(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');
      const content = slide.querySelector('.slide-content');

      gsap.set(slide, { opacity: 1, x: 0 });
      tl.fromTo(content, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .fromTo(words, { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.3)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.45);

      return tl;
    },

    // Slayd 5 (index 4): Köhnə Slayd 3 — Scale-bounce + flash (endirim effekti)
    5(slide, done) {
      startBgZoom(slide);

      const tl = gsap.timeline({ onComplete: done });
      const title = slide.querySelector('.slide-title');
      const counterEl = slide.querySelector('.counter-number');
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.35 })
        .fromTo(slide.querySelector('.slide-bg'), { filter: 'brightness(2)' }, { filter: 'brightness(1)', duration: 0.4, ease: 'power2.out' }, 0)
        .fromTo(title, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.3);

      if (counterEl) {
        const data = SLIDES[4];
        tl.call(() => animateCounter(counterEl, data.counterTarget, data.counterSuffix, 1.4), null, 0.2);
      }

      if (keywords.length) {
        tl.fromTo(keywords, { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, 0.4);
      }

      return tl;
    },

    // Slayd 6 (index 5): YENİ 3A — Qlobal İqtisadi Tələ & Statistika
    6(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(words, { y: 35, opacity: 0, rotateX: 15 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.1)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.45);

      return tl;
    },

    // Slayd 7 (index 6): Köhnə Slayd 4 — Fade + vertical blinds reveal (Filtrlənmiş Həyat)
    7(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.45 })
        .fromTo(slide.querySelector('.slide-image-wrap'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.4)
        .fromTo(keywords, { x: -15, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.4 }, 0.5);

      return tl;
    },

    // Slayd 8 (index 7): YENİ 4A — Daxili Boşluğun Satışı: Vertical blinds
    8(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.45 })
        .fromTo(slide.querySelector('.slide-image-wrap'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.4)
        .fromTo(keywords, { x: -15, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.4 }, 0.5);

      return tl;
    },

    // Slayd 9 (index 8): Köhnə Slayd 5 — Slide-up + mask reveal (Kapitalizmin Vədi)
    9(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));

      tl.fromTo(slide, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo(words, { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.15)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.4);

      return tl;
    },

    // Slayd 10 (index 9): Köhnə Slayd 6 — Horizontal split-open (Sürü Psixologiyası)
    10(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(slide.querySelector('.slide-image-wrap'), { clipPath: 'inset(40% 0)' }, { clipPath: 'inset(0% 0)', duration: 0.6, ease: 'power2.inOut' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.4)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.5);

      return tl;
    },

    // Slayd 11 (index 10): YENİ 6A — fMRI Beyin Analizi: Horizontal split
    11(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(slide.querySelector('.slide-image-wrap'), { clipPath: 'inset(40% 0)' }, { clipPath: 'inset(0% 0)', duration: 0.6, ease: 'power2.inOut' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.4)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.5);

      return tl;
    },

    // Slayd 12 (index 11): Köhnə Slayd 7 — Glitch/shake entrance (Market Xaosu)
    12(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(slide.querySelector('.slide-content'), { x: -6 }, { x: 0, duration: 0.08, ease: 'steps(3)' }, 0)
        .fromTo(slide.querySelector('.slide-content'), { x: 4 }, { x: 0, duration: 0.08, ease: 'steps(2)' }, 0.08)
        .fromTo(words, { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: DURATION, ease: 'power3.out' }, 0.15)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.35)
        .fromTo(keywords, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.35 }, 0.5);

      return tl;
    },

    // Slayd 13 (index 12): Köhnə Slayd 8 — Dramatik keçid nöqtəsi + Etiketlərin tökülməsi (Geriyə nə qalır?)
    13(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .fromTo(words, { y: 35, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.6, ease: 'power2.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.5);

      // Etiketlərin tökülmə fizikasını başlat
      if (window.FallingTags) {
        tl.call(() => FallingTags.startPeelingSequence(), null, 0.4);
      }

      return tl;
    },

    // Slayd 14 (index 13): Köhnə Slayd 9 — Deep zoom (Ulduz tozu)
    14(slide, done) {
      startBgZoom(slide);

      const tl = gsap.timeline({ onComplete: done });
      const content = slide.querySelector('.slide-content');
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const counterEl = slide.querySelector('.counter-number');
      const elements = slide.querySelectorAll('.element-badge');

      gsap.set(slide, { opacity: 1, scale: 1 });
      tl.fromTo(content, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.45);

      if (counterEl) {
        const data = SLIDES[13];
        tl.call(() => animateCounter(counterEl, data.counterTarget, data.counterSuffix, 2), null, 0.3);
      }

      if (elements.length) {
        tl.fromTo(elements, { scale: 0.4, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(2)' }, 0.6);
      }

      return tl;
    },

    // Slayd 15 (index 14): YENİ 9A — Kainatın Gözü: Deep zoom
    15(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const content = slide.querySelector('.slide-content');
      const words = splitIntoWords(slide.querySelector('.slide-title'));

      gsap.set(slide, { opacity: 1, scale: 1 });
      tl.fromTo(content, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.45);

      return tl;
    },

    // Slayd 16 (index 15): YENİ 9B — Həll Yolu (Solution): Harmonious celestial glow
    16(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const content = slide.querySelector('.slide-content');
      const words = splitIntoWords(slide.querySelector('.slide-title'));
      const keywords = slide.querySelectorAll('.keyword');

      gsap.set(slide, { opacity: 1, scale: 1 });
      tl.fromTo(content, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0)
        .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: DURATION, ease: 'power3.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.45)
        .fromTo(keywords, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.5)' }, 0.55);

      return tl;
    },

    // Slayd 17 (index 16): Köhnə Slayd 10 — Typewriter + star burst effekti (Final)
    17(slide, done) {
      startBgZoom(slide);
      const tl = gsap.timeline({ onComplete: done });
      const words = splitIntoWords(slide.querySelector('.slide-title'));

      tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .fromTo(words, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }, 0.2)
        .fromTo(slide.querySelector('.slide-subtitle'), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.8);

      return tl;
    }
  };

  /* ── Hər slaydın OUT animasiyası (hamısı cəmi 0.3s - 0.4s-dir) ── */
  const slideOut = {
    1(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    2(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    3(slide, done) {
      gsap.to(slide, { opacity: 0, x: -50, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    4(slide, done) {
      gsap.to(slide, { opacity: 0, x: -50, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    5(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.9, rotation: -2, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    6(slide, done) {
      gsap.to(slide, { opacity: 0, duration: 0.35, ease: 'power1.inOut', onComplete: done });
    },
    7(slide, done) {
      gsap.to(slide, { opacity: 0, duration: 0.35, ease: 'power1.inOut', onComplete: done });
    },
    8(slide, done) {
      gsap.to(slide, { opacity: 0, duration: 0.35, ease: 'power1.inOut', onComplete: done });
    },
    9(slide, done) {
      gsap.to(slide, { opacity: 0, y: -40, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    10(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.88, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    11(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.88, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    12(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.96, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    13(slide, done) {
      gsap.to(slide, { opacity: 0, duration: 0.35, ease: 'power1.inOut', onComplete: done });
    },
    14(slide, done) {
      gsap.to(slide, { opacity: 0, y: -30, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    15(slide, done) {
      gsap.to(slide, { opacity: 0, y: -30, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    16(slide, done) {
      gsap.to(slide, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in', onComplete: done });
    },
    17(slide, done) {
      done();
    }
  };

  return {
    animateIn(slideEl, slideIndex, callback) {
      const fn = slideIn[slideIndex + 1];
      if (fn) {
        slideEl.style.visibility = 'visible';
        fn(slideEl, () => {
          slideEl.classList.add('active');
          if (callback) callback();
        });
      } else {
        slideEl.style.opacity = '1';
        slideEl.style.visibility = 'visible';
        slideEl.classList.add('active');
        if (callback) callback();
      }
    },

    animateOut(slideEl, slideIndex, callback) {
      const fn = slideOut[slideIndex + 1];
      if (fn) {
        slideEl.classList.add('exiting');
        slideEl.classList.remove('active');
        fn(slideEl, () => {
          slideEl.classList.remove('exiting');
          slideEl.style.visibility = 'hidden';
          slideEl.style.opacity = '0';
          if (callback) callback();
        });
      } else {
        slideEl.style.visibility = 'hidden';
        slideEl.style.opacity = '0';
        slideEl.classList.remove('active');
        if (callback) callback();
      }
    },

    splitIntoWords,
    animateCounter
  };
})();
