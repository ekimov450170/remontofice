/* UniGroup — main.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header ── */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Burger menu ── */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  burger?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Lead form (Formspree) ── */
  const form = document.getElementById('leadForm');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const originalText = btn.textContent;
    btn.textContent = 'Отправляем…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.innerHTML = `<div style="text-align:center;padding:32px 0">
          <div style="font-size:44px;margin-bottom:14px">✅</div>
          <h3 style="font-size:20px;font-weight:800;margin-bottom:8px;color:#0B1F3A">Заявка отправлена!</h3>
          <p style="color:#6B7280;font-size:15px">Наш менеджер перезвонит вам<br>в течение 2 часов</p>
        </div>`;
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Ошибка отправки. Позвоните нам: +7 (999) 099 98-08');
      }
    } catch (err) {
      btn.textContent = originalText;
      btn.disabled = false;
      alert('Ошибка отправки. Позвоните нам: +7 (999) 099 98-08');
    }
  });

  /* ── Smooth anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Scroll-reveal ── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(el => { if (el.isIntersecting) { el.target.classList.add('visible'); obs.unobserve(el.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.service-card, .adv-card, .review-card, .client-card, .process-step').forEach(el => {
      el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(el);
    });
    document.addEventListener('animationend', () => {});
    // Trigger visible class
    document.querySelectorAll('.visible').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
    const styleObs = new IntersectionObserver(entries => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.style.opacity = '1';
          el.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.service-card, .adv-card, .review-card, .client-card, .process-step').forEach(el => styleObs.observe(el));
  }

});
