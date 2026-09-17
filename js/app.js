/**
 * Main Application Logic for Digital Wedding Invitation
 * Mengatur: Cover amplop, Audio player, Countdown timer, RSVP & Guestbook,
 * Salin No Rekening, Modal Lightbox, dan Animasi Scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRecipientName();
  initEnvelopeOpener();
  initAudioPlayer();
  initCountdownTimer();
  initCopyButtons();
  initRSVPAndGuestbook();
  initGalleryLightbox();
  initScrollAnimations();
});

/* ----------------------------------------------------
 * 1. RECIPIENT NAME VIA URL QUERY (?to=...)
 * ---------------------------------------------------- */
function initRecipientName() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to') || params.get('u') || params.get('dear');
  const recipientEl = document.getElementById('guestRecipientName');
  const recipientInputEl = document.getElementById('rsvpName');

  if (recipientEl) {
    if (guestName) {
      // Decode and sanitize name
      const cleanName = decodeURIComponent(guestName.replace(/\+/g, ' ')).trim();
      recipientEl.textContent = cleanName;
      if (recipientInputEl && !recipientInputEl.value) {
        recipientInputEl.value = cleanName;
      }
    } else {
      recipientEl.textContent = 'Tamu Undangan Istimewa';
    }
  }
}

/* ----------------------------------------------------
 * 2. ENVELOPE OPENER & COVER TRANSITION
 * ---------------------------------------------------- */
function initEnvelopeOpener() {
  const openBtn = document.getElementById('btnOpenInvitation');
  const coverSection = document.getElementById('coverEnvelope');
  const mainContent = document.getElementById('mainInvitation');

  if (!openBtn || !coverSection) return;

  openBtn.addEventListener('click', () => {
    // Start music playback on user interaction
    playWeddingMusic();

    // Add opening animation classes
    coverSection.classList.add('opened');
    document.body.classList.remove('no-scroll');

    // Smooth scroll to hero section
    setTimeout(() => {
      coverSection.style.display = 'none';
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
      // Trigger scroll-based animations
      triggerScrollReveals();
    }, 900);
  });
}

/* ----------------------------------------------------
 * 3. AUDIO BACKGROUND PLAYER (FLOATING DISC)
 * ---------------------------------------------------- */
let bgAudio = null;
let isAudioPlaying = false;

function initAudioPlayer() {
  bgAudio = document.getElementById('weddingAudio');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioDisc = document.getElementById('audioDisc');

  if (!bgAudio || !audioToggleBtn) return;

  // Set default volume
  bgAudio.volume = 0.55;

  audioToggleBtn.addEventListener('click', () => {
    if (isAudioPlaying) {
      pauseWeddingMusic();
    } else {
      playWeddingMusic();
    }
  });

  bgAudio.addEventListener('ended', () => {
    // Loop playback smoothly
    bgAudio.currentTime = 0;
    bgAudio.play().catch(() => {});
  });
}

function playWeddingMusic() {
  if (!bgAudio) return;
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioDisc = document.getElementById('audioDisc');

  bgAudio.play().then(() => {
    isAudioPlaying = true;
    if (audioDisc) audioDisc.classList.add('playing');
    if (audioToggleBtn) {
      audioToggleBtn.setAttribute('title', 'Jeda Musik');
      audioToggleBtn.classList.add('active');
      const icon = audioToggleBtn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-compact-disc spin-slow';
      }
    }
  }).catch((err) => {
    console.warn('Autoplay prevented or audio source loading:', err);
    // Fallback gently
  });
}

function pauseWeddingMusic() {
  if (!bgAudio) return;
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioDisc = document.getElementById('audioDisc');

  bgAudio.pause();
  isAudioPlaying = false;
  if (audioDisc) audioDisc.classList.remove('playing');
  if (audioToggleBtn) {
    audioToggleBtn.setAttribute('title', 'Putar Musik');
    audioToggleBtn.classList.remove('active');
    const icon = audioToggleBtn.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-play';
    }
  }
}

/* ----------------------------------------------------
 * 4. COUNTDOWN TIMER
 * ---------------------------------------------------- */
function initCountdownTimer() {
  // Target Wedding Date: 12 Desember 2026, 09:00:00 WIB
  const weddingDate = new Date('2026-12-12T09:00:00+07:00').getTime();

  const daysEl = document.getElementById('timerDays');
  const hoursEl = document.getElementById('timerHours');
  const minsEl = document.getElementById('timerMins');
  const secsEl = document.getElementById('timerSecs');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const statusNote = document.getElementById('timerStatusNote');
      if (statusNote) statusNote.textContent = 'Alhamdulillah, acara telah berlangsung!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ----------------------------------------------------
 * 5. COPY TO CLIPBOARD BUTTONS & TOAST NOTIFICATION
 * ---------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Nomor Rekening';

      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`✨ Berhasil menyalin ${label}: ${textToCopy}`);

        // Visual button feedback
        const origHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        // Fallback manual copy
        fallbackCopyTextToClipboard(textToCopy);
        showToast(`✨ Berhasil menyalin ${label}!`);
      });
    });
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, 3000);
}

/* ----------------------------------------------------
 * 6. RSVP & GUESTBOOK (LOCAL STORAGE + PRE-SEEDED)
 * ---------------------------------------------------- */
const DEFAULT_WISHES = [
  {
    name: 'Keluarga Besar Bp. Ir. Handoko',
    attendance: 'hadir',
    count: '3 Tamu',
    wish: 'Selamat menempuh hidup baru untuk Rizky & Amanda. Semoga menjadi keluarga sakinah, mawaddah, warahmah serta dikaruniai keturunan yang sholeh & sholehah. Aamiin ya Rabbal Alamin.',
    time: '2 jam yang lalu'
  },
  {
    name: 'Dwi Prasetyo (Sahabat Kampus)',
    attendance: 'hadir',
    count: '2 Tamu',
    wish: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khoir, bro Rizky! Akhirnya berlabuh ke pelaminan dengan Amanda. Bahagia dan sukses selalu untuk kalian berdua!',
    time: '4 jam yang lalu'
  },
  {
    name: 'Citra Kirana & Rekan Kantor',
    attendance: 'hadir',
    count: '2 Tamu',
    wish: 'Happy wedding dear Amanda cantik & Mas Rizky! Wishing you both a lifetime of immense joy, love, and endless blessings. Can’t wait to attend and celebrate this beautiful day with you guys! ❤️',
    time: 'Kemarin'
  },
  {
    name: 'Farhan & Maya',
    attendance: 'hadir',
    count: '1 Tamu',
    wish: 'Selamat berbahagia Amanda dan Mas Rizky. Semoga cinta kalian senantiasa mekar abadi hingga kakek nenek nanti!',
    time: '2 hari yang lalu'
  }
];

function initRSVPAndGuestbook() {
  const rsvpForm = document.getElementById('rsvpForm');
  const wishesListContainer = document.getElementById('wishesList');
  const wishCounterBadge = document.getElementById('wishCounterBadge');

  if (!wishesListContainer) return;

  // Load from localStorage or use defaults
  let storedWishes = [];
  try {
    const data = localStorage.getItem('wedding_wishes_rizky_amanda');
    if (data) {
      storedWishes = JSON.parse(data);
    }
  } catch (e) {
    storedWishes = [];
  }

  if (!storedWishes || storedWishes.length === 0) {
    storedWishes = [...DEFAULT_WISHES];
    try {
      localStorage.setItem('wedding_wishes_rizky_amanda', JSON.stringify(storedWishes));
    } catch (e) {}
  }

  renderWishes(storedWishes);

  // Handle Form Submit
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvpName');
      const statusInput = document.getElementById('rsvpAttendance');
      const countInput = document.getElementById('rsvpGuests');
      const messageInput = document.getElementById('rsvpMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const attendance = statusInput ? statusInput.value : 'hadir';
      const count = countInput ? countInput.value + ' Tamu' : '1 Tamu';
      const wish = messageInput ? messageInput.value.trim() : '';

      if (!name || !wish) {
        showToast('⚠️ Mohon isi Nama dan Pesan Doa Anda.');
        return;
      }

      const newWish = {
        name: name,
        attendance: attendance,
        count: count,
        wish: wish,
        time: 'Baru saja'
      };

      storedWishes.unshift(newWish);
      try {
        localStorage.setItem('wedding_wishes_rizky_amanda', JSON.stringify(storedWishes));
      } catch (e) {}

      renderWishes(storedWishes);
      showToast('💌 Terima kasih! Doa restu Anda telah berhasil terkirim.');

      // Clear fields
      if (messageInput) messageInput.value = '';

      // Scroll to new wish
      const firstItem = wishesListContainer.firstElementChild;
      if (firstItem) {
        firstItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

function renderWishes(wishes) {
  const container = document.getElementById('wishesList');
  const badge = document.getElementById('wishCounterBadge');
  if (!container) return;

  if (badge) {
    badge.textContent = `${wishes.length} Doa Terkirim`;
  }

  container.innerHTML = wishes.map((item) => {
    const isHadir = item.attendance === 'hadir';
    const isRagu = item.attendance === 'ragu';
    const badgeClass = isHadir ? 'badge-hadir' : (isRagu ? 'badge-ragu' : 'badge-absen');
    const badgeText = isHadir ? '✓ Hadir' : (isRagu ? '? Ragu-ragu' : '✕ Berhalangan');

    // Initial avatar letter
    const initial = item.name ? item.name.charAt(0).toUpperCase() : 'G';

    return `
      <div class="wish-card">
        <div class="wish-header">
          <div class="wish-avatar">${initial}</div>
          <div class="wish-meta">
            <h4 class="wish-author">${escapeHtml(item.name)}</h4>
            <div class="wish-sub">
              <span class="attendance-badge ${badgeClass}">${badgeText}</span>
              ${item.count ? `<span class="guest-count"><i class="fas fa-user-friends"></i> ${escapeHtml(item.count)}</span>` : ''}
              <span class="wish-time"><i class="far fa-clock"></i> ${escapeHtml(item.time)}</span>
            </div>
          </div>
        </div>
        <p class="wish-body">${escapeHtml(item.wish)}</p>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/* ----------------------------------------------------
 * 7. GALLERY LIGHTBOX & QRIS MODAL
 * ---------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightboxModal || !lightboxImg) return;

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  const closeModal = () => {
    lightboxModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeModal);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeModal();
    }
  });

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeQrisModal();
    }
  });

  // QRIS Modal logic
  const qrisTrigger = document.getElementById('btnShowQris');
  const qrisModal = document.getElementById('qrisModal');
  const qrisClose = document.getElementById('qrisClose');

  if (qrisTrigger && qrisModal) {
    qrisTrigger.addEventListener('click', () => {
      qrisModal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  }

  if (qrisClose && qrisModal) {
    qrisClose.addEventListener('click', closeQrisModal);
  }

  if (qrisModal) {
    qrisModal.addEventListener('click', (e) => {
      if (e.target === qrisModal) closeQrisModal();
    });
  }
}

function closeQrisModal() {
  const qrisModal = document.getElementById('qrisModal');
  if (qrisModal) {
    qrisModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

/* ----------------------------------------------------
 * 8. SCROLL REVEAL ANIMATIONS
 * ---------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

function triggerScrollReveals() {
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('in-view');
    }
  });
}
