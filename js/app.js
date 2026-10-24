/**
 * app.js — Əsas tətbiq: naviqasiya, state, audio, fizika və toxunma idarəetməsi
 * Tam bloklamayan, yüksək cavabdehlikli və maye keçidlər
 */

const App = (() => {
  let currentSlide = 0;
  let lastNavTime = 0;
  const NAV_THROTTLE_MS = 80; // Təkrar basılmalarda glitch olmasın deyə kiçik qoruma (0.08 san)

  // ── Video Keçid Vəziyyətləri (Transition Video State) ──
  let isVideoTransitioning = false; // Video fon qatında oynadılan zaman true olur və naviqasiyanı bloklayır
  let prevBtn = null;
  let nextBtn = null;

  let touchStartX = 0;
  let touchStartY = 0;
  const SWIPE_THRESHOLD = 40;

  const container = document.getElementById('presentation');
  const progressFill = document.getElementById('progress-fill');
  const slideCounter = document.getElementById('slide-counter');
  const speakerNotes = document.getElementById('speaker-notes');
  const notesContent = document.getElementById('notes-content');
  let slideElements = [];

  /* ── DOM: Slaydları yarat ── */
  function buildSlides() {
    SLIDES.forEach((data, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' active' : '');
      slide.dataset.phase = data.phase;
      slide.dataset.index = i;

      // Fon
      const bg = document.createElement('div');
      bg.className = 'slide-bg';
      bg.style.background = data.bgGradient;
      slide.appendChild(bg);

      // Accent glow
      const glow1 = document.createElement('div');
      glow1.className = 'accent-glow top-left';
      glow1.style.background = data.bgAccent;
      slide.appendChild(glow1);

      const glow2 = document.createElement('div');
      glow2.className = 'accent-glow bottom-right';
      glow2.style.background = data.bgAccent;
      glow2.style.opacity = '0.08';
      slide.appendChild(glow2);

      // Şəkil
      const imgWrap = document.createElement('div');
      imgWrap.className = 'slide-image-wrap';
      const img = document.createElement('img');
      img.className = 'slide-image';
      img.src = data.image + '?v=20261014_rev1';
      img.alt = data.imageAlt;
      img.loading = (i < 7 || i >= 7) ? 'eager' : 'lazy';
      imgWrap.appendChild(img);

      // Keçid Videosu (FON QATINDA — mətnlərin arxasında yerləşir)
      if (data.transitionVideo) {
        const video = document.createElement('video');
        video.className = 'slide-bg-video';
        video.src = data.transitionVideo;
        video.muted = true;
        video.volume = 0;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.preload = 'auto';
        imgWrap.appendChild(video);
      }

      slide.appendChild(imgWrap);

      // Vignette
      const vignette = document.createElement('div');
      vignette.className = 'vignette';
      slide.appendChild(vignette);

      // Məzmun
      const content = document.createElement('div');
      content.className = 'slide-content';

      // Sayğac (əgər varsa, başlıqdan əvvəl)
      if (data.hasCounter) {
        const counterWrap = document.createElement('div');
        counterWrap.className = 'counter-wrap';

        const counterNum = document.createElement('div');
        counterNum.className = 'counter-number';
        counterNum.textContent = '0' + data.counterSuffix;
        counterNum.style.color = data.bgAccent;
        counterWrap.appendChild(counterNum);

        const counterLabel = document.createElement('div');
        counterLabel.className = 'counter-label';
        counterLabel.textContent = data.counterLabel;
        counterWrap.appendChild(counterLabel);

        content.appendChild(counterWrap);
      }

      // Başlıq
      const title = document.createElement('h1');
      title.className = 'slide-title';
      title.textContent = data.title;
      content.appendChild(title);

      // Alt başlıq
      if (data.subtitle) {
        const subtitle = document.createElement('p');
        subtitle.className = 'slide-subtitle';
        subtitle.textContent = data.subtitle;
        content.appendChild(subtitle);
      }

      // Açar sözlər
      if (data.keywords && data.keywords.length > 0) {
        const kwWrap = document.createElement('div');
        kwWrap.className = 'slide-keywords';
        data.keywords.forEach(kw => {
          const span = document.createElement('span');
          span.className = 'keyword';
          span.textContent = kw;
          kwWrap.appendChild(span);
        });
        content.appendChild(kwWrap);
      }

      // Element simvolları (slayd 14)
      if (data.id === 14) {
        const elemRow = document.createElement('div');
        elemRow.className = 'elements-row';
        ['Fe', 'Ca', 'O₂', 'C'].forEach(sym => {
          const badge = document.createElement('div');
          badge.className = 'element-badge';
          badge.textContent = sym;
          elemRow.appendChild(badge);
        });
        content.appendChild(elemRow);
      }

      slide.appendChild(content);

      // Slayd 13 üçün fiziki etiketlər modulunu hazırla
      if (data.id === 13 && window.FallingTags) {
        FallingTags.init(slide);
      }

      container.appendChild(slide);
      slideElements.push(slide);
    });

    // İlk slaydı göstər
    slideElements[0].style.opacity = '1';
    slideElements[0].style.visibility = 'visible';
  }

  /* ── Naviqasiya Məntiqi: Video Keçidi və ya Standart GSAP (Tələb 2 & 4) ── */
  function goToSlide(targetIndex) {
    // Tələb 4: Video oynadılan müddətdə naviqasiya tam deaktivdir
    if (isVideoTransitioning) return;

    const now = Date.now();
    if (now - lastNavTime < NAV_THROTTLE_MS) return;
    if (targetIndex < 0 || targetIndex >= SLIDES.length) return;
    if (targetIndex === currentSlide) return;

    lastNavTime = now;

    const oldIndex = currentSlide;
    const oldSlide = slideElements[oldIndex];
    const newSlide = slideElements[targetIndex];

    /*
     * ── Tələb 2: Video Keçidləri (Slayd 1 → 2, Slayd 2 → 3, Slayd 8 → 9, Slayd 9 → 10 və s.) ──
     * Yalnız irəli keçidlərdə (targetIndex === oldIndex + 1):
     * Cari slayd (və ya hədəf slayd) üçün transitionVideo təyin olunubmu və arxa fonda video elementi varmı?
     */
    let transitionVideoSrc = null;
    if (targetIndex === oldIndex + 1 && SLIDES[oldIndex] && SLIDES[oldIndex].transitionVideo) {
      transitionVideoSrc = SLIDES[oldIndex].transitionVideo;
    }

    let bgVideo = oldSlide ? oldSlide.querySelector('.slide-bg-video') : null;

    if (transitionVideoSrc && bgVideo && !bgVideo.error) {
      if (bgVideo.getAttribute('src') !== transitionVideoSrc && !bgVideo.src.endsWith(transitionVideoSrc)) {
        bgVideo.src = transitionVideoSrc;
      }
      // Background qatında video keçidini başlat
      playVideoTransition(oldSlide, oldIndex, newSlide, targetIndex, bgVideo);
    } else {
      // Standart GSAP keçidi
      playStandardTransition(oldSlide, oldIndex, newSlide, targetIndex);
    }
  }

  /* ── Video Keçidinin İcrası (Video yalnız FON QATINDA oynayır, mətnlər üstdə qalır) ── */
  function playVideoTransition(oldSlide, oldIndex, newSlide, targetIndex, bgVideo) {
    isVideoTransitioning = true;
    document.body.classList.add('video-transition-active');

    // Tələb 4: Naviqasiya düymələrini deaktiv et
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;

    // Slayd sayğacı və progress bar dərhal növbəti slayda uyğun yenilənir
    currentSlide = targetIndex;
    updateUI();

    // Musiqi idarəsi
    if (window.AudioManager) {
      AudioManager.onSlideChange(targetIndex);
    }

    // Əvvəlki və hədəf slaydların cari tween-lərini dayandır
    gsap.killTweensOf(oldSlide);
    gsap.killTweensOf(oldSlide.querySelectorAll('*'));
    gsap.killTweensOf(newSlide);
    gsap.killTweensOf(newSlide.querySelectorAll('*'));

    // Digər bütün slaydları təmizlə
    slideElements.forEach((s, idx) => {
      if (idx !== oldIndex && idx !== targetIndex) {
        s.classList.remove('active', 'exiting');
        s.style.opacity = '0';
        s.style.visibility = 'hidden';
      }
    });

    // 1. Slaydın mətni və vizual elementləri öz adi OUT animasiyası ilə çıxır
    const oldContent = oldSlide.querySelector('.slide-content');
    if (oldContent) {
      gsap.to(oldContent, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.35,
        ease: 'power2.in'
      });
    }

    const fallingLayer = oldSlide.querySelector('.falling-tags-layer');
    if (fallingLayer) {
      gsap.to(fallingLayer, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in'
      });
    }

    // 2. Eyni zamanda background qatında video görünür və oynayır
    bgVideo.volume = 0;
    bgVideo.muted = true;
    bgVideo.currentTime = 0;
    bgVideo.style.display = 'block';
    bgVideo.classList.add('playing');
    bgVideo.style.opacity = '1';

    let transitionFinished = false;

    function cleanup() {
      bgVideo.removeEventListener('ended', handleEnded);
      bgVideo.removeEventListener('error', handleError);
    }

    // 3. Video bitdikdə background qatı Slayd 2-nin statik fonuna keçir və Slayd 2 mətni IN edir
    function handleEnded() {
      if (transitionFinished) return;
      transitionFinished = true;
      cleanup();

      // Videonu gizlət
      bgVideo.pause();
      bgVideo.classList.remove('playing');
      bgVideo.style.display = 'none';
      bgVideo.style.opacity = '0';

      // Əvvəlki slaydı gizlət və məzmun stillərini sıfırla
      oldSlide.classList.remove('active', 'exiting');
      oldSlide.style.opacity = '0';
      oldSlide.style.visibility = 'hidden';
      if (oldContent) {
        gsap.set(oldContent, { clearProps: 'all' });
      }
      if (fallingLayer) {
        gsap.set(fallingLayer, { clearProps: 'all' });
      }

      // Slayd 2-ni aktivləşdir (yeni2.jpg videonun son kadrı ilə eynidir, ona görə keçid sıçrayışsızdır)
      newSlide.classList.add('active');
      newSlide.style.opacity = '1';
      newSlide.style.visibility = 'visible';

      // 4. Slayd 2-nin mətni öz adi IN animasiyası ilə görünür
      Animations.animateIn(newSlide, targetIndex);

      // Starfield idarəsi (13-17-ci slaydlarda aktiv)
      if (targetIndex >= 12 && !Starfield.respectsReducedMotion()) {
        Starfield.show();
      } else {
        Starfield.hide();
      }

      // Slayd 13 üçün FallingTags inisializasiyası
      if (targetIndex === 12 && window.FallingTags) {
        FallingTags.init(newSlide);
      }

      // Naviqasiyanı yenidən aktivləşdir və sonuncu slayd vəziyyətini yenilə
      isVideoTransitioning = false;
      document.body.classList.remove('video-transition-active');
      updateUI();
    }

    // Xəta olarsa (onerror)
    function handleError(err) {
      if (transitionFinished) return;
      transitionFinished = true;
      cleanup();
      console.warn('Video xətası, normal GSAP keçidinə qayıdılır:', err);

      bgVideo.pause();
      bgVideo.classList.remove('playing');
      bgVideo.style.display = 'none';
      bgVideo.style.opacity = '0';

      if (oldContent) {
        gsap.set(oldContent, { clearProps: 'all' });
      }
      if (fallingLayer) {
        gsap.set(fallingLayer, { clearProps: 'all' });
      }

      Animations.animateOut(oldSlide, oldIndex);
      Animations.animateIn(newSlide, targetIndex);

      if (targetIndex >= 12 && !Starfield.respectsReducedMotion()) {
        Starfield.show();
      } else {
        Starfield.hide();
      }

      if (targetIndex === 12 && window.FallingTags) {
        FallingTags.init(newSlide);
      }

      isVideoTransitioning = false;
      document.body.classList.remove('video-transition-active');
      updateUI();
    }

    bgVideo.addEventListener('ended', handleEnded);
    bgVideo.addEventListener('error', handleError);

    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        handleError(err);
      });
    }
  }

  /* ── Standart GSAP Keçid Rejimi (Köhnə/Normal Keçid) ── */
  function playStandardTransition(oldSlide, oldIndex, newSlide, targetIndex) {
    gsap.killTweensOf(oldSlide);
    gsap.killTweensOf(oldSlide.querySelectorAll('*'));
    gsap.killTweensOf(newSlide);
    gsap.killTweensOf(newSlide.querySelectorAll('*'));

    slideElements.forEach((s, idx) => {
      if (idx !== oldIndex && idx !== targetIndex) {
        s.classList.remove('active', 'exiting');
        s.style.opacity = '0';
        s.style.visibility = 'hidden';
      }
    });

    if (targetIndex >= 12 && !Starfield.respectsReducedMotion()) {
      Starfield.show();
    } else {
      Starfield.hide();
    }

    if (targetIndex === 12 && window.FallingTags) {
      FallingTags.init(newSlide);
    }

    Animations.animateOut(oldSlide, oldIndex);
    Animations.animateIn(newSlide, targetIndex);

    currentSlide = targetIndex;
    updateUI();

    if (window.AudioManager) {
      AudioManager.onSlideChange(targetIndex);
    }
  }

  function nextSlide() {
    if (isVideoTransitioning) return;
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (isVideoTransitioning) return;
    goToSlide(currentSlide - 1);
  }

  /* ── UI yeniləmə ── */
  function updateUI() {
    // Progress bar
    const progress = ((currentSlide + 1) / SLIDES.length) * 100;
    progressFill.style.width = progress + '%';
    progressFill.style.background = SLIDES[currentSlide].bgAccent;

    // Sayğac
    const cur = String(currentSlide + 1).padStart(2, '0');
    const total = String(SLIDES.length).padStart(2, '0');
    slideCounter.textContent = `${cur} / ${total}`;

    // Speaker notes
    notesContent.textContent = SLIDES[currentSlide].notes;

    // Naviqasiya düymələri: video keçidi zamanı bağlı, normal rejimdə ilk/son slayd limitləri
    if (prevBtn) {
      prevBtn.disabled = isVideoTransitioning || currentSlide === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = isVideoTransitioning || currentSlide >= SLIDES.length - 1;
    }
  }

  /* ── Klaviatura ── */
  function onKeyDown(e) {
    // Tələb 6: Video oynadılan müddətdə naviqasiya düymələri (ox düymələri, space) deaktiv olsun
    if (isVideoTransitioning) {
      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        return;
      }
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'n':
      case 'N':
        toggleNotes();
        break;
      case 'm':
      case 'M':
        toggleAudio();
        break;
    }
  }

  /* ── Tam ekran ── */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /* ── Speaker notes ── */
  function toggleNotes() {
    speakerNotes.classList.toggle('visible');
  }

  /* ── Touch / Swipe ── */
  function onPointerDown(e) {
    if (isVideoTransitioning) return;
    touchStartX = e.clientX;
    touchStartY = e.clientY;
  }

  function onPointerUp(e) {
    if (isVideoTransitioning) return;
    const dx = e.clientX - touchStartX;
    const dy = e.clientY - touchStartY;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  }

  /* ── İlk giriş animasiyası ── */
  function playInitialAnimation() {
    const firstSlide = slideElements[0];
    setTimeout(() => {
      Animations.animateIn(firstSlide, 0);
    }, 150);
  }

  /* ── İnisializasiya ── */
  function init() {
    buildSlides();
    updateUI();
    Starfield.init();

    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');

    // Tələb 3, 4 & 5: Video overlay elementini tap və konfiqurasiya et
    // Fon qatındakı bütün keçid videolarını konfiqurasiya və preload et
    document.querySelectorAll('.slide-bg-video').forEach(vid => {
      vid.volume = 0;
      vid.muted = true;
      try { vid.load(); } catch (e) {}
    });

    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch/Swipe
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);

    // İlk animasiya
    playInitialAnimation();

    // Audio inisializasiya
    if (window.AudioManager) {
      AudioManager.init();
    }

    // Audio düymə
    const audioBtn = document.getElementById('audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', toggleAudio);
    }

    console.log('🎬 Prezentasiya hazırdır! Slaydlar: ' + SLIDES.length);
    console.log('⌨️ Düymələr: ←→ naviqasiya, Space, F tam ekran, N speaker notes, M səs');
  }

  // DOM hazır olanda başlat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Audio toggle ── */
  function toggleAudio(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    if (window.AudioManager) {
      window.AudioManager.toggle();
    }
  }

  const api = { nextSlide, prevSlide, goToSlide, toggleFullscreen, toggleNotes, toggleAudio };
  window.Presentation = api;
  return api;
})();
