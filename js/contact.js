/**
 * AAKASH K Portfolio — Contact Form & Email Quick Copy
 */

export function initContact() {
  // 1. Quick Copy Email with Toast Feedback
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  copyBtn?.addEventListener('click', async () => {
    const email = 'itzaakash15@gmail.com';
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard: itzaakash15@gmail.com');
      } else {
        showToast('itzaakash15@gmail.com');
      }
    } catch (err) {
      showToast('itzaakash15@gmail.com');
    }
  });

  // 2. Interactive Contact Form Submission Simulation
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `✓ Message Sent!`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      showToast("Thank you! Your message was received. Aakash will respond shortly.");

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    }, 1200);
  });
}
