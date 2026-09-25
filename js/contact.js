/**
 * AAKASH K Portfolio — Contact & Direct Action Logic
 * Handles interactive contact form validation, toast notifications,
 * and direct email copying to clipboard.
 */

export function initContact() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = 'itzaakash15@gmail.com';

  // Copy email functionality
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailVal);
      showToast(`Email copied: ${emailVal}`);
    } catch (err) {
      showToast(`Contact: ${emailVal}`);
    }
  });

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const serviceInput = form.querySelector('[name="service"]');
      const messageInput = form.querySelector('[name="message"]');

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const service = serviceInput?.value.trim() || 'Strategy Consultation';
      const message = messageInput?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Construct mailto link
      const subject = encodeURIComponent(`[Inquiry] ${service} — ${name}`);
      const body = encodeURIComponent(`Hi Aakash,\n\nMy name is ${name} (${email}).\n\nService of Interest: ${service}\n\nProject Details:\n${message}\n\nLooking forward to speaking.`);
      
      const mailtoUrl = `mailto:${emailVal}?subject=${subject}&body=${body}`;

      showToast('Opening your email client to send message...');
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      form.reset();
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2600);
  }
}
