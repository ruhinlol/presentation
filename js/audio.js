/**
 * audio.js — 3 Trekli dinamik təqdimat audio sistemi
 * Trek 1: "Hand Covers Bruise" — Slayd 1-dən 11-ə qədər (index 0 - 10)
 * Trek Market: "markett.mp3" — Slayd 12-yə girdikdən 15 saniyə sonra, 45-ci saniyədən başlayır!
 * Trek 2: "M83 - Outro" — Slayd 13-dən sona qədər (index 12 - 16, 0:00-dan, 5s gecikmə, partlayış 2:25-də)
 */

window.AudioManager = (() => {
  let track1 = null;      // Hand Covers Bruise
  let trackMarket = null; // markett.mp3
  let track2 = null;      // M83 - Outro
  let isMuted = false;
  let isPlaying = false;
  let currentSlide = 0;
  let fadeInterval = null;
  let marketTimer = null;
  let m83Timer = null;
  let marketGainNode = null;
  let audioCtx = null;

  const M83_START_TIME = 0;     // 0:00 — mahnı əvvəldən başlayır, partlayış 2:25-də
  const M83_DELAY_MS = 5000;    // Slayd 13-ə keçdikdən 5 saniyə sonra M83 başlasın
  const MARKET_START_TIME = 45; // 45-ci saniyədən
  const MARKET_DELAY_MS = 15000; // 12-ci slayda keçdikdən 15 saniyə sonra

  /* ── Fade intervalını təmizlə ── */
  function clearFade() {
    if (fadeInterval) {
      clearInterval(fadeInterval);
      fadeInterval = null;
    }
  }

  /* ── Market taymerini təmizlə ── */
  function clearMarketTimer() {
    if (marketTimer) {
      clearTimeout(marketTimer);
      marketTimer = null;
    }
  }

  /* ── M83 taymerini təmizlə ── */
  function clearM83Timer() {
    if (m83Timer) {
      clearTimeout(m83Timer);
      m83Timer = null;
    }
  }

  /* ── Trek 1 (Hand Covers Bruise) ── */
  function getTrack1() {
    if (!track1) {
      track1 = new Audio('assets/hand_covers_bruise.mp3');
      track1.loop = true;
      track1.volume = 1.0;
      track1.preload = 'auto';

      fetch('assets/hand_covers_bruise.dat')
        .then(r => r.blob())
        .then(b => {
          const url = URL.createObjectURL(b);
          const wasPlaying = !track1.paused;
          const ct = track1.currentTime;
          track1.src = url;
          track1.currentTime = ct;
          if (wasPlaying) track1.play().catch(() => {});
        })
        .catch(() => {});
    }
    return track1;
  }

  /* ── Trek Market (markett.mp3) — 300% səs gücləndirilməsi ── */
  function getTrackMarket() {
    if (!trackMarket) {
      trackMarket = new Audio('assets/markett.mp3');
      trackMarket.loop = true;
      trackMarket.volume = 1.0;
      trackMarket.preload = 'auto';

      // Web Audio API ilə səsi 300% gücləndir
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const source = audioCtx.createMediaElementSource(trackMarket);
        marketGainNode = audioCtx.createGain();
        marketGainNode.gain.value = 3.0; // 300%
        source.connect(marketGainNode);
        marketGainNode.connect(audioCtx.destination);
      } catch (e) {
        console.warn('Web Audio API market gain xətası:', e);
      }

      trackMarket.addEventListener('loadedmetadata', () => {
        trackMarket.currentTime = MARKET_START_TIME;
      });

      fetch('assets/markett.dat')
        .then(r => r.blob())
        .then(b => {
          const url = URL.createObjectURL(b);
          const wasPlaying = !trackMarket.paused;
          const ct = trackMarket.currentTime || MARKET_START_TIME;
          trackMarket.src = url;
          trackMarket.currentTime = ct;
          if (wasPlaying) trackMarket.play().catch(() => {});
        })
        .catch(() => {});
    }
    return trackMarket;
  }

  /* ── Trek 2 (M83 - Outro) ── */
  function getTrack2() {
    if (!track2) {
      track2 = new Audio('assets/m83_outro.mp3');
      track2.loop = false;
      track2.volume = 1.0;
      track2.preload = 'auto';

      track2.addEventListener('loadedmetadata', () => {
        if (track2.currentTime < M83_START_TIME) {
          track2.currentTime = M83_START_TIME;
        }
      });

      fetch('assets/m83_outro.dat')
        .then(r => r.blob())
        .then(b => {
          const url = URL.createObjectURL(b);
          const wasPlaying = !track2.paused;
          const ct = track2.currentTime || M83_START_TIME;
          track2.src = url;
          track2.currentTime = ct < M83_START_TIME ? M83_START_TIME : ct;
          if (wasPlaying) track2.play().catch(() => {});
        })
        .catch(() => {});
    }
    return track2;
  }

  /* ── Cari slayda uyğun aktiv treki qaytar ── */
  function getActiveTrack() {
    if (currentSlide <= 10) return getTrack1();
    if (currentSlide === 11) return getTrackMarket();
    return getTrack2();
  }

  /* ── Musiqini çal ── */
  function play() {
    if (isMuted) return;

    clearFade();

    // Slayd 12-də birbaşa play çağırılarsa, markett trekini ifa et
    if (currentSlide === 11) {
      const tm = getTrackMarket();
      if (track1) track1.pause();
      if (track2) track2.pause();
      if (tm.currentTime < MARKET_START_TIME) {
        tm.currentTime = MARKET_START_TIME;
      }
      tm.volume = 1.0;
      tm.play().then(() => {
        isPlaying = true;
        updateUI(true);
      }).catch(() => {});
      return;
    }

    const active = getActiveTrack();
    if (!active) return;

    if (active === track1) {
      if (track2) track2.pause();
      if (trackMarket) trackMarket.pause();
    } else if (active === track2) {
      if (track1) track1.pause();
      if (trackMarket) trackMarket.pause();
      if (track2.currentTime < M83_START_TIME) {
        track2.currentTime = M83_START_TIME;
      }
    }

    active.volume = 1.0;
    const p = active.play();
    if (p !== undefined) {
      p.then(() => {
        isPlaying = true;
        updateUI(true);
      }).catch(err => {
        isPlaying = false;
        updateUI(false);
      });
    }
  }

  /* ── Bütün musiqiləri dayandır ── */
  function pause() {
    clearFade();
    clearMarketTimer();
    clearM83Timer();
    if (track1) { track1.pause(); track1.volume = 1.0; }
    if (trackMarket) { trackMarket.pause(); trackMarket.volume = 1.0; }
    if (track2) { track2.pause(); track2.volume = 1.0; }
    isPlaying = false;
    updateUI(false);
  }

  /* ── Slayd dəyişəndə ── */
  function onSlideChange(slideIndex) {
    const prevSlide = currentSlide;
    currentSlide = slideIndex;
    clearMarketTimer();
    clearM83Timer();

    // ──── Slayd 1-11 (index 0 - 10): Track 1 (Hand Covers Bruise) ────
    if (slideIndex <= 10) {
      if (trackMarket) trackMarket.pause();
      if (track2) {
        track2.pause();
        track2.currentTime = M83_START_TIME;
      }
      if (!isMuted) {
        play();
      }
      return;
    }

    // ──── Slayd 12 (index 11): Sükut + 15 saniyə sonra markett.mp3 (45s-dən) ────
    if (slideIndex === 11) {
      // 1. Əvvəlki musiqiləri dərhal dayandır (tam sükut)
      if (track1) track1.pause();
      if (track2) track2.pause();
      if (trackMarket) {
        trackMarket.pause();
        trackMarket.currentTime = MARKET_START_TIME;
      }
      isPlaying = false;
      updateUI(false);

      // 2. 15 saniyə sonra markett.mp3-ü 45-ci saniyədən başlat
      marketTimer = setTimeout(() => {
        // Hələ də 12-ci slayddadırsa və səs söndürülməyibsə
        if (currentSlide === 11 && !isMuted) {
          const tm = getTrackMarket();
          tm.currentTime = MARKET_START_TIME; // 45-ci saniyə
          tm.volume = 1.0;
          // AudioContext resume (autoplay policy)
          if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          tm.play().then(() => {
            isPlaying = true;
            updateUI(true);
            showToast('🛒 Market xaosu (45s) — 300%');
          }).catch(() => {});
        }
      }, MARKET_DELAY_MS);
      return;
    }

    // ──── Slayd 13-17 (index 12 - 16): Track 2 (M83 - Outro, 0:00-dan, 5s gecikmə ilə) ────
    if (slideIndex >= 12) {
      if (track1) track1.pause();
      if (trackMarket) {
        trackMarket.pause();
        trackMarket.currentTime = MARKET_START_TIME;
      }

      const t2 = getTrack2();

      // İlk dəfə kosmik fazaya keçid — 5 saniyə gözlə, sonra 0:00-dan başla
      if (prevSlide < 12) {
        t2.currentTime = M83_START_TIME; // 0:00
        t2.pause();
        isPlaying = false;
        updateUI(false);

        m83Timer = setTimeout(() => {
          if (currentSlide >= 12 && !isMuted) {
            t2.currentTime = M83_START_TIME;
            t2.volume = 1.0;
            t2.play().then(() => {
              isPlaying = true;
              updateUI(true);
              showToast('🎵 M83 - Outro (0:00)');
            }).catch(() => {});
          }
        }, M83_DELAY_MS);
      } else {
        // Artıq kosmik fazadadır, slaydlar arası keçiddə musiqini davam etdir
        if (!isMuted) {
          play();
        }
      }
      return;
    }
  }

  /* ── Səs düyməsi kliklənəndə (Aç / Bağla) ── */
  function toggle() {
    if (isPlaying) {
      isMuted = true;
      pause();
      showToast('🔇 Səs dayandırıldı');
    } else {
      isMuted = false;
      play();
      let songName = 'Hand Covers Bruise';
      if (currentSlide === 11) songName = 'Market Xaosu (45s)';
      else if (currentSlide >= 12) songName = 'M83 - Outro (0:00)';
      showToast('🔊 ' + songName);
    }
    return isMuted;
  }

  /* ── UI Düyməsini yenilə ── */
  function updateUI(playing) {
    const onIcon = document.getElementById('audio-icon-on');
    const offIcon = document.getElementById('audio-icon-off');
    const btn = document.getElementById('audio-btn');

    if (onIcon && offIcon) {
      onIcon.style.display = playing ? 'block' : 'none';
      offIcon.style.display = playing ? 'none' : 'block';
    }

    if (btn) {
      if (playing) {
        btn.classList.add('playing');
        btn.title = 'Musiqini dayandır (M)';
      } else {
        btn.classList.remove('playing');
        btn.title = 'Musiqini başlat (M)';
      }
    }
  }

  /* ── Ekranda bildiriş ── */
  function showToast(text) {
    let t = document.getElementById('audio-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'audio-toast';
      t.style.cssText = `
        position: fixed;
        top: 24px;
        right: 80px;
        background: rgba(13, 13, 26, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 45, 120, 0.6);
        color: #fff;
        padding: 8px 18px;
        border-radius: 20px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        font-weight: 600;
        z-index: 99999;
        opacity: 0;
        transform: translateY(-8px);
        transition: all 0.25s ease;
        pointer-events: none;
      `;
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-8px)';
    }, 2500);
  }

  /* ── İnisializasiya ── */
  function init() {
    getTrack1();
    getTrackMarket();
    getTrack2();

    const handleGesture = (e) => {
      if (e.target && e.target.closest('#audio-btn')) {
        return;
      }
      if (!isMuted && !isPlaying && currentSlide !== 11) {
        play();
      }
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    if (currentSlide <= 10) {
      play();
    }
  }

  return { init, onSlideChange, toggle, play, pause };
})();
