/**
 * fallingTags.js — Slayd 8 üçün fiziki etiketlərin qopub düşməsi (Interactive Peeling Tags)
 * Həm avtomatik dramatik tökülmə, həm də mouse ilə toxunub qoparma imkanı!
 */

const FallingTags = (() => {
  const TAG_DEFINITIONS = [
    { text: '70% OFF', color: '#FF3B30', width: 100, height: 50, rotate: -12, top: '25%', left: '18%' },
    { text: 'LIMITED EDITION', color: '#FF9500', width: 130, height: 45, rotate: 18, top: '35%', left: '72%' },
    { text: '$299.99', color: '#FF2D55', width: 90, height: 48, rotate: -8, top: '20%', left: '42%' },
    { text: 'NEW ARRIVAL', color: '#AF52DE', width: 120, height: 45, rotate: 22, top: '60%', left: '22%' },
    { text: 'VIP STATUS', color: '#D4AF37', width: 110, height: 48, rotate: -15, top: '65%', left: '68%' },
    { text: 'BEST SELLER', color: '#FF3B30', width: 115, height: 45, rotate: 8, top: '45%', left: '12%' },
    { text: 'FLASH SALE', color: '#FFCC00', width: 105, height: 48, rotate: -25, top: '18%', left: '80%' },
    { text: 'MUST HAVE', color: '#FF2D78', width: 110, height: 45, rotate: 14, top: '75%', left: '38%' },
    { text: 'EXCLUSIVE', color: '#5856D6', width: 115, height: 46, rotate: -18, top: '78%', left: '55%' },
    { text: 'TRENDING', color: '#FF3B30', width: 100, height: 44, rotate: 28, top: '38%', left: '84%' },
    { text: 'PREMIUM', color: '#C0C0C0', width: 105, height: 46, rotate: -10, top: '50%', left: '30%' },
    { text: 'SPECIAL OFFER', color: '#FF6B35', width: 125, height: 46, rotate: 16, top: '30%', left: '30%' },
    { text: 'BUY NOW', color: '#34C759', width: 95, height: 44, rotate: -20, top: '52%', left: '62%' },
    { text: 'POPULAR', color: '#FF2D78', width: 95, height: 42, rotate: 10, top: '15%', left: '60%' }
  ];

  let container = null;
  let activeTags = [];
  let isDropping = false;

  function init(slideEl) {
    if (container) container.remove();

    container = document.createElement('div');
    container.className = 'falling-tags-layer';
    slideEl.appendChild(container);

    activeTags = [];
    TAG_DEFINITIONS.forEach((def, index) => {
      const tag = document.createElement('div');
      tag.className = 'interactive-tag';
      tag.dataset.index = index;
      tag.style.width = def.width + 'px';
      tag.style.height = def.height + 'px';
      tag.style.top = def.top;
      tag.style.left = def.left;
      tag.style.setProperty('--tag-color', def.color);
      tag.style.setProperty('--initial-rot', def.rotate + 'deg');

      // Tag içliyi (dəlik, sap, barkod, mətn)
      tag.innerHTML = `
        <div class="tag-string"></div>
        <div class="tag-hole"></div>
        <div class="tag-label">${def.text}</div>
        <div class="tag-barcode">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      `;

      // Mouse toxunanda dərhal qopsun
      const peelOff = () => {
        if (tag.classList.contains('peeled')) return;
        detachAndFall(tag, index);
      };

      tag.addEventListener('mouseenter', peelOff);
      tag.addEventListener('click', peelOff);
      tag.addEventListener('touchstart', peelOff, { passive: true });

      container.appendChild(tag);
      activeTags.push(tag);
    });
  }

  /** Tək bir etiketin qopub fizika ilə yerə düşməsi */
  function detachAndFall(tag, index, delay = 0) {
    if (tag.classList.contains('peeled')) return;
    tag.classList.add('peeled');

    const fallDistance = window.innerHeight + 200;
    const randomX = (Math.random() - 0.5) * 300;
    const randomRot = (Math.random() - 0.5) * 180 + (Math.random() > 0.5 ? 90 : -90);

    gsap.to(tag, {
      delay: delay,
      y: fallDistance,
      x: randomX,
      rotation: randomRot,
      opacity: 0,
      duration: 1.6 + Math.random() * 0.8,
      ease: 'power2.in',
      onComplete() {
        tag.style.display = 'none';
      }
    });

    // Sapın qırılma animasiyası
    const str = tag.querySelector('.tag-string');
    if (str) {
      gsap.to(str, { scaleY: 0, opacity: 0, duration: 0.2 });
    }
  }

  /** Slayd daxil olanda etiketlərin ardıcıl qopub tökülməsi */
  function startPeelingSequence() {
    isDropping = true;
    // Etiketləri əvvəlcə yellədib sonra bir-bir tök
    activeTags.forEach((tag, idx) => {
      // Yüngül yellənmə
      gsap.to(tag, {
        rotation: `+=${(Math.random() - 0.5) * 15}`,
        duration: 0.4 + Math.random() * 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      });

      // Təbii ardıcıllıqla qopub düşmə (0.6s - 2.8s arası)
      const dropDelay = 0.5 + idx * 0.14 + Math.random() * 0.2;
      detachAndFall(tag, idx, dropDelay);
    });
  }

  return {
    init,
    startPeelingSequence
  };
})();
