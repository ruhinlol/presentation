/**
 * starfield.js — Canvas ulduz zərrəcikləri (parallax star field)
 * 8-10-cu slaydlarda aktivləşir, mouse-reactive parallax effekti.
 */

const Starfield = (() => {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let stars = [];
  let mouseX = 0.5;
  let mouseY = 0.5;
  let animId = null;
  let isActive = false;

  const STAR_COUNT = 350;
  const LAYERS = 3; // Parallax qatları

  /** Canvas ölçüsünü ekrana uyğunlaşdır */
  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  /** Ulduzları yarat */
  function createStars() {
    stars = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < STAR_COUNT; i++) {
      const layer = Math.floor(Math.random() * LAYERS); // 0=uzaq, 2=yaxın
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        radius: (0.3 + Math.random() * 1.2) * (1 + layer * 0.4),
        layer: layer,
        alpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Nadir parlaq ulduzlar
        isBright: Math.random() < 0.05,
        hue: Math.random() < 0.3 ? 200 + Math.random() * 40 : 0, // bəziləri mavimtıl
      });
    }
  }

  /** Hər kadrı çək */
  function draw(timestamp) {
    if (!isActive) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    stars.forEach(star => {
      // Parallax — mouse hərəkətinə uyğun sürüşmə
      const parallaxStrength = (star.layer + 1) * 15;
      const px = (mouseX - 0.5) * parallaxStrength;
      const py = (mouseY - 0.5) * parallaxStrength;
      star.x = star.baseX + px;
      star.y = star.baseY + py;

      // Twinkle
      const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.alpha * (0.5 + twinkle * 0.5);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

      if (star.isBright) {
        // Parlaq ulduzlar üçün glow effekti
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 4
        );
        gradient.addColorStop(0, `hsla(${star.hue || 0}, 50%, 95%, ${alpha})`);
        gradient.addColorStop(0.3, `hsla(${star.hue || 0}, 40%, 80%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${star.hue || 0}, 30%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
      } else if (star.hue) {
        ctx.fillStyle = `hsla(${star.hue}, 60%, 80%, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }

      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  /** Mouse hərəkətini izlə */
  function onMouseMove(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  }

  /** Touch hərəkətini izlə */
  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX / window.innerWidth;
      mouseY = e.touches[0].clientY / window.innerHeight;
    }
  }

  return {
    /** İnisializasiya */
    init() {
      resize();
      createStars();
      window.addEventListener('resize', () => {
        resize();
        createStars();
      });
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
    },

    /** Aktivləşdir (8-10-cu slaydlar) */
    show() {
      if (isActive) return;
      isActive = true;
      canvas.classList.add('visible');
      animId = requestAnimationFrame(draw);
    },

    /** Deaktivləşdir */
    hide() {
      isActive = false;
      canvas.classList.remove('visible');
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    },

    /** Reduced motion yoxla */
    respectsReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  };
})();
