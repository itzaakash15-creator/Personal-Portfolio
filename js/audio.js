/**
 * AAKASH K Portfolio — Web Audio Micro-Feedback Engine
 * Lightweight, zero external files, synthesized via Web Audio API.
 * Defaults to muted / user-controlled.
 */

let audioCtx = null;
let soundEnabled = false;

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('aakash_sound_enabled', soundEnabled ? '1' : '0');
  updateSoundButtons();
  if (soundEnabled) {
    playTone(600, 'sine', 0.08, 0.05);
  }
  return soundEnabled;
}

export function initAudio() {
  soundEnabled = localStorage.getItem('aakash_sound_enabled') === '1';
  updateSoundButtons();

  // Attach toggle triggers
  document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const enabled = toggleSound();
      showToast(enabled ? 'Audio Feedback Enabled' : 'Audio Feedback Muted');
    });
  });

  // Attach subtle click/hover audio to key interactive elements
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, .work-card, .timeline-node, .lab-card, .palette-item');
    if (target && soundEnabled) {
      playClickSound();
    }
  });
}

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTone(freq = 440, type = 'sine', duration = 0.05, gainValue = 0.03) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Graceful fallback
  }
}

export function playClickSound() {
  playTone(850, 'sine', 0.04, 0.04);
}

export function playOpenSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {}
}

function updateSoundButtons() {
  document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
    const label = btn.querySelector('.sound-status-label');
    if (label) label.textContent = soundEnabled ? 'SFX ON' : 'SFX OFF';
    btn.classList.toggle('active', soundEnabled);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2400);
  }
}
